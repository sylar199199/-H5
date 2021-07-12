<template>
  <div class="register-check">
    <i-lot-toolbar @goBack="$router.go(-1)" v-if="!blLoginDialogShow"></i-lot-toolbar>

    <LoginCommonTitle title="Congratulations!" />

    <div class="register-check-content">
      <p>Just one more step to go!</p>
      <p>Please check your email and confirm your identity via the link to complete registration.</p>
      <p>Then you will receive an email containing your account and password. Please go to “My info” page and change your password after logging in.</p>
    </div>

    <LoadingBtn
      class="register-check-btn"
      text="Confirmed"
      @click="checkRegister"
    />

    <div class="register-check-error" v-show="blShowErrorTips">We haven’t received your identity confirmation request, please make sure you have clicked on the confirmation link, or click on
      <LoadingBtn
        class="register-check-error-btn"
        :text="sendText"
        :disabled="sendText !== 'resend'"
        @click="emailRegister"
      />
      to confirm again
    </div>

    <RecieveErrorBtn class="register-check-tips" :form="preRegisterInfo" :accountType="1" v-on="$listeners" />
  </div>
</template>

<script type="text/javascript">
import LoginCommonTitle from '@/components/user/login/LoginCommonTitle'
import LoadingBtn from '@/components/func/loading-btn'
import RecieveErrorBtn from '@/components/user/login/RecieveErrorBtn'
import { loginRegisterDialogMixins } from '@/mixins'
import { mapGetters } from 'vuex'
export default {
  components: {
    LoginCommonTitle,
    LoadingBtn,
    RecieveErrorBtn
  },
  mixins: [loginRegisterDialogMixins],
  data() {
    return {
      blShowErrorTips: false,
      cutdownTimer: null,
      sendText: 'resend'
    }
  },
  created() {},
  activated() {
    this.blShowErrorTips = false
  },
  deactivated() {
    this.clearTimer()
  },
  beforeDestory() {
    this.clearTimer()
  },
  computed: {
    ...mapGetters(['preRegisterInfo', 'promotionCode', 'channel'])
  },
  methods: {
    async checkRegister(fn) {
      try {
        const res = await this.$api.getLogin({
          blHandlerError: true,
          data: {
            playerAccount: this.preRegisterInfo.playerAccount,
            loginType: 2, // 登陆类型: 0 密码登陆； 1 验证码登陆； 2 注册码登陆
            password: this.preRegisterInfo.authcode
          }
        })
        if (!res) return
        if (res.code !== 0) {
          if (res.code === 20062) {
            this.blShowErrorTips = true // 未收到身份确认
          } else {
            this.$store.commit('SET_MSG', {
              msg: res.data.msg,
              msgType: 'warning',
              status: true,
              num: Math.random()
            })
          }
          return
        }
        this.$store.dispatch('loginSuccess', {token: res.data, routeName: 'registerSuccess', dialogShow: true})
        this.loginDialogFilter('registerSuccess')
      } finally {
        fn && fn()
      }
    },
    async emailRegister(fn) {
      try {
        const res = await this.$api.preregister({
          data: {
            playerAccount: this.preRegisterInfo.playerAccount,
            promotionCode: this.promotionCode,
            regF: this.channel || 'ilot'
          }
        })
        if (res.code === 0) {
          this.$store.commit('SET_PRE_REGISTER_INFO', {playerAccount: this.preRegisterInfo.playerAccount, authcode: res.msg || ''})
          this.countDown()
        }
      } finally {
        fn && fn()
      }
    },
    countDown() {
      let i = 120
      this.clearTimer()
      this.cutdownTimer = setInterval(() => {
        i -= 1
        this.sendText = 'Resend(' + i + 's)'
        if (i === 0) {
          this.sendText = 'resend'
          i = 120
          clearInterval(this.cutdownTimer)
          this.sendFlag = false
          if (this.form.playerAccount !== undefined) {
            this.inputFocus = true
          }
        }
      }, 1000)
    },
    clearTimer() {
      if (this.cutdownTimer) {
        clearInterval(this.cutdownTimer)
        this.cutdownTimer = null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register-check{
  min-height: 100vh;
  margin: 0 37.5px;
  position: relative;
  .v-toolbar{
    box-sizing: content-box;
    padding-right: 75px;
    margin: 0 -37.5px;
  }
  &-content{
    margin-top: -20px;
    p{
      font-size: 13px;
      color: @font-color2;
      line-height: 20px;
      margin-bottom: 12px;
    }
  }
  &-btn{
    margin-top: 50px;
  }
  &-error{
    font-size: 13px;
    color: #F54336;
    line-height: 20px;
    padding-top: 20px;
    &:last-child{
      padding-top: 0;
    }
    /deep/ &-btn{
      display: inline !important;
      min-width: auto !important;
      min-height: auto !important;
      height: auto !important;
      cursor: pointer;
      padding: 0 !important;
      background: none !important;
      &.v-btn--disabled{
        &.theme--light.v-btn.v-btn--disabled.v-btn--has-bg{
          background: none !important;
        }
        .v-btn__content{
          color: @font-color2;
        }
      }
      .v-btn__content{
        font-size: 13px !important;
        line-height: 20px !important;
        font-weight: normal !important;
      }
      &:not(.v-btn--disabled){
        .v-btn__content{
          color: @primary;
        }
      }

    }
  }
  &-tips{
    font-size: 13px;
    color: @primary;
    line-height: 2;
    padding: 6px 0;
  }
}
</style>
