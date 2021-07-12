<template>
  <v-app>
    <div id="app" @touchstart="isDo">
      <router-view />
    </div>

    <!--提示-->
    <msgBar />

    <!--礼包弹窗-->
    <ilotGiftPop />

    <!-- 登陆弹框 -->
    <LoginRegisterDialog v-if="!isLogin || blLoginDialogShow" />
  </v-app>
</template>
<script>
import msgBar from '@/components/main/msgBar'
import ilotGiftPop from '@/components/main/ilotGiftPop'
import LoginRegisterDialog from '@/components/user/loginRegisterDialog/LoginRegisterDialog'
import { logOutMixins } from '@/mixins'
import { mapGetters, mapMutations } from 'vuex'
import { jsBridge, getinitQuery } from '@/utils'
// 重新定义 _czc ,因为通过script引入了友盟统计，但是可能存在加载问题，导致友盟的全局属性没有挂载到Window上，所以做了判断
// let _czc = window._czc || ''
export default {
  name: 'app',
  components: {
    msgBar,
    ilotGiftPop,
    LoginRegisterDialog
  },
  mixins: [logOutMixins],
  data() {
    return {
      timmer: ''
    }
  },
  created() {
    this.$store.commit('SET_PLATFORMNAME') // 初始化平台类型
    this.$store.dispatch('queryReg') // 初始化账号密码校验规则
    // 获取桥的信息
    if (window.isApp) {
      let userInfo = jsBridge.getUserInfo()
      if (userInfo !== '') {
        this.SET_LOGININFO(JSON.parse(userInfo))
      }
      this.SET_LOGIN(window.App.isLogin)
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    ...mapGetters(['isLogin', 'blLoginDialogShow', 'loginInfo', 'agentInfo']),
  },
  watch: {
    loginInfo: {
      immediate: true,
      handler(newVal, oldVal) {
        if (oldVal && oldVal.token && !(newVal && newVal.token)) { // 退出登陆
          this.$store.commit('SET_CARDATA', []) // 清空购物车
        }
        if (!(newVal && newVal.token)) {
          this.$store.commit('SET_AGENTINFO', {}) // 清空代理人信息
        }
      }
    }
  },
  methods: {
    ...mapMutations(['SET_REGOBJ', 'SET_LOGININFO', 'SET_LOGIN']),
    init() {
      // 初始化心跳
      this.initHeart()
      this.timer = setInterval(() => {
        this.initHeart()
      }, 60000)

      // 初始化用户信息
      if (!window.isApp && this.isLogin) {
        this.$store.dispatch('getLoginInfo')
      }

      // 初始化链接参数
      const initQuery = getinitQuery() || {}
      // 获取入口链接特定参数
      if (initQuery.fromUrl) {
        this.$store.commit('SET_FROM_URL', {url: decodeURIComponent(initQuery.fromUrl)}) // 保留来源页
      }

      // 保留邀请人code
      if (initQuery.promotionCode) {
        this.$store.commit('SET_PROMOTION_CODE', initQuery.promotionCode)
      } else if (window.isApp) {
        this.$store.commit('SET_PROMOTION_CODE', window.App.promotionCode)
      }

      // 保留用户渠道
      if (initQuery.c) {
        this.$store.commit('SET_CHANNEL', initQuery.c)
      } else if (window.isApp) {
        this.$store.commit('SET_CHANNEL', jsBridge.getChannelName() || '')
      }

      // 初始化各游戏跳转链接
      this.$store.dispatch('getGameUrl')
    },
    initHeart() {
      this.$api.heartbeat({data: { FrontSN: 'TESTSN' + parseInt(new Date().getTime() / 1000)}})
      this.$store.dispatch('updateTimeDif')
    },
    isDo() {
      clearTimeout(this.timmer)
      this.timmer = setTimeout(() => {
        // 这里写状态已过期后执行的操作  30分钟
        // 已登录后30分钟内无操作，自动退出
        if (this.$store.state.isLogin || (window.isApp && window.App.isLogin)) {
          this.logOut({
            blOvertime: true,
            routeName: 'home'
          })
        }
      }, 1000 * 60 * 30)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
