<template>
  <v-card
    elevation="0"
    class="featured-match-list-single ml-sm-4 ml-2 mr-sm-2 mt-sm-4 mt-2 pa-sm-2 pa-1 flex-fill"
    max-height="200"
    max-width="510"
    width="80%"
    outlined
    :class="n===matchList.length-1? 'mr-4':''"
  >
    <!--赛事名称-->
    <p class="featured-match-list-single-name text-sm-body-2 text-caption text--disabled mb-1 mb-sm-2 mx-1 text-truncate">{{item.tournamentName}}</p>
    <!--比赛名称、时间、比分-->
    <v-row no-gutters class="align-center mb-sm-2 mb-1">
      <v-col cols="4" class="featured-match-list-single-team text-right text-sm-subtitle-2 text-caption home-name-style black--text team-name">{{item.homeName}}</v-col>
      <v-col cols="4" class="featured-match-list-single-time text-center">
        <p class="mb-0 text-sm-h6 text-subtitle-1 font-weight-bold">{{item.scheduledTime?$moment(item.scheduledTime).format('HH:mm') : ''}}</p>
        <p class="ma-0 text-sm-body-2 mt-n1 text-caption text--disabled">{{item.scheduledTime?$moment(item.scheduledTime).format('DD/MM') : ''}}</p>
      </v-col>
      <v-col cols="4" class="featured-match-list-single-team text-sm-subtitle-2 text-caption home-name-style black--text text-sm-subtitle-1 text-subtitle-2 team-name">{{item.awayName}}</v-col>
    </v-row>
    <!--赔率列表&3排赔率的情况-->
    <v-row no-gutters class="mb-1" v-if="matchType!== 'total' && item.markets && item.markets.length>0">
      <v-col
        v-for="(odds, oddsIndex) in item.markets[0].odds"
        :key="odds.id"
        cols="4"
        sm="4"
      >
        <!--锁-->
        <v-card
          class="card-lock mx-1 px-2 py-1 text-center"
          elevation="0"
          v-if="!odds.odds || odds.active === 0 || !item.markets[0].status || (item.eventStatus !== 'not_started' && item.eventStatus !== 'live') || !$store.state.globalFlag">
          <v-icon small>mdi-lock</v-icon>
        </v-card>
        <!--赔率-->
        <v-card v-else class="mx-1 px-sm-2 px-1 py-1 d-flex justify-space-between"
                elevation="0"
                label
                :class="[oddsOnFlag(odds.sid) ? 'primary white--text' : 'secondary primary--text']"
                @click="bet(odds,item,item.markets[0])"
        >
          <span class="text-sm-subtitle-1 text-subtitle-2" v-if="item.markets[0].name==='1x2'">{{odds.id==='1'?'1':odds.id==='2'?'X':'2'}}</span>
          <span class="text-sm-subtitle-1 text-subtitle-2" v-else>{{oddsIndex===0?'1X':oddsIndex===1?'12':'X2'}}</span>
          <span class="font-weight-bold text-sm-subtitle-1 text-subtitle-2 d-flex align-center">
            {{odds.odds}}
            <v-icon
              class="updown ml-n1"
              small
              :color="odds.style ==='up' ? 'green accent-3' : 'error'"
              :key="odds.odds"
              v-if="odds.style">
              {{odds.style ==='up' ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'}}
            </v-icon>
          </span>
        </v-card>
      </v-col>
    </v-row>
    <!--total的情况-->
    <v-row no-gutters class="mb-1" v-else-if="matchType === 'total' && item.markets && item.markets.length>0">
      <v-col
        cols="4"
        sm="4"
      >
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-card class="mx-1 px-2 py-1 d-flex justify-space-between secondary primary--text"
                    v-bind="attrs"
                    v-on="on"
                    elevation="0"
                    label
            >
              <span class="">{{item.markets[matchNum[n]].specifiersTotal}}</span>
              <v-icon small color="success">mdi-chevron-down</v-icon>
            </v-card>
          </template>
          <v-list>
            <v-list-item
              v-for="(totalItem, totalIndex) in item.markets"
              :key="totalIndex"
            >
              <v-list-item-title @click="totalSClick(totalItem, totalIndex,n)">
                {{totalItem.specifiers ? totalItem.specifiersTotal:''}}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col
        v-for="(odds, oddindex) in item.markets[matchNum[n]].odds !== null?item.markets[matchNum[n]].odds: 2 "
        :key="oddindex"
        cols="4"
        sm="4"
        v-if="oddindex<2"
      >
        <!--锁-->
        <v-card
          class="card-lock mx-1 px-2 py-1 text-center disabled"
          elevation="0"
          v-if="!odds.odds || odds.active === 0 || !item.markets[matchNum[n]].status || (item.eventStatus !== 'not_started' && item.eventStatus !== 'live') ||!$store.state.globalFlag"
        >
          <v-icon small>mdi-lock</v-icon>
        </v-card>
        <!--赔率-->
        <v-card v-else class="mx-1 px-sm-2 px-1 py-1 d-flex justify-space-between"
                elevation="0"
                label
                :class="[oddsOnFlag(odds.sid) ? 'primary white--text' : 'secondary primary--text']"
                @click="bet(odds,item,item.markets[matchNum[n]])"
        >
          <span class="">{{oddindex===0?'O':'U'}}</span>
          <span class="font-weight-bold d-flex align-center">
            {{odds.odds}}
            <v-icon
              class="updown ml-n1"
              small
              :color="odds.style ==='up' ? 'green accent-3' : 'error'"
              :key="odds.odds"
              v-if="odds.style">
              {{odds.style ==='up' ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'}}
            </v-icon>
          </span>
        </v-card>
      </v-col>
    </v-row>
    <!--没有数据锁的情况-->
    <v-row v-else no-gutters class="mb-1">
      <v-col
        v-for="num in 3"
        :key="num"
        cols="4"
        sm="4"
      >
        <!--锁-->
        <v-card
          class="card-lock mx-1 px-2 py-1 text-center disabled"
          elevation="0">
          <v-icon small>mdi-lock</v-icon>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    name: 'mstchItem',
    props: {
      type: {
        type: String,
        default: '1' // 1: 移动端； 2：pc端
      },
      item: {
        type: Object
      },
      n: {
        type: Number
      },
      matchList: {
        type: Array
      },
      matchType: {
        type: String
      }
    },
    data() {
      return {
        model: 0,
        showLoad: false,
        matchNum: [0, 0, 0, 0],
      }
    },
    methods: {
      ...mapMutations(['SET_BETTING']),
      // 盘口选中与否
      oddsOnFlag(sid) {
        let findOddArr = this.$store.state.betList.filter(item => item.sid === sid)
        return findOddArr.length > 0
      },
      // 选择total
      totalSClick(item, num, index) {
        this.matchNum[index] = num
        this.$forceUpdate()
      },
      bet(addsItem, matchItem, market) {
        let obj = {
          item: {
            id: market.id,
            matchId: market.matchId,
            team: matchItem.name,
            marketId: market.marketId,
            marketName: market.name,
            name: addsItem.name,
            odds: addsItem.odds,
            team1: matchItem.homeName,
            team2: matchItem.awayName,
            sid: addsItem.sid,
            outcomeId: addsItem.id,
            checked: true
          },
          flag: !this.oddsOnFlag(addsItem.sid)
        }
        console.log(obj.item)
        this.SET_BETTING(obj)
        // console.log(this.$store.state.betList)
      },
      slideNext() {
        this.model += 2
        if (this.model > this.calcLen) {
          this.model = 14
        }
      },
      slidePrev() {
        this.model -= 2
        if (this.model < 0) {
          this.model = 0
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  /*.featured-match-list-single{*/
  /*  box-shadow: 0px 2px 8px 0px #DADADA;;*/
  /*}*/
  .team-name{
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .updown{
    display: inline-block !important;
    margin-left: 4px !important;
    margin-right: -4px !important;
    -moz-animation: cssAnimation 0s ease-in 6s forwards;
    /* Firefox */
    -webkit-animation: cssAnimation 0s ease-in 6s forwards;
    /* Safari and Chrome */
    -o-animation: cssAnimation 0s ease-in 6s forwards;
    /* Opera */
    animation: cssAnimation 0s ease-in 6s forwards;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
  }
  @keyframes cssAnimation {
    to {
      width:0;
      height:0;
      overflow:hidden;
    }
  }
  @-webkit-keyframes cssAnimation {
    to {
      width:0;
      height:0;
      visibility:hidden;
    }
  }
</style>
