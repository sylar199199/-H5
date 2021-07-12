<template>
  <div class="reset-password-success">
    <i-lot-toolbar @goBack="$router.go(-1)" v-if="!blLoginDialogShow"></i-lot-toolbar>

    <div class="reset-password-success-icon"></div>
    <div class="reset-password-success-tips font-weight-medium">Change Password Successfully!</div>

    <v-btn
      color="primary"
      class="register-sure-btn rounded-sm white--text text-capitalize"
      block
      large
      depressed
      @click="goOtherPage"
    >
      To iLot
    </v-btn>
  </div>
</template>

<script type="text/javascript">
import { loginRegisterDialogMixins } from '@/mixins'
export default {
  name: 'resetPassword',
  components: {
  },
  mixins: [loginRegisterDialogMixins],
  data() {
    return {
    }
  },
  mounted() {},
  methods: {
    goOtherPage() {
      if (this.blLoginDialogShow) {
        this.$emit('hide')
      } else {
        this.$router.replace({
          name: 'sports'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.reset-password-success{
  min-height: 100vh;
  margin: 0 37.5px;
  box-sizing: border-box;
  .v-toolbar{
    box-sizing: content-box;
    padding-right: 75px;
    margin: 0 -37.5px;
  }
  &-icon{
    width: 50px;
    height: 50px;
    background: url("~@/assets/img/views/user/register/icon_success.png");
    background-size: 100% 100%;
    margin: 86px auto 16px;
  }
  &-tips{
    font-size: 18px;
    text-align: center;
    margin-bottom: 47px;
  }
}
</style>
