<template>
  <div class="ticket-detail grey lighten-4" style="height: 100%">
    <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    <!--游戏名称&期号等-->
    <div class="ticket-detail-t px-sm-4 px-2 white">
      <div class="ticket-detail-t-info d-flex justify-space-between align-center">
        <div class="ticket-detail-t-info-m">
          <p class="pt-2 pb-sm-2 pb-1 ma-0 font-weight-black">{{ detailData.Format01.GameName }}</p>
          <p class="mb-sm-2 mb-1 text--disabled text-sm-subtitle-2 text--secondary text-caption">NO.
            {{ detailData.Format01.Issue }}</p>
          <p v-if="type === '2'">
            <template v-if="detailData.Format01.Stat==='1'">
              {{ detailData.Format01.DrawTime }}
            </template>
          </p>
        </div>
        <!--订单结果-->
        <div class="ticket-detail-t-info-win font-weight-bold text-sm-h6 text-subtitle-1">
          <template v-if="detailData.Format01.Stat >1">
            <span v-if="detailData.Format01.Stat==='2'">Lost</span>
            <span v-else class="primary--text d-flex align-center">Win<v-icon color="primary">mdi-crown</v-icon></span>
          </template>
        </div>
      </div>
      <v-divider
          class="grey lighten-4"
      ></v-divider>
      <!--开奖时间-->
      <template v-if="type === '1'">
        <p v-if="detailData.Format01.Stat==='1'" class="my-sm-4 my-2 text-sm-subtitle-1 text-body-2">Opening Time:
          {{ detailData.Format01.DrawTime }}</p>
      </template>
      <div class="ticket-detail-t-num">
        <!--开奖号码-->
        <div class="ticket-detail-t-num-p mt-sm-4 mt-2" v-if="detailData.Format01.Stat!=='1'">
          <p class="mb-0 font-weight-black text-sm-subtitle-1 text-subtitle-2">Result Number</p>
          <div class="d-flex align-center">
            <span v-if="detailData.Format01.GameID===id905"
                  class="mr-sm-4 mr-2 font-weight-bold grey--text text-sm-subtitle-2 text-caption">Winning Numbers</span>
            <!--football的开奖结果-->
            <div v-if="detailData.Format01.GameID===idFootball" class="pb-2">
              <v-chip
                  class="mr-sm-1 mr-1 mt-2 px-sm-2 px-1 text-sm-subtitle-1 text-subtitle-2 font-weight-bold"
                  label
                  color="primary"
                  v-for="(num, z) in detailData.Format01.winArr"
                  :key="z"
              >
                {{ num === '1' ? num : num === '2' ? 'X' : num === '4' ? '2' : '*' }}
              </v-chip>
            </div>
            <!--3D/ 5/90的开奖结果-->
            <div v-else class="d-flex align-center">
              <div v-for="(num, n) in detailData.Format01.winArr"
                   class="d-flex flex-column align-center justify-center mr-2 mr-sm-4" :key="n" v-if="n<5">
                <v-avatar class="my-sm-4 my-2" color="primary" :size="mobileSize">
                  <span
                      class="white--text headline font-weight-bold text-sm-subtitle-1 text-subtitle-2">{{
                      Math.abs(num) > 9 ? Math.abs(num) : detailData.Format01.GameID === id905 ? '0' + Math.abs(num) : Math.abs(num)
                    }}</span>
                </v-avatar>
                <p class="mb-2 text-sm-subtitle-2 text-caption grey--text" v-if="detailData.Format01.GameID===id3D">
                  {{ n === 0 ? '1st Digit' : n === 1 ? '2nd Digit' : '3rd Digit' }}</p>
              </div>
            </div>
          </div>
          <div v-if="detailData.Format01.GameID===id905" class="d-flex align-center">
            <span class="mr-sm-4 mr-2 font-weight-bold font-weight-bold grey--text text-sm-subtitle-2 text-caption">Machine Numbers</span>
            <v-avatar class="my-sm-4 my-2 mr-2 mr-sm-4" v-for="(num, n) in detailData.Format01.winArr" v-if="n>4"
                      :key="n" color="primary" :size="mobileSize">
              <span
                  class="white--text headline font-weight-bold text-sm-subtitle-1 text-subtitle-2">{{
                  Math.abs(num) > 9 ? Math.abs(num) : '0' + Math.abs(num)
                }}</span>
            </v-avatar>
          </div>
        </div>
        <v-divider
            class="grey lighten-4"
        ></v-divider>
        <!--金额、状态、时间-->
        <ul class="ticket-detail-t-num-m pa-0 mb-2 text-sm-subtitle-1 text-subtitle-2">
          <li class="mt-sm-2 mt-1 d-flex align-center justify-space-between">
            <span class="text-sm-body-2 text-caption text--secondary">Lines :</span>
            <strong
                class="text-sm-body-2 text-caption font-weight-bold">{{
                (detailData.Format01.TotalBetCount || 0).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
              }}</strong>
          </li>
          <li class="mt-sm-2 mt-1 d-flex align-center justify-space-between">
            <span class="text-sm-body-2 text-caption text--secondary">Total Stake :</span>
            <strong class="text-sm-body-2 text-caption font-weight-bold">{{ $t('NGN-SYMBOL') }}
              {{
                parseFloat(detailData.Format01.WagerMoney / 100).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
              }}</strong>
          </li>
          <li class="mt-sm-2 mt-1 d-flex align-center justify-space-between">
            <span class="text-sm-body-2 text-caption text--secondary">Return :</span>
            <strong
                class="text-sm-body-2 text-caption font-weight-bold">{{
                detailData.Format01.Stat === '3' || detailData.Format01.Stat === '4' ? $t('NGN-SYMBOL') + parseFloat(detailData.Format01.TotalWinPrize / 100).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,') : detailData.Format01.Stat === '2' ? $t('NGN-SYMBOL') + '0.00' : 'Running'
              }}</strong>
          </li>
          <li class="mt-sm-2 mt-1 d-flex align-center justify-space-between">
            <span class="text-sm-body-2 text-caption text--secondary">Bet Time :</span>
            <strong
                class="text-sm-body-2 text-caption font-weight-bold">{{
                $common.toMyLocalTime(detailData.Format01.WagerTime)
              }}</strong>
          </li>
        </ul>
      </div>
    </div>
    <v-divider
        class="grey lighten-4"
    ></v-divider>
    <!--每一单详情-->
    <v-card elevation="0" class="ticket-detail-list px-sm-4 px-2 detail-list rounded-0">
      <v-list-item v-for="(item, index) in detailData.Format02" :key="index" class="d-flex flex-column ma-0 pa-0">
        <div class="odd-detail d-flex align-content-end" style="width: 100%">
          <!--编号-->
          <span
              class="odd-num align-self-start text-sm-subtitle-2 text-body-2 pr-2 pt-2 font-weight-bold primary--text">{{
              index >= 9 ? index + 1 : '0' + (index + 1)
            }}</span>
          <!--右边的信息-->
          <!--football-->
          <footballDetail v-if="detailData.Format01.GameID===idFootball" :item="item"
                          :ticketData="detailData.Format01"></footballDetail>
          <!--其它-->
          <div v-else class="flex-fill flex-column">
            <anotherDetail :item="item" :ticketData="detailData.Format01"></anotherDetail>
          </div>
        </div>
        <v-divider
            class="mt-sm-4 mt-2 grey lighten-4"
            style="width: 100%"
        ></v-divider>
      </v-list-item>
    </v-card>
    <!--订单id-->
    <p class="white grey--text text-right text-caption pa-sm-4 pa-2 ma-0">Ticket ID: {{ orderId }}</p>
    <!--按钮-->
    <div>
      <!--      :class="{'d-flex': showRebuy}"-->
      <v-card elevation="0" color="grey lighten-4" class="pa-4 d-flex align-center justify-center">
        <v-btn outlined color="primary" @click="linkLottery" width="160">One More lotto</v-btn>
      </v-card>
      <!--      <v-card elevation="0" color="grey lighten-4" class="pa-4 d-flex align-center justify-center" v-if="showRebuy">-->
      <!--        <v-btn outlined color="primary" @click="linkRebuy" width="160">Rebuy</v-btn>-->
      <!--      </v-card>-->
    </div>
  </div>
</template>

<script>
import footballDetail from '@/components/main/lotteryHistory/footballDetail'
import anotherDetail from '@/components/main/lotteryHistory/anotherDetail'
import {mapGetters} from 'vuex'
import storage from '@/utils/storage'

export default {
  name: 'ticketDetail',
  components: {
    anotherDetail,
    footballDetail,
  },
  props: {
    type: {
      type: String,
      default: '1', // 1: 移动端； 2：pc端
    },
  },
  data() {
    return {
      showRebuy: false,
      orderId: '',
      detailData: '',
      matchDetail: [],
      id905: process.env.VUE_APP_905_ID, // 5/90id
      id3D: process.env.VUE_APP_3D_ID, // 3D
      idFootball: process.env.VUE_APP_FOOTBALL_ID,
      rebuyData: [],
      rememberChoose: '',
      gametype: '',
      gamerule: '',
    }
  },
  computed: {
    ...mapGetters(['contentData']),
    mobileSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 26
        case 'sm':
          return 36
          // case 'md': return 500
          // case 'lg': return 600
          // case 'xl': return 800
        default :
          return 42
      }
    },
  },
  beforeMount() {
    let params = this.$route.params
    this.orderId = params.orderid
  },
  mounted() {
    this.getBetDetail()
  },
  methods: {
    async getBetDetail() {
      let Format01 = {
        OrderID: this.orderId,
      }
      const res = await this.$api.getBetDetail({
        data: {Format01},
      })
      if (res.RetCode !== '0') {
        this.$common.setMsg('Sorry!', 'error')
        return
      }
      if (res.Format01.GameID === this.idFootball) {
        this.getMatchDetail(res.Format01.Issue)
      }
      this.detailData = res
      let winArr = this.detailData.Format01.WinNum.split('|')
      winArr.pop()
      this.detailData.Format01.winArr = winArr
      if (this.detailData.Format01.GameID === this.id905) {
        this.showRebuy = true
        this.gametype = this.detailData.Format02[this.detailData.Format02.length - 1].PlayTypeID
        this.gamerule = this.detailData.Format02[this.detailData.Format02.length - 1].NumberType
        this.rebuyData = this.detailData.Format02.map(item => {
          return {
            MultiTimes: '1',
            Num: item.Num,
            NumberType: item.NumberType,
            PlayTypeID: item.PlayTypeID,
            SubPlayTypeID: item.SubPlayTypeID,
            WagerMode: item.WagerMode,
            draws: item.BetCount,
            rulename: item.PlayTypeName.split('-')[0],
            typename: item.PlayTypeName.split('-')[1],
          }
        })
      } else if (this.detailData.Format01.GameID === this.id3D) {
        this.showRebuy = true
        let lastData = this.detailData.Format02[this.detailData.Format02.length - 1]
        if (lastData.PlayTypeName.indexOf('Straight') > -1) {
          this.rememberChoose = '1'
        }
        if (lastData.PlayTypeName.indexOf('Classic') > -1) {
          this.rememberChoose = '2'
        }
        if (lastData.PlayTypeName.indexOf('Single') > -1) {
          this.rememberChoose = '3'
        }
        this.rebuyData = this.detailData.Format02.map(item => {
          return {
            draws: item.BetCount,
            Num: item.Num,
            WagerMode: item.WagerMode,
            MultiTimes: '1',
            PlayTypeName: item.PlayTypeName,
            PlayTypeID: item.PlayTypeID,
            SubPlayTypeID: item.SubPlayTypeID,
          }
        })
      }
      this.detailData.Format02.forEach(val => {
        let numArr = val.Num.split('|')
        numArr.pop()
        let threeDNum = []
        let digitNum = 0
        // 设置3D投注数据
        numArr.forEach((num, x) => {
          let obj = {
            numArr1: [],
          }
          if (x === 0) {
            threeDNum[digitNum] = obj
          }
          if (num.toString().indexOf('-') !== -1) {
            digitNum++
            threeDNum[digitNum] = obj
          }
          if (num === '*' || num === '-*') {
            // threeDNum[digitNum].numArr1.push('')
          } else {
            threeDNum[digitNum].numArr1.push(Math.abs(num))
          }
        })
        val.threeNum = threeDNum
        val.retenMoney = 0
        val.result = false // 单个数据结果
        if (this.detailData.Format03.length === 0) {
          val.retenMoney = 0
        } else {
          this.detailData.Format03.forEach(val2 => {
            if (val2.BetSN === val.BetSN) {
              val.retenMoney += val2.WinPrize / 100
              val.result = true
            }
          })
        }
        val.numArr = numArr
      })
    },
    // 获取football比赛详情
    async getMatchDetail(issue) {
      let Format01 = {
        GameID: this.idFootball,
        Issue: issue,
      }
      const res = await this.$api.getLotteryMatchDetail({
        data: {Format01},
      })
      if (res.RetCode !== '0') {
        this.$common.setMsg('Sorry!', 'error')
        return
      }
      if (res.Format02.length > 0) {
        this.setFootballDetail(res.Format02)
      }
    },
    // 设置football获取的数据
    setFootballDetail(data) {
      let num = this.detailData.Format02[0].Num
      let arr = num.split('|')
      arr.pop()
      data.forEach((val, i) => {
        val.ScheduleTime = this.$moment(val.ScheduleTime).format('hh:mm')
        val.MatchID = val.MatchID.replace('sr:match:', '')
        let betName = ''
        let betNum = []
        let mathNum = Math.abs(arr[i]) + ''
        if (mathNum === '3') { // 胜平
          betName = '1 X'
          betNum = ['1', '2']
        } else if (mathNum === '5') { // 胜负
          betName = '1 2'
          betNum = ['1', '4']
        } else if (mathNum === '6') { // 平负
          betName = 'X 2'
          betNum = ['2', '4']
        } else if (mathNum === '7') { // 胜平负
          betName = '1 X 2'
          betNum = ['1', '2', '4']
        } else if (mathNum === '4') { // 负
          betName = '2'
          betNum = mathNum
        } else if (mathNum === '2') { // 平
          betName = 'X'
          betNum = mathNum
        } else if (mathNum === '1') {
          betName = '1'
          betNum = mathNum
        }
        let result = '0' // 1是赢， 0是输
        if (this.detailData.Format01.Stat !== '1') {
          if (betNum.includes(this.detailData.Format01.winArr[i])) {
            result = '1'
          }
          if (this.detailData.Format01.winArr[i] === '7') {
            result = '1'
          }
        }
        this.detailData.Format02[i] = val
        this.detailData.Format02[i].betNum = betNum
        this.detailData.Format02[i].betName = betName
        this.detailData.Format02[i].result = result
      })
      this.$forceUpdate()
    },
    // 跳转到确认订单页面
    linkRebuy() {
      let url = ''
      if (this.detailData.Format01.GameID === this.id905) {
        sessionStorage.setItem('betLists9', JSON.stringify(this.rebuyData))
        let newUrl = this.contentData.url6.replace('c905/', 'c905/905betslip')
        url = newUrl + '?content=' + this.contentData.content6
      } else if (this.detailData.Format01.GameID === this.id3D) {
        sessionStorage.setItem('betLists', JSON.stringify(this.rebuyData))
        let newUrl = this.contentData.url3.replace('3d/', '3d/3Dbetslip')
        url = newUrl + '?content=' + this.contentData.content3
      } else if (this.detailData.Format01.GameID === this.idFootball) {
        url = this.contentData.url13 + '?content=' + this.contentData.content13
      }
      if (this.$store.state.platformName === 'PC') {
        this.$router.push({
          name: 'pcIframe',
          query: {url},
        })
      } else {
        this.$router.push({
          name: 'iframe',
          query: {url},
        })
      }
    },
    // 跳转到lottery选号页面
    linkLottery() {
      let url = ''
      if (this.detailData.Format01.GameID === this.id905) {
        sessionStorage.setItem('oneMore', 'true')
        sessionStorage.setItem('gamerule', this.gamerule)
        sessionStorage.setItem('gametype', this.gametype)
        url = this.contentData.url6 + '?content=' + this.contentData.content6
      } else if (this.detailData.Format01.GameID === this.id3D) {
        sessionStorage.setItem('oneMore', 'true')
        sessionStorage.setItem('rememberChoose', this.rememberChoose)
        url = this.contentData.url3 + '?content=' + this.contentData.content3
      } else if (this.detailData.Format01.GameID === this.idFootball) {
        url = this.contentData.url13 + '?content=' + this.contentData.content13
      }
      if (this.$store.state.platformName === 'PC') {
        this.$router.push({
          name: 'pcIframe',
          query: {url},
        })
      } else {
        this.$router.push({
          name: 'iframe',
          query: {url},
        })
      }
      // window.location.href = url
      // window.open(url, '_blank')
    },
  },
}
</script>

<style lang="less" scoped>
.detail-list .v-list-item::after {
  min-height: auto;
}
</style>
