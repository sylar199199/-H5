<template>
  <div class="bet-list" ref="listHeight">
    <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    <!--选项卡-->
    <v-tabs height="40px" center-active centered show-arrows class="mt-sm-2 mt-1 mb-sm-2 mb-1" v-model="ticketType" @change="changeType">
      <v-tab active-class="font-weight-bold" class="text-capitalize">All</v-tab>
      <v-tab active-class="font-weight-bold" class="text-capitalize">Settled</v-tab>
      <v-tab active-class="font-weight-bold" class="text-capitalize">Unsettled</v-tab>
    </v-tabs>
    <!--分割线-->
    <v-divider class="py-1 grey lighten-4"></v-divider>
    <!--订单列表-->
    <v-card
      v-if="ticketList.length>0"
      class="bet-list-list rounded-0 overflow-y-auto"
      elevation="0"
      :max-height="maxHeight"
      @scroll="scrollEvent"
    >
      <v-list-item class="flex-column pa-0 ma-0" v-for="(item, index) in ticketList" :key="index" @click="showDetail(item.ticketId)">
        <ticketListDetail :item="item" v-on="$attrs"></ticketListDetail>
      </v-list-item>
    </v-card>
    <!--load-->
    <div v-if="showLoad" class="d-flex align-center justify-center py-10">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div class="py-10" v-if="ticketList.length===0 && !showLoad">
      <p class="text-center grey--text">NO DATA</p>
    </div>
    <LoadMore @loadMore="loadMore" v-if="calcLoadMoreShow" />
  </div>
</template>

<script>
  import ticketListDetail from '@/components/main/soprtTicket/ticketListDetail'
  import LoadMore from '@/components/pc/load-more'
  import {mapMutations} from 'vuex'
  import { debounce } from '@/utils'
  export default {
    name: 'sportBetList',
    components: {
      ticketListDetail,
      LoadMore
    },
    props: {
      type: {
        type: String,
        default: '1' // 1: 移动端； 2：pc端
      }
    },
    data() {
      return {
        ticketType: 0, // 订单类型
        ticketList: [], // 订单列表
        pageInfo: { // 分页信息
          pageNum: 1
        },
        loadAll: false, // 是否加载完成
        maxHeight: 500, // 列表高度
        lazyShow: false,
        total: '', // 总的订单数
        loadOther: true,
        showLoad: false,
      }
    },
    computed: {
      lazyStatus() {
        return this.lazyShow
      },
      calcLoadMoreShow() {
        return this.type === '2' && !this.loadAll && this.ticketList.length
      }
    },
    created() {
      this.getBetHistory(this.ticketType)
    },
    mounted() {
      this.setHeight()
    },
    methods: {
      ...mapMutations(['DETAIL_TICKET']),
      // 滚动条触发事件
      scrollEvent(e) {
        let scrollHeight = e.srcElement.scrollHeight - 5
        if (parseInt(e.srcElement.scrollTop + e.srcElement.clientHeight) === parseInt(e.srcElement.scrollHeight)) {
          this.loadOther = false
          if (this.ticketList.length < this.total) {
            this.loadMore()
          }
        }
        console.log(this.loadOther)
        console.log(parseInt(e.srcElement.scrollTop + e.srcElement.clientHeight) + '/' + parseInt(scrollHeight))
        if (parseInt(e.srcElement.scrollTop + e.srcElement.clientHeight) === parseInt(scrollHeight) && this.loadOther) {
          if (this.ticketList.length < this.total) {
            this.loadMore()
          }
        }
      },
      // 设置列表的高度
      setHeight() {
        let height = (window.innerHeight > 0) ? window.innerHeight : screen.height
        // let innerHeight = this.$refs.listHeight.offsetHeight
        this.maxHeight = height - 100
      },
      // 切换订单类型
      changeType() {
        this.pageInfo.pageNum = 1
        this.showLoad = true
        this.ticketList = []
        this.getBetHistory(this.ticketType)
      },
      loadMore() {
        this.pageInfo.pageNum += 1
        console.log(this.pageInfo.pageNum)
        this.getBetHistory(this.ticketType)
      },
      // 获取订单列表
      getBetHistory: debounce(async function (num) {
        this.showLoad = true
        let state = {}
        state = {
          p: this.pageInfo.pageNum,
          // bi: 'paid'
        }
        if (num === 0) { // 获取所有
          state.li = ['settlement', 'cancelled']
          state.bi = 'paid'
        } else if (num === 2) { // 获取未开奖
          state.bi = 'paid'
        } else if (num === 1) { // 获取已开奖
          state.li = 'settlement'
        }
        console.log(state)
        // console.log(JSON.stringify(state, { arrayFormat: 'repeat' }))
        const res = await this.$api.sportBetList({
          // message: '查询成功',
          data: state
        })
        this.showLoad = false
        if (this.ticketType !== num) return
        if (res.code !== 0) {
          this.loadAll = true
          return
        }
        // 判断数据是否为空
        if (res.data !== undefined) {
          this.total = res.data.total
          this.loadAll = false
          // 判断列表是否为空
          if (res.data.list.length > 0) {
            this.setTicketData(res.data.list)
          } else {
            this.loadAll = true
          }
        } else {
          this.loadAll = true
        }
      }, 500),
      // 整合获取的数据
      setTicketData(data) {
        data.forEach((val, i) => {
          let ticketStatus = false // true表示订单赢了
          let settledStatus = false // ture表示订单还未出结果
          // 判断订单是否赢了
          if (val.status === 'redeemed' || val.status === 'won') {
            ticketStatus = true
            settledStatus = true
          }
          if (val.status === 'lose') {
            settledStatus = true
          }
          let obj = {
            type: val.type,
            bookingCode: val.bookingCode,
            bonusTotal: val.src.bonusTotal,
            stakeTotal: val.src.stakeTotal,
            senderCurrency: '', // 单位
            ticketId: val.ticketId,
            createTime: val.createTime, // 创建时间
            num: val.totalCombinations,
            status: ticketStatus,
            settled: settledStatus,
            statusLogic: val.statusLogic,
            payoutAmountSrc: val.payoutAmountSrc
          }
          if (val.senderCurrency === 'NGN') {
            obj.senderCurrency = '₦'
          } else {
            obj.senderCurrency = val.senderCurrency
          }
          if (val.type === 'multiple') {
            obj['cashoutStake'] = val.cashoutStake
            obj.num = val.bets[0].totalCombinations
          }
          if (val.type === 'system') {
            obj.num = 0
            val.bets.forEach(num => {
              obj.num += num.totalCombinations
            })
          }
          // 预计奖金
          if (val.pwStakeMaxView !== undefined && val.pwStakeMaxView !== '') {
            val.pwStakeMaxView = (val.pwStakeMaxView).toFixed(2)
            obj['pwStakeMax'] = val.pwStakeMaxView
          }
          if (val.pwStakeMin !== undefined && val.pwStakeMin !== '') {
            val.pwStakeMin = (val.pwStakeMin).toFixed(2)
            obj['pwStakeMin'] = val.pwStakeMin
          }
          // 比赛列表
          let eventArr = [] // 赛事id
          // let returnMoney = 0
          val.selections.forEach((val1, n) => {
            let eventObj = {
              id: val1.eventId.replace('sr:match:', ''),
              eventId: val1.eventId,
              homeName: val1.match.homeName, // 主队的名称
              awayName: val1.match.awayName, // 客队的名称
              eventStatus: val1.match.eventStatus // 比赛类型
            }
            eventArr.push(eventObj)
          })
          eventArr.sort(function (a, b) {
            return a.id - b.id
          })
          let allEvent = [] // 所有不相同的赛事
          for (let z = 0; z < eventArr.length; z++) {
            // allEvent.push(eventArr[z])
            let val = eventArr[z].id
            if (z === 0) {
              allEvent.push(eventArr[z])
            } else {
              let val1 = eventArr[z - 1].id
              // allEvent.push(eventArr[z])
              if (val !== val1) {
                allEvent.push(eventArr[z])
              }
            }
          }
          obj['allEvent'] = allEvent
          this.ticketList.push(obj)
        })
        console.log(this.ticketList)
      },
      // 显示订单详情
      showDetail(id) {
        this.DETAIL_TICKET(id)
        this.$router.push({name: 'ticketDetail'})
      }
    }
  }
</script>

<style lang="less" scoped>
.bet-list{
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 20px;
  .v-list-item::after{
    min-height: 0;
  }
}
/deep/.theme--light.v-tabs .v-tab--active:hover::before, .theme--light.v-tabs .v-tab--active::before{
  opacity: 0;
}
</style>
