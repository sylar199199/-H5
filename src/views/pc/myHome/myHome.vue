<template>
  <div class="my-home">
    <!--banner-->
    <div class="my-home-banner">
      <div class="my-home-banner-bg"></div>
      <Banner class="my-home-banner-main" height="260" moduleCode="header"></Banner>
    </div>

    <v-row class="my-home-main" justify="space-between" dense>
      <v-col class="my-home-main-l">
        <FeaturedMatch class="my-home-main-module" />

        <Lottery class="my-home-main-module" />

        <!-- 横幅 -->
        <IlotActivityOperation class="my-home-main-l-banner my-home-main-module" />

        <!-- hot news -->
        <HotNews moduleName="home" class="my-home-main-l-news my-home-main-module" />

        <!--赛事列表-->
        <Prematch />
      </v-col>
      <v-col class="my-home-main-r">
        <!-- 注册模块 -->
        <CommonRegister class="my-home-main-module" v-if="!isLogin" />

        <!-- 免费下载 -->
        <FreeDown class="my-home-main-module" v-else />

        <!-- 彩票结果 -->
        <LotteryResult class="my-home-main-module" />

        <!-- 大奖得主 -->
        <GrandPrizeWinners />
      </v-col>
    </v-row>

    <!--运营广告弹窗-->
    <ilotIndexAd type="2" />
  </div>
</template>

<script>
import Banner from '@/views/pc/components/banner'
import FeaturedMatch from '@/views/pc/components/feature-match'
import Lottery from '@/components/pc/lottery/lottery'
import IlotActivityOperation from '@/components/common/ilotActivityOperation'
import HotNews from '@/components/pc/hot-news'
import Prematch from './components/prematch'
import LotteryResult from '@/components/pc/lottery-result/lottery-result'
import GrandPrizeWinners from '@/components/pc/grand-prize-winners/grand-prize-winners'
import ilotIndexAd from '@/components/common/ilotIndexAd/ilotIndexAd'
import { mapGetters } from 'vuex'
import { eventTracking, eventKey } from '@/utils/fireBase'
export default {
  name: 'pcHome',
  components: {
    Banner,
    FeaturedMatch,
    Lottery,
    IlotActivityOperation,
    HotNews,
    Prematch,
    FreeDown: () => import('@/components/pc/free-down'),
    CommonRegister: () => import('@/components/pc/common-register'),
    LotteryResult,
    GrandPrizeWinners,
    ilotIndexAd
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'channel', 'platformName'])
  },
  created() {
   // 事件埋点 (事件名称、事件后缀、事件参数)
   eventTracking(eventKey.KEY_HOME_PAGE_VIEW, '', {channelFrom: this.channel})
  },
  mounted() {

  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.my-home{
  &-banner{
    height: 260px;
    position: relative;
    margin-bottom: 10px;
    &-main{
      position: absolute;
      width: 1920px;
      height: 100%;
      left: 0;
      top: 0;
      margin-left: -460px;
      background: #0E2310;
      z-index: 2;
    }
  }
  &-main{
    width: 100%;
    margin: 0;
    &-module{
      margin-bottom: 10px !important;
    }
    &-l{
      flex: 0 0 747px;
      width: 745px;
      padding: 0;
      /deep/ &-banner{
        background: #fff;
        height: 100px !important;
        .v-image {
          height: 100% !important;
          .v-image__image {
            background-size: 100% 100% !important;
          }
        }
      }
      &-news{
        /deep/ .hot-news-top-tab-single.v-tab{
          color: @primary !important;
        }
      }
    }
    &-r{
      flex: 0 0 243px;
      width: 243px;
      padding: 0;
    }
  }

  /deep/ .ilot-ad{
    &-main{
      width: 378px;
      &-card{
        overflow: hidden;
        > .v-responsive{
          height: 462px;
          border: none !important;
          background: none !important;
          &.default{
            .v-responsive__content .v-image .v-image__image{
              background-size: auto auto;
            }
          }
          .v-responsive__content{
            height: 100%;
            .v-image{
              width: 100%;
              height: 100%;
              background: none !important;
              .v-image__image{
                background-size: 100% 100%;
              }
            }
          }
        }
        >div{
          padding: 0 !important;
        }
      }
    }
  }
}
</style>
