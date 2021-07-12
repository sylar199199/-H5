import api from '@/api'
import { throttle, jsBridge, eventBus } from '@/utils'
import router from '@/router'

export default {
  name: 'user',

  state: {
    fromUrl: {}, // 来源页
    msgNum: 0,
    promotionCode: '', // 邀请人code
    blLoginDialogShow: false, // 当前是否是登陆/注册弹框
    blUserBalanceShow: false, // 是否显示用户资金
    channel: '', // 用户渠道
    preRegisterInfo: {} // 预注册信息
  },

  getters: {
    fromUrl: state => state.fromUrl,
    msgNum: state => state.msgNum,
    promotionCode: state => state.promotionCode,
    blLoginDialogShow: state => state.blLoginDialogShow,
    blUserBalanceShow: state => state.blUserBalanceShow,
    channel: state => state.channel,
    preRegisterInfo: state => state.preRegisterInfo
  },

  mutations: {
    SET_FROM_URL(state, data) {
      // football14投注
      state.fromUrl = data
    },
    SET_MSG_NUM(state, data) {
      state.msgNum = data
    },
    SET_PROMOTION_CODE(state, data) {
      state.promotionCode = data
    },
    SET_BL_LOGIN_DIALOG_SHOW(state, data) {
      state.blLoginDialogShow = data
    },
    SET_BL_USER_BALANCE_SHOW(state, data) {
      state.blUserBalanceShow = data
    },
    SET_CHANNEL(state, data) {
      state.channel = data || ''
    },
    SET_PRE_REGISTER_INFO(state, data) {
      state.preRegisterInfo = data || {}
    }
  },

  actions: {
    getMsgNum: throttle(async function ({ rootState, commit, state }, data) {
      const res = await api.msgNum({
        data: {
          userAccount: rootState.loginInfo.playerAccount
        }
      })
      if (!res || res.code !== 0) return
      commit('SET_MSG_NUM', res.data || 0)
    }, 3000),
    async loginSuccess({commit, state, dispatch}, {token, routeName, dialogShow}) {
      let bl = state.blLoginDialogShow
      commit('SET_TOKEN', token)
      commit('SET_LOGIN', true)
      if (window.isApp) {
        window.App.isLogin = true
        jsBridge.login()
      }
      await dispatch('getLoginInfo')
      if (state.fromUrl) {
        if (state.fromUrl.url) {
          dispatch('backToOtherPage')
        } else if (!bl && (state.fromUrl.name || routeName)) {
          router.replace({
            name: state.fromUrl.name || routeName,
            query: {
              ...(state.fromUrl.query || {})
            },
            params: {
              ...(state.fromUrl.params || {})
            }
          })
        } else if (bl && !dialogShow) {
          eventBus.emit('loginHide')
        }
        setTimeout(() => {
          commit('SET_FROM_URL', {})
        }, 500)
      }
      await dispatch('getGameUrl')
    },
    backToOtherPage({commit, state}) {
      if (state.fromUrl.url) {
        window.location.replace(state.fromUrl.url)
      }
    }
  }
}
