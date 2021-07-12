<template>
  <div class="lottery">
    <Banner height="200" class="lottery-module" moduleCode="lottery" />

    <v-row class="lottery-main" justify="space-between">
      <v-col class="lottery-main-l">
        <Lottery class="lottery-module" />

        <LotteryOnSale class="lottery-module" />

        <!-- hot news -->
        <HotNews moduleName="lottery" class="lottery-main-l-news lottery-module" />

        <!-- football14列表 -->
        <Football14List />
      </v-col>
      <v-col class="lottery-main-r">
        <!-- 广告栏 -->
        <!-- <Advertisement class="lottery-module" />-->
        <!-- 注册模块 -->
        <CommonRegister class="lottery-module" v-if="!isLogin" />

        <!-- 免费下载 -->
        <FreeDown class="lottery-module" v-else />

        <!-- 彩票结果 -->
        <LotteryResult class="lottery-module" />

        <!-- 大奖得主 -->
        <GrandPrizeWinners />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Banner from '@/views/pc/components/banner'
import Lottery from '@/components/pc/lottery/lottery'
import LotteryOnSale from './components/lottery-on-sale'
import HotNews from '@/components/pc/hot-news'
import Football14List from './components/football14-list'
// import Advertisement from './components/advertisement'
import LotteryResult from '@/components/pc/lottery-result/lottery-result'
import GrandPrizeWinners from '@/components/pc/grand-prize-winners/grand-prize-winners'
import { mapGetters } from 'vuex'
export default {
  name: 'pcLotto',
  components: {
    Banner,
    Lottery,
    LotteryOnSale,
    HotNews,
    Football14List,
    // Advertisement,
    FreeDown: () => import('@/components/pc/free-down'),
    CommonRegister: () => import('@/components/pc/common-register'),
    LotteryResult,
    GrandPrizeWinners
  },
  props: {},
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.lottery{
  &-module{
    margin-bottom: 10px !important;
  }
  &-main{
    margin: 0 !important;
    >.col{
      padding: 0 !important;
      flex: 0 0 auto !important;
    }
    &-l{
      width: 747px;
    }
    &-r{
      width: 243px;
    }
  }
}
</style>
