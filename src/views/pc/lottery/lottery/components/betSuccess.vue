<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="520px"
  >
    <v-card>
      <v-icon class="text--secondary mt-3 mr-3 float-right"  @click="closePop">mdi-close</v-icon>
      <v-card-text class="px-sm-7 px-4">
        <v-container class="flex-column pa-0">
          <div class="text-center pt-5">
            <v-icon class="success-icon" color="primary">mdi-check-circle</v-icon>
          </div>
          <p class="text-center text-h6 text-sm-h4 black--text mt-4 mb-5">Submission Successful</p>
          <div>
            <!--3D-->
            <p class="d-flex justify-space-between align-center pt-5 mb-0">
              <span>Lottery</span>
              <strong class="black--text">Football 14</strong>
            </p>
            <!--期号-->
            <p class="d-flex justify-space-between align-center pt-5 mb-0">
              <span>NO.</span>
              <strong class="black--text">{{WagerIssue}}</strong>
            </p>
            <!--总金额-->
            <p class="d-flex justify-space-between align-center pt-5 mb-0">
              <span>Total stake</span>
              <strong class="black--text">₦{{showObj.totalStake | fmoney}}</strong>
            </p>
            <!--coupon-->
            <p class="d-flex justify-space-between align-center pt-5 mb-0">
              <span>Coupon</span>
              <strong class="black--text">-₦{{showObj.coupon | fmoney}}</strong>
            </p>
            <!--total-->
            <p class="d-flex justify-space-between align-center pt-5 mb-0">
              <span>Total</span>
              <strong class="black--text">₦{{showObj.total | fmoney}}</strong>
            </p>
            <!--max win-->
            <!--<p class="d-flex justify-space-between align-center pt-5 mb-0">-->
              <!--<span>Max win</span>-->
              <!--<strong class="black&#45;&#45;text">{{money(showObj.maxwin, '₦')}}</strong>-->
            <!--</p>-->
          </div>
          <div>
            <v-card-actions class="px-sm-7 px-4 pb-6 pt-2">
              <v-btn class="text-capitalize align-center font-weight-bold"
                     block
                     elevation="0"
                     x-large
                     color="primary"
                     @click="linkHistory">
                View details
              </v-btn>
            </v-card-actions>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'betSuccess',
    props: [
      'WagerIssue',
        'orderId',
    ],
    data() {
      return {
        dialog: true,
        showObj: {}
      }
    },
    mounted() {
      this.showObj = {...this.betMoneyObj}
    },
    computed: {
      ...mapGetters(['betMoneyObj'])
    },
    methods: {
      linkHistory() {
        this.$router.push({
          name: 'pcLotteryTicketDetail',
          params: {
            orderid: this.orderId
          }
        })
      },
      // 关闭弹窗
      closePop() {
        this.$emit('closeDialog', false,)
      }
    }
  }
</script>

<style lang="less" scoped>
.success-icon{
  font-size: 100px !important;
}
  #codeInput{
    position: absolute;
    left: 0;
    opacity: 0;
  }
</style>
