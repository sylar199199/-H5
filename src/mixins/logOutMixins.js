import { jsBridge, eventBus, localCache } from '@/utils'
export const logOutMixins = {
  methods: {
    /*
     * @desc 退出登陆
     * @params blOvertime 是否操作超时自动退出
     * @params routeName 退出成功后跳转路由
     **/
    async logOut({ blOvertime, routeName }) {
      let obj = {data: {}}
      if (!blOvertime) obj.message = 'Exit succeeded'
      let res = await this.$api.logout({
        ...obj
      })
      if (res.code !== 0) return
      this.$store.commit('SET_AGENTINFO', '')
      if (window.isApp) {
        window.App.isLogin = false
        jsBridge.logOut()
      }
      this.$store.commit('SET_LOGININFO', '')
      this.$store.commit('SET_LOGIN', false)
      localCache.clear()
      this.$store.commit('SET_ACCOUNT', false)
      if (blOvertime) { // 超时登陆提示
        this.$store.commit('SET_MSG', {
          msg: 'Log out automatically after not operating for a long time',
          msgType: 'warning',
          status: true,
          num: Math.random(),
        })
      }
      if (routeName === 'login' && window.$isPc) {
        routeName = 'pcSports'
        setTimeout(() => {
          eventBus.emit('loginShow', 'login')
        }, 500)
      }
      this.$router.push({name: routeName})
    }
  }
}
