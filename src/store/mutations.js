import * as types from './mutation-types'
import storage from '@/utils/storage'
import { localCache } from '@/utils'

export default {
  // 保存时区
  SET_TIMEZONE(state, data) {
    state.timeZone = data
  },
  // 时区时差 不包括网络延时
  [types.SET_TIMEDIFWITHOUTNET](state, data) {
    state.timeDifWithoutNet = data
  },
  // 时差 包括网络延时
  [types.SET_TIMEDIF](state, data) {
    state.timeDif = data
  },
  [types.SET_DETAILEVENTSTATUS](state, data) {
    state.detailEventStatus = data
  },
  // 推送的全局状态
  [types.SET_GLOBALFLAG](state, data) {
    state.globalFlag = data
  },
  // 赛前赔率范围过滤oddsRange
  [types.SET_ODDSRANGE](state, data) {
    state.oddsRange = data
  },
  [types.SET_REGOBJ](state, data) {
    state.regObj = data
  },
  [types.SET_SEARCHOBJ](state, data) {
    if (!data) {
      state.searchObj = {}
    } else if (data.init) {
      delete data.init
      state.searchObj = data
    } else {
      state.searchObj = {
        ...state.searchObj,
        ...data
      }
    }
  },
  [types.SET_BETTING](state, data) {
    // data = {
    //   item: {
    //     matchId: listItem.matchId,
    //     team: listItem.name, // 两队名
    //     marketId: item.id, // 投注的id
    //     odds: item.odds // 赔率
    //   },
    //   flag: item.on // 添加 还是减去
    // }
    let arr = JSON.parse(JSON.stringify(state.betList))
    if (data.flag === 'removeAll') { // 全部删除
      arr = []
    } else if (data.flag) { // 添加
      arr.push(data.item)
    } else { // 删除
      arr = arr.filter(val => {
        return !(val.marketId === data.item.marketId && val.sid === data.item.sid)
      })
    }
    if (arr.length !== state.betList.length) state.betList = arr
  },
  [types.SET_CARDATA](state, data) {
    state.betList = data
  },
  [types.SET_LOGININFO](state, data) {
    state.loginInfo = data || {}
  },
  [types.SET_ROUTERTAGS](state, data) {
    let isRepeat = false
    state.routerTags.forEach(item => {
      if (item.routerName === data.routerName) {
        isRepeat = true
        // 路由参数更新
        if (JSON.stringify(item.query) !== JSON.stringify(data.query)) {
          item.query = data.query
        }

        if (data.childrenPageName) item.childrenPageName = data.childrenPageName
      }
    })
    if (!isRepeat) {
      state.routerTags.push(data)
    }

    storage.session.set('routerTags', state.routerTags)
  },
  [types.REMOVE_ROUTERTAGS](state, data) {
    state.routerTags.forEach((item, i) => {
      if (state.routerTags[i].routerName === data.routerName) {
        state.routerTags.splice(i, 1)
      }
    })
    storage.session.set('routerTags', state.routerTags)
  },
  [types.CLEAR_ROUTERTAGS](state) {
    state.routerTags = []
    storage.session.remove('routerTags')
  },
  [types.SET_FONTSIZE](state, data) {
    state.fsMode = data
    storage.set('fsMode', data)
  },
  [types.SET_FULL](state, boolean) {
    state.isFull = boolean
  },
  [types.SET_ALLAREADATA](state, data) {
    state.all_area_data = data
  },
  [types.SET_MENUSHOW](state, data) {
    state.device = data
  },
  [types.SET_MENUOPEN](state, data) {
    state.menuOpen = data
  },
  [types.SET_ACCOUNT](state, boolean) {
    // 账户
    state.accountShow = boolean
  },
  [types.SET_LIVES](state, boolean) {
    // livesnav
    state.livsNav = boolean
  },
  [types.SET_MENU](state, data) {
    // homemenu
    state.menuActive = data
  },
  [types.SET_LOGIN](state, boolean) {
    // 登录状态
    state.isLogin = boolean
    localCache.set('isLogin', boolean)
  },
  [types.SET_INDEX](state, data) {
    // 头部菜单
    state.homeIndex = data
  },
  [types.TRIGGER_BALANCE](state, data) {
    // 触发请求余额
    state.triggerBalance = data
  },
  [types.SET_LIVESMENU](state, data) {
    // lives侧边三级菜单
    state.livesActive = data
  },
  // 头部菜单 个人信息编辑
  [types.EDIT_PROFILE](state, data) {
    state.editProfile = data
  },
  // 修改语言
  editLanges(state, data) {
    state.langeType = data
  },
  [types.SYSTEM_MONEY](state, data) {
    // system投注金额
    state.systemMoney = data
  },
  [types.MULTIPLE_MONEY](state, data) {
    // multiple投注金额
    state.multipleMoney = data
  },
  [types.COUPON_LIST](state, data) {
    // coupon列表
    state.couponList = data
  },
  [types.SET_COUPON](state, data) {
    // coupon数据
    state.betCoupon = data
  },
  [types.COUPON_DATA](state, data) {
    // 可用优惠券
    state.availableCoupon = data
  },
  [types.BET_TYPE](state, data) {
    // 可用优惠券
    state.betTypeNum = data
  },
  [types.SET_MSG](state, data) {
    // 信息弹窗
    state.msgData = data
  },
  [types.REBET_TICKET](state, data) {
    // 重复投注的订单
    state.rebetTicket = data
  },
  [types.DETAIL_TICKET](state, data) {
    // 投注订单详情id
    state.ticketId = data
  },
  [types.WITHDRAW_DATA](state, data) {
    // 提现表单数据
    state.withdrawData = data
  },
  [types.SET_LOTTERYCAR](state, data) {
    // lottery购物车状态
    state.lotteryCarStatus = data
  },
  [types.SET_LOTTERYDATA](state, data) {
    // 提现表单数据
    state.lotteryBetData = data
  },
  SET_AGENTINFO(state, data) {
    state.agentInfo = data || {}
  },
  SET_CONTENT(state, data) {
    // 设置lottery跳转需要的参数
    if (data.type === 'gameId3') {
      state.contentData.content3 = data.val
      state.contentData.url3 = data.url
    } else if (data.type === 'gameId13') {
      state.contentData.content13 = data.val
      state.contentData.url13 = data.url
    } else if (data.type === 'gameId6') {
      state.contentData.content6 = data.val
      state.contentData.url6 = data.url
    }
  },
  SET_PLATFORMNAME(state, data) { // 设置平台名称
    if (window.platform === 3) {
      state.platformName = 'H5'
    } else if (window.platform === 4) {
      state.platformName = 'PC'
    }
  },
  SET_ADKEY(state, data) {
    // 广告弹层的id
    state.adKey = data
  },
  SET_SOCKETDATA(state, data) {
    let obj = {
      name: data.name,
      data: data.obj
    }
    let same = false
    // 设置lottery跳转需要的参数
    if (state.socketData.length > 0) {
      state.socketData.forEach(val => {
        if (data.name === val.name) {
           val.data = data.obj
           same = true
        }
      })
    }
    if (!same) {
      state.socketData.push(obj)
    }
  },
  SET_TOKEN(state, data) {
    state.loginInfo.token = data || ''
    localCache.set('token', data || '')
  },
  SET_SPORTLOAD(state, data) {
    // sportload
    state.sportLoad = data
  },
  SET_WEBIP(state, data) {
    // webIp
    state.webIp = data
  },
}
