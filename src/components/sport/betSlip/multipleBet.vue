<template>
  <div class="bet text-sm-subtitle-2 text-caption ">
    <!--设置每个赔率金额-->
    <div class="stake-container px-5 mb-5 d-flex justify-space-between align-center">
      <div class="grey--text lighten-1">Stake</div>
      <div class="d-flex justify-end align-center">
        <strong class="stake-container-num">{{ticketNum}}</strong>
        <span class="stake-container-x px-2">{{type === '2' ? 'X' : 'x'}}</span>
        <div class="stake-container-input single-input-width">
          <div class="stake-container-input-btn reduce" @click="changeSingleMoney()" v-if="type === '2'">-</div>
          <v-text-field
            id="allMoney"
            outlined
            :width="type === '2' ? '45' : 'auto'"
            :height="type === '2' ? '18' : '24'"
            v-model="singleMoney"
            autocomplete="off"
            type="number"
            pattern="[0-9]*"
            oninput="if(value.length>8)value=value.slice(0,8)"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            @focus="changeVal($event,singleMoney)"
            @blur="setVal(singleMoney)"
            @input="setSingleMoney"
            :rules="rules"></v-text-field>
          <div class="stake-container-input-btn add" @click="changeSingleMoney(true)" v-if="type === '2'">+</div>
        </div>
      </div>
    </div>
    <div class="multiple-odds d-flex px-5 mb-2 justify-space-between align-center">
      <span class="grey--text lighten-1">Multiple Odds</span>
      <strong>{{parseFloat(minOdds).toFixed(2)}} <span v-if="minOdds!==maxOdds">- {{parseFloat(maxOdds).toFixed(2)}}</span></strong>
    </div>
    <div class="total-take d-flex px-5 justify-space-between align-center">
      <span class="grey--text lighten-1">Total Stake</span>
      <strong>{{parseFloat(calcNotZero ? totalMoney : 0).toFixed(2)}}</strong>
    </div>
    <!--优惠券-->
    <div class="coupon d-flex pl-5 pr-2 justify-space-between align-center cursor-pointer" @click="selectCoupon">
      <span class="grey--text lighten-1">Coupon</span>
      <div>
        <strong class="primary--text">{{parseFloat(betCoupon.coupon>0&&totalMoney>0?betCoupon.coupon:0).toFixed(2)}}</strong>
        <v-btn icon color="grey lighten-1" :disabled="availableCoupon.length===0||totalMoney<=0">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="payment d-flex px-5 mb-2 justify-space-between align-center">
      <span class="grey--text lighten-1">Payment</span>
      <strong>{{parseFloat(calcNotZero && totalMoney-betCoupon.coupon > 0 ? totalMoney-betCoupon.coupon : 0).toFixed(2)}} {{$t('NGN')}}</strong>
    </div>
    <!--Bonus-->
    <div class="max-bonus d-flex px-5 justify-space-between align-center" v-if="bonusNum>0">
      <span class="grey--text lighten-1">Max Bonus</span>
      <strong>{{parseFloat(calcNotZero ? bonusNum : 0).toFixed(2)}}</strong>
    </div>
    <!--Total potential win-->
    <div class="total-potential-win d-flex px-5 mb-4 justify-space-between align-center">
      <span class="grey--text lighten-1">Total potential win</span>
      <strong>
        {{parseFloat(calcNotZero ? potentialMax : 0).toFixed(2)}}
      </strong>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import { debounce } from '@/utils'

  export default {
    name: 'multiple',
    props: [
      'betData',
      'matchNum',
      'oddChangeState',
      'type',
      'betType'
    ],
    data() {
      return {
        ticketNum: 0, // 组合数
        totalMoney: 0, // 投注总金额
        singleMoney: 50, // 单个组合投注金额
        maxOdds: 0, // 最大赔率
        minOdds: 0, // 最小赔率
        potentialMin: 0, // 预计奖金
        potentialMax: 0, // 预计最大奖金
        bonusNum: 0,
        rules: [
          // value => (value || '').length <= 8 || 'Max 8 characters',
          value => {
            const pattern = /^[0-9]*$/
            return pattern.test(value) || 'Only number.'
          },
          // value => (value >= 100 || value === 0) || 'More than 100'
        ]
      }
    },
    created() {
      this.singleMoney = this.multipleMoney || 50
    },
    computed: {
      ...mapGetters(['betList', 'loginInfo', 'betCoupon', 'availableCoupon', 'multipleMoney']),
      calcNotZero() {
        return this.singleMoney && this.ticketNum && this.totalMoney
      }
    },
    watch: {
      'betList': {
        handler(newValue, oldValue) {
          // 当赔率数量增加或赔率数量为0时，金额为0
          if ((oldValue !== undefined && newValue.length > oldValue.length) || newValue.length === 0) {
            // this.singleMoney = 0
          }
        },
        immediate: true,
        deep: true
      },
      'betData': {
        immediate: true,
        handler(newValue, oldValue) {
            this.verifBonus()
            // this.$nextTick(() => { // 防止赔率计算异常
            //   this.bonus()
            // })
        },
        // immediate: true,
        deep: true
      },
      // ticketNum() {
      //   this.ticketNum = this.ticketNum || 0
      // },
      // matchNum: {
      //   handler(newValue, oldValue) {
      //     // this.bonus()
      //     this.$nextTick(() => { // 防止赔率计算异常
      //       this.verifBonus()
      //     })
      //   },
      //   immediate: true,
      //   deep: true
      // }
    },
    methods: {
      ...mapMutations(['SET_BETTING', 'SYSTEM_MONEY', 'SET_CARDATA', 'MULTIPLE_MONEY', 'COUPON_LIST', 'SET_COUPON', 'COUPON_DATA']),
      // 加/减
      changeSingleMoney(bl) {
        this.singleMoney = (this.singleMoney + '').replace(/[^\d]/g, '')
        bl ? this.singleMoney++ : this.singleMoney--
        if (this.singleMoney < 0) {
          this.singleMoney = 0
        } else {
          this.setSingleMoney(this.singleMoney)
        }
      },
      setSingleMoney: debounce(function (val) {
        val = ('' + val).replace(/[^\d]/g, '')
        val = parseFloat(val)
        this.singleMoney = val || 0
        // 保存multiple金额
        if (this.singleMoney) {
          this.MULTIPLE_MONEY(this.singleMoney)
        }
        this.$emit('getData', this.singleMoney, 'single', 'saveData')
        this.verifBonus()
      }),
      // 判断是否进行与计算
      verifBonus () {
        let checkData = []
        this.betData.forEach(val => {
          if (val.checked) {
            checkData.push(val)
          }
        })
        let runBonus = false
        for (let n = 0; n < checkData.length - 1; n++) {
          let val = checkData[n].matchId
          let val1 = checkData[n + 1].matchId
          if (val !== val1) {
            runBonus = true
          }
        }
        if (runBonus) {
          this.bonus()
        } else {
          this.ticketNum = 0
          this.maxOdds = 0
          this.minOdds = 0
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
      // 预计算
      async bonus() {
        let betsData = []
        let selectionsData = []
        let systemNum = 1
        if (this.matchNum.length > 1) {
          systemNum = this.matchNum.length
        } else {
          this.ticketNum = 1
        }
        // this.matchNum.forEach(val => {
        //   this.ticketNum *= val
        // })
        console.log(this.multipleMoney)
        if (this.multipleMoney > 0) {
          this.totalMoney = this.multipleMoney * this.ticketNum
        } else if (this.singleMoney > 0) {
          this.MULTIPLE_MONEY(this.singleMoney)
        }
        betsData[0] = {
          selectedSystems: [systemNum],
          stakeTotal: Number(this.totalMoney),
          stakeUnit: Number(this.multipleMoney)
        }
        this.betData.forEach(item => {
          if (item.checked) {
            let obj = {
              odds: Number(item.odds),
              // oddsId: item.sid,
              outcomeId: item.outcomeId,
              marketSeqId: item.id,
            }
            // obj.stakeValue = Number(item.money)
            selectionsData.push(obj)
          }
        })
        // 当选择的赛事数量少于2个时
        if (selectionsData.length < 2) {
          this.ticketNum = 0
          this.maxOdds = this.minOdds = 0
          this.potentialMin = this.potentialMax
          this.totalMoney = 0
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
          return
        }
        const res = await this.$api.multipleCreate({
          data: {
            bets: betsData,
            selections: selectionsData,
            coupon: {
              couponCode: '',
              couponHid: '',
            },
            type: 'multiple',
            oddsChangeType: 'none'
          }
        })
        if (res.code !== 0) return
        this.ticketNum = res.data.totalCombinations
        this.bonusNum = parseFloat(res.data.src.bonusTotal).toFixed(2)
        this.maxOdds = parseFloat(res.data.pwOddsMax).toFixed(2)
        this.minOdds = parseFloat(res.data.pwOddsMin).toFixed(2)
        this.potentialMin = parseFloat(res.data.pwStakeMin).toFixed(2)
        this.potentialMax = parseFloat(res.data.pwStakeMaxView).toFixed(2)
        let maxPayout = parseFloat(res.data.pwStakeMax).toFixed(2)
        this.totalMoney = parseFloat(res.data.src.stakeTotal).toFixed(2)
        // if (type === 'setMoney') {
          console.log(this.totalMoney)
          let obj = {
            totalStake: this.totalMoney,
            minOdds: this.minOdds,
            potentialMin: this.potentialMin,
            potentialMax: this.potentialMax,
            maxPayout: maxPayout,
            singleMoney: this.singleMoney,
            ticketNum: res.data.totalCombinations
          }
          this.$emit('getData', obj, 'multiple', 'couponData')
        // }
      },
      // input设置为空
      changeVal(e, val) {
        if (this.type !== '2') {
          let pannel = document.getElementById('allMoney')
          pannel.scrollIntoView(true)
          pannel.scrollIntoViewIfNeeded()
        }
        if (val === 0) {
          this.singleMoney = ''
        }
      },
      // input值设置为0
      setVal(val) {
        if (val === '') {
          this.singleMoney = 0
        }
      },
      // 选择优惠券
      selectCoupon() {
        this.COUPON_LIST(true)
        // this.$emit('getData', 0, 'single', 'coupon')
      }
    }
  }
</script>

<style scoped>
.potential-win-txt{
  white-space:normal;
  word-break:break-all;
}
</style>
