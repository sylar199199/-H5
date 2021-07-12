<template>
  <div class="change-password">
    <i-lot-toolbar @goBack="$router.go(-1)" v-if="!blLoginDialogShow"></i-lot-toolbar>

    <div v-if="!changePanel">
      <LoginCommonTitle class="change-password-tit" :title="changeType === '7' ? 'Change Login Password' : 'Forgot Password'"  />
      <p class="change-password-subtit text--disabled text-subtitle-2 text-caption text-center">Confirm your account first</p>

      <v-form ref="form" v-model="formIsValid" class="change-password-form" :key="'sendMsg'">
        <v-container>
          <v-row>
            <CommonInput
              class="change-password-form-input"
              v-model="form.playerAccount"
              placeholder="Phone Number Or Email"
              :rules="rules.playerAccount"
              :disabled="Number(changeType) === 7"
            />
          </v-row>
          <v-row>
            <SmsCodeInput class="change-password-form-input" v-model="form.verifyCode" :form="form" />
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
    <div v-if="changePanel">
      <LoginCommonTitle class="change-password-tit" :title="changeType === '7' ? 'Change Login Password' : 'Forgot Password'"  />
      <p class="change-password-subtit text--disabled text-subtitle-2 text-caption text-center">Please enter your new password</p>

       <v-form ref="changeForm" v-model="formIsVali2" class="change-password-form" :key="'resetPassword'">
        <v-container>
          <v-row>
            <PasswordInput class="change-password-form-input" v-model="changeForm.password" />
          </v-row>
          <v-row>
            <PasswordInput class="change-password-form-input" v-model="changeForm.checkPassword" />
          </v-row>
        </v-container>
        <LoadingBtn
          class="change-password-form-btn"
          :disabled="!formIsVali2"
          text="Confirm"
          @click="changePassword"
        />
    </v-form>
    </div>
  </div>
</template>

<script type="text/javascript">
import LoginCommonTitle from '@/components/user/login/LoginCommonTitle'
import CommonInput from '@/components/common/commonInput'
import PasswordInput from '@/components/user/login/PasswordInput'
import SmsCodeInput from '@/components/user/login/SmsCodeInput'
import LoadingBtn from '@/components/func/loading-btn'
import md5 from 'js-md5'
import { mapGetters } from 'vuex'
import { loginRegisterDialogMixins, logOutMixins } from '@/mixins'
export default {
  name: 'rigster',
  components: {
    LoginCommonTitle,
    CommonInput,
    PasswordInput,
    SmsCodeInput,
    LoadingBtn
  },
  mixins: [loginRegisterDialogMixins, logOutMixins],
  props: {
    moduleType: {
      default: ''
    }
  },
  data() {
    return {
      form: {
        codeUses: 7,
        verifyCode: '',
      },
      changeForm: {
        password: null,
        checkPassword: null,
      },
      changePanel: false,
      sendFlag: false,
      verification: null,
      changeType: null,
      setLoginPwd: null,
      formIsValid: true,
      formIsVali2: true,
      rules: {
        playerAccount: [
          v => !!v || 'Phone Number / Email is required',
          this.$rules.limitaccountNew
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['loginInfo'])
  },
  created() {
    this.changeType = (this.$route.query.type && this.$route.query.type) || this.moduleType
    if (this.changeType) {
      if (parseInt(this.changeType) === 7 || parseInt(this.changeType) === 2) { // 修改登录密码
        this.setLoginPwd = true
      }
      this.form.mobile = this.loginInfo.mobile
      this.form.email = this.loginInfo.email
      this.form.playerAccount = this.loginInfo.playerAccount
    } else {
      this.changeType = 2
      this.setLoginPwd = true
    }
    this.$set(this.form, 'codeUses', this.changeType)
  },
  methods: {
    // 验证验证码
    async confirm(fn) {
      try {
        if (this.form.verifyCode === '') {
          this.$common.showMsg(window.vm.$t('rules.NUMBER-MSG'), 'warning')
          return
        }
        let valid = this.$refs.form.validate()
        if (valid) {
          if (this.setLoginPwd) { // 修改登录密码验证
            const res = await this.$api.checkVerificationCode({
              message: 'Verification successful', // 手机验证成功
              data: {
                codeUses: this.changeType,
                playerAccount: this.form.playerAccount || this.loginInfo.playerAccount,
                verifyCode: this.form.verifyCode
              }
            })
            if (res.code !== 0) return
            this.changePanel = true
            this.verification = this.form.verifyCode
          } else { // 修改提现密码验证
            const res = await this.$api.checkPwdValid({
              message: 'Verification successful', // 手机验证成功
              data: {
                codeUses: this.changeType,
                accountCode: this.loginInfo.accountCode,
                playerAccount: this.loginInfo.playerAccount,
                userCode: this.loginInfo.playerCode,
                verificationCode: this.form.verifyCode,
                retrieve: this.setpwdData.retrieveType
              }
            })
            if (res.code !== 0) return
            this.setpwdData.verification = this.form.verifyCode
          }
        }
      } finally {
        fn && fn()
      }
    },
    async forSetPwd() {
      const res = await this.$api.retrievePwd({
        message: 'Password changed successfully', // 修改密码成功
        data: {
          playerAccount: this.form.playerAccount,
          resetPassword: md5(md5(this.form.password).toLocaleLowerCase()).toLocaleLowerCase(),
          verificationCode: this.form.verifyCode
        }
      })
      if (res.code === 0) {
        this.changePanel = true
        this.verification = this.form.verifyCode
      }
    },
    async changePassword(fn) {
      try {
        if (this.changeForm.password !== this.changeForm.checkPassword) {
          this.$store.commit('SET_MSG', {
            msg: 'The two passwords do not match',
            msgType: 'warning',
            status: true,
            num: Math.random(),
          })
          return
        }
        let valid = this.$refs.changeForm.validate()
        if (valid) {
          const res = await this.$api.retrievePwd({
            message: 'Password modified successfully', // 密码修改成功
            data: {
              codeUses: this.changeType,
              playerAccount: this.form.playerAccount,
              resetPassword: md5(md5(this.changeForm.password).toLocaleLowerCase()).toLocaleLowerCase(),
              verificationCode: this.verification
            }
          })
          if (res.code !== 0) {
            this.changePanel = false
            this.$set(this.changeForm, 'password', '')
            this.$set(this.changeForm, 'checkPassword', '')
            this.$set(this.form, 'verifyCode', '')
          } else {
            if (parseInt(this.changeType) === 2) {
              await this.loginDialogFilter('login')
              this.$router.push({name: 'login'})
            } else if (parseInt(this.changeType) === 7) {
              this.logOut({routeName: 'login'})
            }
          }
        }
      } finally {
        fn && fn()
      }
    },
    goBackSet() {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="less" scoped>
.change-password {
  min-height: 100vh;
  padding: 0 35px;
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
    &-btn{
      margin-top: 50px;
    }
  }
}
</style>
