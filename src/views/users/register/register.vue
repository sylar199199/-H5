<template>
  <div class="register">
    <i-lot-toolbar @goBack="$router.go(-1)" v-if="!blLoginDialogShow"></i-lot-toolbar>

    <LoginCommonTitle title="Create Account" />
    <!--选项卡-->
    <LoginWays v-model="accountType" />

    <v-form ref="form" v-model="formIsValid" class="register-form">
      <v-container>
        <v-row v-if="accountType===0">
          <PhoneInput v-model="form.playerAccount" />

          <SmsCodeInput v-model="form.verifyCode" :accountType="accountType" :form="form" />
        </v-row>
        <v-row v-else-if="accountType===1">
          <EmailInput v-model="form.playerAccount" />
        </v-row>

        <v-row class="register-form-agreement">
          By continuing,you agree to iLot's<span class="font-weight-medium" @click.stop.prevent="lookProtcol">&nbsp;Terms&Conditions</span>
        </v-row>
      </v-container>

      <LoadingBtn
        class="register-form-btn"
        :disabled="!formIsValid"
        text="Continue"
        @click="checkNumber"
      />

      <p class="register-form-tips d-flex justify-space-between">
        <RecieveErrorBtn :form="form" :accountType="accountType" v-on="$listeners" />
        <span class="font-weight-medium" @click="goLogin">Log In </span>
      </p>
    </v-form>

    <!-- 其它登陆/注册方式 -->
    <ThirdLogin />

    <!--条款-->
    <v-dialog
      v-model="showProtocol"
      width="80%"
      scrollable
      class="fill-height"
    >
      <v-card class="overflow-auto">
        <v-card-title class="headline d-flex justify-space-between white align-center px-sm-4 px-2 py-sm-4 py-2">
          <span class="text-sm-h6 text-subtitle-1 font-weight-bold">Term & Conditions</span>
          <v-btn
            icon
            class="btn-close"
          >
            <v-icon small color="" class="text-sm-h4 text-h5" @click="showProtocol=false">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="fill-height px-sm-4 px-2 py-0">
          <i-lot-registration-protocol></i-lot-registration-protocol>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script type="text/javascript">
import LoginCommonTitle from '@/components/user/login/LoginCommonTitle'
import LoginWays from '@/components/user/login/LoginWays'
import PhoneInput from '@/components/user/login/PhoneInput'
import SmsCodeInput from '@/components/user/login/SmsCodeInput'
import EmailInput from '@/components/user/login/EmailInput'
import LoadingBtn from '@/components/func/loading-btn'
import RecieveErrorBtn from '@/components/user/login/RecieveErrorBtn'
import ThirdLogin from '@/components/user/login/ThirdLogin'
import iLotRegistrationProtocol from '@/components/main/iLotRegistrationProtocol'
import { loginRegisterDialogMixins } from '@/mixins'
import { mapGetters } from 'vuex'
export default {
  name: 'rigster',
  components: {
    LoginCommonTitle,
    LoginWays,
    PhoneInput,
    SmsCodeInput,
    EmailInput,
    ThirdLogin,
    RecieveErrorBtn,
    LoadingBtn,
    iLotRegistrationProtocol
  },
  mixins: [loginRegisterDialogMixins],
  data() {
    return {
      form: {
        playerAccount: '',
        codeUses: 0,
        verifyCode: null,
      },
      isAgree: false,
      formIsValid: true,
      accountType: 1,
      showProtocol: false
    }
  },
  created() {},
  mounted() {
  },
  computed: {
    ...mapGetters(['promotionCode', 'channel'])
  },
  watch: {
    phone: {
      immediate: true,
      handler() {
        if (this.phone) this.$set(this.form, 'playerAccount', this.phone)
      }
    },
    accountType() {
      this.form = {
        playerAccount: '',
        codeUses: 0,
        verifyCode: null
      }
    }
  },
  methods: {
    async checkNumber(fn) {
      try {
        let valid = this.$refs.form.validate()
        if (valid) {
          if (this.accountType === 1) { // 邮箱注册
            await this.emailRegister()
          } else { // 手机号注册
            await this.phoneRegister()
          }
        }
      } finally {
        fn && fn()
      }
    },
    async emailRegister() {
      const res = await this.$api.preregister({
        data: {
          playerAccount: this.form.playerAccount,
          promotionCode: this.promotionCode,
          regF: this.channel || 'ilot'
        }
      })
      if (res.code === 0) {
        this.$store.commit('SET_PRE_REGISTER_INFO', {playerAccount: this.form.playerAccount, authcode: res.msg || ''})
        await this.loginDialogFilter('registerCheck')
        this.$router.push({name: 'registerCheck'})
      }
    },
    async phoneRegister() {
      const res = await this.$api.register({ // 注册
        message: 'register was successful',
        data: {
          playerAccount: this.form.playerAccount.toString().replace(/^0{1,}/g, ''),
          verificationCode: this.form.verifyCode,
          promotionCode: this.promotionCode,
          regF: this.channel || 'ilot'
        }
      })
      if (!res || res.code !== 0) return
      const res2 = await this.$api.getLogin({ // 注册成功，自动登陆
        data: {
          playerAccount: this.form.playerAccount.toString().replace(/^0{1,}/g, ''),
          loginType: 2, // 登陆类型: 0 密码登陆； 1 验证码登陆； 2 注册码登陆
          password: res.data
        }
      })
      if (!res2 || res2.code !== 0) return
      // 登陆成功
      this.$store.dispatch('loginSuccess', {token: res2.data, routeName: 'registerSuccess', dialogShow: true})
      await this.loginDialogFilter('registerSuccess')
    },
    async lookProtcol() {
      this.showProtocol = true
    },
    closePanel() {
      this.showProtocol = false
    },
    async goLogin() {
      await this.loginDialogFilter('login')
      this.$router.push({name: 'login'})
    }
  },
}
</script>

<style lang="less" scoped>
.register {
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
      font-size: 12px;
      color: @font-color3;
      letter-spacing: 0;
      padding-top: 50px;
      span{
        color: @primary;
        cursor: pointer;
      }
    }
    &-btn{
      margin-top: 15px !important;
    }
    &-tips{
      padding: 12px 0;
      span{
        font-size: 12px;
        color: @primary;
        cursor: pointer;
      }
    }
  }
}
</style>
