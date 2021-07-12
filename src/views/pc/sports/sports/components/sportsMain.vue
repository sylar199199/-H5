<template>
  <div class="sports-main">
    <SportsStatusToolbar :tabNav="tabNav" @checkItem="checkItem"  />

    <SportsNav class="sports-main-nav sports-main-module" :modelValue="modelValue" />

    <v-row class="sports-main-container" justify="space-between">
      <v-col class="sports-main-container-l" v-if="!calcType2">
        <OddsFilter class="sports-main-module" />

        <TimeFilter class="sports-main-module" :timeValue="timeValue" @timefilter="timefilter" />

        <RegionFootballFilter @recommendedChange="recommendedChange" ref="regionFootballFilter" />
      </v-col>
      <v-col class="sports-main-container-c">
        <!-- 推荐国家选择 -->
        <SportsRecommended class="sports-main-container-c-country sports-main-module" @recommendedChange="recommendedChange" ref="sportsRecommend" v-if="modelValue === 'prematch'" />

        <!-- 搜索框 -->
        <SportsSearch
          @search="search"
          v-if="$route.query.type !== 'details' && modelValue !== 'collection'"
        />

        <!-- 赛事列表 -->
        <MatchList
          ref="btm"
          :dataArr="groupArr"
          :pushDataArr="pushDataArr"
          :preOrLive="preOrLive"
          :matchType="matchType"
          :sortTimeQuery="sortTimeQuery"
          type="3"
          @loadMore="loadMore"
          v-show="$route.query.type !== 'details'"/>

        <!-- 赛事详情 -->
        <PrematchDetails :modelValue="modelValue" @back="back" v-if="$route.query.type === 'details'" />
      </v-col>

      <v-col class="sports-main-container-r" v-if="calcType2">
        <!-- 注册模块 -->
        <CommonRegister class="sports-main-module" v-if="!isLogin" />

        <!-- 免费下载 -->
        <FreeDown class="sports-main-module" v-else />

        <!-- 大奖得主 -->
        <GrandPrizeWinners />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import SportsStatusToolbar from './sportsStatusToolbar'
import SportsNav from '@/components/pc/sports/sportsNav'
import OddsFilter from './oddsFilter'
import TimeFilter from './timeFilter'
import RegionFootballFilter from './regionFootballFilter'
import SportsRecommended from '@/components/pc/sports/sportsRecommended'
import SportsSearch from './sportsSearch'
import MatchList from '@/components/pc/sports/matchList'
import PrematchDetails from './prematchDetails'
import sportsMixins from '@/views/sports/sports/sportsMixins'
import mixins from '@/views/sports/sports/mixins'
import { mapGetters } from 'vuex'

export default {
  name: '',
  components: {
    SportsStatusToolbar,
    SportsNav,
    OddsFilter,
    TimeFilter,
    RegionFootballFilter,
    SportsRecommended,
    SportsSearch,
    MatchList,
    PrematchDetails,
    FreeDown: () => import('@/components/pc/free-down'),
    CommonRegister: () => import('@/components/pc/common-register'),
    GrandPrizeWinners: () => import('@/components/pc/grand-prize-winners/grand-prize-winners')
  },
  mixins: [sportsMixins, mixins],
  props: {},
  data() {
    return {
      blInit: false
    }
  },
  created() {
    // this.beforeQueryMatch()
  },
  mounted() {
    this.$set(this.tabNav, '2', {
      type: '3',
      name: 'Collection',
      icon: 'mdi-star-outline',
      text: 'collection'
    })
  },
  computed: {
    ...mapGetters(['isLogin']),
    calcType2() {
      return this.modelValue !== 'prematch' || (this.$route.query.type === 'details' && this.$route.query.status === 'live')
    }
  },
  methods: {
    checkItem(item) {
      this.eventBus.$emit('closeLMT')
      if (this.modelValue === item.text) return
      this.modelValue = item.text
      this.moduleChange(this.modelValue)
    },
    back() {
      if (!this.blInit) {
        this.blInit = true
        return
      }
      if (this.$route.query.type !== 'details') return
      this.$router.replace({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          type: ''
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sports-main{
  &-module{
    margin-bottom: 10px !important;
  }
  &-nav{
    padding: 9px 10px;
  }
  &-container{
    margin: 0 !important;
    justify-content: space-between;
    >.col{
      padding: 0 !important;
      flex: 0 0 auto !important;
    }
    &-l{
      width: 242px;
    }
    &-c{
      width: 747px;
      /deep/ &-country{
        padding: 0 !important;
      }
      /deep/ .betting-menu-group-list-single-info-time-collection{
        display: inline-block;
      }
    }
    &-r{
      width: 242px;
    }
  }
}
</style>
