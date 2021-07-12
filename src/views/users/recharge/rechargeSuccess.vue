<template>
  <div>
    <!--<i-lot-toolbar @goBack="goBackSet"></i-lot-toolbar>-->
    <div class="recharge pl-4 pr-4 text-center pt-8">
      <v-avatar
        size="84"
        class="mt-16"
      >
        <v-icon size="84" color="primary">mdi-checkbox-marked-circle</v-icon>
      </v-avatar>
      <p class="text-h6 mt-3 d-block text-center" min-width="92%">Deposit Success！</p>
      <!--<p class="text-h5 mt-3 pb-15 d-block text-center primary&#45;&#45;text font-weight-medium">₦{{amount}}</p>-->
      <v-btn
        color="#5DA400"
        class="rounded-sm white--text mt-16 text-capitalize"
        elevation="0"
        :block="isPc?false:true"
        large
        @click="confirm">
        Confirm
      </v-btn>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'rechargeSuccess',
  data() {
    return {
      amount: '',
      isPc: false,
    }
  },
  components: {
  },
  created() {
    console.log(process.env.VUE_APP_PLATFROM_URL)
    let amount = this.$route.query.amount
    if (amount) {
      this.amount = parseFloat(amount / 100000).toFixed(2)
    }
  },
  mounted() {
    // 接受父页面发来的信息
    let _this = this
    window.addEventListener('message', function(event) {
      var data = event.data
      console.log(data)
      if (event.srcElement.$isPc || data === '2') {
        _this.isPc = true
      }
    })
  },
  methods: {
    confirm() {
      // this.$router.push({
      //   name: 'account'
      // })
      window.parent.postMessage({
        data: 'close',
      }, process.env.VUE_APP_PLATFROM_URL)
      // parent.location.reload()
    },
    goBackSet() {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="less" scoped>
// .v-btn {
//     text-transform: none;
//   }
</style>
