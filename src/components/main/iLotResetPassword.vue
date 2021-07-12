<template>
  <div class="reset-password">
    <h2>Please set Your password</h2>
    <v-form ref="passform" v-model="formIsValid" class="reset-password-form">
      <v-container>
        <v-row>
          <v-text-field
            v-model="passform.password"
            placeholder="Password"
            required
            outlined
            dense
            height="40px"
            :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.password"
            :type="showPass1 ? 'text' : 'password'"
            @click:append="showPass1 = !showPass1"
            >
          </v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="passform.checkPassword"
            placeholder="Reenter Password"
            required
            outlined
            dense
            height="40px"
            :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.password"
            :type="showPass2 ? 'text' : 'password'"
            @click:append="showPass2 = !showPass2"
            @keyup.enter.native="regis"
            >
          </v-text-field>
        </v-row>
      </v-container>
       <v-btn
       :disabled="!formIsValid"
        color="primary"
        class="rounded-sm white--text text-capitalize"
        block
        large
        @click="regis"
      >
        Register Now
      </v-btn>
    </v-form>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ warnMessage }}
    </v-snackbar>
  </div>
</template>

<script type="text/javascript">
  import { jsBridge, APEvent } from '@/utils'
  // import storage from '@/utils/storage'
  import {mapGetters, mapMutations} from 'vuex'
  import md5 from 'js-md5'
  // import toolbar from '@/components/common/toolbar'
  // import rules from '@/utils/rules.js'
  export default {
    name: 'resetPassword',
    props: {
      verificationCode: {
        type: String,
        default: ''
      },
      promotionCode: {
        type: String,
        default: ''
      },
      mobile: {
        default: ''
      },
      isAgree: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        passform: {
          codeUses: 0,
          verifyCode: null,
        },
        playerAccount: null,
        verifyCode: null,
        sendText: 'Send',
        sendFlag: false,
        hasAccount: true,
        showPass1: false,
        showPass2: false,
        rules: {
          playerAccount: [val => (val || '').length > 0 || 'This field is required'],
          verifyCode: [val => (val || '').length > 0 || 'This field is required'],
          password: [val => (val || '').length > 0 || 'This field is required'],
        },
        warnMessage: '',
        snackbar: false,
        timeout: 2000,
        formIsValid: true
      }
    },
    components: {
      // toolbar
    },
    computed: {
      ...mapGetters(['loginInfo']),
    },
    created() {},
    mounted() {},
    methods: {
      ...mapMutations(['SET_LOGININFO']),
      async regis() {
        let valid = this.$refs.passform.validate()
        console.log(valid)
        if (valid) {
          if (this.passform.password !== this.passform.checkPassword) {
            this.warnMessage = this.$t('The two passwords do not match')
            this.snackbar = true
            return
          }
          if (!this.isAgree) {
            this.warnMessage = this.$t('Please make sure you are already 18 years old')
            this.snackbar = true
            return
          }
          const res = await this.$api.register({
            message: 'register was successful', // 注册成功
            data: {
              playerAccount: this.mobile,
              playerPassword: md5(md5(this.passform.password).toLocaleLowerCase()).toLocaleLowerCase(),
              verificationCode: this.verificationCode,
              promotionCode: this.promotionCode
            }
          })
          if (res.code === 0) {
            if (window.isApp) {
              jsBridge.recordEventToAppsFlyer('valid registration')
            } else {
              APEvent('EVENT', 'valid registration')
            }
            this.loginFunc()
          }
        }
      },
      async loginFunc() {
        const res = await this.$api.getLogin({
          message: 'Login successful', // 登录成功
          data: {
            loginType: 0,
            password: md5(md5(this.passform.password).toLocaleLowerCase()).toLocaleLowerCase(),
            playerAccount: this.mobile
          }
        })
        if (res.code !== 0) return
        this.passform.password = ''
        this.$store.dispatch('loginSuccess', {token: res.data, routeName: 'home'})
      },

      goBackSet() {
        this.$router.go(-1)
      }
    },
  }
</script>

<style lang="less" scoped>
.reset-password {
  h2 {
    display: block;
    margin-top: 12vh;
    text-align: center;
    font-size: 18px;
  }
  .reset-password-form {
    width: 80%;
    margin: 5vh auto;
    .send-msg {
      line-height: 1.5;
    }
    .warning-tip {
      margin-top: 15px;
      font-size: 14px;
      text-align: center;
      span {
        color: #5BA600;
      }
    }
  }
}
</style>
