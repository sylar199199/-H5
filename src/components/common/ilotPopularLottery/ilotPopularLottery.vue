<template>
  <v-card class="popular-lottery" :class="[iMarign,iPadding]" elevation="0">
    <div class="d-flex align-center overflow-x-auto">
      <v-img class="" width="5.5%" :max-width="mobileSize" src="~@/assets/img/lottery.png" v-if="type === '1'"></v-img>
      <template v-else>
        <v-img class="popular-lottery-img" width="81" height="29" src="~@/assets/img/components/pc/lottery-sale/icon_lottery.png" v-if="$route.name === 'pcHome'"></v-img>
        <v-img class="popular-lottery-img" width="161" height="29" src="~@/assets/img/components/pc/lottery-sale/icon_lottery_quick.png" v-else></v-img>
      </template>
      <!--tab切换-->
      <div class="d-inline-block match-tab" v-if="type !== '2'">
        <v-tabs height="40">
          <v-tab style="min-width: auto" active-class="font-weight-bold" v-for="(item, index) in iTypeNames" @click="selectType(item)" :key="index" class="text-capitalize text-sm-h6 text-subtitle-1 mx-0 mx-sm-4">{{item.name}}</v-tab>
        </v-tabs>
      </div>
    </div>

    <div class="popular-lottery-main" v-if="!noDataStatus">
      <template v-for="(item, index) in iTypeNames">
        <selectNum
          :key="lotteryData[item.PlayType].Issue + '_' + index"
          :gameData="item"
          :lotteryData="lotteryData[item.PlayType]"
          :type="type"
          @timeStatus='timeStatus'
          v-if="lotteryData[item.PlayType] && (type === '2' || gameData.PlayType === item.PlayType) && lotteryData[item.PlayType].id"
        />
      </template>
    </div>

    <!--noData-->
    <v-card v-if="noDataStatus && type !== '2'" elevation="0" outlined class="mt-sm-4 mt-2">
      <p class="pa-7 text-center text-h6 text--disabled">NO DATA</p>
    </v-card>

    <IlotLotteryBetMain v-if="isActivated" />
  </v-card>
</template>

<script>
  import selectNum from '@/components/common/ilotPopularLottery/selectNum'
  import {mapGetters} from 'vuex'
  import { eventTracking, eventKey } from '@/utils/fireBase'
  export default {
    name: 'ilotPopularLottery',
    components: {
      selectNum,
      IlotLotteryBetMain: () => import('@/components/main/ilotLotteryBet/ilotLotteryBetMain')
    },
    props: {
      type: {
        type: String,
        default: '1' // 1: 移动端； 2：pc端
      },
      iMarign: {
        type: Array,
        default: function () {
          return ['ma-sm-4 ma-2', 'mt-0']
        }
      },
      iPadding: {
        type: Array,
        default: function () {
          return ['pa-0']
        }
      }
    },
    data() {
      return {
        isActivated: true, // 组件是否处于actived
        iTypeNames: [
          {
            name: '5/90',
            type: 'select5',
            id: process.env.VUE_APP_905_ID,
            PlayType: '1005',
          },
          {
            name: '3D',
            type: '3d',
            id: process.env.VUE_APP_3D_ID,
            PlayType: '2000',
          },
        ],
        gameData: {
          name: '5/90',
          id: process.env.VUE_APP_905_ID,
          PlayType: '1005',
        },
        lotteryData: {
          '1005': {}
        },
        noDataStatus: false,
      }
    },
    mounted() {
      this.gameIssue(this.gameData)
      if (this.type === '2') {
        this.gameIssue(this.iTypeNames[1])
      }
    },
    activated() {
      this.isActivated = true
    },
    deactivated() {
      this.isActivated = false
    },
    computed: {
      ...mapGetters(['platformName']),
      mobileSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 68
          case 'sm': return 90
            // case 'md': return 500
            // case 'lg': return 600
            // case 'xl': return 800
          default : return 136
        }
      }
    },
    methods: {
      // 切换类型
      selectType(item) {
        let obj = {
          switchTab: item.name
        }
         // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_HOME_QUICK_LOTTERY, item.name, obj)
        // window._czc.push(['_trackEvent', this.platformName + '-quicklottery', item.name])
        this.gameData.name = item.name
        this.gameData.id = item.id
        this.gameData.PlayType = item.PlayType
        this.gameIssue(item)
      },
      // 设置游戏数据
      setLotteryData(data, typeInfo) {
        let titName = 'Win'
        if (data.GameID === process.env.VUE_APP_905_ID) {
          titName = 'Win'
        } else if (data.GameID === process.env.VUE_APP_3D_ID) {
          // titName = 'Winning rate'
        }
        let end = this.$moment(this.$common.toMyLocalTime(data.EndSaleTime, true)).valueOf()
        let start = parseInt(new Date().getTime())
        let startSale = this.$moment(this.$common.toMyLocalTime(data.StartSaleTime)).valueOf()
        let startTime = Math.floor((start - startSale) / 1000)
        let time = Math.floor((end - start) / 1000)
        this.$set(this.lotteryData, typeInfo.PlayType, {
          name: typeInfo.name,
          title: titName,
          id: data.GameID,
          PlayType: typeInfo.PlayType,
          time: time,
          end: end,
          Issue: data.Issue,
          MoneyPerBet: data.MoneyPerBet,
          WinRate: data.WinRate,
          MaxWinMoney: data.MaxWinMoney,
          IssueStat: data.IssueStat,
          startTime: startTime,
          startSale: startSale
        })
      },
      // 获取游戏信息
      async gameIssue(item) {
        let data = {
          GameID: item.id,
          Issue: '-1',
          RecBegin: '0',
          QueryCount: '30',
          PlayType: item.PlayType,
          FrontSN: parseInt(new Date().getTime() / 1000)
        }
        const res = await this.$api.gameIssue({data})
        if (res && res.RetCode !== '0') return
        if (res.Format02 && res.Format02.length > 0) {
          this.noDataStatus = false
          this.setLotteryData(res.Format02[0], item)
        } else if (res.Format02 && res.Format02.length === 0) {
          this.noDataStatus = true
        }
      },
      // 时间停止时查询新的数据
      async timeStatus(gameData, fn) {
        try {
          await this.gameIssue(gameData)
        } finally {
          fn && fn()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/.theme--light.v-tabs .v-tab--active:hover::before, .theme--light.v-tabs .v-tab--active::before{
    opacity: 0;
  }
</style>
