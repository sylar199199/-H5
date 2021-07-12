import api from '@/api/'
import Vue from 'vue'
import store from '@/store'
import { EventSocket } from './eventSocket'

class WebSocketClass {
  constructor() {
    this.instance = null
    this.blDestory = false
    this.eventObj = {}
    this.realEventObj = {}
    this.defaultConfig = {
      removeGroups: 'all',
      userToken: ''
    }
    this.connect()
  }

  connect() {
    this.instance = api.socketio()
    this.instance.onopen = e => {
      this.status = 'open'
      // console.log(`${name}连接成功`, e)
    }

    this.initListen()
  }

  initListen() {
    this.instance.on('error', (error) => {
      console.log('error', error)
    })

    this.instance.on('connect', (data) => {
      let obj = {
        groups: 'g',
        userToken: ''
      }
      // 发送消息给服务端订阅主题可用于初始化数据
      this.instance.emit('sport_global_topic_v2', JSON.stringify(obj), function (data) {
        // console.log(JSON.parse(data))
      })

      // 发送消息给服务端订阅主题可用于初始化数据
      // this.emit('sport_global_topic_v2', obj, function (data) {
      //   console.log('全局推送的数据', JSON.parse(data))
      //   store.commit('SET_GLOBALFLAG', JSON.parse(data).data.up)
      // })
    })
    // 接收服务端消息
    this.instance.on('sport_global_topic_v2', function (data) {
      console.log('全局推送的数据', JSON.parse(data))
      store.commit('SET_GLOBALFLAG', JSON.parse(data).data.up)
    })
  }

  emit(event, obj, fn, type = '') {
    if (this.blDestory) return
    const key = event + type
    if (!this.eventObj[key]) {
      this.eventObj[key] = new EventSocket()
    }
    if (!this.realEventObj[event]) {
      this.realEventObj[event] = true
    }

    if (typeof obj !== 'string') {
      try {
        obj = JSON.stringify(obj)
      } catch (err) {}
    }
    this.instance.emit(event, obj, function (data) {
      // console.log(`${event}链接成功`)
      // 链接成功后保存传的数据
      let socketObj = {
        name: event,
        obj: obj
      }
      store.commit('SET_SOCKETDATA', socketObj)
    })


    this.on(event, key)

    this.eventObj[key].listen = true
    this.eventObj[key].fn = fn // 重置回调方法
  }

  on(event, key) {
    if (!this.eventObj[key].fn) { // 未配置回调（初次建立event连接）
      // 接受返回数据
      this.instance.on(event, (data) => {
        this.eventObj[key].callBack(data)
      })
    }
  }

  // 断开websocket
  off(event, type = '') {
    if (this.eventObj[event + type]) {
      this.eventObj[event + type].listen = false
    }
    this.instance.emit(event, JSON.stringify(this.defaultConfig))
  }

  // 销毁socket
  destory() {
    this.blDestory = true
    for (const argumentsKey in Object.keys(this.realEventObj)) {
      this.off(argumentsKey)
    }
  }
}
const socket = new WebSocketClass()

Vue.prototype.$socketio = socket
export default {
  socket
}
