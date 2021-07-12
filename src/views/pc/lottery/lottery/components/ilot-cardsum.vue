<template>
  <div class="cardsum">
    <div class="d-flex justify-space-between align-center py-2">
      <span class="text--secondary">Stake per line</span>
      <div class="moneyInput">
        <div class="d-flex justify-end moneyInputBox">
          <div class="minusplus">
            <v-icon
              color="delicate"
              @click="minusClick"
            >
              mdi-minus
            </v-icon>
          </div>
          <div class="inputBox d-flex font-weight-bold" >
            <span class="pl-2">₦</span>
            <v-text-field
              class="moneyInp my-0 py-0"
              v-model="singleStake"
              disabled
              hide-details
              #readonly
              @change="singleStakeChange"
            ></v-text-field>
            <!--<input type="number" v-model="singleStake" @change="singleStakeChange"/>-->
          </div>
          <div class="minusplus">
            <v-icon
              color="delicate"
              @click="plusClick"
            >
              mdi-plus
            </v-icon>
          </div>
        </div>
      </div>
    </div>
    <!--Total Stake Number-->
    <div class="d-flex justify-space-between py-2">
      <span class="text--secondary">Total Lines</span>
      <span class="font-weight-bold">{{totalStakeNumber}}</span>
    </div>
    <!--Total Stake-->
    <div class="d-flex justify-space-between py-2">
      <span class="text--secondary">Total Stake</span>
      <span class="font-weight-bold">{{money(totalStake, '₦')}}</span>
    </div>
    <!--Coupon-->
    <div class="d-flex justify-space-between cursor-pointer py-2" @click="selectCoupon">
      <span class="text--secondary">Coupon</span>
      <div class="cardsum-coupon">
        <strong class="primary--text">{{parseFloat(betCoupon.coupon>0?betCoupon.coupon:0).toFixed(2)}}</strong>
        <!--:disabled="availableCoupon.length===0"-->
        <v-btn icon color="grey lighten-1">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
    <!--Payment-->
    <div class="d-flex justify-space-between py-2">
      <span class="text--secondary">Pay</span>
      <span class="font-weight-bold">{{money(payment, '₦')}}</span>
    </div>
    <!--优惠券列表-->
    <v-bottom-sheet class="cart-style" v-model="showCouponsList">
      <v-sheet>
        <couponsList v-if="showCouponsList" @closeCoupons="closeCoupons"></couponsList>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script type="text/javascript">
import couponsList from './couponsList'
import {money} from '@/utils/filter'
import {mapGetters, mapMutations} from 'vuex'
import { throttle } from '@/utils'

export default {
  data() {
    return {
      singleStake: 0,
      showCouponsList: false,
      perStake: 1,
      totalStake: 100,
      totalStakeNumber: 0,
      payment: 200,
      maxwin: 0,
      timer: ''
    }
  },
  props: {
    gameList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    couponsList
  },
  computed: {
    ...mapGetters(['betCoupon', 'betArr', 'availableCoupon', 'betArr', 'gameIssueData', 'isLogin', 'lotteryBetData'])
  },
  created() {
    this.singleStake = Number(this.gameIssueData.MoneyPerBet) || 0
    this.calTotalDraws(this.betArr)
  },
  mounted() {
  },
  watch: {
    singleStake(value) {
      this.calTotalDraws(this.betArr)
      this.$emit('changePerStake', this.singleStake / this.gameIssueData.MoneyPerBet)
    },
    totalStake() {
      this.getCoupon()
    },
    isLogin: {
      immediate: true,
      handler() {
        this.getCoupon()
      }
    },
    deep: true
  },
  methods: {
    ...mapMutations(['SET_COUPON', 'COUPON_DATA']),
    money,
    // 减号操作
    minusClick() {
      if (this.singleStake <= 0) return
      this.singleStake = this.singleStake * 1 - this.gameIssueData.MoneyPerBet * 1
    },
    // 加号操作
    plusClick() {
      this.singleStake = this.singleStake * 1 + this.gameIssueData.MoneyPerBet * 1
    },
    // 倍数变化
    singleStakeChange(value) {
      this.calTotalDraws(this.betArr)
      this.$emit('changePerStake', this.singleStake / this.gameIssueData.MoneyPerBet)
      if (value * 1 < this.gameIssueData.MoneyPerBet * 1) {
        this.singleStake = this.gameIssueData.MoneyPerBet
      }
    },
    // 获取可用优惠券
    getCoupon: throttle(async function () {
      if (!this.isLogin) return
      let playMethodArr = []
      if (this.gameList && this.gameList[0] && this.gameList[0].PlayID) {
        playMethodArr = [this.gameList[0].PlayID]
      }
      const res = await this.$api.availableCoupon({
        normalData: true,
        data: {
          details: [{
            betMoney: this.totalStake,
            playMethod: playMethodArr.join('|')
          }],
          gameType: 0,
          gameId: this.lotteryBetData.GameID,
        }
      })
      if (res.code !== 0) return
      let dataList = res.data.availableCoupons
      if (dataList && dataList.length > 0) {
        let max = parseFloat(dataList[0].faceValue)
        let num = 0
        let havCoupon = false // 优惠券列表是否有已选优惠券数据
        dataList.forEach((val, i) => {
          val.expireEndTime = this.$moment(val.expireEndTime).format('DD/MM/YYYY')
          val.expireBeginTime = this.$moment(val.expireBeginTime).format('DD/MM/YYYY')
          // 判断可用优惠券是否有已选的优惠券
          if (val.couponHid === this.betCoupon.couponId) {
            havCoupon = true
          }
          // 获取可用金额最大的优惠券
          if (max < parseFloat(val.faceValue)) {
            max = parseFloat(val.faceValue)
            num = i
          }
        })
        // 保存可用优惠券数据
        this.COUPON_DATA(dataList)
        // 判断是否使用优惠券
        if (this.betCoupon.status && !havCoupon) {
          let obj = {
            status: true, // 是否使用优惠券
            couponId: dataList[num].couponHid,
            coupon: dataList[num].faceValue,
            couponCode: dataList[num].couponCode,
          }
          this.SET_COUPON(obj)
        }
      } else {
        // 当没有可用优惠券
        let obj = {
          status: this.betCoupon.status, // 是否使用优惠券
          couponId: '',
          coupon: 0,
          couponCode: '',
        }
        this.SET_COUPON(obj)
        // 清除之前优惠券数据
        let arr = []
        this.COUPON_DATA(arr)
      }
      this.calTotalDraws(this.betArr)
    }, 1000),
    // 选择优惠券
    selectCoupon() {
      this.showCouponsList = true
    },
    // 关闭优惠券列表
    closeCoupons() {
      this.calTotalDraws(this.betArr)
      this.showCouponsList = false
    },
    // 计算订单数据值
    calTotalDraws(betArr) {
      let draws = 0
      let times = 1
      let leng = 0
      // let MaxPrizeTimes = this.gameList[0].MaxPrizeTimes
      betArr.forEach((item) => {
        if (item.length > 0) {
          leng++
          times = times * item.length
        }
      })
      if (leng === 14) {
        draws = times
      }
      this.totalStakeNumber = draws
      this.totalStake = this.singleStake * this.totalStakeNumber
      this.payment = this.totalStake - parseFloat(this.betCoupon.coupon > 0 ? this.betCoupon.coupon : 0)
      this.$store.commit('SET_BETMONEYOBJ', {
        totalStake: this.totalStake, // 总金额
        coupon: this.betCoupon.coupon > 0 ? this.betCoupon.coupon : 0, // 优惠卷金额
        total: this.payment, // 付款金额（减去了优惠卷）
        totalStakeNumber: draws,
      })
      this.$emit('changePerStake', this.singleStake / this.gameIssueData.MoneyPerBet)
    }
  }
}
</script>

<style lang="less" scoped>
.cardsum{
  &-coupon{
    transform: translateX(12px);
  }
  .moneyInputBox{
    .inputBox{
      max-width: 120px;
      border-top: 1px solid #D9D9D9;
      border-bottom: 1px solid #D9D9D9;
      overflow: hidden;
      span{
        display: inline-block;
        width: 20px;
        height: 32px;
        line-height: 32px;
      }
      .moneyInp{
        width: calc(100% - 20px);
        .v-input__slot{
          margin-bottom: 0;
        }
      }
      > .v-input{
        /deep/ input{
          color: @font-color1 !important;
        }
      }
    }
    .minusplus{
      border: 1px solid #D9D9D9;
      line-height: 32px;
    }
  }
  .moneyInput{
    width: 150px;
    .v-text-field__details{
      height: 0!important;
      min-height: 0!important;
      margin: 0!important;
      padding: 0!important;
      .v-messages theme--light{
        height: 0!important;
        min-height: 0!important;
      }
    }
  }
  .v-btn--icon.v-size--default{
    height: 21px;
  }
}
</style>
