import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})

// 缓存过滤配置， 过滤模块：过滤内容 （false: 不过滤； []: 空数组，全部过滤； [key]: 非空数组，对应模块需要过滤的内容）
const catchScoped = {
  sports: [],
  search: [],
  base: [],
  betSlip: false,
  lottery: false,
  user: ['msgNum', 'blLoginDialogShow', 'blUserBalanceShow'],
  isLogin: [],
  searchObj: []
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    ...modules
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        let map = {...val}
        for (let key in catchScoped) {
          if (catchScoped[key]) {
            if (catchScoped[key].length > 0) {
              map[key] = {...map[key]}
              for (let i = 0; i < catchScoped[key].length; i++) {
                delete map[key][catchScoped[key][i]]
              }
            } else {
              delete map[key]
            }
          }
        }
        return map
      }
    })
  ]
})
