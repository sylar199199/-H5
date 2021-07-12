import Vue from 'vue'
import Router from 'vue-router'
import routes from './list'
import pcRoutes from './pc/list'
import goTo from 'vuetify/es5/services/goto'
// 路由重复点击异常处理
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  mode: process.env.VUE_APP_ROUTER_MODE,
  routes: [
    ...routes,
    ...pcRoutes
  ],
  scrollBehavior: (to, from, savedPosition) => {
    if (to.name !== from.name) {
      let scrollTo = 0
      // if (to.hash) {
      //   scrollTo = to.hash
      // }
      if (savedPosition) {
        scrollTo = savedPosition.y
      }
      return goTo(scrollTo)
    }
  }
})


const routerNameList = {};

(function () {
  function setNameList(list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].name) {
        routerNameList[list[i].name] = true
      }
      if (list[i].children) {
        setNameList(list[i].children)
      }
    }
  }
  setNameList(router.options.routes)
})()

router.beforeEach((to, from, next) => {
  if ((window.$isPc && to.path.indexOf('/pc/') === -1) ||
    (!window.$isPc && to.path.indexOf('/pc/') !== -1)
  ) {
    let name = ''
    if (to.name === 'rechargeSuccess') {
      next()
      return
    }
    if (window.$isPc) {
      name = `pc${to.name[0].toUpperCase()}${to.name.substr(1)}`
    } else {
      name = `${to.name[2].toLowerCase()}${to.name.substr(3)}`
    }
    if (routerNameList[name]) {
      next({
        name,
        query: {
          ...to.query
        },
        params: {
          ...to.params
        }
      })
      return
    }
  }
  if (to.meta && to.meta.title) document.title = to.meta.title
  next()
})

export default router
