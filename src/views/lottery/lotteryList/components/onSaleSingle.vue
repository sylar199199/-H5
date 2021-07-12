<template>
  <div class="on-sales-single">
    <v-card flat class="on-sale-single mb-2 pb-0" @click="getNewData(saleInfo)">
      <div class="on-sale-single-top px-sm-4 px-2 d-flex align-center justify-space-between">
        <div class="on-sale-single-top-l d-flex align-center">
          <!--logo-->
          <v-list-item-avatar
              tile
              :size="mobileSize"
              class="on-sale-single-top-l-avatar rounded-circle mr-0 avatar-border"
          >
            <v-avatar :size="mobileSize" color="primary">
              <img
                  :src="saleInfo.logo"
                  :alt="saleInfo.gameName"
              >
            </v-avatar>
          </v-list-item-avatar>
          <!--名称期号-->
          <div class="on-sale-single-top-l-num d-flex flex-column ml-n4 pb-2 pt-2">
              <span class="text-sm-h6 text-subtitle-2 font-weight-bold pl-6 pr-2" >
                {{saleInfo.detail.GameName}}
              </span>
            <span class="text-sm-subtitle-2 text-caption font-weight-medium text--secondary pl-6 pr-2" >
                NO. {{saleInfo.detail.Issue}}
              </span>
          </div>
        </div>
        <!--时间-->
        <div class="on-sale-single-top-r d-flex text-right flex-column text-caption text-sm-subtitle-1 text--darken-1" v-if="calcOnSale">
          <CountDown :cutKey="saleInfo.detail.Issue" v-model="newTime" @cutOff="cutOff" />
          <span class="text-right font-weight-black">{{setTime(newTime,saleInfo)}}</span>
          <span class="text--secondary">{{saleInfo.detail.ShortWord}}</span>
        </div>
        <template v-else>
          <LotteryTips class="on-sale-single-top-r tips" :lotteryInfo="saleInfo" :loadTimes="loadTimes" @cutOff="cutOff" />
        </template>
      </div>
      <v-divider
          class="ml-2 mr-2 grey lighten-4"
      ></v-divider>
      <div class="on-sale-single-content font-weight-bold mt-2 text-sm-h5 text-h6 font-weight-medium text-center bet-amount" width="100%">{{saleInfo.id !== idFootball ? 'Win:':'Jackpot:'}} ₦{{(saleInfo.detail.PrizePerBet / 100) | fmoney(0)}}</div>
      <v-card-actions class="pt-sm-2 pt-0 on-sale-single-btn flex-wrap justify-center">
        <v-btn
            text
            small
            class="on-sale-single-btn-buy rounded-sm primary--text text-sm-body-1 text-body-2 text-capitalize font-weight-bold pl-12 pr-12"
            :disabled="!calcOnSale"
        >
          Buy Now
          <v-icon small v-if="(!showLoad&&saleInfo.id===gameId)||saleInfo.id!==gameId" light class="ml-2">mdi-arrow-right-circle</v-icon>
          <v-progress-circular
              v-else-if="showLoad&&saleInfo.id===gameId"
              indeterminate
              small
              color="primary"
              class="ml-2"
          ></v-progress-circular>
        </v-btn>
      </v-card-actions>
    </v-card>

    <template v-if="type === '1'">
      <!--活动运营-->
      <IlotActivityOperation v-if="(index + 1) % 2 === 0" :activityType="activityType" :iRounded="'rounded'" :iMarign="['mb-2']"></IlotActivityOperation>
    </template>
  </div>
</template>

<script type="text/javascript">
import LotteryTips from '@/components/common/lottery-tips/lottery-tips'
import IlotActivityOperation from '@/components/common/ilotActivityOperation'
import {mapGetters} from 'vuex'
import { throttle } from '@/utils'
import { eventTracking, eventKey } from '@/utils/fireBase'
export default {
  name: 'onSale',
  components: {
    LotteryTips,
    IlotActivityOperation,
    CountDown: () => import('@/components/func/count-down')
  },
  props: {
    saleInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    type: {
      type: String,
      default: '1' // 1: 移动端； 2：pc端
    },
    index: {
      default: 0
    }
  },
  data() {
    return {
      activityType: 'lottery', // 广告运营类型
      newTime: 0,
      loadTimes: 20, // 数据异常，重试10次
      showLoad: false, // 显示load
      gameId: '',
      idFootball: Number(process.env.VUE_APP_FOOTBALL_ID) // fooball
    }
  },
  created() {
  },
  mounted() {
  },
  deactivated() {
    this.clearCutOffTimer()
  },
  beforeDestory() {
    this.clearCutOffTimer()
  },
  computed: {
    ...mapGetters(['isLogin', 'platformName']),
    mobileSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 40
        case 'sm': return 50
        // case 'md': return 500
        // case 'lg': return 600
        // case 'xl': return 800
        default : return 79
      }
    },
    calcOnSale() {
      return this.saleInfo.detail.Stat === '100' && this.newTime > 0 && this.saleInfo.startSale >= 0
    }
  },
  watch: {
    saleInfo: {
      immediate: true,
      deep: true,
      handler() {
        this.newTime = this.saleInfo.time
        this.loadTimes = 20
      }
    }
  },
  methods: {
    toBuy(item) {
      if (!this.isLogin) {
        this.$router.push('/login')
        return
      }
      let url = item.url + '?content=' + item.content
      console.log(item)
      if (item.content) {
        if (this.$store.state.platformName === 'PC') {
          this.$router.push({name: 'pcIframe', query: {url}})
        } else {
          this.$router.push({name: 'iframe', query: {url}})
        }
      } else {
        this.$emit('loadNewData', item.id)
      }
    },
    // 设置时间格式
    setTime(time, item) {
      if (time < 0) time = 0
      let timeData = ''
      let day = Math.floor(time / (24 * 3600)) // Math.floor()向下取整
      if (day > 0) {
        timeData = day + 'd:'
      }
      let hh = Math.floor((time - day * 24 * 3600) / 3600)
      if (hh > 0) {
        timeData += hh + 'h:'
      }
      let mm = Math.floor((time - day * 24 * 3600 - hh * 3600) / 60)
      timeData += mm + 'm:'
      let ss = time - day * 24 * 3600 - hh * 3600 - mm * 60
      timeData += ss + 's'
      return timeData
    },
    // 获取新数据或跳转页面
    getNewData(data) {
      console.log(data)
      let fireObj = {
        clickOn: data.detail.GameName
      }
       // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_LOTTERY_GAME, data.detail.GameName, fireObj)
      if (!this.calcOnSale) {
        this.getData(data)
      } else {
        this.toBuy(data)
      }
    },
    cutOff() {
      const timeout = 10000 * (21 - this.loadTimes)
      if (this.loadTimes <= 0 || this.cutOffTimer) return
      this.cutOffTimer = setTimeout(() => {
        this.getData()
      }, timeout)
    },
    clearCutOffTimer() {
      this.cutOffTimer && clearTimeout(this.cutOffTimer)
      this.cutOffTimer = null
    },
    getData: throttle(function (data) {
      this.clearCutOffTimer()
      this.gameId = data.id
      this.showLoad = true
      this.$emit('loadNewData', 'lottery', () => {
        this.loadTimes--
        setTimeout(() => {
          this.showLoad = false
        }, 500)
      })
    })
  },
}
</script>

<style lang="less" scoped>
.shared-img {
  height: 20vw;
}
.avatar-border{
  border:2px solid @disable-color;
}
.on-sale-single-top-l{
  flex-shrink: 0;
}
/deep/ .lottery-tips{
  flex-direction: column;
  flex: 0 0 auto !important;
  width: auto !important;

}
</style>
