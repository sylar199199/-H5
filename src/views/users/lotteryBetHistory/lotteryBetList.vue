<template>
  <div class="bet-list" ref="listHeight" style="height: 100%">
    <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    <v-tabs class="bet-list-ball" centered v-model="tabNum">
      <v-tab class="bet-list-ball-single text-sm-subtitle-1 text-subtitle-2 text-capitalize font-weight-bold grey--text" v-for="(item, index) in tabList" :key="index" @change="searchGame(item.gameId)" active-class="font-weight-bold primary--text">
        {{item.name}}
      </v-tab>
    </v-tabs>
    <v-card color="grey lighten-4 rounded-0" class="bet-list-type py-2 second-nav" elevation="0">
      <v-tabs class="bet-list-type-list" centered background-color="grey lighten-4" grow height="30" show-arrows>
        <v-tab v-for="(item, index) in statusList" :key="index" class="bet-list-type-list-single text-sm-subtitle-2 text-caption text-Caption text-capitalize font-weight-medium grey--text" active-class="transparent primary--text font-weight-bold" @click="setStatus(item.id)">
          {{item.name}}
        </v-tab>
      </v-tabs>
    </v-card>
    <!--列表-->
    <!--load-->
    <div v-if="showLoad" class="d-flex align-center justify-center py-10">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <v-card
      v-if="!showLoad"
      class="bet-list-list rounded-0 overflow-y-auto rounded-0 lottery-list"
      elevation="0"
      :max-height="maxHeight"
      @scroll="scrollEvent"
    >
      <v-list-item v-for="(item, index) in ticketList" :key="index" class="bet-list-list-single flex-column ma-0 pa-0">
        <div style="width: 100%" @click="showDetail(item, true)">
          <div class="bet-list-list-single-t d-flex align-center justify-space-between pa-sm-4 pa-2">
            <!--名称、时间-->
            <div class="bet-list-list-single-t-name d-flex align-center">
              <strong class="mr-2 font-weight-black text-sm-subtitle-1 text-subtitle-2">{{item.GameName}}</strong>
              <template v-if="type === '1'">
                <span class="text-sm-body-2 text-xs-body-1 text-caption grey--text">{{$common.toMyLocalTime(item.WagerTime)}}</span>
              </template>
            </div>
            <template v-if="type === '2'">
              <span class="bet-list-list-single-t-time text-sm-body-2 text-xs-body-1 text-caption grey--text">{{$common.toMyLocalTime(item.WagerTime)}}</span>
            </template>
            <!--结果-->
            <div class="bet-list-list-single-t-result d-flex align-center">
              <span class="primary--text text-right font-weight-bold text-sm-subtitle-1 text-subtitle-2" v-if="item.Stat === '3'||item.Stat === '4'">
                Win
                <!--<v-icon color="primary">mdi-crown</v-icon>-->
              </span>
              <span v-else class="font-weight-black text-sm-subtitle-1 text-subtitle-2">{{item.Stat === '2'?'Lost':'Unsettled'}}</span>
              <!--<v-btn icon color="grey" v-if="type === '1'">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>-->
            </div>
          </div>
          <v-divider
            class="mx-sm-4 mx-2 grey lighten-4"
            v-if="type === '1'"
          ></v-divider>
          <!--期号、金额、奖金-->
          <ul class="bet-list-list-single-b px-sm-4 px-2 mt-sm-4 mt-2 text-sm-subtitle-1 text-subtitle-2">
            <li class="bet-list-list-single-b-no text-sm-subtitle-1 text-body-2 mb-sm-2 mb-0">NO. {{item.Issue}}</li>
            <li class="bet-list-list-single-b-price d-flex justify-space-between align-center mb-sm-2 mb-0">
              <span class="grey--text text-sm-subtitle-2 text-caption text--secondary">Total Stake:</span>
              <strong class="text-sm-subtitle-2 text-caption font-weight-bold">{{$t('NGN-SYMBOL')}} {{parseFloat(item.WagerMoney/100).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")}}</strong>
            </li>
            <li class="bet-list-list-single-b-price d-flex justify-space-between align-center mb-sm-2 mb-0">
              <span class="text-sm-subtitle-2 text-caption text--secondary">Return:</span>
              <strong class="text-sm-subtitle-2 text-caption font-weight-bold">{{$t('NGN-SYMBOL')}} {{item.Stat === '3'||item.Stat === '4'?parseFloat(item.TotalWinPrize/100).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,"):'0.00'}}</strong>
            </li>
            <li class="bet-list-list-single-b-btn" v-if="type === '2'">
              <v-btn icon color="grey">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </li>
          </ul>
          <v-divider
            class="py-1 grey lighten-4"
          ></v-divider>
        </div>
      </v-list-item>
      <!--没有数据-->
      <p v-if="ticketList.length === 0 && loadAll" class="text--disabled text-center py-7">NO DATA</p>
    </v-card>

    <LoadMore @loadMore="loadMore" v-if="calcLoadMoreShow" />
  </div>
</template>

<script>
  import LoadMore from '@/components/pc/load-more'
  import { mapGetters } from 'vuex'
  import { debounce } from '@/utils'
  export default {
    name: 'lotteryBetList',
    components: {
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
        tabList: [
          {
            name: '5/90',
            gameId: process.env.VUE_APP_905_ID,
          },
          {
            name: '3D',
            gameId: process.env.VUE_APP_3D_ID,
          },
          {
            name: 'Football14',
            gameId: process.env.VUE_APP_FOOTBALL_ID
          }
        ],
        statusList: [
          {
            name: 'ALL',
            id: '0'
          },
          {
            name: 'Win',
            id: '1'
          },
          {
            name: 'Settled',
            id: '2'
          },
          {
            name: 'Unsettled',
            id: '3'
          },
        ],
        loadAll: false, // 是否加载完成
        ticketStatus: '0',
        maxHeight: 500, // 列表高度
        gameId: process.env.VUE_APP_905_ID,
        ticketList: [],
        recBegin: '0',
        lastOrderID: '', // 获取到的最后一个订单id
        tabNum: 0,
        id905: process.env.VUE_APP_905_ID, // 5/90id
        id3D: process.env.VUE_APP_3D_ID, // 3D
        idFootball: process.env.VUE_APP_FOOTBALL_ID,
        showLoad: false,
      }
    },
    computed: {
      ...mapGetters(['loginInfo']),
      calcLoadMoreShow() {
        return this.type === '2' && !this.loadAll && this.ticketList.length
      }
    },
    created() {
    },
    beforeMount() {
      let params = this.$route.params
      if (!params.gameId) return
      this.gameId = params.gameId
      if (params.gameId === this.id3D) {
        this.tabNum = 1
      } else if (params.gameId === this.idFootball) {
        this.tabNum = 2
      } else {
        this.tabNum = 0
      }
    },
    mounted() {
      this.setHeight()
      this.getBetHistory()
    },
    methods: {
      // 切换订单状态
      setStatus(id) {
        this.showLoad = true
        this.ticketStatus = id
        this.initData()
      },
      // 切换游戏类型
      searchGame(id) {
        this.gameId = id
        this.showLoad = true
        this.initData()
      },
      initData() {
        this.recBegin = '0'
        this.loadAll = false
        this.ticketList = []
        this.getBetHistory()
      },
      // 滚动条触发事件
      scrollEvent(e) {
        let scrollHeight = e.srcElement.scrollHeight - 5
        if (e.srcElement.scrollTop + e.srcElement.clientHeight >= scrollHeight) {
          console.log('调用了')
          this.loadMore()
        }
      },
      // 设置列表的高度
      setHeight() {
        let height = (window.innerHeight > 0) ? window.innerHeight : screen.height
        // let innerHeight = this.$refs.listHeight.offsetHeight
        this.maxHeight = height - 142
      },
      async loadMore() {
        await this.getBetHistory()
      },
      // 获取投注记录
      getBetHistory: debounce(async function () {
        const id = this.gameId
        const status = this.ticketStatus
        let nowDay = this.$moment(new Date()).format('YYYY-MM-DD')
        let Format01 = {
          GameID: this.gameId,
          RecBegin: this.recBegin + '',
          QueryCount: '10',
          DrawStat: this.ticketStatus,
          QueryStartMonth: '2020-05-12',
          QueryEndMonth: nowDay,
          UserID: this.loginInfo.playerCode,
          LastOrderID: this.lastOrderID,
        }
        const res = await this.$api.getBetHistory({
          data: {Format01}
        })
        this.showLoad = false
        if (id !== this.gameId || status !== this.ticketStatus) return
        if (res.RetCode !== '0') {
          this.$common.setMsg('Sorry!', 'error')
          return
        }
        let dataArr = res.Format02 || []
        if (dataArr.length < Format01.QueryCount) {
          this.loadAll = true
        }
        dataArr.forEach(val => {
          let tickInfo = val.WagerInfo.split('|')
          val.info = {
            ticketNum: tickInfo[0]
          }
          val.winMoney = 0
          this.ticketList.push(val)
        })
        if (res.Format02.length > 0) {
          let id = res.Format02[res.Format02.length - 1].OrderID
          console.log(id)
          this.lastOrderID = id
        }
        if (res.Format01.RealCount === '') return
        this.recBegin = parseInt(this.recBegin) + parseInt(res.Format01.RealCount)
      }, 500),
      showDetail(data) {
        let orderId = data.OrderID
        this.$router.push('/lotteryTicketDetail/' + orderId)
      }
    }
  }
</script>

<style lang="less" scoped>
.bet-list{
  padding-bottom: 20px;
}
  .second-nav .v-tab:before{
    background: none;
  }
  /deep/.second-nav .v-tabs-slider-wrapper{
    padding: 0 5%;
  }
  .lottery-list .v-list-item::after{
    min-height: auto;
  }
</style>
