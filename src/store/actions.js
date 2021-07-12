import * as types from './mutation-types'
import api from '@/api'
import { throttle, saveUserInfo, eventBus, jsBridge, localCache, APEvent } from '@/utils'
// 添加路由标签
export function setRouterTags({ commit }, data) {
  commit(types.SET_ROUTERTAGS, data)
}

// 移除路由标签
export function removeRouterTags({ commit }, data) {
  commit(types.REMOVE_ROUTERTAGS, data)
}

// 清空路由标签
export function clearRouterTags({ commit }, data) {
  commit(types.CLEAR_ROUTERTAGS, data)
}

// 全屏切换
export function setFull({ commit }, data) {
  commit(types.SET_FULL, data)
}

// 代理人登陆
export const agentLogin = throttle(async function ({ commit, state }, data) {
  const res = await api.agentLogin({})
  if (res.code !== 0) return
  commit('SET_AGENTINFO', res.data)
}, 5000)

// 获取用户信息
export const getLoginInfo = throttle(async function ({ dispatch, commit, state }, bl, resolve, reject) {
  try {
    let res = await api[bl ? 'queryAccountInfo' : 'queryPlayer']({})

    if (!res || res.code !== 0) {
      reject()
      return
    }
    const obj = {
      token: localCache.get('token'),
      ...state.loginInfo,
      ...res.data
    }

    saveUserInfo({
      playerNick: obj.playerNick,
      firstName: obj.firstName,
      lastName: obj.lastName
    })
    APEvent('EVENT', 'setCustomerUserId', obj.playerCode)
    // app客户端用户处理
    if (window.isApp) {
      jsBridge.saveUserInfo(JSON.stringify(obj))
    }

    // 返回结果，修改用户信息
    resolve({...obj})
    commit(types.SET_LOGININFO, obj)
  } catch (err) {
    reject()
  }
}, 2000)

// 获取游戏跳转链接
export const getGameUrl = async function({ commit, state }, data) {
  const res = await api.gameList({
    data: {
      terType: 4,
      gameType: 0,
      type: 'gameList',
      pageNum: 1,
      pageSize: 10
    }
  })
  if (res.code !== 0) return
  res.data.list.forEach(val => {
    let obj = {}
    if (parseInt(val.id) === parseInt(process.env.VUE_APP_FOOTBALL_ID)) {
      obj = {
        type: 'gameId13',
        val: val.content,
        url: val.url
      }
    } else if (parseInt(val.id) === parseInt(process.env.VUE_APP_3D_ID)) {
      obj = {
        type: 'gameId3',
        val: val.content,
        url: val.url
      }
    } else if (parseInt(val.id) === parseInt(process.env.VUE_APP_905_ID)) {
      obj = {
        type: 'gameId6',
        val: val.content,
        url: val.url
      }
    }
    commit('SET_CONTENT', obj)
  })
}

export const updateTimeDif = async function({ commit, state }, data) {
  // 接口发出的时间戳
  const channelTime = new Date().getTime()
  const res = await api.updateTime({})
  // 接口接收的时间戳
  const channelTime2 = new Date().getTime()
  // 单程时间
  const TD = (channelTime2 - channelTime) / 2
  if (res && res.RetCode === '0') {
    // 服务器所在时区--接口获取 现在接口没有返回先写死成尼日利亚时区 1
    let timeNum = 8
    const TimeZone = '' + res.Format01.TimeZone
    if (TimeZone.substr(0, 1) === '+') {
      timeNum = TimeZone.substr(1, 2) * 1
    }
    if (TimeZone.substr(0, 1) === '-') {
      timeNum = 0 - TimeZone.substr(1, 2) * 1
    }
    // 单纯时区差值
    let timeZoneDif = channelTime2 - new Date(getLocalTime(timeNum)).getTime()
    // 时差 减去 网络单程延时
    let timeDif = timeZoneDif - TD
    eventBus.emit('timeDifChange')
    commit('SET_TIMEZONE', timeNum)
    commit('SET_TIMEDIF', timeDif)
    commit('SET_TIMEDIFWITHOUTNET', timeZoneDif)
  }
}

export const queryReg = async ({ commit, state }, data) => {
  const res = await api.queryPasswordReg()
  if (res.code !== 0) return
  commit('SET_REGOBJ', res.data)
}

// 传入时区 计算当前时间
function getLocalTime(i) {
  var d = new Date()
  var len = d.getTime()
  var offset = d.getTimezoneOffset() * 60000
  var utcTime = len + offset
  return new Date(utcTime + 3600000 * i)
}
