<template>
  <div style="height: 100%;overflow-y: auto;"  v-infinite-scroll="loadMore"
       v-infinite-scroll-disabled="loading"
       v-infinite-scroll-distance="10">
    <v-divider
      class=""
    ></v-divider>
    <!--快速入口-->
    <ilotSportQuickAccess :activityType="'guess'"></ilotSportQuickAccess>
    <!--热门赛事推荐-->
    <ilotFeaturedMatch :iTypeNames="iTypeNames"></ilotFeaturedMatch>
    <!--广告运营-->
    <IlotActivityOperation :iRounded="'rounded'" :iMarign="['mt-sm-4','mt-2','mx-2','mx-sm-4']" :activityType="activityType"></IlotActivityOperation>
    <!--sport导航-->
    <div class="d-flex searchOutBox">
      <div class="searchIconBox">
        <v-icon color="primary" @click="toCollection">mdi-star</v-icon>
      </div>
      <v-divider
        vertical
        class="ml-1 my-3"
      ></v-divider>
      <div class="nav-menu">
        <sportNavMenu :navType="'prematch'" @initPrematch="sportChange"></sportNavMenu>
      </div>
    </div>
    <!--赔率筛选-->
    <oddsFilter @timefilter="timefilter" @countryfilter="countryfilter"></oddsFilter>
    <!--赛事列表-->
    <BettingMenu class="mt-n2" ref="btm" :dataArr="groupArr" :pushDataArr="pushDataArr" :preOrLive="'not_started'"></BettingMenu>
    <!--no more-->
    <p class="py-2 accent text-center text--secondary text-body-2" v-if="!sortTimeQuery && groupArr.length > 0">No more~</p>
  </div>
</template>

<script>
  import BettingMenu from '@/components/sport/bettingMenu/BettingMenu'
  // import homeBanner from '@/components/main/homeBanner'
  import sportNavMenu from '@/components/sport/sportNavMenu'
  import ilotFeaturedMatch from '@/components/sport/ilotFeaturedMatch/ilotFeaturedMatch'
  import oddsFilter from '@/components/sport/oddsFilter'
  import ilotSportQuickAccess from '@/components/sport/ilotSportQuickAccess/ilotSportQuickAccess'
  import IlotActivityOperation from '@/components/common/ilotActivityOperation'
  import Vue from 'vue'
  import scroll from '@/plugs/scroll'
  import mixins from './mixins'
  Vue.use(scroll)
  export default {
    name: 'sports',
    components: {
      // homeBanner,
      sportNavMenu,
      BettingMenu,
      oddsFilter,
      ilotSportQuickAccess,
      ilotFeaturedMatch,
      IlotActivityOperation
    },
    mixins: [mixins],
    computed: {
    },
    watch: {
      // changeData(newValue, oldValue) {
      //   console.log(newValue)
      //   console.log(oldValue)
      // },
      deep: true
    },
    data() {
      return {
        changeData: 111,
        iTypeNames: [ // 热门赛事类型
          {
            name: '1X2',
            type: 'prematch',
            matchType: '1X2'
          },
          {
            name: 'O/U',
            type: 'prematch',
            matchType: 'total'
          },
          {
            name: 'DC',
            type: 'prematch',
            matchType: 'DC'
          },
        ],
        activityType: 'guess', // 广告运营类型
      }
    },
    methods: {
      // 跳转收藏页面
      toCollection() {
        let LoginStatus = this.$store.state.isLogin
        if (window.isApp) {
          LoginStatus = window.App.isLogin
        }
        if (LoginStatus) {
          this.$router.push('/collection')
        } else {
          this.$router.push({name: 'login'})
          // this.$common.setMsg('Please login!', 'warning')
        }
      }
    },
    created() {
    }
  }
</script>

<style lang="less" scoped>
.searchOutBox{
  overflow: hidden;
  position: relative;
  .searchIconBox{
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .v-divider--vertical{
    margin: 12px 0 !important;
  }
}
  .nav-menu{
    position: absolute;
    left: 61px;
    right: 0;
  }
</style>
