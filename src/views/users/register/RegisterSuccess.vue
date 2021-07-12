<template>
  <div class="login-success">
    <i-lot-toolbar @goBack="$router.go(-1)" v-if="!blLoginDialogShow"></i-lot-toolbar>

    <LoginCommonTitle title="Congratulations!" />

    <div class="login-success-content">Embark on your lucky journey with iLot now!</div>

    <v-btn
      color="primary"
      class="login-success-btn rounded-sm white--text text-capitalize"
      block
      large
      depressed
      @click="goIlot('sports')"
    >
      To iLot
    </v-btn>

    <div class="login-success-tips">Change your password to step up security.</div>

    <div class="login-success-set font-weight-medium" @click="resetPassword">Change Password</div>

  </div>
</template>

<script type="text/javascript">
import LoginCommonTitle from '@/components/user/login/LoginCommonTitle'
import { loginRegisterDialogMixins } from '@/mixins'
export default {
  components: {
    LoginCommonTitle
  },
  mixins: [loginRegisterDialogMixins],
  data() {
    return {
      blShowErrorTips: false
    }
  },
  created() {},
  mounted() {
    this.register()
  },
  methods: {
    goIlot() {
      if (this.blLoginDialogShow) {
        this.$emit('hide')
      } else {
        this.$router.replace({
          name: 'sports'
        })
      }
    },
    async resetPassword() {
      await this.loginDialogFilter('setPassword')
      this.$router.replace({
        name: 'resetPassword'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-success{
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
    font-size: 12px;
    color: @font-color2;
    line-height: 20px;
    margin-bottom: 60px;
  }
  &-btn{
    margin-top: 50px;
  }
  &-tips{
    font-size: 12px;
    color: @font-color2;
    line-height: 20px;
    padding-top: 20px;
  }
  &-set{
    font-size: 12px;
    color: @primary;
    line-height: 2;
    padding: 6px 0;
    cursor: pointer;
  }
}
</style>
