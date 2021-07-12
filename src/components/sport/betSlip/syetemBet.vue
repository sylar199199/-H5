<template>
  <div>
    <!--设置每个赔率金额-->
    <div class="px-5 mb-5 d-flex justify-space-between align-center">
      <div class="align-self-center text--secondary">Play All</div>
      <!--金额、数量-->
      <div class="d-flex align-center">
        <strong>{{ticketNum}}</strong>
        <span class="px-2">x</span>
        <div class="single-input-width">
          <v-text-field
            outlined
            height="38"
            min-height="38"
            v-model="singleMoney"
            autocomplete="off"
            oninput="if(value.length>8)value=value.slice(0,8)"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            type="number"
            pattern="[0-9]*"
            @focus="changeVal($event,singleMoney)"
            @blur="setVal(singleMoney)"
            @change="setAllMoney"
            :rules="rules"></v-text-field>
        </div>
      </div>
    </div>
    <!--system类型、数量、金额-->
    <!--标题-->
    <div class="d-flex justify-space-between font-weight-bold px-5">
      <p class="type-width text-left">Type</p>
      <p>No.</p>
      <p class="stake-width text-right">Stake(NGN)</p>
    </div>
    <!--每个类型的名字、数量及输入框-->
    <div class="type-num-detail d-flex align-center justify-space-between px-5 mb-4" v-for="(typeItem,n) in typeMoney" :key="n">
      <span class="type-width text-left">{{typeItem.name}}</span>
      <span>{{typeItem.num}}</span>
      <div class="single-input-width">
        <v-text-field
          outlined
          height="38"
          min-height="38"
          v-model="typeItem.money"
          autocomplete="off"
          oninput="if(value.length>8)value=value.slice(0,8)"
          type="number"
          pattern="[0-9]*"
          @focus="changeVal($event,typeItem.money)"
          @blur="setVal(typeItem.money)"
          @change="setSingleMoney"
          @input="typeItem.money=typeItem.money.replace(/\D|^[0]+/g,'')"
          :rules="rules"></v-text-field>
      </div>
    </div>
    <!--分割线-->
    <v-divider class="mb-5 mx-5 grey lighten-3"></v-divider>
    <div class="d-flex px-5 justify-space-between align-center">
      <span class="grey--text lighten-1">Total Stake</span>
      <strong>{{parseFloat(totalMoney).toFixed(2)}}</strong>
    </div>
    <!--优惠券-->
    <div class="d-flex pl-5 pr-2 justify-space-between align-center">
      <span class="grey--text lighten-1">Coupon</span>
      <div>
        <strong class="primary--text">{{parseFloat(betCoupon.coupon).toFixed(2)}}</strong>
        <v-btn icon color="grey lighten-1" :disabled="availableCoupon.length===0" @click="selectCoupon">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="d-flex px-5 mb-2 justify-space-between align-center">
      <span class="grey--text lighten-1">Payment</span>
      <strong>{{parseFloat(totalMoney-betCoupon.coupon>0 ? totalMoney-betCoupon.coupon : 0).toFixed(2)}} {{$t('NGN')}}</strong>
    </div>
    <!--Bonus-->
    <div class="d-flex px-5 justify-space-between align-center" v-if="bonusNum>0">
      <span class="grey--text lighten-1">Max Bonus</span>
      <strong>{{parseFloat(bonusNum).toFixed(2)}}</strong>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'syetemBet',
    props: [
      'betData',
      'matchNum',
      'oddChangeState'
    ],
    data() {
      return {
        ticketNum: 0, // 组合数
        totalMoney: 0, // 投注总金额
        singleMoney: 0, // 单个组合投注金额
        maxOdds: 0, // 最大赔率
        minOdds: 0, // 最小赔率
        potentialMin: 0, // 预计奖金
        potentialMax: 0, // 预计最大奖金
        bonusNum: 0,
        noMoney: false, // 金额是否足够
        overlay: false, // 遮罩层
        typeMoney: [], // system类型、数量、金额
        rules: [
          value => (value || '').length <= 8 || 'Max 8 characters',
          value => {
            const pattern = /^[0-9]*$/
            return pattern.test(value) || 'Only number.'
          },
          // value => (value >= 100 || value === 0) || 'More than 100'
        ]
      }
    },
    watch: {
      'betList': {
        handler(newValue, oldValue) {
          // 当赔率数量增加或赔率数量为0时，金额为0
          console.log(newValue)
          // if ((oldValue !== undefined && newValue.length > oldValue.length) || newValue.length === 0) {
          //   this.singleMoney = 0
          // }
        },
        immediate: true,
        deep: true
      },
      'betData': {
        handler(newValue, oldValue) {
          console.log(newValue)
          if (newValue.length > 0) {
            this.countNum()
            // this.bonus(newValue)
          }
        },
        immediate: true,
        deep: true
      },
    },
    computed: {
      ...mapGetters(['betList', 'loginInfo', 'betCoupon', 'availableCoupon', 'multipleMoney', 'systemMoney']),
    },
    mounted() {
      this.countNum()
    },
    methods: {
      ...mapMutations(['SET_BETTING', 'SYSTEM_MONEY', 'SET_CARDATA', 'MULTIPLE_MONEY', 'COUPON_LIST', 'SET_COUPON', 'COUPON_DATA']),
      // 设置每个类型的金额
      setAllMoney() {
        let pattern = /^[0-9]*$/
        if (!pattern.test(this.singleMoney)) {
          this.singleMoney = 0
        }
        let arr = []
        this.typeMoney.forEach(value => {
          value.money = this.singleMoney
          arr.push(this.singleMoney)
        })
        this.SYSTEM_MONEY(arr)
        this.countNum()
      },
      // 设置单独类型的金额
      setSingleMoney() {
        // 保存multiple金额
        this.MULTIPLE_MONEY(this.singleMoney)
        this.$emit('getData', this.singleMoney, 'single', 'saveData')
        this.bonus('setMoney')
      },
      // 计算组合数
      countNum() {
        if (this.matchNum.length === 0) return
        let oddNum = 0 // 选择的赔率的数量
        this.betData.forEach(item => {
          if (item.checked) {
            oddNum++
          }
        })
        console.log(this.matchNum)
        let oldData = this.typeMoney
        console.log(this.systemMoney)
        this.typeMoney = []
        for (let x = 0; x < this.matchNum.length; x++) {
          let oldMoney = 0
          if (this.systemMoney !== null && this.systemMoney[x] !== null && this.systemMoney[x] !== undefined) {
            oldMoney = parseInt(this.systemMoney[x])
          }
          if (oldData.length > 0 && x < oldData.length) {
            oldMoney = oldData[x].money
          }
          let obj = {
            id: x + 1,
            name: '',
            num: 0,
            money: oldMoney,
          }
          let eventNum = this.matchNum.length // 比赛的数量
          if (oddNum === eventNum) { // 如果赔率数和比赛数量一致计算组合数
            let a = 1
            let b = 1
            let c = 1
            let typeA = x + 1 // 多少个数组合
            if (x + 1 > eventNum) {
              typeA = eventNum
            }
            for (let z = 1; z < eventNum + 1; z++) {
              if (z < typeA + 1) {
                a *= z
              }
              if (z < (eventNum - typeA + 1)) {
                b *= z
              }
              c *= z
            }
            console.log(a + ':' + b + ':' + c)
            obj.num = c / a / b
          }
          if (x === 0) {
            obj.name = 'Single'
            obj.num = oddNum
          } else if (x === 1) {
            obj.name = 'Doubles'
            let c2 = 0
            for (let a1 = 0; a1 < eventNum; a1++) {
              for (let a2 = a1; a2 < eventNum - 1; a2++) {
                c2 += this.matchNum[a1] * this.matchNum[a2 + 1]
              }
            }
            obj.num = c2
          } else if (x === 2) {
            obj.name = 'Trebles'
            let c2 = 0
            for (let a1 = 0; a1 < eventNum; a1++) {
              for (let a2 = 1; a2 < eventNum; a2++) {
                for (let a3 = a1; a3 < eventNum; a3++) {
                  if (a3 + a2 + 1 < eventNum) {
                    // console.log(arr2[a1] + '/' + arr2[a1 + a2] + '/' + arr2[a3 + a2 + 1])
                    c2 += this.matchNum[a1] * this.matchNum[a1 + a2] * this.matchNum[a3 + a2 + 1]
                  }
                }
              }
              console.log(c2)
            }
            obj.num = c2
          } else if (x < 15) {
            obj.name = (x + 1) + ' Folds'
          }
          if (x < 15) {
            this.typeMoney.push(obj)
          }
        }
        let newMoney = []
        console.log(this.typeMoney)
        this.typeMoney.forEach((value, i) => {
          if (i > 0) {
            let n = i - 1
            console.log(this.typeMoney[n])
            if (value.money !== this.typeMoney[n].money) {
              this.singleMoney = 0
            }
          }
          newMoney.push(value.money)
        })
        console.log('1232222222222222222')
        console.log(this.typeMoney)
        this.SYSTEM_MONEY(newMoney)
        this.bonus(this.betData)
      },
      // 预计算
      async bonus(data) {
        let betsData = []
        let selectionsData = []
        let couponCode = ''
        let id = ''
        // 判断是否存在2个不同赛事
        if (data.length <= 1) return
        let next = false
        for (let n = 0; n < data.length - 1; n++) {
          let val = data[n].matchId
          let val1 = data[n + 1].matchId
          if (val !== val1) {
            next = true
          }
        }
        if (!next) return
        console.log(this.typeMoney)
        this.typeMoney.forEach(item => {
          let money = 0
          console.log(item)
          if (parseInt(item.money) !== null && item.money !== undefined && item.money !== '') {
            money = parseInt(item.money)
          }
          let obj = {
            selectedSystems: [item.id],
            // stakeTotal: item.money,
            stakeUnit: money
          }
          betsData.push(obj)
        })
        console.log(this.typeMoney)
        this.hideMultiple = false
        data.forEach(item => {
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
        console.log(selectionsData)
        console.log(selectionsData.length)
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
        let changeType = 'none'
        if (this.oddChangeState) {
          changeType = 'any'
        }
        const res = await this.$api.multipleCreate({
          data: {
            bets: betsData,
            selections: selectionsData,
            coupon: {
              couponCode: couponCode,
              couponHid: id,
            },
            type: 'system',
            oddsChangeType: changeType
          }
        })
        if (res.code !== 0) return
        console.log(res.data)
        res.data.bets.forEach((val, i) => {
          let indexNum = res.data.bets.length - i - 1
          console.log(this.typeMoney)
          if (this.typeMoney[i] !== undefined && this.typeMoney[i] !== null) {
            this.typeMoney[i].num = res.data.bets[indexNum].totalCombinations
          } else {
            let newName = ''
            if (i === 2) {
              newName = 'Trebles'
            } else if (i > 2) {
              newName = (i + 1) + ' Folds'
            }
            this.typeMoney[i] = {
              id: i + 1,
              num: res.data.bets[indexNum].totalCombinations,
              money: 0,
              name: newName
            }
          }
        })
        this.ticketNum = res.data.totalCombinations
        this.totalMoney = res.data.src.stakeTotal
        this.bonusNum = parseFloat(res.data.src.bonusTotal).toFixed(2)
        this.maxOdds = parseFloat(res.data.pwOddsMax).toFixed(2)
        this.minOdds = parseFloat(res.data.pwOddsMin).toFixed(2)
        this.potentialMin = parseFloat(res.data.pwStakeMin).toFixed(2)
        this.potentialMax = parseFloat(res.data.pwStakeMaxView).toFixed(2)
        let obj = {
          totalStake: this.totalMoney,
          minOdds: this.minOdds,
          potentialMin: this.potentialMin,
          potentialMax: this.potentialMax
        }
        this.$emit('getData', obj, 'system', 'couponData')
      },
      // input设置为空
      changeVal(e, val) {
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

<style lang="less" scoped>
.type-width{
  width: 70px;
}
  .stake-width{
    width: 100px;
  }
</style>
