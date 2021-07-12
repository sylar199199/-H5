import axios from 'axios'
import qs from 'qs'
// import storage from './storage'
import io from 'socket.io-client'
import { baseURL, sockUrl } from '@/api/baseConfig'
import store from '../store'
import { encrypt } from '@/utils/jsencrypt'
import md5 from 'js-md5'
import { jsBridge, localCache, socket } from '@/utils'
import router from '../router'
/* eslint-daiable */

axios.defaults.withCredentials = false
axios.defaults.headers.common['Content-Type'] = 'application/jsoncharset=UTF-8'
axios.defaults.baseURL = baseURL
// 加语言标识
axios.defaults.headers['Accept-Language'] = 'en' // zh-CN

// 403服务拒绝重定向（标识是否已做重定向）
let hasRedirect403 = false
const source = axios.CancelToken.source()
/**
 * @description http请求
 * @param  {String} method 请求方法
 * @param  {String} path 请求路径
 * @param  {Object} options 请求配置
 * @param  {String} extend 请求拓展
 * @return {Function} result promise
 */
const request = (method, path, options, extend) => {
  if (hasRedirect403) { // 用户被禁止访问
    router.replace({path: '/serviceunavailable'})
    return {code: -1}
  }
  // 接口地址切换配置
  if (typeof options.baseURL === 'string') {
    axios.defaults.baseURL = options.baseURL
  } else {
    axios.defaults.baseURL = baseURL
  }
  // 基本参数 （带有/un/接口不需要token, 部分接口带上后会出现异常，如：注册时查询是否存在此用户）
  if (options.token || localCache.get('token')) {
    // axios.defaults.headers.common['token'] = options.token || localCache.get('token')
    axios.defaults.headers['User-Token'] = options.token || localCache.get('token')
    axios.defaults.headers['Access-Token'] = options.token || localCache.get('token')
  }
  if (options.userId) {
    axios.defaults.headers.common['UserID'] = options.userId || ''
  }
  axios.defaults.headers.common['Lang'] = options.Lang || 'en' // zh_CN
  axios.defaults.headers.common['TimeStamp'] = new Date().getTime()
  axios.defaults.headers.common['Version'] = '1.0'
  // 是否添加
  if (options.frontSN) {
    axios.defaults.headers['FrontSN'] = options.FrontSN || parseInt(new Date().getTime() / 1000)
  }
  // 加密签名
  // console.log(options.data)
  // let normalData = {
  //   deviceCode: '00-E1-8C-B8-14-4C', // 设备编号:如果是web页面或者app则传Mac地址
  //   deviceSoftVersion: 'V1.0.0', // 设备软件版本号:如果是web页面或者app则传前端包版本
  //   platform: window.platform, // 平台：0-投注设备，1-IOS，2-Android，3-H5，4-PC
  //   platformModel: '1.0', // 平台型号:投注机传设备型号，Android传Android版本，IOS传IOS版本，PC传浏览器型号及版本
  //   timestamp: new Date().getTime() // 时间戳
  // }
  // options.data = Object.assign({}, options.data, normalData)
  //  参数改成sign
  let strArr = []
  for (var i in options.data) {
    strArr.push(`${i}=${options.data[i]}`)
  }
  let sortArr = Array.prototype.sort.call(strArr, function(a, b) {
    for (var i = 0; i < a.length; i++) {
      if (a.charCodeAt(i) === b.charCodeAt(i)) continue
      return a.charCodeAt(i) - b.charCodeAt(i)
    }
  })
  // 如果normalData为true就不传sign
  if (!options.normalData) {
    let sign = encrypt(md5(sortArr.join('&')).toLocaleLowerCase())
    axios.defaults.headers.Sign = btoa(encodeURIComponent(sign))
  } else {
    delete axios.defaults.headers.Sign
  }
  axios.defaults.timeout = options.timeout || 30000
  let loading = null
  // 是否开启loading
  // if (!options.closeLoading) {
  //   loading = Loading.service({
  //     fullscreen: true,
  //     // target: '#main',
  //     text: options.loadingText || 'Loading', // 正在加载
  //     spinner: 'el-icon-loading iconfont icon-loading',
  //     background: 'rgba(0,0,0,0.3)',
  //     customClass: 'gb-loading',
  //   })
  // }
  return (async () => {
    try {
      // 第一次403 后续不再做请求
      // if (storage.session.get('notfirst403') === '1') return
      let res
      const responseType = {
        responseType: options.responseType,
        cancelToken: source.token
      }
      if (extend === 'uploadFile') {
        axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      }
      let platform = window.platform
      let deviceSoftVersion = 'V1.0.0'
      let deviceCode = options.deviceId || store.state.webIp
      let platformModel = '1.0'
      if (window.isApp) {
        platform = window.App.platform
        deviceSoftVersion = window.App.deviceSoftVersion
        platformModel = window.App.platformModel
        deviceCode = window.App.deviceCode
      }
      // alert(platform + ':' + deviceSoftVersion + ':' + platformModel + ':' + deviceCode)
      if (!options.normalData) {
        let normalData = {
          deviceCode: deviceCode, // 设备编号:如果是web页面或者app则传Mac地址
          deviceSoftVersion: deviceSoftVersion, // 设备软件版本号:如果是web页面或者app则传前端包版本
          platform: platform, // 平台：0-投注设备，1-IOS，2-Android，3-H5，4-PC
          platformModel: platformModel, // 平台型号:投注机传设备型号，Android传Android版本，IOS传IOS版本，PC传浏览器型号及版本
          timestamp: 1606273340134 // 设备编号:如果是web页面或者app则传Mac地址
        }
        options.data = Object.assign({}, options.data, normalData)
      }
      if (window.isApp) {
        console.log('param:' + JSON.stringify(options.data))
        console.log('headers:' + JSON.stringify(axios.defaults.headers))
      }
      if (options.data && typeof options.data !== 'object') {
        // RESTful传参
        res = await axios[method](`${path}/${options.data}`)
      } else {
        const data = options.data || {}
        // 上传
        if (extend === 'upload') {
          res = await axios[method](path, data, {
            // 上传进度
            onUploadProgress: progressEvent => {
              if (options.onUploadProgress) {
                // 监听回调
                options.onUploadProgress(progressEvent)
              }
            },
          })
        } else if (extend === 'jsonp') {
          res = await axios[extend](`${axios.defaults.baseURL}${path}?${qs.stringify(data)}`)
        } else {
          switch (method) {
            case 'get':
              res = await axios[method](path, {
                params: data,
                ...responseType,
                paramsSerializer: params => {
                  return qs.stringify(params, { indices: false })
                }
              })
              break
            case 'post':
              res = await axios[method](path, data, responseType)
              break
            case 'put':
              res = await axios[method](path, data)
              break
            case 'delete':
              res = await axios[method](path, data)
              break
            default:
              res = await axios[method](path, data, responseType)
          }
        }
      }
      // message提示
      if (res.data && (res.data.code === 100 || res.data.code === 2018 || res.data.code === 20017 || res.data.code === 20018)) {
        localCache.clear()
        let obj = {
          msg: res.data.msg,
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        res.data.msg && store.commit('SET_MSG', obj)
        if (window.isApp) {
          window.App.isLogin = false
          jsBridge.logOut()
        }
        store.commit('SET_LOGIN', false)
        store.commit('SET_LOGININFO', '')
        store.commit('SET_ACCOUNT', false)
        window.vm.$router.push({
          name: 'login'
        })
      } else if (res.data && res.data.code !== 0) {
        if (!options.blHandlerError) {
          let obj = {
            msg: res.data.msg,
            msgType: 'warning',
            status: true,
            num: Math.random(),
          }
          res.data.msg && store.commit('SET_MSG', obj)
        }
      } else {
        if (typeof options.message === 'string') {
          let obj = {
            msg: options.message,
            msgType: 'success',
            status: true,
            num: Math.random(),
          }
          store.commit('SET_MSG', obj)
        }
      }

      loading && loading.close()
      if (window.isApp) {
        console.log('response :' + JSON.stringify(res))
      }
      // 下载文件append返回响应headers
      if (responseType.responseType) {
        return {
          headers: res.headers,
          blob: res.data,
        }
      }
      return extend === 'jsonp' ? res : res.data
    } catch (err) {
      // 403错误，强制切到 “serviceunavailable” 页面（只做一次重定向）
      if (err.response && err.response.status === 403 && !hasRedirect403) {
        hasRedirect403 = true
        source.cancel('Operation canceled by the user.') // 取消请求
        socket.destory() // 断开socket
      }
      // 403重定向后，不再弹出接口错误提示
      if (hasRedirect403) {
        router.replace({path: '/serviceunavailable'})
        return {code: -1}
      }
      // 去掉接口访问错误提示
      // store.commit('SET_MSG', {
      //   msg: 'Interface request error！',
      //   msgType: 'error',
      //   status: true,
      //   num: Math.random(),
      // })
      loading && loading.close()
    }
  })()
}

/**
 * @desc jsonp请求
 *  */
axios.jsonp = url => {
  if (!url) {
    console.error('jsonp-参数错误')
    return
  }
  return new Promise((resolve, reject) => {
    window.callback = result => {
      resolve(result)
    }
    var JSONP = document.createElement('script')
    JSONP.type = 'text/javascript'
    JSONP.src = `${url}&callback=callback`
    document.getElementsByTagName('head')[0].appendChild(JSONP)
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP)
    }, 500)
  })
}

export default {
  get(path, options) {
    return request('get', path, options)
  },
  post(path, options, extend) {
    return request('post', path, options, extend)
  },
  upload(path, options) {
    return request('post', path, options, 'upload')
  },
  jsonp(path, options) {
    return request(null, path, options, 'jsonp')
  },
  put(path, options) {
    return request('put', path, options)
  },
  delete(path, options) {
    return request('delete', path, options)
  },
  ws(path, options) {
    // const socket = io.connect(
    return io(
      sockUrl,
      {
        reconnection: true, // 是否自动重新连接
        reconnectionAttempts: Infinity, // 放弃前尝试重新连接的次数
        reconnectionDelay: 1000, // 重连间隔
        reconnectionDelayMax: 5000, // 重新连接之间等待的最大时间。每次尝试都会增加2倍的重联延迟，同时增加随机化因子
        randomizationFactor: 0.5, // 随机因子
        timeout: 20000, // 超时
        autoConnect: true,
        path,
        transports: ['websocket'],
        query: qs.stringify(options.data),
      }
    )
  },
  baseURL,
}
