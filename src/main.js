import '@babel/polyfill'
import Vue from 'vue'
import xss from 'xss'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/'
import './mock'

import '@/assets/css/base.css'
import '@/assets/less/app.less'
import '@/assets/less/common.less'
// import 'bpmn-js/dist/assets/diagram-js.css'
// import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import i18n from '@/components/i18n'
import rules from '@/utils/rules'
import storage from '@/utils/storage'
import common from '@/utils/common' // 通用处理方法
import '@/utils/socket/socketio' // 通用处理方法
import mixins from '@/utils/mixins' // 全局mixins
import '@/assets/icon' // 图标库
// import '@/plugins/vuetify'
import vuetify from '@/plugins/vuetify'
// 引入moment.js
import moment from 'moment'
import iLotToolbar from '@/components/common/toolbar'
// import AreaTree from '@/components/common/areaCascader/AreaTree'
// import BaseForm from '@/components/common/baseForm/baseForm'
// import CommonCascader from '@/components/common/commonCascader/CommonCascader'
// import CommonSelect from '@/components/common/commonSelect/CommonSelect'
// import QueryForm from './components/common/queryForm/queryForm'
// import TablePage from '@/components/common/table/TablePage'
// import TableBody from '@/components/common/table/TableBody'
// import DetailBox from '@/components/common/detailList/DetailBox'
// import DetailList from '@/components/common/detailList/DetailList'
// import AreaCascader from '@/components/common/areaCascader/AreaCascader'
// import CheckboxRadio from '@/components/common/checkboxRadio/CheckboxRadio'
// import Chart from '@/components/common/chart/Chart'
// import AreauserSelect from '@/components/common/areauserSelect/AreauserSelect'
// import SvgStep from '@/components/common/svgStep/SvgStep'
// import ModalUpload from '@/components/common/upload/ModalUpload'
// import ConfirmUpload from '@/components/common/upload/ConfirmUpload'
// import StationSelect from '@/components/common/stationSelect/StationSelect'

// import glStore from '@/frontend/public/components'
// Vue.use(glStore)
// import Vconsole from 'vconsole'
// new Vconsole()
import * as filters from './filters'
import GlSvgIcon from '@/components/common/glSvgIcon'
import CommonRouterView from '@/components/common/commonRouterView'
import {jsBridge} from '@/utils' // svg组件
// 注册为全局组件
Vue.component('GlSvgIcon', GlSvgIcon)
Vue.component('CommonRouterView', CommonRouterView)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]) // 插入过滤器名和对应方法
})
// Vue.use(ElementUI)
// Vue.use(ElementUI, {
//   i18n: (key, value) => i18n.t(key, value)
// })
Vue.mixin(mixins) // 注册全局mixins

Vue.config.productionTip = false

const errorHandler = function(err, vm) {
  if (window.isApp) {
    jsBridge.recordException(err.stack.toString())
  }
}
Vue.config.errorHandler = errorHandler
Vue.prototype.$throw = (error) => errorHandler(error, this)
Vue.prototype.$api = api // 请求接口
Vue.prototype.$rules = rules
Vue.prototype.$common = common // 通用方法
Vue.prototype.eventBus = new Vue()
Vue.prototype.$ELEMENT = { size: 'middle' }
window.$isPc = common.isPc()
window.isApp = false
window.App = {
  platform: '',
  deviceSoftVersion: '',
  platformModel: '',
  deviceCode: '',
  isLogin: false,
  promotionCode: ''
}
// window.iLotJsBridge = Object
window.platform = common.checkPlatform()
Vue.prototype.$isPc = window.$isPc
Vue.prototype.$isApp = false
moment.suppressDeprecationWarnings = true // 移除moment警告
Vue.prototype.$moment = moment

common.getIP(function (ip) {
  console.log(ip)
})
Vue.component('iLotToolbar', iLotToolbar) // 区域树
// Vue.component('AreaTree', AreaTree) // 区域树
// Vue.component('CommonCascader', CommonCascader) // 下拉级联选择
// Vue.component('CommonSelect', CommonSelect) // 模态框选择
// Vue.component('QueryForm', QueryForm) // 查询列表
// Vue.component('TablePage', TablePage) // 列表页组件
// Vue.component('TableBody', TableBody) // 列表内容区
// Vue.component('DetailList', DetailList) // 详情外壳
// Vue.component('DetailBox', DetailBox) // 详情外壳
// Vue.component('AreaCascader', AreaCascader) // 区域选择级联
// Vue.component('CheckboxRadio', CheckboxRadio) // 多选 单选 组件
// Vue.component('Chart', Chart) // echarts组件
// Vue.component('AreauserSelect', AreauserSelect) // 区域用户选择
// Vue.component('SvgStep', SvgStep) // svg流程步骤图
// Vue.component('BaseForm', BaseForm) // 动态表单
// Vue.component('ModalUpload', ModalUpload) // 带弹出框的附加上传
// Vue.component('ConfirmUpload', ConfirmUpload) // 图片上传
// Vue.component('StationSelect', StationSelect) // 站点选择组件

Object.defineProperty(Vue.prototype, '$xss', {
  value: xss,
})

// 重写toFixed方法
window.Number.prototype.toFixed = function (s = 2) {
  let num = this || 0
  let old = num
  let index
  if (num < 0) num = -num
  num = (parseInt(num * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString()
  index = num.indexOf('.')
  if (index < 0 && s > 0) {
    num = num + '.'
    for (let i = 0; i < s; i++) {
      num = num + '0'
    }
  } else {
    index = num.length - index
    for (let i = 0; i < (s - index) + 1; i++) {
      num = num + '0'
    }
  }
  return old < 0 ? -num : num
}

// 防重复点击-自定义指令
Vue.directive('prevent', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 1000)
      }
    })
  },
})

// 按钮权限-自定义指令
Vue.directive('has', {
  inserted: function(el, binding) {
    if (!permissionJudge(binding.value)) {
      el.parentNode.removeChild(el)
    }
    function permissionJudge(value) {
      // 此处this.$storage.get('menuBtnList')代表storage中储存的按钮菜单数据
      const list = storage.get('menuBtnList')
      for (const item of list) {
        if (item.permission === value) {
          return true
        }
      }
      return false
    }
  },
})

window.vm = new Vue({
  render: h => h(App),
  router,
  vuetify,
  store,
  i18n,
  beforeCreate() {
    if (jsBridge.hasJsBridge()) {
      if (jsBridge.isApp()) {
        Vue.prototype.$isApp = true
        window.isApp = true
        window.App.platform = jsBridge.getChannel()
        window.App.deviceSoftVersion = jsBridge.getVersionName()
        window.App.platformModel = jsBridge.getAndroidVersion()
        window.App.deviceCode = jsBridge.getMacAddress()
        window.App.isLogin = jsBridge.isLogin()
        window.App.promotionCode = jsBridge.getPromotionCode()
      }
    }
  },
  mounted() {
    // 判定是否是首页
    window.isHome = function () {
      return true
    }
  },
  methods: {
  },
  watch: {
    '$route': function() {
      let name = this.$route.name
      let isHome = ['home', 'lotto', 'sports', 'betSlip', 'account', 'login'].findIndex(function(e) { return e === name }) !== -1
      window.isHome = function () {
        return isHome
      }
    }
  }
}).$mount('#app')
