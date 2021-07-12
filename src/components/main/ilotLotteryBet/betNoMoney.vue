<template>
  <v-dialog
    v-model="dialog"
    max-width="290"
    persistent
  >
    <v-card>
      <v-card-title class="headline text-sm-h6 text-subtitle-1">Balance Insufficient</v-card-title>

      <v-card-text class="text-sm-subtitle-2 text-caption py-sm-2 py-0">
        There is enough balance in your account to place this bet.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          text
          class="text-capitalize font-weight-bold text-sm-subtitle-2 text-caption"
          @click="closeTip"
        >
          Later
        </v-btn>

        <v-btn
          color="primary"
          text
          class="text-capitalize font-weight-bold text-sm-subtitle-2 text-caption"
          @click="linkDeposit"
        >
          Deposit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    name: 'betNoMoney',
    props: [
      'showTip',
    ],
    data () {
      return {
        dialog: false,
      }
    },
    created() {
      this.dialog = this.showTip
    },
    methods: {
      ...mapMutations(['SET_LOTTERYCAR']),
      // 关闭弹窗
      closeTip() {
        console.log('关闭弹窗')
        this.dialog = false
        this.$emit('closeTip', false)
      },
      // 跳转到充值页面
      linkDeposit() {
        this.closeTip()
        this.$router.push('/recharge')
        this.SET_LOTTERYCAR(false)
      }
    }
  }
</script>

<style scoped>

</style>
