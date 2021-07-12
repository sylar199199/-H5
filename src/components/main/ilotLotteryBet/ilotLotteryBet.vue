<template>
  <v-bottom-sheet class="lottery-bet cart-style" v-model="lotteryBetStatus">
    <v-sheet class="text-center">
      <!--lottery购物车-->
      <div v-if="!showCouponsList">
        <v-container class="pa-0">
          <v-btn
            class="v-size--default"
            icon
            small
            rounded
            text
            color=""
            @click="closeCart"
          >
            <v-icon x-large color="grey lighten-1">
              mdi-chevron-down
            </v-icon>
          </v-btn>
          <p class="text-left px-sm-7 px-4 mt-n2 mb-sm-4 mb-2 text-sm-h6 text-subtitle-1 font-weight-bold">Bet Now</p>
          <v-card class="mx-sm-7 mx-4 mb-5" elevation="0" outlined>
            <v-card-text class="pa-sm-4 pa-2">
              <!--游戏名称、期号、时间-->
              <p class="text-left mb-sm-2 mb-0 mb-sm-1"><strong class="text-sm-h6 text-subtitle-1 font-weight-bold black--text">{{lotteryBetData.GameID===id3D? '3D-Straight':'5/90-Winning-Direct 5'}}</strong></p>
              <div class="d-flex justify-space-between align-center text-sm-subtitle-2 text-caption mb-sm-4 mb-2">
                <span class="text--secondary">NO. {{issue}}</span>
                <!--时间-->
                <div class="black--text font-weight-bold">{{setTime(betTime)}}</div>
              </div>
              <!--<p class="mt-sm-6 mt-sm-3 mb-2 mb-sm-4 text-sm-h6 text-subtitle-1 black&#45;&#45;text text-uppercase">you selected numbers</p>-->
              <!--选择的号码-->
              <div class="d-flex align-center justify-center mb-sm-3 mb-0">
                <v-responsive
                  v-for="(num, index) in lotteryBetData.selectNumData"
                  :key="index"
                  :width="mobileSize"
                  :height="mobileSize"
                  :max-width="mobileSize"
                  :max-height="mobileSize"
                  class="num-border mr-2 rounded-circle primary"
                >
                  <v-responsive
                    width="100%"
                    height="100%"
                    class="rounded-circle white text-center align-center">
                    <span class="primary--text text-sm-h6 text-subtitle-1">{{num}}</span>
                  </v-responsive>
                </v-responsive>
              </div>
            </v-card-text>
          </v-card>
          <!--结算的金额-->
          <ul class="text-sm-subtitle-2 text-caption pl-4 pl-sm-7">
            <li class="d-flex justify-space-between align-center mb-sm-1 mb-0">
              <span class="text--secondary">Total Stake</span>
              <strong class="mr-5">{{parseFloat(lotteryBetData.MoneyPerBet*10).toFixed(2)}}</strong>
            </li>
            <!--优惠券-->
            <li class="d-flex justify-space-between align-center mb-sm-1 mb-0 cursor-pointer" @click="selectCoupon">
              <span class="text--secondary">Coupon</span>
              <div>
                <strong class="primary--text">{{parseFloat(betCoupon.coupon>0?betCoupon.coupon:0).toFixed(2)}}</strong>
                <v-btn icon :small="mobileSize<60" color="grey lighten-1" :disabled="availableCoupon.length===0">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </li>
            <li class="d-flex justify-space-between align-center mb-sm-2 mb-1">
              <span class="text--secondary">Payment</span>
              <strong class="mr-5">{{$t('NGN-SYMBOL')}} {{parseFloat((lotteryBetData.MoneyPerBet*10)-betCoupon.coupon>0?(lotteryBetData.MoneyPerBet*10)-betCoupon.coupon:0).toFixed(2)}}</strong>
            </li>
            <li class="d-flex justify-space-between align-center mb-sm-2 mb-1">
              <span class="text--secondary">Potential win</span>
              <strong class="mr-5">{{$t('NGN-SYMBOL')}} {{parseFloat(lotteryBetData.winMoney*10).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")}}</strong>
            </li>
          </ul>
          <!--确认按钮-->
          <div class="px-4 px-sm-7 pt-sm-5 pt-3 pb-5">
            <v-btn v-if="!loadStatus" class="text-none align-center font-weight-bold"
                   block
                   elevation="0"
                   :large="mobileSize>30"
                   :color="betStatus?'primary':'grey lighten-2'"
                   :disabled="!betStatus"
                   @click="lotteryBet">
                {{betStatus?'Pay':'Wait for next issue'}}
            </v-btn>
            <v-btn v-else class="text-none align-center font-weight-bold"
                   color="primary"
                   block
                   elevation="0"
                   x-large>
              <v-progress-circular
                indeterminate
                color=""
              ></v-progress-circular>
            </v-btn>
          </div>
        </v-container>
      </div>
      <!--优惠券列表-->
      <couponsList v-if="showCouponsList" @closeCoupons="closeCoupons"></couponsList>
      <!--充值提示-->
      <betNoMoney v-if="showTip" @closeTip="closeTip" :showTip="showTip"></betNoMoney>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
  import couponsList from '@/components/sport/betSlip/couponsList'
  import betNoMoney from '@/components/main/ilotLotteryBet/betNoMoney'
  import {mapGetters, mapMutations} from 'vuex'
  import { debounce } from '@/utils'
  import { eventTracking, eventKey } from '@/utils/fireBase'
  export default {
    name: 'ilotLotteryBet',
    components: {
      couponsList,
      betNoMoney
    },
    data() {
      return {
        showCouponsList: false,
        lotteryBetStatus: false,
        selectNumData: ['03', '21', '22', '23', '87'],
        betTime: 0,
        showTip: false, // 投注提示状态
        betStatus: true, // 投注状态
        issue: '',
        loadStatus: false, // loading
        id905: process.env.VUE_APP_905_ID, // 5/90id
        id3D: process.env.VUE_APP_3D_ID, // 3D
      }
    },
    computed: {
      ...mapGetters(['betCoupon', 'availableCoupon', 'lotteryBetData', 'isLogin', 'loginInfo', 'platformName', 'lotteryCarStatus']),
      mobileSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 30
          case 'sm': return 40
          // case 'md': return 500
          // case 'lg': return 600
          // case 'xl': return 800
          default : return 60
        }
      },
    },
    watch: {
      'lotteryBetStatus': {
        handler(newVal) {
          this.SET_LOTTERYCAR(newVal)
        }
      },
    },
    created() {
      this.betTime = this.lotteryBetData.time
      this.issue = this.lotteryBetData.Issue
      this.lotteryBetStatus = this.lotteryCarStatus
      // this.countDown()
      this.gameIssue()
    },
    methods: {
      ...mapMutations(['SET_LOTTERYCAR', 'SET_COUPON', 'COUPON_DATA']),
      closeCart() {
        this.SET_LOTTERYCAR(false)
      },
      // 设置时间格式
      setTime(time) {
        let timeData = ''
        let day = Math.floor(time / (24 * 3600)) // Math.floor()向下取整
        if (day > 0) {
          timeData = day + 'd:'
        }
        let hh = Math.floor((time - day * 24 * 3600) / 3600)
        if (hh > 0) {
          timeData += hh + 'h:'
        }
        let mm = Math.floor((time - day * 24 * 3600 - hh * 3600) / 60)
        timeData += mm + 'm:'
        let ss = time - day * 24 * 3600 - hh * 3600 - mm * 60
        timeData += ss + 's'
        return timeData
      },
      // 倒计时
      countDown() {
        let timeId = setInterval(() => {
          this.betTime -= 1
          if (this.betTime === 0) {
            this.betStatus = false
            let _this = this
            setTimeout(function () {
              _this.gameIssue()
            }, 5000)
            clearInterval(timeId)
          }
        }, 1000)
      },
      // 选择优惠券
      selectCoupon() {
        if (this.availableCoupon && this.availableCoupon.length) {
          this.showCouponsList = true
        }
      },
      // 查询余额 （目前没用）
      async queryBalance(num) {
        let LoginStatus = this.isLogin
        if (!LoginStatus) return
        const res = await this.$api.queryAccountInfo({
        })
        if (res.code === 0 && res.data) {
          if (res.data.balance >= this.lotteryBetData.MoneyPerBet) {
            // this.showTip = true
            this.lotteryBet()
          } else {
            this.showTip = true
          }
        }
      },
      // 投注
      async lotteryBet() {
        console.log(this.lotteryBetData)
        let gameName = '5/90'
        if (this.lotteryBetData.GameID === this.id3D) {
          gameName = '3D'
        }
        let fireObj = {
          payClick: gameName
        }
         // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_HOME_QUICK_LOTTERY, gameName, fireObj)
        let payment = parseFloat(this.lotteryBetData.MoneyPerBet * 10) - this.betCoupon.coupon
        console.log(payment)
        if (this.loginInfo.balance < payment) {
          this.showTip = true
          return
        }
        let multiNum = '10'
        if (this.lotteryBetData.GameID === this.id905) {
          multiNum = '10'
        }
        let payCode = '0'
        if (this.betCoupon.coupon > 0) {
          payCode = '1'
        }
        console.log(this.betCoupon)
        let Format01 = {
          UserID: this.loginInfo.playerCode,
          TimeStamp: new Date().getTime(),
          'Access-Token': this.loginInfo.token,
          GameID: this.lotteryBetData.GameID,
          WagerIssue: this.issue,
          TickSN: parseInt(new Date().getTime() / 1000),
          WagerType: '3',
          WagerMoney: this.lotteryBetData.MoneyPerBet * 100 * multiNum,
          PayMode: payCode, // 是否使用优惠券
          couponHid: this.betCoupon.couponId, // 优惠券编码
          couponCode: this.betCoupon.couponCode // 优惠券券码
        }
        let Format02 = []
        let arr = {
          Num: ''
        }
        arr.BetSN = 1
        arr.PlayTypeID = this.lotteryBetData.PlayType
        arr.WagerMode = '2'
        arr.MultiTimes = multiNum // 倍数
        arr.SubPlayTypeID = '0' // 玩法类型 3D默认为单式 ：0—单式、1—复式、2—胆拖
        if (this.lotteryBetData.GameID === this.id905) {
          arr.NumberType = '1'
          this.lotteryBetData.selectNumData.forEach((val, i) => {
            arr.Num += val + '|'
          })
        } else {
          arr.NumberType = '0'
          this.lotteryBetData.selectNumData.forEach((val, i) => {
            if (i + 1 === this.lotteryBetData.selectNumData.length) {
              arr.Num += val + '|'
            } else {
              arr.Num += val + '|-'
            }
          })
        }
        Format02.push(arr)
        this.loadStatus = true
        const res = await this.$api.gameBet({
          data: { Format01, Format02 }
        })
        this.loadStatus = false
        // if (res.RetCode === '25002') {
        //   this.$common.setMsg('Sorry, your credit is running low', 'error')
        // }
        if (res.RetCode !== '0') {
          this.$common.setMsg(res.ERR_MSG, 'error')
          return
        }
        let orderId = res.Format01.OrderID
        let name = ''
        let couponMoney = 0
        let payMoney = parseFloat(this.lotteryBetData.MoneyPerBet * multiNum).toFixed(2)
        let money = ''
        if (this.lotteryBetData.GameID === this.id905) {
          name = '5/90'
        } else {
          name = '3D'
        }
        if (this.betCoupon.coupon > 0) {
          couponMoney = '-' + this.$t('NGN-SYMBOL') + parseFloat(this.betCoupon.coupon).toFixed(2)
          if (payMoney - this.betCoupon.coupon > 0) {
            money = this.$t('NGN-SYMBOL') + parseFloat(payMoney - this.betCoupon.coupon).toFixed(2)
          } else {
            money = this.$t('NGN-SYMBOL') + 0.00
          }
        } else {
          couponMoney = '0.00'
          money = this.$t('NGN-SYMBOL') + payMoney
        }
        let successArr = [
          {
            name: 'Lottery',
            val: name
          },
          {
            name: 'No.',
            val: this.lotteryBetData.Issue
          },
          {
            name: 'Total Stake',
            val: this.$t('NGN-SYMBOL') + payMoney
          },
          {
            name: 'Coupon',
            val: couponMoney
          },
          {
            name: 'Total',
            val: money
          },
          {
            name: 'Potential Win',
            val: parseFloat(this.lotteryBetData.winMoney * 10).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
          }
        ]
        let obj = {
          gameID: this.lotteryBetData.GameID,
          successArr: successArr,
          orderId,
        }
        this.$emit('successData', true, obj)
      },
      // 获取可用优惠券
      async getCoupon() {
        // 判断是否登录
        let LoginStatus = this.$store.state.isLogin
        if (window.isApp) {
          LoginStatus = window.App.isLogin
        }
        if (!LoginStatus) {
          return false
        }
        let multiNum = '10'
        // if (this.lotteryBetData.GameID === this.id905) {
        //   multiNum = '10'
        // }
        const res = await this.$api.availableCoupon({
          data: {
            details: [{
              betMoney: parseInt(this.lotteryBetData.MoneyPerBet * multiNum),
              playMethod: this.lotteryBetData.PlayType
            }],
            gameType: 0,
            gameId: this.lotteryBetData.GameID,
          }
        })
        if (res.code !== 0) return
        let dataList = res.data.availableCoupons
        if (dataList !== undefined && dataList.length > 0) {
          this.giftNodrop = true
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
      },
      // 获取游戏信息
      gameIssue: debounce(async function () {
        const res = await this.$api.gameIssue({
          data: {
            GameID: this.lotteryBetData.GameID,
            Issue: '-1',
            RecBegin: '0',
            QueryCount: '30',
            PlayType: this.lotteryBetData.PlayType
          }
        })
        if (res.RetCode !== '0') return
        if (res.Format02 && res.Format02.length > 0) {
          let endNum = new Date(this.$common.toMyLocalTime(res.Format02[0].EndSaleTime)).getTime()
          let startTime = new Date(this.$common.toMyLocalTime(res.Format02[0].StartSaleTime)).getTime()
          let startNum = new Date().getTime()
          let time = Math.floor((endNum - startNum) / 1000)
          console.log(startNum - startTime)
          console.log(time)
          if (startNum - startTime >= 0 && time > 0) {
            this.issue = res.Format02[0].Issue
            this.betTime = time
            console.log(this.betTime)
            this.countDown()
            // 查询可用优惠券
            this.getCoupon()
            this.betStatus = true
          } else {
            setTimeout(() => {
              this.gameIssue()
            }, 5000)
          }
        } else {
          setTimeout(() => {
            this.gameIssue()
          }, 5000)
        }
      }),
      // 关闭提示弹窗
      closeTip() {
        this.showTip = false
      },
      // 关闭优惠券列表
      closeCoupons() {
        this.showCouponsList = false
      }
    }
  }
</script>

<style scoped>
.num-border{
  padding: 1px;
}
</style>
