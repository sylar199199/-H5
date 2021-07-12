/*
* common.js
* 通用的业务处理的方法
*/

import store from '../store'
import { localCache } from '@/utils'
// import Vue from 'vue'
// let eventBus = new Vue()
const commonLogout = () => {
  store.commit('SET_AGENTINFO', '')
  store.commit('SET_LOGIN', false)
  store.commit('SET_LOGININFO', '')
  localCache.clear()
  store.commit('SET_ACCOUNT', false)
}
export default {
  commonLogout
}
