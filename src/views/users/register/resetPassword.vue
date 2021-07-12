<template>
  <div class="reset-password">
    <i-lot-toolbar @goBack="$router.go(-1)" v-if="!blLoginDialogShow"></i-lot-toolbar>

    <LoginCommonTitle class="reset-password-tit" title="Change login password" />

    <v-form ref="passform" v-model="formIsValid" class="reset-password-form">
      <v-container>
        <v-row>
          <PasswordInput v-model="passform.oldPassword" module="login" placeholder="Old Password" />
          <p class="reset-password-form-tips">Sent to you by email or message</p>
        </v-row>
        <v-row>
          <PasswordInput v-model="passform.password" placeholder="New Password" />
        </v-row>
        <v-row>
          <PasswordInput v-model="passform.checkPassword" placeholder="New Password" />
        </v-row>
      </v-container>
      <LoadingBtn
        class="reset-password-form-btn rounded-sm"
        :disabled="!formIsValid"
        text="Confirm"
        @click="regis"
      />
    </v-form>
  </div>
</template>

<script type="text/javascript">
import LoginCommonTitle from '@/components/user/login/LoginCommonTitle'
import PasswordInput from '@/components/user/login/PasswordInput'
import LoadingBtn from '@/components/func/loading-btn'
import {mapGetters, mapMutations} from 'vuex'
import { jsBridge, APEvent } from '@/utils'
import md5 from 'js-md5'
import { loginRegisterDialogMixins } from '@/mixins'
export default {
  name: 'resetPassword',
  components: {
    LoginCommonTitle,
    PasswordInput,
    LoadingBtn
  },
  mixins: [loginRegisterDialogMixins],
  props: {
    mobile: {
      default: ''
    },
    registerInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    isAgree: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      passform: {
        oldPassword: '',
        password: '',
        checkPassword: ''
      },
      formIsValid: true
    }
  },
  computed: {
    ...mapGetters(['loginInfo', 'promotionCode', 'channel']),
  },
  mounted() {},
  methods: {
    ...mapMutations(['SET_LOGININFO']),
    async regis(fn) {
      try {
        let valid = this.$refs.passform.validate()
        if (valid) {
          if (this.passform.password !== this.passform.checkPassword) {
            this.$store.commit('SET_MSG', {
              msg: 'The two passwords do not match',
              msgType: 'warning',
              status: true,
              num: Math.random(),
            })
            return
          }
          const res = await this.$api.updatePwd({
            data: {
              codeUses: 7,
              oldPassword: md5(md5(this.passform.oldPassword).toLocaleLowerCase()).toLocaleLowerCase(),
              newPassword: md5(md5(this.passform.password).toLocaleLowerCase()).toLocaleLowerCase()
            }
          })
          if (res.code === 0) {
            this.$emit('hidePwd', false)
            if (window.isApp) {
              jsBridge.recordEventToAppsFlyer('valid registration')
            } else {
              APEvent('EVENT', 'valid registration')
            }
            await this.loginFunc()
          }
        }
      } finally {
        fn && fn()
      }
    },
    async loginFunc() {
      const res = await this.$api.getLogin({
        data: {
          loginType: 0,
          password: md5(md5(this.passform.password).toLocaleLowerCase()).toLocaleLowerCase(),
          playerAccount: this.mobile || this.registerInfo.playerAccount || this.loginInfo.playerAccount
        }
      })
      if (res.code !== 0) return
      this.$store.dispatch('loginSuccess', {token: res.data, routeName: 'resetPasswordSuccess', dialogShow: true})
      this.loginDialogFilter('resetPasswordSuccess')
      this.passform.password = ''
    },
    goBackSet() {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="less" scoped>
.reset-password {
  min-height: 100vh;
  margin: 0 37.5px;
  .v-toolbar{
    box-sizing: content-box;
    padding-right: 75px;
    margin: 0 -37.5px;
  }
  &-tit{
    padding-bottom: 60px !important;
  }
  &-form{
    &-tips{
      font-size: 12px;
      color: @font-color2;
      padding-top: 10px;
    }
    &-btn{
      margin-top: 30px;
    }
  }
}
</style>
