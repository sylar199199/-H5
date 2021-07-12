<template>
  <div class="sportsBetting overflow-auto">
    <template v-if="type === '1'">
      <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    </template>
    <template v-else>
      <BettingMenuDetailTop :matchObj="matchObj" v-on="$listeners" />
    </template>

    <div class="d-flex justify-space-between px-2 detailHeader">
      <span class="text-caption pt-2">{{matchObj.scheduledTime | timeFormat('DD/MM HH:mm')}}</span>
      <div>
        <CollectionBtn v-model="matchObj" />

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
    <div class="detailListOutBox">
      <BettingMenuDetail :dataArr="dataArr" :sportId="matchObj.sportId"></BettingMenuDetail>
    </div>
  </div>
</template>

<script>
  import BettingMenuDetail from '@/components/sport/bettingMenu/BettingMenuDetail'
  import CollectionBtn from '@/components/func/collection-btn'
  import ClockBtn from '@/components/func/clock-btn'
  import bettingMixins from '../mixins/bettingMixins'
  export default {
    components: {
      BettingMenuDetail,
      CollectionBtn,
      ClockBtn,
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
        eventStatus: 'not_started'
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
.sportsBetting{
  height: calc(100vh - 50px);
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
  .detailListOutBox{
    height: calc(100% - 73px);
  }
  }
</style>
