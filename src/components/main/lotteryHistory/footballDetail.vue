<template>
  <div class="football-detail flex-fill flex-column">
    <!--时间、id、状态-->
    <div class="football-detail-main d-flex justify-space-between align-center pt-2 ma-0 text-sm-subtitle-1 text-caption grey--text">
      <div class="football-detail-main-info">
        <span class="mr-4">{{item.ScheduleTime}}</span>
        <span>ID:{{item.MatchID}}</span>
      </div>
      <!--结果-->
      <v-icon v-if="ticketData.Stat > 1" :color="item.result==='0'?'error':'primary'">{{item.result==='0'?'mdi-close':'mdi-check'}}</v-icon>
    </div>
    <!--比赛信息-->
      <v-row no-gutters class="football-detail-info align-center text-sm-subtitle-2 text-caption">
        <v-col
          cols="7"
          sm="6"
        >
          <!--主客队名字-->
          <p class="ma-0 mb-sm-1 bm-0">{{item.HomeTeam}}</p>
          <p class="ma-0">{{item.AwayTeam}}</p>
        </v-col>
        <v-col
          cols="2"
          sm="2"
        >
          <!--比分-->
          <p class="ma-0 mb-sm-1 bm-0">{{item.HomeScore}}</p>
          <p class="ma-0">{{item.AwayScore}}</p>
        </v-col>
        <v-col
          cols="3"
          sm="4"
        >
          <span class="mr-4 grey--text">Pick</span>
          <strong class="primary--text">{{item.betName}}</strong>
        </v-col>
      </v-row>
  </div>
</template>

<script>
  export default {
    name: 'footballDetail',
    props: [
      'item',
      'ticketData'
    ],
    mounted() {
      console.log(this.item)
    },
  }
</script>

<style scoped>

</style>
