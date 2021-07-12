<template>
  <div ref="detailHeight" class="ticket-detail">
    <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    <v-skeleton-loader
      ref="skeleton"
      type="table-heading, list-item, list-item-three-line"
      class="mx-auto"
      v-if="loadStatus"
    ></v-skeleton-loader>
    <!--顶部-->
    <div v-else class="ticket-detail-t px-4 px-sm-7 pt-sm-4 pt-2 pt-sm-5" ref="topHeight">
      <div class="ticket-detail-t-info">
        <!--类型、时间、按钮-->
        <div class="ticket-detail-t-info-m d-flex justify-space-between">
          <!--类型及数量-->
          <div class="text-sm-subtitle-1 text-subtitle-2 font-weight-medium primary--text mt-1">
            <strong v-if="ticketData.type==='single'">Single </strong>
            <strong v-if="ticketData.type==='multiple'">Multiple </strong>
            <strong v-if="ticketData.type==='system'">Multiple </strong>
            X{{ticketData.num}}
          </div>
          <!--时间-->
          <div class="mt-1 text-sm-subtitle-2 text-caption text--secondary">{{ticketData.createTime | timeFormat('DD/MM HH:mm')}}</div>
          <!--按钮-->
          <v-btn small class="ticket-detail-t-rebet text-capitalize" outlined color="primary" @click="rebetTicket" v-if="!ticketData.settled">Rebet</v-btn>
        </div>
        <!--bookingCode-->
        <BookingCode class="mt-n2" :ticketData="ticketData" />
      </div>
      <!--分割线-->
      <v-divider class="mt-sm-1 mt-0 mt-sm-4 grey lighten-3"></v-divider>
      <ul class="ticket-detail-t-money pa-0 pt-1 text-sm-subtitle-2 text-caption">
        <!--总投注金额-->
        <li class="d-flex justify-space-between mt-sm-2 mt-0">
          <span class="text--secondary">Total Stake:</span>
          <strong>{{ticketData.senderCurrency}}{{parseFloat(ticketData.stakeTotal).toFixed(2)}}</strong>
        </li>
        <!--优惠券-->
        <li class="d-flex justify-space-between mt-sm-2 mt-0">
          <span class="text--secondary">Coupon:</span>
          <strong>{{ticketData.senderCurrency}}{{parseFloat(ticketData.couponAmount).toFixed(2)}}</strong>
        </li>
        <!--实付金额-->
        <li class="d-flex justify-space-between mt-sm-2 mt-0">
          <span class="text--secondary">Payment:</span>
          <strong>{{ticketData.senderCurrency}}{{ticketData.stakeTotal-ticketData.couponAmount>0? parseFloat(ticketData.stakeTotal-ticketData.couponAmount).toFixed(2):0}}</strong>
        </li>
        <!--奖金&预计奖金-->
        <li class="d-flex justify-space-between mt-sm-2 mt-0">
          <span class="text--secondary">{{ticketData.settled?'Return:':'Max Return:'}}</span>
          <!--cancelled-->
          <strong class="text-right" v-if="ticketData.statusLogic==='cancelled'">
            {{ticketData.senderCurrency}}{{ticketData.stakeTotal-ticketData.couponAmount>0? parseFloat(ticketData.stakeTotal-ticketData.couponAmount).toFixed(2):0}}
          </strong>
          <!--未结算的时候-->
          <strong class="text-right" v-else-if="!ticketData.settled">
            {{ticketData.senderCurrency+parseFloat(ticketData.pwStakeMax).toFixed(2)}}
          </strong>
          <!--已结算-->
          <strong v-else>{{ticketData.senderCurrency}}{{parseFloat(ticketData.payoutAmountSrc).toFixed(2)}}</strong>
        </li>
        <!--bonus-->
        <li class="d-flex justify-space-between mt-sm-2 mt-0" v-if="ticketData.type!=='single'">
          <span class="text--secondary">{{ticketData.settled?'Bonus:':'Max Bonus:'}}</span>
          <strong>{{ticketData.senderCurrency}}{{parseFloat(ticketData.bonusTotal).toFixed(2)}}</strong>
        </li>
        <!--cashout按钮-->
        <!--<li class="d-flex align-center flex-row-reverse mt-4" v-if="ticketData.type==='multiple'||ticketData.type==='system'">
          <v-btn class="text-capitalize" color="primary">Cashout {{ticketData.cashoutStake>0?parseFloat(ticketData.cashoutStake).toFixed(2):''}}</v-btn>
          <v-btn
            class="copy-btn mr-3"
            icon
            color=""
            @click="refreshValue"
          >
            <v-icon color="">mdi-refresh</v-icon>
          </v-btn>
        </li>-->
      </ul>
    </div>
    <!--分割线-->
    <v-divider class="pt-2 mt-sm-4 mt-2 grey lighten-4" ref="dividerHeight"></v-divider>
    <!--赔率列表-->
    <v-card
      class="ticket-detail-list rounded-0 overflow-y-auto"
      elevation="0"
      :max-height="maxHeight"
    >
      <v-list-item v-for="(item, key) in ticketData.betList" :key="item.ticketBetId">
        <div class="odd-detail">
          <!--赔率详情-->
          <div class="d-flex pt-3">
            <!--赔率标签-->
            <span class="odd-num mr-4 text-sm-h6 text-subtitle-1 primary--text font-weight-bold">
              {{(key+1)>10?key+1:'0'+(key+1)}}
            </span>
            <!--赔率内容-->
            <div class="odd-detail-content flex-fill text-sm-subtitle-2 text-caption">
              <!--ID、时间、状态-->
              <div class="odd-detail-content-state d-flex justify-space-between align-center mb-sm-2 mb-0">
                <strong>ID:{{item.gameId}}</strong>
                <span class="text--secondary">{{item.time}}</span>
                <!--赔率状态-->
                <strong class="text-sm-h6 text-subtitle-1 font-weight-bold" v-if="item.status===0">Lost</strong>
                <strong v-else-if="item.status===1" class="d-flex">
                  <span class="primary--text text-sm-h6 text-subtitle-1 font-weight-bold">Win</span>
                  <!--<v-icon large color="primary">mdi-crown</v-icon>-->
                </strong>
                <strong class="text-sm-h6 text-subtitle-1 font-weight-bold" v-else-if="item.status===-2">Cancelled</strong>
                <strong class="text-sm-h6 text-subtitle-1 font-weight-bold" v-else-if="item.status===-1">Unsettled</strong>
                <strong class="text-sm-h6 text-subtitle-1 font-weight-bold" v-else-if="item.status===2">Refund</strong>
                <strong class="text-sm-h6 text-subtitle-1 font-weight-bold" v-else-if="item.status===3">Half Win</strong>
                <strong class="text-sm-h6 text-subtitle-1 font-weight-bold" v-else-if="item.status===4">Half Lost</strong>
              </div>
              <div class="odd-detail-content-main">
                <div class="odd-detail-content-main-l">
                  <!--比赛名称-->
                  <div class="d-flex font-weight-medium black--text">
                    <p class="mb-sm-2 mb-0">{{item.homeName}} <span class="text--disabled font-weight-medium">vs</span> {{item.awayName}}</p>
                    <!--未出结果时不展示比分-->
                    <p class="mb-sm-2 mb-0 primary--text ml-4" v-if="item.statue >=0 ">{{item.homeScore}} - {{item.awayScore}}</p>
                  </div>
                  <!--投注类型名称-->
                  <p class="mb-sm-2 mb-0 font-weight-medium black--text">{{item.betName}}</p>
                  <!--赔率、玩法-->
                  <p class="mb-sm-2 mb-0 font-weight-medium black--text">@ {{item.odds}}  market {{item.name}}</p>
                </div>
                <!--single类型投注的金额和return-->
                <ul class="odd-detail-content-main-r pa-0" v-if="ticketData.type==='single'">
                  <!--投注金额-->
                  <li class="d-flex justify-space-between mt-sm-2 mt-0">
                    <span class="text--secondary">Total Stake:</span>
                    <strong>{{ticketData.senderCurrency}}{{parseFloat(item.stakeUnitSrc).toFixed(2)}}</strong>
                  </li>
                  <!--奖金&预计奖金-->
                  <li class="d-flex justify-space-between mt-sm-2 mt-0">
                    <span class="text--secondary">{{item.status >= 0 ? 'Return:' : 'Max Return:'}}</span>
                    <!--cancelled-->
                    <strong class="text-right" v-if="ticketData.statusLogic==='cancelled'">
                      {{ticketData.senderCurrency}}{{parseFloat(item.stakeUnitSrc).toFixed(2)}}
                    </strong>
                    <!--未结算的时候-->
                    <strong v-else class="text-right">{{ticketData.senderCurrency}}{{parseFloat(item.status >= 0 ? item.settlementStake : item.pwStakeMax).toFixed(2)}}
                    </strong>
                  </li>
                  <!--cashout按钮-->
                  <!--<li class="d-flex align-center flex-row-reverse mt-3 mb-1">
                    <v-btn class="text-capitalize" color="primary">Cashout {{item.cashoutStake>0?parseFloat(item.cashoutStake).toFixed(2):''}}</v-btn>
                    <v-btn
                      class="copy-btn mr-3"
                      icon
                      color=""
                      @click="refreshValue"
                    >
                      <v-icon color="">mdi-refresh</v-icon>
                    </v-btn>
                  </li>-->
                </ul>
              </div>
            </div>
          </div>
          <!--分割线-->
          <v-divider class="mt-3 mt-sm-4 grey lighten-4"></v-divider>
        </div>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
  import BookingCode from '@/components/main/soprtTicket/booking-code'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'ticketDetail',
    components: {
      BookingCode
    },
    props: {
      type: {
        type: String,
        default: '1' // 1: 移动端； 2：pc端
      }
    },
    data() {
      return {
        ticketData: {}, // 订单数据
        maxHeight: 500, // 赔率列表最大高度
        loadStatus: true,
      }
    },
    computed: {
      ...mapGetters(['ticketId']),
    },
    created() {
      this.ticketView(this.ticketId)
    },
    mounted() {
      this.setHeight()
    },
    methods: {
      ...mapMutations(['REBET_TICKET']),
      // 设置列表的高度
      setHeight() {
        let height = this.$refs.detailHeight.offsetHeight
        console.log(height)
        let topHeight = this.$refs.topHeight.offsetHeight
        console.log(topHeight)
        console.log(height)
        this.maxHeight = height - topHeight - 26
      },
      // 刷新查询cashout金额
      async refreshValue(val) {
        let obj = {
          id: this.ticketData.ticketId
        }
        console.log(val)
        if (val !== '') {
          obj['bid'] = val
        }
        const res = await this.$api.cashoutValue({
          // message: '查询成功',
          data: obj
        })
        if (res.code !== 0) return
        console.log(res)
        console.log(res.data.value)
        if (this.ticketData.type === 'single') {
          this.ticketData.betList.forEach(val1 => {
            if (val1.betId === val) {
              val1.cashoutStake = res.data.value
            }
          })
        } else {
          this.ticketData.cashoutStake = res.data.value
        }
        this.$forceUpdate()
      },
      // 获取投注单详情
      async ticketView(id) {
        const res = await this.$api.ticketView({
          // message: '查询成功',
          data: {
            id: id
          }
        })
        if (res.code !== 0) return
        console.log(res)
        this.setTicketData(res.data)
      },
      // 整合获取到的数据
      setTicketData(data) {
        let ticketStatus = false
        let settledStatus = false
        if (data.status === 'redeemed' || data.status === 'won') {
          ticketStatus = true
          settledStatus = true
        }
        if (data.status === 'lose') {
          settledStatus = true
        }
        this.ticketData = {
          type: data.type, // 订单类型
          createTime: data.createTime, // 创建时间
          bookingCode: data.bookingCode, // bookingCode
          bonusTotal: data.src.bonusTotal, // bonus
          stakeTotal: data.src.stakeTotal, // 总投注金额
          senderCurrency: data.senderCurrency, // 单位
          ticketId: data.ticketId, // 订单Id
          num: data.totalCombinations, // 订单数量
          status: ticketStatus, // 赔率状态（输赢）
          settled: settledStatus, // 订单状态 （是否有结果）
          statusLogic: data.statusLogic,
          payoutAmountSrc: data.payoutAmountSrc, // 获得的金额
          couponAmount: data.couponAmount, // 优惠券金额
          cashoutStake: 0.00, // 可以cashout的金额
          cashoutLogs: '',
          stakeRemain: 0.00,
          cashoutAmount: 0.00,
        }
        // 单位
        if (data.senderCurrency === 'NGN') {
          this.ticketData.senderCurrency = '₦'
        } else {
          this.ticketData.senderCurrency = data.senderCurrency
        }
        if (data.src.stakeRemain !== null) {
          this.ticketData.stakeRemain = parseFloat(data.src.stakeRemain).toFixed(2)
        }
        if (data.src.cashoutAmount !== null) {
          this.ticketData.cashoutAmount = parseFloat(data.src.cashoutAmount).toFixed(2)
        }
        // 优惠券
        if (data.couponAmount !== undefined && data.couponAmount !== 0) { // 优惠券金额除以100
          data.couponAmount = data.couponAmount / 100
          this.ticketData['couponAmount'] = data.couponAmount
        } else {
          data.couponAmount = 0
          this.ticketData['couponAmount'] = 0
        }
        // return金额
        if (data.pwStakeMaxView !== undefined && data.pwStakeMaxView !== '') {
          data.pwStakeMaxView = (data.pwStakeMaxView).toFixed(2)
          this.ticketData['pwStakeMax'] = data.pwStakeMaxView
        }
        if (data.pwStakeMin !== undefined && data.pwStakeMin !== '') {
          data.pwStakeMin = (data.pwStakeMin).toFixed(2)
          this.ticketData['pwStakeMin'] = data.pwStakeMin
        }
        // 赛事列表
        this.ticketData['betList'] = []
        this.ticketData['ticketCashOut'] = true
        let returnMoney = 0
        data.selections.forEach((val1, n) => {
          console.log(val1.eventId.replace('sr:match:', ''))
          let oddsObj = {
            gameId: val1.eventId.replace('sr:match:', ''),
            homeName: val1.match.homeName, // 主队的名称
            awayName: val1.match.awayName, // 客队的名称
            name: val1.market.name,
            eventStatus: val1.match.eventStatus,
            outcomeResult: val1.outcomeResult,
            awayScore: val1.match.awayScore,
            homeScore: val1.match.homeScore,
            cashout: val1.cashout,
            status: val1.status
          }
          let arr4 = val1.market.odds
          let stakeVal = ''
          if (data.type === 'single') {
            if (data.bets[n].src.stakeRemain !== null) {
              this.ticketData.cashoutAmount += parseFloat(data.bets[n].src.cashoutAmount)
              this.ticketData.stakeRemain += data.bets[n].src.stakeRemain / 10000
            } else {
              this.ticketData.stakeRemain += parseFloat(data.bets[n].src.stakeTotal)
            }
            if (data.bets[n].ticketStatusBiz !== 'paid') {
              oddsObj.cashout = false
            }
            oddsObj['pwStakeMax'] = data.bets[n].pwStakeMaxView
            oddsObj['betId'] = data.bets[n].ticketBetId
            oddsObj['hadcashoutStake'] = data.bets[n].cashoutStake
            stakeVal = data.bets[n].stakeUnitSrc
            oddsObj['settlementStake'] = data.bets[n].src.settlementStake
            oddsObj['pwStakeMaxRemain'] = parseFloat(data.bets[n].src.pwStakeMaxRemain).toFixed(2)
            oddsObj['stakeRemain'] = parseFloat(data.bets[n].src.stakeRemain / 10000).toFixed(2)
            oddsObj['cashoutStake'] = 0.00
            if (data.bets[n].src.pwStakeMaxRemain !== null) {
              returnMoney += parseFloat(oddsObj.pwStakeMaxRemain)
            } else {
              returnMoney += parseFloat(data.bets[n].pwStakeMaxView)
            }
          }
          val1.stakeUnitSrc = stakeVal
          oddsObj['stakeUnitSrc'] = stakeVal
          oddsObj['odds'] = val1.oddsUsedSrc
          oddsObj['time'] = this.$moment(val1.match.scheduledTime).format('DD/MM HH:mm')
          if (!val1.cashout) {
            this.ticketData.ticketCashOut = false
          }
          let name = ''
          for (var a = 0; a < arr4.length; a++) {
            if (val1.oddsId === arr4[a].sid) {
              name = arr4[a].name
              console.log(arr4[a].name)
            }
          }
          oddsObj['betName'] = name
          this.ticketData.betList.push(oddsObj)
        })
        console.log(returnMoney)
        if (data.type === 'single') {
          this.ticketData.pwStakeMax = this.ticketData.pwStakeMin = parseFloat(returnMoney).toFixed(2)
        }
        console.log(this.ticketData)
        // cashout hsitory
        if (data.cashoutLogs !== null && data.cashoutLogs.length > 0) {
          this.ticketData.cashoutLogs = data.cashoutLogs
          this.ticketData.cashoutLogs.forEach(val2 => {
            val2.createTime = this.$moment(val2.createTime).format('DD/MM HH:mm')
            val2.cashoutStake = parseFloat(val2.cashoutValue).toFixed(2)
            val2.betStakeUnitRemain = parseFloat(val2.betStakeUnitRemain / 10000).toFixed(2)
            val2['typeName'] = ''
            if (data.type === 'single') {
              this.ticketData.betList.forEach((val3, n) => {
                if (val3.betId === val2.ticketBetId) {
                  val2.typeName = 'Single ( ' + (n + 1) + ' )'
                }
              })
            } else {
              val2.typeName = 'Syetem'
            }
          })
        }
        this.loadStatus = false
        // 如果订单可以cashout，同时是system直接查询cash out金额
        if (this.ticketData.ticketCashOut && data.type === 'system' && data.cashoutLogs === null) {
          this.refreshValue()
        }
      },
      // rebet
      rebetTicket() {
        let obj = {
          ticketId: this.ticketData.ticketId,
          num: Math.random(),
        }
        this.REBET_TICKET(obj)
        if (this.type === '1') {
          this.$router.push({
            name: 'betSlip',
            params: {
              id: this.ticketData.ticketId,
            }
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .ticket-detail{
    height: 100%;
  }
  .odd-detail{
    width: 100%;
    .odd-num{}
  }
</style>
