<template>
  <div class="bet-slip">
    <sportBetSlip></sportBetSlip>
    <!--优惠券-->
    <v-bottom-sheet class="cart-style" v-model="couponState">
      <v-sheet class="text-center">
        <!--优惠券列表-->
        <couponsList></couponsList>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
  import sportBetSlip from '@/components/sport/sportBetSlip'
  import couponsList from '@/components/sport/betSlip/couponsList'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'betSlip',
    components: {
      sportBetSlip,
      couponsList,
    },
    data() {
      return {
        couponState: false, // 优惠券状态
      }
    },
    computed: {
      ...mapGetters(['couponList']),
      status() {
        return this.couponState
      }
    },
    watch: {
      'couponList': {
        handler(newValue, oldValue) {
          console.log(newValue)
          this.couponState = newValue
        }
      },
      'status': {
        handler(newValue, oldValue) {
          console.log(newValue)
          this.COUPON_LIST(newValue)
        }
      },
      immediate: true,
      deep: true
    },
    created() {
      console.log('优惠券状态' + this.couponList)
      this.couponState = this.couponList
    },
    methods: {
      ...mapMutations(['COUPON_LIST']),
    }
  }
</script>

<style scoped>
.bet-slip{
  height: 100%;
}
</style>
