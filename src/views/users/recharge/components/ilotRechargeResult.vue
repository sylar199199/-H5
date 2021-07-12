<template>
  <div class="recharge-result white">
    <div class="recharge pl-4 pr-4 text-center pt-8">
      <v-avatar
        size="84"
        class="mt-16"
      >
        <v-icon v-if="isSuccess" size="84" color="primary">mdi-checkbox-marked-circle</v-icon>
        <v-icon v-else size="84" color="error">mdi-close-circle</v-icon>
      </v-avatar>
      <p class="text-h6 mt-3 d-block text-center" min-width="92%" v-if="isSuccess">Deposit Success！</p>
      <p class="text-h6 mt-3 d-block text-center" min-width="92%" v-else>Deposit failed</p>
      <p class="text-h5 mt-3 pb-15 d-block text-center primary--text font-weight-medium" v-if="isSuccess">₦{{amount}}</p>
      <v-btn
        color="primary"
        class="rounded-sm white--text mt-16 text-capitalize"
        elevation="0"
        block
        large
        @click="confirm"
        v-if="isSuccess">
        Confirm
      </v-btn>
      <v-btn
        color="primary"
        class="rounded-sm white--text mt-16 text-capitalize"
        elevation="0"
        block
        large
        @click="goBack"
        v-else>
        Go Back
      </v-btn>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'rechargeSuccess',
  props: {
    result: {
      type: Object
    }
  },
  data() {
    return {
      amount: '',
      isSuccess: false
    }
  },
  components: {
  },
  watch: {
    result: {
      handler(newVal) {
        if (newVal.status === 'SUCCESS') {
          this.isSuccess = true
          this.amount = parseFloat(newVal.amount / 100000).toFixed(2)
        } else if (newVal.status === 'FAIL') {
          this.isSuccess = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // let amount = this.$route.query.amount
    // if (amount) {
    //   this.amount = parseFloat(amount / 100000).toFixed(2)
    // }
  },
  mounted() {},
  methods: {
    confirm() {
      console.log('confirm')
      this.$router.push({
        name: 'account'
      })
    },
    goBackSet() {
      this.$router.go(-1)
    },
    goBack() {
      this.$emit('goBack')
    }
  },
}
</script>

<style lang="less" scoped>
.recharge-result {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
