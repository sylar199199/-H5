<template>
  <div class="football14-list">
    <Football14Top :gameId="gameId" @changeIssue="changeIssue" />

    <div class="titleBox d-flex d-flex justify-space-between grey lighten-4 mt-4 py-1 px-4 text--secondary text-body-2">
      <div class="title-no">No.</div>
      <div class="title-date">Date/ID</div>
      <div class="title-match">Match</div>
      <div class="title-right d-flex d-flex justify-space-between">
        <span>H2H</span>
        <span>Home</span>
        <span>Draw</span>
        <span>Away</span>
      </div>
    </div>
    <div class="px-4">
      <template v-for="(item, index) in gameList">
        <ilot-match :itemObj="item" :num="index + 1" :lastTime="lastTime" :key="index" @ballClick="ballClick"></ilot-match>
      </template>
      <v-row class="football14-list-row">
        <v-col class="football14-list-row-time">
          <IlotTimeIssue :GameID="gameId" />
        </v-col>
        <v-col class="football14-list-row-info" v-if="lastTime > 0">
          <div class="football14-list-row-info-btns d-flex align-center justify-space-between">
            <v-btn
              class="text-capitalize "
              color="primary"
              block
              outlined
              @click="cleanClick"
            >
              <v-icon>mdi-trash-can-outline</v-icon>
              Clear
            </v-btn>
            <v-btn
              class="text-capitalize "
              :disabled="!(gameList && gameList.length)"
              color="primary"
              block
              outlined
              @click="autoClick"
            >
              <v-icon>mdi-refresh</v-icon>
              Auto
            </v-btn>
          </div>
          <!--投注汇总-->
          <ilot-cardsum class="py-2" :gameList="gameList" @changePerStake="changePerStake" ref="cardsum"></ilot-cardsum>
          <!--按钮-->
          <v-btn
            height="40"
            class="text-capitalize"
            block
            elevation="0"
            color="primary"
            @click="bet"
          >
            Pay from my wallet
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <!--成功提示框-->
    <betSuccess v-if="showSuccess" :WagerIssue="issue" :orderId="orderId"  @closeDialog="closeDialog"></betSuccess>
  </div>
</template>
<script>
import Football14Top from './football14-top'
import IlotMatch from './ilot-match'
import IlotCardsum from './ilot-cardsum'
import betSuccess from './betSuccess'
import IlotTimeIssue from './ilot-time-issue'
import { mapGetters } from 'vuex'
export default {
  components: {
    Football14Top,
    IlotMatch,
    IlotCardsum,
    betSuccess,
    IlotTimeIssue
  },
  props: {},
  data() {
    return {
      orderId: '',
      gameId: process.env.VUE_APP_FOOTBALL_ID, // 玩法id
      playTypeId: '1001', // 玩法id
      issue: '',
      showSuccess: false, // 显示投注成功弹窗
      gameList: [],
      SaleGameData: {}, // 可销售游戏列表
      times: 1, // 单注倍数
      timer: '',
      lastTime: 0
    }
  },
  created() {
  },
  mounted() {
    this.checkSaleGame()
  },
  computed: {
    ...mapGetters(['betArr', 'gameIssueData', 'betMoneyObj', 'betCoupon', 'loginInfo'])
  },
  watch: {
    gameIssueData: {
      immediate: true,
      deep: true,
      handler() {
        this.callastTime()
      }
    }
  },
  methods: {
    // 计算 lastTime 停止销售时间-当前时间
    callastTime() {
      try {
        let sec = new Date(this.$common.toMyLocalTime(this.gameIssueData.EndSaleTime)).getTime()
        let now = new Date().getTime()
        this.lastTime = parseInt((sec - now) / 1000)
      } catch (err) {}
    },
    // 可销售游戏
    async checkSaleGame() {
      let data = {
        GameID: this.gameId
      }
      let res = await this.$api.checkSaleGame({ data })
      if (res.RetCode === '0') {
        res.Format02[0].SingleAmount =
            parseInt(res.Format02[0].SingleAmount) / 100
        res.Format02[0].MinMoneyPeTick =
            parseInt(res.Format02[0].MinMoneyPeTick) / 100
        res.Format02[0].MaxMoneyPerTick =
            parseInt(res.Format02[0].MaxMoneyPerTick) / 100
        this.SaleGameData = res.Format02[0]
        this.SaleGameData.TickSN = parseInt(new Date().getTime() / 1000)
        this.SaleGameData.WagerType = '3'
        this.SaleGameData.PromotionType = '0'
        this.SaleGameData.MultiIssue = '1'
      }
    },
    changeIssue(issue) {
      this.issue = issue
      this.getGuessingMsg(issue)
    },
    // 获取赛事信息
    async getGuessingMsg(issue) {
      let data = {
        // GameID: storage.get('Content').GameID,
        GameID: this.gameId,
        // Issue: this.gameIssueData.Issue
        Issue: issue
      }
      let res = await this.$api.guessingMsg({ data })
      if (res.RetCode !== '0') return
      this.gameList = res.Format02 || []
    },
    // 点击胜平负选项触发事件
    ballClick() {
      this.$refs.cardsum.calTotalDraws(this.betArr)
    },
    // 关闭投注成功提示弹窗
    closeDialog() {
      this.showSuccess = false
    },
    changePerStake(value) {
      this.times = value
    },
    // 清空
    cleanClick() {
      this.$store.commit('SET_BETARR', [])
      this.ballClick()
    },
    // 自动配置
    autoClick() {
      let arr = []
      this.gameList.map((item, index) => {
        let n = Math.floor(Math.random() * 3)
        arr[index] = [n]
      })
      this.$store.commit('SET_BETARR', arr)
      this.ballClick()
    },
    // 投注数据转换  [0, 1, 2]=7 [0]=1 ...
    arrToNum(arr) {
      if (arr.length === 3) {
        return '7'
      } else if (arr.length === 2) {
        if (arr.includes(0) && arr.includes(1)) {
          return '3'
        } else if (arr.includes(0) && arr.includes(2)) {
          return '5'
        } else if (arr.includes(1) && arr.includes(2)) {
          return '6'
        }
      } else if (arr.length === 1) {
        if (arr.includes(0)) {
          return '1'
        } else if (arr.includes(1)) {
          return '2'
        } else if (arr.includes(2)) {
          return '4'
        }
      }
    },
    // 投注下单
    async bet() {
      let betArr = JSON.parse(JSON.stringify(this.betArr))
      let numArr = []
      let leng = 0
      let times = 0
      betArr.forEach((item) => {
        numArr.push(this.arrToNum(item))
        if (item.length > 0) {
          times += item.length
          leng++
        }
      })
      // 不够14位
      if (leng < 14) {
        let obj = {
          msg: 'Please finish choose',
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return
      }
      let payCode = '0'
      if (this.betCoupon.coupon > 0) {
        payCode = '1'
      }
      let nowTime = new Date().getTime()
      let StartSaleTime = new Date(this.$common.toMyLocalTime(this.gameIssueData.StartSaleTime)).getTime()
      let EndSaleTime = new Date(this.$common.toMyLocalTime(this.gameIssueData.EndSaleTime)).getTime()
      // 没有到开售时间
      if (nowTime < StartSaleTime) {
        let obj = {
          msg: `Start sale at  ${this.$common.toMyLocalTime(this.gameIssueData.StartSaleTime)}`,
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return
      }
      // 过了开售时间
      if (nowTime > EndSaleTime) {
        let obj = {
          msg: `End sale at  ${this.$common.toMyLocalTime(this.gameIssueData.EndSaleTime)}`,
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return
      }
      // 单票最小金额
      if (this.betMoneyObj.totalStake < this.SaleGameData.MinMoneyPeTick) {
        let obj = {
          msg: `Please bet more than the minimum amount of ${this.SaleGameData.MinMoneyPeTick}`,
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return
      }
      // 单票最大金额
      if (this.betMoneyObj.totalStake > this.SaleGameData.MaxMoneyPerTick) {
        let obj = {
          msg: `Please bet less than the maximum amount of ${this.SaleGameData.MaxMoneyPerTick}`,
          msgType: 'warning',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
        return
      }
      let data = {
        Format01: {
          UserID: this.loginInfo.playerCode,
          TimeStamp: new Date().getTime(),
          'Access-Token': this.loginInfo.token,
          GameID: this.gameId,
          WagerIssue: this.gameIssueData.Issue,
          TickSN: parseInt(new Date().getTime() / 1000),
          WagerType: this.SaleGameData.WagerType,
          PromotionType: this.SaleGameData.PromotionType,
          WagerMoney: this.betMoneyObj.totalStake + '00',
          MultiIssue: '1',
          PayMode: payCode, // 是否使用优惠券
          couponHid: this.betCoupon.couponId, // 优惠券编码
          couponCode: this.betCoupon.couponCode // 优惠券券码
        },
        Format02: [{
          BetSN: 1,
          Num: numArr.join('|') + '|',
          MultiTimes: this.times + '',
          WagerMode: 1,
          PlayTypeID: this.playTypeId,
          SubPlayTypeID: times === 14 ? '0' : '1'
        }]
      }
      let res = await this.$api.gameBet({
        userId: this.loginInfo.playerCode,
        data
      })
      if (res.RetCode === '0') {
        this.orderId = res.Format01.OrderID
        // 显示投注成功弹窗
        this.showSuccess = true
        this.$nextTick(() => {
          this.cleanClick()
          // 设置投注成功的期号
          this.$store.commit('SET_WAGERISSUE', res.Format01.WagerIssue)

          this.$store.dispatch('backToOtherPage') // 判断是否返回其它页面
        })
      } else {
        let obj = {
          msg: res.ERR_MSG,
          msgType: 'error',
          status: true,
          num: Math.random(),
        }
        this.$store.commit('SET_MSG', obj)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.football14-list{
  background: #fff;
  .titleBox{
    height: 36px;
    margin: 0 10px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    *{
      line-height: 36px;
      font-size: 14px !important;
    }
    .title-no{
      width: 40px;
      text-align: center;
      margin-left: -10px;
    }
    .title-date{
      width: 115px;
      box-sizing: border-box;
      padding-left: 10px;
    }
    .title-match{
      flex-grow: 1;
      padding-left: 10px;
    }
    .title-right{
      width: 363px;
      margin-right: -10px;
      span{
        display: inline-block;
        width: 100px !important;
        text-align: center;
        &:nth-child(1) {
          width: 48px !important;
          flex-shrink: 0;
        }
      }
    }
  }
  > .px-4{
    padding: 0 10px !important;
  }
  &-row{
    margin: 0 !important;
    padding: 20px 0 !important;
    > .col{
      margin: 0 !important;
      padding: 0 !important;
    }
    &-time{
      flex-grow: 1;

    }
    &-info{
      width: 333px;
      flex: 0 0 auto;
      &-btns{
        /deep/ .v-btn{
          width: 160px;
          flex: 0 0 auto !important;
          min-width: auto !important;
        }
      }
      > .v-btn{
        width: 100%;
        margin: 0 !important;
      }
    }
  }
}
</style>
