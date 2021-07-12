<template>
  <div class="payment-password change-password text-center">
    <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>

    <LoginCommonTitle class="change-password-tit" :title="calcTitle"  />

    <div v-if="confirmPanel">
      <p class="change-password-subtit text--disabled text-subtitle-2 text-caption text-center">Confirm your account first</p>
      <v-form ref="form" class="change-password-form mt-12" :key="'sendMsg'" @submit.prevent="confirm">
        <v-container>
          <v-row>
            <CommonInput
              class="change-password-form-input"
              v-model="form.playerAccount"
              placeholder="Phone Number Or Email"
              :rules="rules.playerAccount"
              :disabled="true"
            />
          </v-row>
          <v-row>
            <SmsCodeInput class="change-password-form-input" v-model="form.verifyCode" :form="form" module="payment" />
          </v-row>
        </v-container>
        <LoadingBtn
          class="change-password-form-btn"
          :disabled="!formIsValid"
          text="Confirm"
          @click="confirm"
        />
      </v-form>
    </div>
    <insetPassword :changePanel="changePanel1" :info="insertInfo" @insertBack="nextSet1"></insetPassword>

    <insetPassword :changePanel="changePanel2" :info="insertInfo" @insertBack="nextSet2"></insetPassword>

    <LoadingBtn
      class="change-password-form-btn"
      :disabled="!isFinish"
      text="Finish"
      @click="changePass"
      v-if="changePanel2"
    />
  </div>
</template>

<script type="text/javascript">
import LoginCommonTitle from '@/components/user/login/LoginCommonTitle'
import CommonInput from '@/components/common/commonInput'
import SmsCodeInput from '@/components/user/login/SmsCodeInput'
import insetPassword from './components/insertPassword'
import LoadingBtn from '@/components/func/loading-btn'
import { mapGetters} from 'vuex'
import md5 from 'js-md5'
import { eventTracking, eventKey } from '@/utils/fireBase'
export default {
  name: 'PaymentPassword',
  components: {
    LoginCommonTitle,
    CommonInput,
    SmsCodeInput,
    insetPassword,
    LoadingBtn
  },
  props: {
    title: {
      type: String,
      default: 'Set Password'
    }
  },
  data() {
    return {
      form: {
        codeUses: 4,
        verifyCode: null,
      },
      rules: {
        playerAccount: [val => (val || '').length > 0 || 'This field is required']
      },
      setpwdData: {
        type: 4,
        retrieveType: 0 // 验证码类型 默认不是找回密码
      },
      confirmPanel: true,
      changePanel1: false,
      changePanel2: false,
      isFinish: false,
      newPass: '',
      confirmPass: '',
      insertInfo: {},
      dTitle: ''
    }
  },
  computed: {
      ...mapGetters(['isLogin', 'loginInfo', 'triggerBalance', 'platformName']),
    formIsValid () {
      return (
        this.form.playerAccount &&
        this.form.verifyCode
      )
    },
    calcTitle() {
      return this.dTitle || this.title
    }
  },
  created() {},
  mounted() {
    if (this.$route.query.model === 'set') {
      this.dTitle = 'Set Payment Password'
    } else if (this.$route.query.model === 'forgot') {
      this.dTitle = 'Forgot Payment Password'
    }
    this.$set(this.form, 'playerAccount', this.loginInfo.playerAccount)
    this.$set(this.form, 'mobile', this.loginInfo.mobile)
    this.$set(this.form, 'email', this.loginInfo.email)
  },
  methods: {
    sendState(val) {
      this.form.playerAccount = val = this.form.playerAccount.replace(/[^\d]/g, '')
      console.log(this.form.playerAccount)
      if (val === '') {
        this.inputFocus = false
      } else if (!this.sendFlag) {
        this.inputFocus = true
      }
      console.log(this.inputFocus)
    },
    async sendMsg() {
      let fireObj = {
        clickOn: 'Send'
      }
       // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_SET_PAYMENT_PWD, 'send', fireObj)
      let th = this
      if (this.sendFlag) return
      const res = await this.$api.mobileNumber({
        message: 'Sending verification code successfully', // 发送验证码成功
        data: {
          codeUses: this.setpwdData.type,
          playerAccount: this.form.playerAccount
        }
      })
      if (res.code !== 0) return
      th.sendFlag = true
      th.inputFocus = false
      // 倒计时
      th.countDown()
    },
    // 倒计时
    countDown() {
      let i = 120
      let timeId = setInterval(() => {
        i -= 1
        this.sendText = 'Resend(' + i + 's)'
        if (i === 0) {
          this.sendText = 'Send'
          i = 120
          clearInterval(timeId)
          this.sendFlag = false
          if (this.form.playerAccount !== undefined) {
            this.inputFocus = true
          }
        }
      }, 1000)
    },
    // 验证验证码
    async confirm(fn) {
      try {
        let fireObj = {
          clickOn: 'Confirm'
        }
        // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_SET_PAYMENT_PWD, 'confirm', fireObj)
        if (this.form.verifyCode === '') {
          this.$common.showMsg(window.vm.$t('rules.NUMBER-MSG'), 'warning')
          return
        }
        // 修改提现密码验证
        const res = await this.$api.checkPwdValid({
          message: 'Verification successful', // 手机验证成功
          data: {
            codeUses: this.setpwdData.type,
            accountCode: this.loginInfo.accountCode,
            playerAccount: this.loginInfo.playerAccount,
            userCode: this.loginInfo.playerCode,
            verificationCode: this.form.verifyCode,
            retrieve: this.setpwdData.retrieveType
          }
        })
        if (res.code !== 0) return
        this.setpwdData.verification = this.form.verifyCode
        this.changePanel1 = true
        this.confirmPanel = false
        this.insertInfo.sub = 'Please enter new payment password'
      } finally {
        fn && fn()
      }
    },
    nextSet1(val) {
      if (val && val.length === 6) {
        this.changePanel1 = false
        this.changePanel2 = true
        this.insertInfo.sub = 'Please fill in the confirmation again'
        this.newPass = val
      }
    },
    nextSet2(val) {
      if (val && val.length === 6) {
        this.isFinish = true
        this.confirmPass = val
      }
    },
    async changePass(fn) {
      try {
        if (this.newPass !== this.confirmPass) {
          this.$common.showMsg(window.vm.$t('The two passwords do not match'), 'warning')
          return
        }
        const res = await this.$api.updatePayPwd({
          message: 'Setup succeeded', // 设置成功
          data: {
            accountCode: this.loginInfo.accountCode,
            password: md5(md5(this.newPass).toLocaleLowerCase()).toLocaleLowerCase(),
            playerAccount: this.loginInfo.playerAccount,
            userCode: this.loginInfo.playerCode,
            retrieve: this.setpwdData.type,
            verificationCode: this.setpwdData.verification,
          }
        })
        if (res.code !== 0) return
        if (this.setpwdData.returnPage === 'withdraw') { // 返回上一个页面并传递参数返回提现页面
          // sessionStorage.setItem('id', '')
          this.$emit('restoreState', true, '3')
        } else if (this.setpwdData.returnPage === 'addCard') { // 返回添加银行卡页面
          // sessionStorage.setItem('id', '')
          this.$emit('restoreState', true, '6')
        } else { // 返回上一个页面并传递参数返回列表页面
          // sessionStorage.setItem('id', '')
          this.$emit('restoreState', true, '2')
          this.$router.go(-1)
        }
      } finally {
        fn && fn()
      }
    }
  },
}
</script>

<style lang="less" scoped>
.change-password {
  margin: 0 37.5px;
  .v-toolbar{
    box-sizing: content-box;
    padding-right: 75px;
    margin: 0 -37.5px;
  }
  &-tit{
    padding-bottom: 15px !important;
  }
  &-subtit{
    font-size: 12px;
    color: @font-color2;
    text-align: center;
    margin-bottom: 44px;
  }
  &-form {
    &-input{
      padding-top: 0 !important;
    }
    &-btn{
      margin-top: 50px;
    }
  }
}
</style>

