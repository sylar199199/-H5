<template>
  <div class="bettingMenu">
    <!--<div class="perBet">-->
      <!--<p class="menuTitle">213232323</p>-->
      <!--<div class="bettingBox">-->
        <!--<div class="flexDiv top">-->
          <!--<div class="flexDiv1">-->
            <!--<span>Englang premier</span>-->
          <!--</div>-->
          <!--<div class="flexDiv2">-->
            <!--<span style="width: 33%;">1</span>-->
            <!--<span style="width: 33%;">X</span>-->
            <!--<span style="width: 33%;">2</span>-->
          <!--</div>-->
          <!--<div class="flexDiv3">-->
            <!--<span>Over Under</span>-->
          <!--</div>-->
          <!--<div class="flexDiv4">-->
            <!--<span>hahah</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="bottom">-->
          <!--<div class="flexDiv perline">-->
            <!--<div class="flexDiv1">-->
              <!--<div class="timeBox">-->
                <!--<p>-->
                  <!--<i class="el-icon-alarm-clock"></i>-->
                <!--</p>-->
                <!--<p>33:33</p>-->
              <!--</div>-->
              <!--<div class="teamBox">-->
                <!--<p>TeamA</p>-->
                <!--<p>TeamB</p>-->
              <!--</div>-->
              <!--<div class="scoreBox">-->
                <!--<p>2-1</p>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="flexDiv2">-->
              <!--<div class="betBox">-->
                <!--<span>1.2</span>-->
                <!--<span>1.2</span>-->
                <!--<span>1.2</span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="flexDiv3">-->
              <!--<div class="betBox">-->
                <!--<span>1.2</span>-->
                <!--<span>1.2</span>-->
                <!--<span>1.2</span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="flexDiv4">-->
              <!--<div class="greenBtn on">-->
                <!--<span class="btnWord">Tracker</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="flexDiv perline">-->
            <!--<div class="flexDiv1">-->
              <!--<div class="timeBox">-->
                <!--<p>-->
                  <!--<i class="el-icon-alarm-clock"></i>-->
                <!--</p>-->
                <!--<p>33:33</p>-->
              <!--</div>-->
              <!--<div class="teamBox">-->
                <!--<p>TeamA</p>-->
                <!--<p>TeamB</p>-->
              <!--</div>-->
              <!--<div class="scoreBox">-->
                <!--<p>2-1</p>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="flexDiv2">-->
              <!--<div class="betBox">-->
                <!--<span>1.2</span>-->
                <!--<span>1.2</span>-->
                <!--<span>1.2</span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="flexDiv3">-->
              <!--<div class="betBox">-->
                <!--<span>1.2</span>-->
                <!--<span>1.2</span>-->
                <!--<span>1.2</span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="flexDiv4">-->
              <!--<div class="greenBtn on">-->
                <!--<span class="btnWord">Tracker</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="perBet" v-for="(item, key) in dealDoneArr" :key="key">
      <p class="menuTitle" v-if="item.tournamentName">{{item.tournamentName}}</p>
      <p class="menuTitle" v-if="item.time">{{item.time}}</p>
      <div class="bettingBox">
        <div class="flexDiv top">
          <div class="flexDiv1">
            <span>{{item.title1}}</span>
          </div>
          <div class="flexDiv5" v-if="item.title5">
            <!--<span>{{item.title3}}</span>-->
            <span>{{item.title5[0]}}</span>
          </div>
          <div class="flexDiv2" v-if="item.title2">
            <span style="width: 33%;" v-for="(itemTitle2, key2) in item.title2" :key="key2">{{itemTitle2}}</span>
          </div>
          <div class="flexDiv3" v-if="item.title3">
            <!--<span>{{item.title3}}</span>-->
            <span style="width: 33%;" v-for="(itemTitle3, key3) in item.title3" :key="key3">{{itemTitle3}}</span>
          </div>
          <div class="flexDiv4" v-if="item.tracker">
            <span>{{item.title4}}</span>
          </div>
        </div>
        <div class="bottom">
          <div class="flexDiv perline" v-for="(listItem, key3) in item.matchList" :key="key3">
            <div class="flexDiv1">
              <div class="timeBox">
                <p v-if="listItem.timeToStart">
                  <!--<i class="el-icon-alarm-clock"></i>-->
                  <GlSvgIcon iconClass="lives" class="icon" />
                </p>
                <p v-if="listItem.gameDate">{{listItem.gameDate}}</p>
                <p v-if="listItem.timeToStart">{{listItem.timeToStart}}</p>
                <p v-if="listItem.gameTime">{{listItem.gameTime}}</p>
              </div>
              <div class="teamBox" @click="jumptoTeam(listItem)">
                <el-tooltip placement="right" effect="light">
                  <div slot="content">
                    <p>{{listItem.team1}}</p>
                    <p>{{listItem.team2}}</p>
                  </div>
                  <div>
                    <p>{{listItem.team1}}</p>
                    <p>{{listItem.team2}}</p>
                  </div>
                </el-tooltip>
              </div>
              <div class="scoreBox">
                <p>{{listItem.score}}</p>
              </div>
            </div>
            <div class="flexDiv5" v-if="item.title5">
              <div class="betBox5">
                <div class="betbox5Item" v-for="(betItem5, key5) in listItem.gamelist5" :key="key5">
                  <i>{{betItem5.name}}</i>
                  <span @click="bet(listItem, betItem5, listItem.gamelist5marketId, listItem.gamelist5marketName)" :class="[betItem5.on ? 'on' : '']">{{betItem5.odds}}</span>
                </div>
                <!--<span v-for="(betItem5, key5) in listItem.gamelist5" :class="[betItem5.on ? 'on' : '']" :key="key5" @click="bet(listItem, betItem5, listItem.gamelist5marketId, listItem.gamelist5marketName)">-->
                  <!--<i>{{betItem5.name}}</i>-->
                  <!--{{betItem5.odds}}-->
                <!--</span>-->
              </div>
            </div>
            <div class="flexDiv2" v-if="item.title2">
              <div class="betBox">
                <span v-for="(betItem2, key2) in listItem.gamelist2" :class="[betItem2.on ? 'on' : '']" :key="key2" @click="bet(listItem, betItem2, listItem.gamelist2marketId, listItem.gamelist2marketName)">{{betItem2.odds}}</span>
              </div>
            </div>
            <div class="flexDiv3" v-if="item.title3">
              <div class="betBox">
                <span v-for="(betItem3, key3) in listItem.gamelist3" :class="[betItem3.on ? 'on' : '']" :key="key3" @click="bet(listItem, betItem3, listItem.gamelist3marketId, listItem.gamelist3marketName, key3 === 0)">{{betItem3.odds}}</span>
              </div>
            </div>
            <div class="flexDiv4" v-if="item.tracker">
              <div :class="['greenBtn', listItem.matchId === trackerId ? 'on' : '']">
                <span class="btnWord" @click="trackerEven(listItem)">Tracker</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
    },
    data() {
      return {
        trackerId: '',
        dealDoneArr: []
        // dataArr: [
        //   {
        //     tournamentName: 'Englang',
        //     title1: 'eng',
        //     title2: ['1', 'X', '2'],
        //     title3: 'Over Under',
        //     tracker: true,
        //     matchList: [
        //       {
        //         timeToStart: '33:33',
        //         gameTime: '',
        //         team1: 'TeamA',
        //         team1: 'TeamB',
        //         score: '2-1',
        //         gamelist2: [1.2, 1.3, 1.4],
        //         gamelist3: [1.5, 1.6, 1.7],
        //         tracker: false
        //       },
        //       {
        //         timeToStart: '33:33',
        //         gameTime: '',
        //         team1: 'TeamA',
        //         team1: 'TeamB',
        //         score: '2-1',
        //         gamelist2: [1.2, 1.3, 1.4],
        //         gamelist3: [1.5, 1.6, 1.7],
        //         tracker: true
        //       }
        //     ]
        //   }
        // ]
      }
    },
    computed: {
      ...mapGetters(['betList']),
      newBetlist() {
        return this.$store.state.betList
      }
    },
    watch: {
      newBetlist(val) {
        this.dealData()
      }
    },
    props: {
      dataArr: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    mounted() {
      this.dealData()
    },
    methods: {
      ...mapMutations(['SET_BETTING']),
      dealData() {
        let arr = JSON.parse(JSON.stringify(this.dataArr))
        arr.forEach((val, i) => {
          // 三个投注的情况
          // if (val.marketRecommend && val.marketRecommend.indexOf('1x2') > -1) {
          //   val.title2 = ['1', 'X', '2']
          // }
          // if (val.marketRecommend && (val.marketRecommend.indexOf('Total') > -1 || val.marketRecommend.indexOf('Total points') > -1)) {
          //   val.title3 = ['Over', 'Under']
          // }
          // 三个投注的情况
          if (val.marketRecommend && val.marketRecommend.indexOf('Exact sets') > -1) {
            val.title5 = ['Exact sets']
          }
          val.matchList.forEach((val1, i1) => {
            if (!val1.scheduledTime) return
            // 拼接月份 日期
            let dateArr = val1.scheduledTime.split(' ')[0].split('-')
            val1.gameDate = dateArr.slice(1, 3).join('-')
            // 拼接时间
            let timeArr = val1.scheduledTime.split(' ')[1].split(':')
            val1.gameTime = timeArr.slice(0, 2).join(':')
            // 分解队伍名称
            val1.team1 = val1.name.split(' vs. ')[0]
            val1.team2 = val1.name.split(' vs. ')[1]
            val1.markets.forEach((val2, i2) => {
              if (val2.marketName === '1x2') { // 胜平负 盘口赔率
                val.title2 = ['1', 'X', '2']
                val1.gamelist2marketId = val2.marketId
                val1.gamelist2marketName= val2.marketName
                val1.gamelist2 = val2.odds.length > 0 ? val2.odds : []
                // 初始化数据时候让已选择的值高亮
                val1.gamelist2.forEach((val3, i) => {
                  val3.on = this.storeBetListOn(val1.matchId, val3.id)
                })
              } else if (val2.marketName.indexOf('otal') != -1) { // 高低分 盘口赔率
                val.title3 = ['Over', 'Under']
                val1.gamelist3marketId = val2.marketId
                val1.gamelist3marketName= val2.marketName
                val1.gamelist3 = val2.odds.length > 0 ? val2.odds : []
                if (val1.gamelist3.length > 0) {
                  // 在高低分前数组第一位加上分数界限
                  val1.gamelist3.unshift({
                    odds: val1.gamelist3[0].name.split(' ')[1]
                  })
                }
                // 初始化数据时候让已选择的值高亮
                val1.gamelist3.forEach((val3, i) => {
                  val3.on = this.storeBetListOn(val1.matchId, val3.id)
                })
              } else {
                val.title5 = [val2.marketName]
                val1.gamelist5marketId = val2.marketId
                val1.gamelist5marketName= val2.marketName
                val1.gamelist5 = val2.odds.length > 0 ? val2.odds : []
                // 初始化数据时候让已选择的值高亮
                val1.gamelist5.forEach((val3, i) => {
                  val3.on = this.storeBetListOn(val1.matchId, val3.id)
                })
              }
            })
            // 胜平负 盘口赔率
            // let markets2 = val1.markets.filter(v => {
            //   return v.marketName === '1x2'
            // })
            // if (markets2.length > 0) {
            //   val.title2 = ['1', 'X', '2']
            //   val1.gamelist2marketId = markets2[0].marketId
            //   val1.gamelist2marketName= markets2[0].marketName
            //   val1.gamelist2 = markets2.length > 0 ? markets2[0].odds : []
            //   // 初始化数据时候让已选择的值高亮
            //   val1.gamelist2.forEach((val2, i) => {
            //     val2.on = this.storeBetListOn(val1.matchId, val2.id)
            //   })
            // }
            // 高低分 盘口赔率
            // let markets3 = val1.markets.filter(v => {
            //   return (v.marketName === 'Total' || v.marketName === 'Total points')
            // })
            // if (markets3.length > 0) {
            //   val.title3 = ['Over', 'Under']
            //   val1.gamelist3marketId = markets3[0].marketId
            //   val1.gamelist3marketName= markets3[0].marketName
            //   val1.gamelist3 = markets3.length > 0 ? markets3[0].odds : []
            //   if (val1.gamelist3.length > 0) {
            //     // 在高低分前数组第一位加上分数界限
            //     val1.gamelist3.unshift({
            //       odds: val1.gamelist3[0].name.split(' ')[1]
            //     })
            //   }
            //   // 初始化数据时候让已选择的值高亮
            //   val1.gamelist3.forEach((val3, i) => {
            //     val3.on = this.storeBetListOn(val1.matchId, val3.id)
            //   })
            // }
          })
        })
        this.dealDoneArr = arr
      },
      // vuex存储的投注信息，比对组件，有的值的需要高亮
      storeBetListOn(matchId, outcomeId) {
        let flag = false
        this.$store.state.betList.forEach((val, i) => {
          if (val.matchId === matchId && val.outcomeId === outcomeId) {
            flag = true
          }
        })
        return flag
      },
      toDetail(item) {
        this.$router.push({
          path: 'sportsBetting',
          query: { matchId: item.matchId }
        })
      },
      bet(listItem, item, marketId, marketName, flag) {
        if (flag) return
        item.on = !item.on
        let name = ''
        if (item.name === listItem.team1) {
          name = 'home'
        } else if (item.name === listItem.team1) {
          name = 'away'
        } else {
          name = item.name
        }
        let obj = {
          item: {
            matchId: listItem.matchId,
            team: listItem.name,
            marketId: marketId,
            marketName: marketName,
            name: name,
            odds: item.odds,
            team1: listItem.team1,
            team2: listItem.team2,
            outcomeId: item.id,
            checked: true
          },
          flag: item.on
        }
        this.SET_BETTING(obj)
      },
      jumptoTeam(item) {
        this.$store.commit('SET_MENU', item.sportId)
        this.$store.commit('SET_LIVESMENU', item.matchId)
        console.log(this.$store.state.livesActive)
        if (item.eventStatus === 'live' || item.eventStatus === 'Live') {
          this.$store.commit('SET_INDEX', '2')
          this.$router.push({ path: 'livesBetting', query: {
              searchId: item.matchId,
              name: item.name,
              scheduledTime: item.scheduledTime
            } })
        } else {
          this.$store.commit('SET_INDEX', '1')
          this.$router.push({ path: 'sportsBetting', query: {
              searchId: item.matchId,
              name: item.name,
              scheduledTime: item.scheduledTime
            } })
        }
        // if (this.$route.name === 'lives') {
        //   this.$router.push({ path: 'livesBetting', query: { searchId: item.id } })
        // } else if (this.$route.name === 'sports' || this.$route.name === 'index') {
        //   this.$router.push({ path: 'sportsBetting', query: { searchId: item.id } })
        // }
      },
      trackerEven(item) {
        this.trackerId = item.matchId
        this.$emit('trackerEvent', item)
      }
    },
  }
</script>

<style lang="less" scoped>
.bettingMenu{
  .perBet{
    .menuTitle{
      line-height: 42px;
      color: #FF5D27;
      font-size: 16px;
      padding-left: 24px;
      font-weight: bold;
    }
    .bettingBox{
      background: #46495D;
      padding: 8px 20px 10px 20px;
      .flexDiv{
        display: flex;
        justify-content: space-between;
        text-align: center;
        .flexDiv1{
          width: 180px;
          display: flex;
          /*padding: 12px 0;*/
          div{
            padding: 0 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .timeBox{
            min-width: 65px;
            p{
              line-height: 18px;
              color: #303242;
              opacity: 0.7;
              .icon{
                font-size: 18px;
              }
            }
          }
          .teamBox{
            cursor: pointer;
            p{
              white-space: nowrap;
              line-height: 27px;
              font-weight: 600;
              display: block;
              max-width: 118px;
              overflow: hidden;
            }
          }
          .scoreBox{
            p{
              line-height: 54px;
              font-size: 18px;
              font-weight: 600;
            }
          }
        }
        .flexDiv2{
          width: 153px;
        }
        .flexDiv3{
          width: 153px;
        }
        .flexDiv4{
          width: 82px;
        }
      }
      .top{
        padding: 0 20px;
        //margin-bottom: 8px;
        height: 32px;
        //line-height: 40px;
        span{
          color: #fff;
          opacity: 0.5;
          line-height: 32px;
          font-weight: 700;
        }
        .flexDiv2{
          span{
            display: inline-block;
          }
        }
        .flexDiv3{
          text-align: right;
          span{
            display: inline-block;
            text-align: center;
          }
        }
      }
      .bottom{
        background: #E4DBD8;
        color: #303242;
        padding: 0 20px;
        .betBox, .betBox5{
          padding: 20px 0;
          span{
            display: inline-block;
            width: 50px;
            height: 38px;
            line-height: 38px;
            background-color: rgba(64, 170, 73, 0.2);
            margin-left: 1px;
            cursor: pointer;
            font-weight: bold;
          }
          span:hover{
            background-color: rgba(245, 114, 70, 1);
            color: #fff;
          }
          span.on{
            background-color: rgba(245, 114, 70, 1);
            color: #fff;
            font-weight: 700;
          }
        }
        .betBox5{
          .betbox5Item{
            display: inline-block;
            i{
              display: inline-block;
              margin-right: 6px;
              margin-left: 12px;
              /*width: 42px;*/
              height: 38px;
              line-height: 38px;
              font-style: normal;
              text-align: right;
            }
          }
        }
        .perline{
          border-bottom: 1px solid rgb(198, 191, 190);
        }
        @media (max-width: 1630px) {
          .perline{
            min-width: 560px;
          }
        }
        .flexDiv3{
          .betBox{
            /*over under 界限数字 样式*/
            span:nth-of-type(1) {
              color: #000;
              background-color: rgba(1, 1, 1, 0);
              cursor: default;
            }
          }
        }
        .flexDiv4{
          height: 78px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .greenBtn{
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            /*box-sizing: border-box;*/
            background: #40AA49 ;
            cursor: pointer;
            font-weight: bold;
            .btnWord{
              display: inline-block;
              margin: 1px;
              width: calc(100% - 2px);
              height: calc(100% - 2px);
              color: #40AA49;
              line-height: 32px;
              background: #E4DBD8;
              border-radius: 3px;
            }
          }
          .greenBtn:hover{
            background: linear-gradient(to right, #40AA49 , #C0D137);
            .btnWord{
              background: rgba(0, 0, 0, 0);
              color: #fff;
            }
          }
          .on{
            .btnWord{
              background: rgba(0, 0, 0, 0);
              color: #fff;
            }
          }
        }
      }
    }
  }

}
</style>
