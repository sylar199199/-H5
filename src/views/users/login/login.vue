<template>
  <div class="login">
    <i-lot-toolbar @goBack="$router.go(-1)" v-if="!blLoginDialogShow"></i-lot-toolbar>
    <!-- 标题 -->
    <LoginCommonTitle title="Log In to ILOT" />

    <!--选项卡-->
    <LoginWays v-model="accountType" />

    <v-form
      ref="form"
      v-model="formIsValid"
      class="login-form"
    >
      <v-container>
        <v-row>
          <template v-if="accountType===0">
            <PhoneInput v-model="form.playerAccount" />
          </template>
          <template v-else>
            <EmailInput v-model="form.playerAccount" />
          </template>
        </v-row>
        <v-row>
          <template v-if="loginByPassword">
            <PasswordInput v-model="form.password" module="login" />
          </template>
          <template v-else>
            <SmsCodeInput v-model="form.verifyCode" :accountType="accountType" :form="form" module="login" />
          </template>
        </v-row>
      </v-container>

      <div class="login-form-type font-weight-medium" :class="{'password': loginByPassword}" @click="loginByPassword = !loginByPassword">
        Login with {{loginByPassword ? 'OTP' : 'password'}}
      </div>

      <LoadingBtn
        class="login-form-btn"
        :disabled="!formIsValid"
        text="Log In"
        @click="loginFunc"
      />
      <p class="login-form-tips d-flex justify-space-between">
        <template v-if="loginByPassword">
          <span class="text--disabled login-form-tips-forget text-conption" @click="forgetPassword" > Forgot Password? </span>
        </template>
        <template v-else>
          <RecieveErrorBtn :form="form" :accountType="accountType" v-on="$listeners" />
        </template>
        <span class="login-form-tips-register text-conption primary--text font-weight-medium" @click="goRegister" > Register </span>
      </p>
    </v-form>

    <!-- 其它登陆/注册方式 -->
    <ThirdLogin />
  </div>
</template>

<script type="text/javascript">
import LoginCommonTitle from '@/components/user/login/LoginCommonTitle'
import LoginWays from '@/components/user/login/LoginWays'
import PhoneInput from '@/components/user/login/PhoneInput'
import SmsCodeInput from '@/components/user/login/SmsCodeInput'
import PasswordInput from '@/components/user/login/PasswordInput'
import EmailInput from '@/components/user/login/EmailInput'
import LoadingBtn from '@/components/func/loading-btn'
import RecieveErrorBtn from '@/components/user/login/RecieveErrorBtn'
import ThirdLogin from '@/components/user/login/ThirdLogin'
import md5 from 'js-md5'
import {mapGetters, mapMutations} from 'vuex'
import { loginRegisterDialogMixins } from '@/mixins'
import { eventBus } from '@/utils'
import { eventTracking, eventKey } from '@/utils/fireBase'
let fromRoute = {}
export default {
  name: 'login',
  components: {
    LoginCommonTitle,
    LoginWays,
    PhoneInput,
    SmsCodeInput,
    PasswordInput,
    EmailInput,
    LoadingBtn,
    RecieveErrorBtn,
    ThirdLogin
  },
  mixins: [loginRegisterDialogMixins],
  data() {
    return {
      formIsValid: true,
      form: {
        playerAccount: '',
        verifyCode: '',
        password: '',
        codeUses: 1
      },
      accountType: 1, // 账号类型
      loginByPassword: true // 是否用密码登陆
    }
  },
  beforeRouteEnter(to, from, next) {
    const nameList = ['register', 'retrievePassword', 'resetPassword']
    if (from.name && !nameList.includes(from.name)) {
      next(false)
      eventBus.emit('loginShow', 'login')
      return
    }
    fromRoute = from
    next()
  },
  mounted() {
    const noSaveList = ['register', 'retrievePassword', 'registrationProtocol', 'resetPassword']
    if (fromRoute.name && noSaveList.indexOf(fromRoute.name) === -1) {
      this.$store.commit('SET_FROM_URL', {
        name: fromRoute.name,
        query: {...fromRoute.query},
        params: {...fromRoute.params}
      }) // 保留来源页
    }
    setTimeout(() => { // 强制校验
      if (this.form.playerAccount && this.form.password) {
        this.formIsValid = true
      }
    })
  },
  computed: {
    ...mapGetters(['contentData', 'regObj', 'platformName']),
  },
  watch: {
    accountType() {
      this.form = {
        playerAccount: '',
        verifyCode: '',
        password: '',
        codeUses: 1
      }
    }
  },
  methods: {
    ...mapMutations(['SET_LOGININFO', 'SET_CONTENT']),
    // 切换账号
    changeType() {
      let _this = this
      setTimeout(function () {
        _this.$refs.form.validate()
      }, 500)
    },
    forgotEvent() {
      this.$router.push({name: 'retrievePassword'})
    },
    async loginFunc(fn) {
      try {
        if (this.loginByPassword && !this.form.password) {
          this.$common.showMsg(window.vm.$t('rules.PASSWORD-MSG'), 'warning')
          return
        }
        let valid = this.$refs.form.validate()
        if (valid) {
          const obj = {
            playerAccount: this.form.playerAccount.toString().replace(/^0{1,}/g, ''),
            loginType: this.loginByPassword ? 0 : 1, // 登陆类型: 0 密码登陆； 1 验证码登陆； 2 注册码登陆
          }
          if (this.loginByPassword) {
            obj.password = md5(md5(this.form.password).toLocaleLowerCase()).toLocaleLowerCase()
          } else {
            obj.password = this.form.verifyCode
          }
          const res = await this.$api.getLogin({
            message: 'Login successful', // 登录成功
            data: {...obj}
          })
          if (res.code !== 0) return
          this.$store.dispatch('loginSuccess', {token: res.data, routeName: 'sports'})
          this.$refs.form.reset()
        }
      } finally {
        fn && fn()
      }
    },
    goBackSet() {
      this.$router.go(-1)
    },
    async forgetPassword() {
      await this.loginDialogFilter('forget')
      this.$router.push({name: 'retrievePassword', query: {type: 2}})
    },
    // 注册
    async goRegister() {
      let obj = {
        clickFrom: this.platformName
      }
       // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_LOGIN_REGISTER, '', obj)
      // window._czc.push(['_trackEvent', this.platformName + '-homeRegister', 'register'])
      await this.loginDialogFilter('register')
      this.$router.push({name: 'register'})
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  min-height: 100vh;
  margin: 0 37.5px;
  position: relative;
  .v-toolbar{
    box-sizing: content-box;
    padding-right: 75px;
    margin: 0 -37.5px;
  }
  &-form{
    .container{
      height: auto !important;
    }
    &-agreement{
      padding-top: 40px;
      font-size: 12px;
      color: @font-color2;
      letter-spacing: 0;
      span{
        color: @primary;
        cursor: pointer;
      }
    }
    &-btn{
      margin-top: 50px !important;
    }
    &-type{
      font-size: 12px;
      color: @primary;
      cursor: pointer;
      padding-top: 15px;
    }
    &-tips{
      font-size: 12px;
      color: @font-color2;
      padding: 12px 0;
      span{
        color: @primary;
        cursor: pointer;
        line-height: 1;
      }
    }
  }
}
</style>
