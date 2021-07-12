<template>
    <div
      class="myHome" style="height: 100%;overflow-y: auto;"
      @scroll="scrollEvent"
    >
      <home-header style="display: block; position: fixed;"/>

      <div style="height: 42px"/>

      <!-- 快捷入口 -->
      <ilotHomeQuickAccess />

      <!--banner-->
      <homeBanner />

      <!-- feature match -->
      <ilotFeaturedMatch />

      <!--lottery快捷投注-->
      <ilotPopularLottery />

      <!-- 首页广告 -->
      <IlotActivityOperation :iRounded="'rounded'" :iMarign="['mx-2','mx-sm-4']"></IlotActivityOperation>

      <!-- hot news -->
      <ILotHotNews
        module-name="Home"
        style="padding-left: 8px;padding-right: 8px;"
      />

      <!--运营广告弹窗-->
      <ilotIndexAd />
      <!--客服-->
      <ilotCustomerService :scrollTop="scrollTop"></ilotCustomerService>
    </div>
</template>

<script>
import HomeHeader from '@/views/myHome/home-header'
// import ilotLottQuickBet from '@/components/hot-news/ilotLottQuickBet'
import ilotFeaturedMatch from '@/components/sport/ilotFeaturedMatch/ilotFeaturedMatch'
import ilotHomeQuickAccess from '@/components/common/ilotHomeQuickAccess/ilotHomeQuickAccess'
import homeBanner from '@/components/main/homeBanner'
import ilotPopularLottery from '@/components/common/ilotPopularLottery/ilotPopularLottery'
import ilotIndexAd from '@/components/common/ilotIndexAd/ilotIndexAd'
import ILotHotNews from '@/components/common/iLotHotNews/ILotHotNews'
import IlotActivityOperation from '@/components/common/ilotActivityOperation'
import ilotCustomerService from '@/components/common/ilotCustomerService'
import Vue from 'vue'
import scroll from '@/plugs/scroll'
import {mapGetters} from 'vuex'
import { eventTracking, eventKey } from '@/utils/fireBase'
Vue.use(scroll)
export default {
  name: 'myHome',
  data() {
    return {
      betStatus: false,
      aDstatus: false,
      scrollTop: '',
    }
  },
  components: {
    HomeHeader,
    // ilotLottQuickBet,
    homeBanner,
    ilotHomeQuickAccess,
    ilotFeaturedMatch,
    ilotPopularLottery,
    ilotIndexAd,
    ILotHotNews,
    IlotActivityOperation,
    ilotCustomerService
  },
  computed: {
    ...mapGetters(['channel']),
  },
  watch: {
  },
  created() {
   // 事件埋点 (事件名称、事件后缀、事件参数)
   eventTracking(eventKey.KEY_HOME_PAGE_VIEW, '', {channelFrom: this.channel})
  },
  mounted() {
  },
  methods: {
    scrollEvent (e) {
      this.scrollTop = e.target.scrollTop
    }
  }
}
</script>


<style lang="less" scoped>
</style>
