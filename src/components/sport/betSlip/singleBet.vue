<template>
  <div class="bet">
    <!--设置每个赔率金额-->
    <div class="stake-container text-sm-subtitle-2 text-caption px-5 mb-sm-5 mb-2 d-flex justify-space-between align-center">
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
            type="number"
            pattern="[0-9]*"
            autocomplete="off"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            oninput="if(value.length>8)value=value.slice(0,8)"
            @focus="changeVal($event,singleMoney)"
            @blur="setVal(singleMoney)"
            @input="setAllmoney"
            :rules="rules"></v-text-field>
          <div class="stake-container-input-btn add" @click="changeSingleMoney(true)" v-if="type === '2'">+</div>
        </div>
      </div>
    </div>
    <div class="total-take d-flex px-5 text-sm-subtitle-2 text-caption justify-space-between align-center">
      <span class="grey--text lighten-1">Total Stake</span>
      <strong>{{parseFloat(totalStake).toFixed(2)}}</strong>
    </div>
    <!--优惠券-->
    <div class="coupon text-sm-subtitle-2 text-caption d-flex pl-5 pr-2 justify-space-between align-center cursor-pointer" @click="selectCoupon">
      <span class="grey--text lighten-1">Coupon</span>
      <div>
        <strong class="primary--text">{{parseFloat(betCoupon.coupon>0&&totalStake>0?betCoupon.coupon:0).toFixed(2)}}</strong>
        <v-btn icon color="grey lighten-1" :disabled="availableCoupon.length===0||totalStake<=0">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="payment text-sm-subtitle-2 text-caption d-flex px-5 mb-2 justify-space-between align-center">
      <span class="grey--text lighten-1">Payment</span>
      <strong>{{parseFloat(totalStake-betCoupon.coupon > 0 ? totalStake-betCoupon.coupon : 0).toFixed(2)}}
        {{$t('NGN')}}</strong>
    </div>
    <!--Total potential win-->
    <div class="total-potential-win text-sm-subtitle-2 text-caption d-flex px-5 mb-4 justify-space-between align-center">
      <span class="grey--text lighten-1">Total potential win</span>
      <strong>
        {{parseFloat(totalPotentialWin).toFixed(2)}}
      </strong>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import { debounce } from '@/utils'

  export default {
    name: 'singleBet',
    props: [
      'betData',
      'singleData',
      'oddChangeState',
      'type',
      'betType'
    ],
    data() {
      return {
        singleMoney: 50,
        changeForBtn: false,
        totalStake: 0, // 总投注金额
        ticketNum: 0, // 订单数量
        minOdds: 0, // 最小赔率
        potentialWin: 0, // 预计奖金
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
    computed: {
      ...mapGetters(['betList', 'loginInfo', 'betCoupon', 'availableCoupon', 'totalPotentialWin']),
    },
    watch: {
      'betData': {
        handler(newValue, oldValue) {
          // console.log(newValue)
          let moneyStatus = false
          if (newValue.length > 0) {
            let eventNum = 0
            newValue.forEach((val, i) => {
              if (val.checked) {
                eventNum++
              }
              if (i > 0 && newValue[0].money !== val.money) {
                moneyStatus = true
              }
            })
            this.ticketNum = eventNum
            if (this.ticketNum === 0) {
              this.totalStake = 0
            }
          }
          // 当赔率数量为0时，金额为0
          if (this.changeForBtn) return
          if (newValue.length === 0 || moneyStatus) {
            this.singleMoney = 0
          } else {
            this.singleMoney = newValue[0].money
          }
        },
        immediate: true,
        deep: true
      },
      'singleData': {
        handler(newValue, oldValue) {
          // 当赔率数量增加或赔率数量为0时，金额为0
          // if (this.changeForBtn) return
          this.totalStake = this.singleData.totalStake
          if (newValue.moneyChange) {
            if (newValue.totalStake / newValue.ticketNum !== this.singleMoney) {
              this.singleMoney = 0
            }
          }
        },
        immediate: true,
        deep: true
      },
      deep: true
    },
    created() {
    },
    mounted() {
      this.totalStake = this.singleData.totalStake
    },
    methods: {
      ...mapMutations(['SET_BETTING', 'SYSTEM_MONEY', 'SET_CARDATA', 'MULTIPLE_MONEY', 'COUPON_LIST', 'SET_COUPON']),
      // 加/减
      changeSingleMoney(bl) {
        this.singleMoney = (this.singleMoney + '').replace(/[^\d]/g, '')
        bl ? this.singleMoney++ : this.singleMoney--
        if (this.singleMoney < 0) {
          this.singleMoney = 0
        } else {
          this.setAllmoney(this.singleMoney)
        }
        this.changeForBtn = true
        this.$nextTick(() => {
          this.changeForBtn = false
        })
      },
      // 设置每个的金额
      setAllmoney: debounce(function (val) {
        val = ('' + val).replace(/[^\d]/g, '')
        val = parseFloat(val)
        this.singleMoney = val || 0
        this.$emit('getData', val, 'single', 'singlemoney')
      }),
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
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/.focus{
    position:absolute;
  }
</style>
