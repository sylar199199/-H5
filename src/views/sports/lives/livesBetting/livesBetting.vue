<template>
  <div class="livesBetting overflow-auto">
    <template v-if="type === '1'">
      <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    </template>
    <template v-else>
      <BettingMenuDetailTop :matchObj="matchObj" v-on="$listeners" />
    </template>

    <div class="d-flex justify-space-between px-2 detailHeader">
      <span class="text-caption pt-2">{{matchObj.scheduledTime | timeFormat('DD/MM HH:mm')}}</span>
      <div>
        <!--<v-icon middle color="primary" v-if="false">mdi-star</v-icon>-->
        <!--<v-icon middle v-else>mdi-star-outline</v-icon>-->

        <ClockBtn :matchObj="matchObj" :smallFlag="true"/>
      </div>
    </div>
    <div class="detailTeamName d-flex justify-center px-4">
      <div class="nameBox d-flex flex-column justify-center align-end">
        <p class="font-weight-medium teamN mb-0 text-caption">{{matchObj.homeName}}</p>
      </div>
      <span class="px-3 " style="color: #979797; line-height: 40px">VS</span>
      <div class="nameBox d-flex flex-column justify-center">
        <p class="font-weight-medium teamN mb-0 text-caption">{{matchObj.awayName}}</p>
      </div>
    </div>
    <div class="LMTbox px-4 mb-4" :style="{border: '1px solid ' + $vuetify.theme.themes.light.accent }" v-if="matchObj.matchId">
      <LMT :matchId="matchObj.matchId" v-if="lmtFlag"></LMT>
    </div>
    <div class="detailListOutBox">
      <BettingMenuDetail :dataArr="dataArr" :sportId="matchObj.sportId"></BettingMenuDetail>
    </div>
  </div>
</template>

<script>
  import BettingMenuDetail from '@/components/sport/bettingMenu/BettingMenuDetail'
  import ClockBtn from '@/components/func/clock-btn'
  import LMT from '@/components/common/LMT/LMT'
  import bettingMixins from '../../sports/mixins/bettingMixins'
  export default {
    components: {
      BettingMenuDetail,
      ClockBtn,
      LMT,
      BettingMenuDetailTop: () => import('@/components/sport/bettingMenu/BettingMenuDetailTop')
    },
    mixins: [bettingMixins],
    props: {
      type: {
        type: String,
        default: '1' // 1: 移动端； 2：pc端
      }
    },
    data() {
      return {
        eventStatus: 'live'
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .livesBetting{
    height: calc(100vh - 50px);
    /*display: flex;*/
    /*flex-direction: column;*/
    .detailHeader{
      color: #979797;
      line-height: 36px;
    }
    .detailTeamName{
      line-height: 28px;
      height: 40px;
      .nameBox{
        height: 100%;
        width: 40%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .LMTbox{
      min-height: 176px;
    }
    .detailListOutBox{
      flex: 1;
    }
  }
</style>
