<template>
  <div class="facebook-login">
    <template v-if="isApp">
      <div class="facebook-login-main d-flex align-center justify-center" @click="goFackbookLogin">
        <span></span>Login via third-party platform
      </div>
    </template>
    <template v-else>
      <fb-signin-button class="facebook-login-main d-flex align-center justify-center" :params="fbSignInParams" @success="onSignInSuccess" @error="onSignInError">
        <span></span>Login via third-party platform
      </fb-signin-button>
    </template>
  </div>
</template>
<script>
import FBSignInButton from 'vue-facebook-signin-button'
import Vue from 'vue'
import { jsBridge } from '@/utils'
import { mapGetters } from 'vuex'
Vue.use(FBSignInButton)
export default {
  components: {},
  props: {
    module: {
      default: 'register' // 登陆/注册
    }
  },
  data() {
    return {
      isApp: window.isApp,
      fbSignInParams: {
        scope: 'email,public_profile',
        return_scopes: true
      }
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['promotionCode', 'channel'])
  },
  methods: {
    async goFackbookLogin() {
      window.loginToFbCallBack = async () => {
        var accessToken = jsBridge.getFbAccessToken()
        var expiresIn = jsBridge.getFbExpiresIn()
        // alert(accessToken)
        let res = await this.$api.loginThrid({
          data: {
            accessToken: accessToken,
            thirdLoginType: 101,
            expiresIn: expiresIn,
            promotionCode: this.promotionCode,
            regF: this.channel || 'ilot'
          },
        })
        // alert(JSON.stringify(res))
        if (res.data != null && res.code === 0) {
          this.$store.dispatch('loginSuccess', {token: res.data, routeName: 'sports'})
        }
      }
      jsBridge.loginToFacebook()
    },
    async onSignInSuccess(response) {
      // alert(JSON.stringify(response))
      var accessToken = response.authResponse.accessToken
      var expiresIn = response.authResponse.expiresIn
      // alert(accessToken)
      let res = await this.$api.loginThrid({
        data: {
          accessToken: accessToken,
          thirdLoginType: 101,
          expiresIn: expiresIn,
          promotionCode: this.promotionCode,
          regF: this.channel || 'ilot'
        },
      })
      // alert(JSON.stringify(res))
      if (res.data != null && res.code === 0) {
        this.$store.dispatch('loginSuccess', {token: res.data, routeName: 'sports'})
      }
    },
    onSignInError(error) {
      console.log('onSignInError', error)
    },
  }
}
</script>

<style lang="less" scoped>
.facebook-login{
  &-main{
    font-size: 12px;
    color: @font-color2;
    cursor: pointer;
    span{
      width: 28px;
      height: 28px;
      background: url("~@/assets/img/components/user/icon_fackbook.png");
      background-size: 100% 100%;
      margin-right: 10px;
    }
  }
}
</style>
