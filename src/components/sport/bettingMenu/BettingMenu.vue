<template>
  <div class="betting-menu">
    <div v-if="dealDoneArr.length > 0">
      <v-tabs v-model="betType" v-show="type !== '2'" height="40">
        <v-tab  class="text-capitalize text-body-1 font-weight-regular" v-for="(recItem, recIndex) in dealDoneArr[0].marketRecommend" :key="recIndex" :class="betType === recIndex? 'font-weight-bold' : ''">
          <template v-if="['Winner (incl. overtime)', 'Total (incl. overtime)'].includes(recItem)">
            {{recItem.split(' ')[0]}}
          </template>
          <template v-else>
            {{recItem}}
          </template>
        </v-tab>
      </v-tabs>
      <div class="betting-menu-group" v-for="(timeItem, timeIndex) in dealDoneArr" :key="timeIndex" v-if="groupLineFilter(timeItem)">
        <div class="betting-menu-group-top px-2 py-sm-2 py-1 d-flex justify-space-between align-center grey lighten-4 text--secondary">
          <span class="betting-menu-group-top-tit font-weight-regular text-truncate">
            {{timeItem.tournamentName}}
          </span>
          <template v-if="type !== '2'">
            <BettingMenuRecommend :dealDoneArr="dealDoneArr" :betType="betType" />
          </template>
          <template v-else>
            <BettingMenuRecommend :dealDoneArr="dealDoneArr" betType="0" />
            <BettingMenuRecommend :dealDoneArr="dealDoneArr" betType="1" />
          </template>
        </div>

        <v-list class="betting-menu-group-list py-0">
          <template  >
            <div class="betting-menu-group-list-single" v-for="(matchItem, matchIndex) in timeItem.matchList" v-if="matchLineFilter(matchItem)" :key="matchIndex">
              <v-list-item two-line class="px-sm-4 px-2">
                <v-list-item-content class="betting-menu-group-list-single-info" v-if="type === '2'">
                  <!-- 赛中 -->
                  <template  v-if="['live', 'suspended', 'interrupted'].indexOf(matchItem.eventStatus) > -1">
                    <p class="betting-menu-group-list-single-info-time font-weight-medium">
                      <GlSvgIcon iconClass="livesignal" class="livesignal mr-1"/>
                      {{clockRun(matchItem.takeUpTime)}}
                    </p>
                  </template>
                  <!-- 赛前/其它 -->
                  <template v-else>
                    <p class="betting-menu-group-list-single-info-time font-weight-medium">
                      <span class="betting-menu-group-list-single-info-time-collection">
                        <!-- 收藏按钮 -->
                        <CollectionBtn v-model="dealDoneArr[timeIndex].matchList[matchIndex]" />
                      </span>
                      {{matchItem.scheduledTime | timeFormat('DD/MM HH:mm')}}
                    </p>
                  </template>
                  <p class="betting-menu-group-list-single-info-id">ID: {{ matchItem.matchId.split(':')[2] }}</p>
                </v-list-item-content>
                <v-list-item-content class="betting-menu-group-list-single-name py-0 mt-1">
                  <template v-if="type !== '2'">
                    <!--赛前-->
                    <p class="font-weight-thin py-1 text-truncate text--disabled" v-if="['not_started', 'delayed', 'postponed'].indexOf(matchItem.eventStatus) > -1">
                      <!-- 收藏按钮 -->
                      <CollectionBtn v-model="dealDoneArr[timeIndex].matchList[matchIndex]" />
                      {{matchItem.scheduledTime | timeFormat('DD/MM HH:mm')}}
                    </p>
                    <!--赛中-->
                    <p class="trackOut font-weight-thin py-1 text-truncate text--disabled" v-if="['live', 'suspended', 'interrupted'].indexOf(matchItem.eventStatus) > -1">
                      <GlSvgIcon iconClass="livesignal" class="livesignal mr-1"/>
                      {{clockRun(matchItem.takeUpTime)}}
                      <v-chip
                          class="tracker ml-2"
                          @click="trackerC(matchItem.matchId)"
                          label
                          :color="trackerId === matchItem.matchId ? 'primary' : 'secondary'"
                          :text-color="trackerId === matchItem.matchId ? 'white' : 'primary'"
                      >Tracker</v-chip>
                    </p>
                  </template>
                  <p class="teamName font-weight-regular text-truncate pb-1 pt-1" @click="jumptoTeam(matchItem)">
                    {{matchItem.homeName}}
                    <span>{{matchItem.homeScore}}</span>
                  </p>
                  <p class="teamName font-weight-regular text-truncate" @click="jumptoTeam(matchItem)">
                    {{matchItem.awayName}}
                    <span>{{matchItem.awayScore}}</span>
                  </p>
                </v-list-item-content>
                <template v-if="type !== '2'">
                  <v-list-item-action class=" box3Out d-flex justify-end pt-4">
                    <BettingMenuRatio
                        :dealDoneArr="dealDoneArr"
                        :matchItem="matchItem"
                        :betType="betType"
                        @totalSClick="totalSClick"
                        @bet="bet"
                    />
                  </v-list-item-action>
                </template>
                <template v-else>
                  <ClockBtn class="betting-menu-group-list-single-details" :matchObj="matchItem" />

                  <v-list-item-action class="betting-menu-group-list-single-action box3Out d-flex justify-end pt-4">
                    <BettingMenuRatio
                      :dealDoneArr="dealDoneArr"
                      :matchItem="matchItem"
                      betType="0"
                      :type="type"
                      @totalSClick="totalSClick"
                      @bet="bet"
                    />
                  </v-list-item-action>
                  <v-list-item-action class="betting-menu-group-list-single-action box3Out d-flex justify-end pt-4">
                    <BettingMenuRatio
                      :dealDoneArr="dealDoneArr"
                      :matchItem="matchItem"
                      betType="1"
                      :type="type"
                      @totalSClick="totalSClick"
                      @bet="bet"
                    />
                  </v-list-item-action>
                </template>
              </v-list-item>
              <div v-if="trackerId === matchItem.matchId" class="px-4 mb-4">
                <LMT :matchId="matchItem.matchId" :key="matchItem.matchId" v-if="matchItem.matchId"></LMT>
              </div>
              <!--<v-responsive :aspect-ratio="2/1" v-if="trackerId === matchItem.matchId">-->
              <!--<LMT :matchId="matchItem.matchId" :key="matchItem.matchId" v-if="matchItem.matchId"></LMT>-->
              <!--</v-responsive>-->
              <v-divider  class="mx-2" style="opacity: 0.5" v-if="matchIndex < timeItem.matchList.length - 1"></v-divider>
            </div>
          </template>
        </v-list>
      </div>
    </div>
    <!--load-->
    <div v-if="sportLoad" class="d-flex align-center justify-center py-10">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div class="no-match" v-if="dealDoneArr.length === 0 && !sportLoad">
      <p>No Match</p>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import BettingMenuRecommend from './BettingMenuRecommend'
  import CollectionBtn from '@/components/func/collection-btn'
  import BettingMenuRatio from './BettingMenuRatio'
  import ClockBtn from '@/components/func/clock-btn'
  import LMT from '@/components/common/LMT/LMT'
  export default {
    components: {
      BettingMenuRecommend,
      CollectionBtn,
      BettingMenuRatio,
      ClockBtn,
      LMT
    },
    data() {
      return {
        dealDoneArr: [],
        plsMatchList: [], // 推送的赛事列表
        betType: 0,
        trackerId: '',
      }
    },
    computed: {
      ...mapGetters(['betList', 'sportLoad']),
    },
    watch: {
      betList: {
        handler(newValue, oldValue) {
          this.makeOddsOn(newValue)
        }
      },
      pushDataArr(m) {
        this.pushDataDeal(this.pushDataArr)
      },
      dataArr(m) {
        this.dealDoneArr = this.dataArr ? this.dataArr : []
        this.makeOddsOn(this.betList)
      },
      deep: true
    },
    props: {
      type: {
        type: String,
        default: '1' // 1: 移动端； 2：pc端
      },
      preOrLive: {
        type: String,
        default: ''
      },
      matchType: {
        type: String,
        default: 'prematch'
      },
      dataArr: {
        type: Array,
        default: function () {
          return []
        }
      },
      pushDataArr: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      ...mapMutations(['SET_BETTING']),
      // 根据当前玩法类型过滤markets
      filterArr(arr) {
        let backArr = arr.filter(item => {
          if (this.type !== 2) {
            return item.name === this.dealDoneArr[0].marketRecommend[this.betType]
          } else {
            return item
          }
        })
        return backArr
      },
      // 设置赔率选中状态
      makeOddsOn(newValue) {
        this.dealDoneArr.forEach((gItem) => {
          gItem.matchList.forEach((matchItem) => {
            matchItem.markets.forEach((marketItem) => {
              marketItem.odds.forEach((oddItem) => {
                let arr = newValue.filter(item => oddItem.sid === item.sid)
                if (arr.length > 0) {
                  this.$set(oddItem, 'on', true)
                } else {
                  this.$set(oddItem, 'on', false)
                }
              })
            })
          })
        })
      },
      // 数据推送的处理
      pushDataDeal(data) {
        let newOddsMap = this.makeNewOddsListMap(this.pushDataArr)
        let delArr = ['live', 'suspended', 'unknown', 'interrupted', 'not_started', 'delayed', 'unknown', 'postponed']
        if (this.preOrLive === 'live') {
          delArr = ['live', 'suspended', 'unknown', 'interrupted']
        }
        if (this.preOrLive === 'not_started') {
          delArr = ['not_started', 'delayed', 'unknown', 'postponed']
        }
        this.dealDoneArr.forEach((leagueItem, l) => {
            leagueItem.matchList.forEach((matchItem, m) => {
              if (delArr.indexOf(data[0].matchList[0].eventStatus) === -1 && data[0].matchList[0].matchId === matchItem.matchId) {
                leagueItem.matchList.splice(m, 1)
                this.$emit('backDelMatch', matchItem.matchId)
                return
              }
              if (newOddsMap.marchIdArr.includes(matchItem.matchId)) {
                // 原数据market
                if (!matchItem.markets || matchItem.markets.length === 0) {
                  let obj = this.plsMatchList.find(item => item.matchId === data[0].matchList[0].matchId)
                  matchItem.markets = obj.markets
                } else {
                  if (newOddsMap.marketIdArr.length === 0) return
                  matchItem.markets.forEach((marketItem, mi) => {
                    if (newOddsMap.marketIdArr.includes(marketItem.marketId)) {
                      marketItem.odds.forEach((oddsItem, oi) => {
                        let newOddsObj = newOddsMap[oddsItem.sid]
                        if (newOddsObj) {
                          // 设置odds变化前后的数值差
                          let minus = newOddsObj.odds - oddsItem.odds
                          this.$set(oddsItem, 'this_last', minus)
                          // 设置新的odds
                          this.$set(oddsItem, 'odds', newOddsObj.odds)
                          // 设置market的status
                          this.$set(oddsItem, 'active', newOddsObj.active)
                          // 设置market的status
                          this.$set(marketItem, 'status', newOddsObj.marketStatus)
                        }
                      })
                    }
                  })
                }
              }
            })
        })
      },
      // 数据转换
      makeNewOddsListMap(leagueList) {
        this.plsMatchList = []
        let newOddsMap = {
          marchIdArr: [],
          marketIdArr: []
        }
        leagueList.forEach((leagueItem, l) => {
          leagueItem.matchList.forEach((matchItem, m) => {
            this.plsMatchList.push(matchItem)
            matchItem.markets.forEach((marketItem, i) => {
              if (!marketItem.odds) return
              marketItem.odds.forEach((oddsItem, j) => {
                newOddsMap[oddsItem.sid] = {
                  tournamentId: matchItem.tournamentId, // 联赛ID
                  matchId: matchItem.matchId, // 赛事ID
                  matchStatus: matchItem.eventStatus, // 赛事状态
                  marketId: marketItem.marketId, // 盘口ID
                  marketName: marketItem.name, // 盘口name
                  marketStatus: marketItem.status, // 盘口状态
                  oddsId: oddsItem.sid, // 赔率ID
                  oddsActive: oddsItem.active, // 赔率状态
                  odds: oddsItem.odds // 变化后赔率
                }
                newOddsMap.marketIdArr.push(marketItem.marketId)
              })
            })
            newOddsMap.marchIdArr.push(matchItem.matchId)
          })
        })
        return newOddsMap
      },
      // tracker按钮点击事件
      trackerC(matchId) {
        if (this.trackerId === matchId) {
          this.trackerId = ''
          this.eventBus.$emit('closeLMT')
        } else {
          this.trackerId = matchId
        }
      },
      clockRun(time) {
        // let second = time + this.timerNum
        let second = time || 0
        let min = Math.floor(second / 60)
        min = String(min).length > 1 ? min : '0' + min
        let sec = second % 60
        sec = String(sec).length > 1 ? sec : '0' + sec
        return (min + '\'' + sec + '"')
      },
      // 赛组根据赔率过滤
      groupLineFilter(group) {
        let have = false
        group.matchList.forEach((val) => {
          if (this.matchLineFilter(val)) {
            have = true
          }
        })
        return have
      },
      // 比赛根据赔率过滤
      matchLineFilter(marchItem) {
        let have = false
        if (marchItem.markets.length === 0) {
          return true
        }
        // 根据选中的玩法类型进行过滤
        let filterMarkets = marchItem.markets.filter(item => {
          return item.name === this.dealDoneArr[0].marketRecommend[this.betType] || (this.$isPc && item.name === this.dealDoneArr[0].marketRecommend[1])
        })
        filterMarkets.forEach((val) => {
          if (this.marketLineFilter(val)) {
            have = true
          }
        })
        return have
      },
      // 市场内odds 过滤
      marketLineFilter(marketItem) {
        if (!marketItem.odds) return false
        if (this.matchType === 'live') return true
        let findArr = marketItem.odds.filter((item) => {
          if (this.$store.state.oddsRange.length === 1 && item.odds >= this.$store.state.oddsRange[0]) {
            return true
          }
          if (this.$store.state.oddsRange.length === 2 && item.odds >= this.$store.state.oddsRange[0] && item.odds <= this.$store.state.oddsRange[1]) {
            return true
          }
        })
        return findArr.length > 0
      },
      // 盘口选中与否
      oddsOnFlag(sid) {
        let findOddArr = this.$store.state.betList.filter(item => item.sid === sid)
        return findOddArr.length > 0
      },
      // index 标识 同类的第几条
      bet(matchItem, marketItem, addsItem) {
        if (!this.$store.state.globalFlag || !marketItem.status || addsItem.active === 0 || !addsItem.odds || addsItem.totalOne) return
        // this.$set(addsItem, 'on', !addsItem.on)
        addsItem.on = !addsItem.on
        // return
        let obj = {
          item: {
            id: marketItem.id,
            matchId: matchItem.matchId,
            team: matchItem.name,
            marketId: marketItem.marketId,
            marketName: marketItem.name,
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
        this.SET_BETTING(obj)
      },
      totalSClick(item, index) {
        this.$set(item, 'totalSelectIndex', index)
      },
      jumptoTeam(item) {
        const query = {
          searchId: item.matchId,
          team1: item.homeName,
          team2: item.awayName,
          matchType: this.matchType
          // name: item.name,
          // scheduledTime: item.scheduledTime
        }
        let type = 'push'
        let obj = {}
        if (this.$isPc) {
          type = 'replace'
          obj = {name: 'pcSports'}
          query.status = item.eventStatus.toLowerCase()
          query.type = 'details'
        } else {
          if (item.eventStatus === 'live' || item.eventStatus === 'Live') {
            obj = {name: 'livesBetting'}
            // this.$store.commit('SET_INDEX', '2')
          } else {
            obj = {name: 'sportsBetting'}
            // this.$store.commit('SET_INDEX', '1')
          }
        }
        this.$router[type]({
          ...obj,
          query
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  .betting-menu{
    font-size: 12px;
    /*vtab前面空去除掉*/
    .betting-menu-group{
      &-list{
        &-single{
          &-action{
            padding-top: 0 !important;
          }
        }
      }
    }
    .v-slide-group__prev{
      display: none!important;
    }
    /*队名*/
    .teamName{
      position: relative;
      padding-right: 10px;
      span{
        position: absolute;
        top: 2px;
        right: 0px;
      }
    }
    .box3Out{
      width: 55%;
      .box3In{
        width: 100%;
        max-width: 240px;
        .box3Middle{
          width: 100%;
        }
        span{
          display: block;
          width: 100%;
          max-width: 60px;
          text-align: center;
        }
        .oddPoint{
          display: flex;
          justify-content: center;
          width: 100%;
          line-height: 30px;
          /*max-width: 60px;*/
          margin: 0px 1px 0 1px;
          height: 30px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          position: relative;
          .updown{
            position: absolute;
            top: 7px;
            right: 1px;
          }
        }
      }
    }
    /*赛中图标*/
    .livesignal{
      width: 18px;
      height: 14px;
    }
    .trackOut{
      position: relative;
    }
    /*tracker按钮样式*/
    .tracker{
      width: 70px;
      height: 20px;
      position: absolute;
      top: 1px;
      right: 0px;
    }
    /*LMT直播盒子样式*/
    .LMTbox{
      height: 100px;

    }
    .no-match{
      font-size: 16px;
      color: @font-color3;
      padding: 50px 0 10px;
      text-align: center;
    }
  }
  /deep/.theme--light.v-tabs .v-tab--active:hover::before, .theme--light.v-tabs .v-tab--active::before{
    opacity: 0;
  }
</style>
