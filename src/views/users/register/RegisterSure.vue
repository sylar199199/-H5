<template>
  <div class="register-sure">
    <LoginCommonTitle class="register-sure-title" title="Congratulations, you are an ilot member now!" />

    <LoginCommonTitle class="register-sure-title sub" title="About Us" />

    <div class="register-sure-content">
      <p>Simple, fast and you can make real money!</p>
      <p>ILOT is the registered trading name of Lucky9ja lotto Limited.</p>
      <p>Lucky9ja lotto Limited hold the National Lottery Regulatory Commission sports betting license and Lottery license for all over Nigeria. License No.0001040</p>
      <p>ILOT draws upon the best practices in both Europe and Africa. We have a strong technical team to ensure the reliability and security of our systems and your transactions. Our customer facing operations are based in Abuja to ensure the customer experience is unparalleled.</p>
      <p>ILOT set the standard for online and mobile in Nigeria.</p>
      <p class="bg">
        <v-img src="~@/assets/img/help/aboutUs.png"></v-img>
      </p>
      <p>All the big sporting events</p>
    </div>
  </div>
</template>

<script type="text/javascript">
import LoginCommonTitle from '@/components/user/login/LoginCommonTitle'

export default {
  components: {
    LoginCommonTitle
  },
  created() {
    this.register()
  },
  methods: {
    async register() {
      await this.$api.authregister({
        blHandlerError: true,
        data: {
          authcode: this.$route.query.re_cod
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.register-sure{
  margin: 0 37.5px;
  position: relative;
  &-title{
    padding: 12px 0 30px;
    text-align: left;
    &.sub{
      padding: 0;
      margin-bottom: 15px;
    }
  }
  &-content{
    p{
      font-size: 13px;
      color: @font-color2;
      line-height: 20px;
      text-align: justify;
      margin-bottom: 10px;
    }
  }
}
</style>
