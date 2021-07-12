<template>
  <v-card class="pa-8 py-sm-10 align-self-start" min-width="100%" elevation="0">
    <p class="text-h6 text-sm-h5 mb-8 mt-16 mb-sm-13 text-center">{{$t('bookingCode.TITLE')}}</p>
    <v-text-field outlined
                  class="mb-8 mb-sm-13"
                  dense
                  height="40"
                  v-model.trim="codeNum"
                  onkeyup="value=value.replace(/\s+/g,'')"
                  hide-details="auto"></v-text-field>
    <v-btn class="text-capitalize justify-center align-center rounded"
           block
           elevation="0"
           large
           color="primary"
           autocomplete="off"
           @click="bookingCode">
        <strong class="text-h6">{{$t('bookingCode.LOAD')}}</strong>
    </v-btn>
  </v-card>
</template>

<script>
  import {mapMutations} from 'vuex'
  // import { jsBridge } from '@/utils'

  export default {
    name: 'bookingCode',
    data() {
      return {
        codeNum: ''
      }
    },
    created() {

    },
    methods: {
      ...mapMutations(['SET_MSG', 'MULTIPLE_MONEY', 'SYSTEM_MONEY', 'SET_CARDATA', 'BET_TYPE']),
      // bookingCode
      async bookingCode() {
        console.log(this.codeNum)
        if (this.codeNum === '') {
          // 显示弹窗
          let msg = this.$t('bookingCode.BLANK-MSG')
          this.$common.setMsg(msg, 'error')
          return
        }
        const res = await this.$api.bookingCodeInfo({
          data: {
            code: this.codeNum
          }
        })
        if (res.code !== 0) return
        console.log(res.data)
        this.setCartData(res.data)
      },
      // 整合获取到的数据放入购物车中
      setCartData(data, type) {
        let itemData = data.selections
        console.log(itemData)
        let cartNum = 0
        let money = 0
        if (data.type === 'single') { // 如果是single类型的
          cartNum = 0
        } else if (data.type === 'multiple') { // 如果是multiple类型的
          cartNum = 1
          // 设置multiple金额
          money = data.bets[0].stakeUnit
          this.MULTIPLE_MONEY(money)
        } else if (data.type === 'system') { // 如果是system类型的
          cartNum = 2
          // 设置system金额
          let moneyArr = []
          let arr = data.bets
          for (let i = arr.length - 1; i >= 0; i--) {
            moneyArr.push(arr[i].stakeUnit)
          }
          console.log(moneyArr)
          this.SYSTEM_MONEY(moneyArr)
        }
        let newData = []
        itemData.forEach((val, i) => {
          console.log(val)
          let checkState = true
          let name = ''
          if (data.type === 'single') {
            money = data.bets[i].stakeUnit
          }
          val.checked = true
          let newOdd = 0
          let sid = ''
          // 获取最新赔率及判断赔率状态
          for (var a = 0; a < val.market.odds.length; a++) {
            if (val.outcomeId === val.market.odds[a].id) {
              name = val.market.odds[a].name
              sid = val.market.odds[a].sid
              if (val.market.odds[a].odds !== undefined && val.market.odds[a].odds !== null) {
                newOdd = val.market.odds[a].odds
              }
              if (val.market.odds[a].active !== 1) { // 表示赔率不存在
                val.checked = false
                newOdd = 0
              }
              console.log(val.market.odds[a].name)
            }
          }
          // 判断盘口状态
          if (val.market.status) { // 说明赔率存在
          } else {
            val.checked = false
            checkState = false
            newOdd = 0
          }
          // 判断赛事状态
          if (val.match.eventStatus !== 'live' && val.match.eventStatus !== 'not_started') {
            val.checked = false
            checkState = false
            newOdd = 0
          }
          let item = {
            checked: val.checked,
            id: val.market.id,
            marketId: val.market.marketId,
            marketName: val.market.name,
            matchId: val.market.matchId,
            name: name,
            odds: newOdd,
            sid: sid,
            outcomeId: val.outcomeId,
            team: val.match.name,
            team1: val.match.homeName,
            team2: val.match.awayName,
            money: money,
            potentialWin: money * newOdd,
            status: checkState,
            type: data.type
          }
          newData.push(item)
        })
        console.log(newData)
        // this.SET_BETTING({item: {}, flag: 'removeAll'})
        // 保存数据到betList
        this.SET_CARDATA(newData)
        console.log(cartNum)
        this.BET_TYPE(cartNum)
        console.log('重组后的数据')
        console.log(this.betList)
      },
    }
  }
</script>

<style scoped>

</style>
