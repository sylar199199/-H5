<template>
  <v-card :class="[iPadding]" class="featured-match mr-0" elevation="0">
    <div class="featured-match-tab d-flex align-center justify-start" :class="[iMarign]">
      <template v-if="type === '1'">
        <v-img class="" width="36%" :max-width="mobileSize" src="~@/assets/img/featureMatch.png"></v-img>
      </template>
      <template v-else>
        <v-img class="" width="165px" max-width="165px" src="~@/assets/img/featureMatch2.png"></v-img>
      </template>

      <!--tab切换-->
      <div class="d-inline-block match-tab">
        <v-tabs height="40px">
          <v-tab style="min-width: auto" active-class="font-weight-bold" v-for="(item, index) in iTypeNames" @click="selectType(item)" :key="index" class="text-capitalize text-sm-h6 text-subtitle-1 mx-0 mx-sm-4 px-sm-4 px-2">{{item.name}}</v-tab>
        </v-tabs>
      </div>
    </div>
    <div v-if="showLoad" class="d-flex align-center justify-center" :class="[{'loadHeight':showLoad}]">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <!--热门赛事列表-->
    <div class="featured-match-list">
      <p v-if="matchList.length===0 && !showLoad" class="text-center text--disabled pa-4 ma-sm-4 ma-2 text-h6">NO DATA</p>
      <v-sheet v-else-if="matchList.length>0 && !showLoad">
        <!--pc的样式-->
        <v-slide-group
          v-model="model"
          class=""
          active-class="success"
          :show-arrows="type === '2'"
          :center-active="type === '2'"
          outlined
          @click:next="slideNext"
          @click:prev="slidePrev"
          v-if="type === '2'"
        >
          <v-slide-item
            v-for="(item, n) in matchList"
            :key="n"
            width="80%"
          >
            <matchItem :item="item" :n="n" :type="type" :matchList="matchList" :matchType="matchType"></matchItem>
          </v-slide-item>
        </v-slide-group>
        <!--H5的样式-->
        <v-card v-else class="overflow-x-auto pr-sm-4 pr-2" elevation="0">
          <div class="d-flex flex-nowrap">
            <v-slide-item
              v-for="(item, n) in matchList"
              :key="n"
              :style="{'min-width': mobileSize<170?'255px':mobileSize<260?'300px': '400px'}"
            >
              <matchItem :item="item" :n="n" :type="type" :matchList="matchList" :matchType="matchType"></matchItem>
            </v-slide-item>
            <div class="last-match" > 1</div>
          </div>
        </v-card>
      </v-sheet>
    </div>
  </v-card>
</template>

<script>
  import matchItem from './matchItem'
  import {mapGetters, mapMutations} from 'vuex'
  import { throttle } from '@/utils'
  import { eventTracking, eventKey } from '@/utils/fireBase'
  export default {
    name: 'ilotFeaturedMatch',
    props: {
      type: {
        type: String,
        default: '1' // 1: 移动端； 2：pc端
      },
      iTypeNames: {
        type: Array,
        default: function () {
          return [
            {
              name: 'Pre-Match',
              type: 'prematch',
              matchType: '1X2'
            },
            {
              name: 'Live',
              type: 'live',
              matchType: '1X2'
            },
          ]
        }
      },
      iMarign: {
        type: Array,
        default: function () {
          return ['mx-sm-4 mx-2']
        }
      },
      iPadding: {
        type: Array,
        default: function () {
          return ['pa-0']
        }
      }
    },
    components: {
      matchItem
    },
    data() {
      return {
        model: 0,
        showLoad: false,
        matchType: '',
        matchNum: [0, 0, 0, 0],
        matchList: [],
        marketId: ''
      }
    },
    mounted() {
      this.setHotSportData(this.iTypeNames[0])
    },
    activated() {
      if (this.matchList && this.matchList.length) {
        this.initSocketio()
      }
    },
    deactivated() {
      this.stopSocketio() // 断开连接
    },
    computed: {
      ...mapGetters(['platformName']),
      mobileSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 130
          case 'sm': return 170
          // case 'md': return 500
          // case 'lg': return 600
          // case 'xl': return 800
          default : return 260
        }
      },
      calcLen() {
        return this.matchList.length
      }
    },
    methods: {
      ...mapMutations(['SET_BETTING']),
      // 获取热门赛事的参数
      setHotSportData: throttle(function (data) {
        let eventType = ''
        let type = 1
        if (data.type === 'prematch') {
          eventType = 'NotStarted'
        } else if (data.type === 'live') {
          eventType = 'Live'
        }
        switch (data.matchType) {
          case '1X2': type = 1; break
          case 'total': type = 18; break
          case 'DC': type = 10; break
        }
        this.marketId = type
        let obj = {
          eventStatus: eventType,
          marketType: type
        }
        this.queryH5HotSport(obj)
      }),
      // 获取热门赛事
      async queryH5HotSport(obj) {
        try {
          this.matchList = []
          this.showLoad = true
          const res = await this.$api.queryH5HotSport({
            data: obj
          })
          if (res.code !== 0) return
          this.matchList = res.data || []
          this.matchNum = new Array(this.matchList.length).fill(0)
          this.initSocketio(res.data)
        } finally {
          this.showLoad = false
        }
      },
      // 选择total
      totalSClick(item, num, index) {
        this.matchNum[index] = num
        this.$forceUpdate()
      },
      // 盘口选中与否
      oddsOnFlag(sid) {
        let findOddArr = this.$store.state.betList.filter(item => item.sid === sid)
        return findOddArr.length > 0
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
        this.SET_BETTING(obj)
      },
      // 切换类型
      selectType(item) {
        console.log(item)
        let name = 'sport'
        if (item.name === 'Pre-Match' || item.name === 'Live') {
          name = 'home'
        }
        let obj = {
          switchTab: item.name
        }
         // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_FEATURED_MATCH, name + '_' + item.name, obj)
        // window._czc.push(['_trackEvent', this.platformName + '-featuredMatch', item.type])
        this.matchType = item.matchType
        this.setHotSportData(item)
      },
      // 盘口推送
      initSocketio(data) {
        let _this = this
        let arr = []
        data.forEach((val1) => {
          if (val1.marketId) {
            arr.push(val1.matchId + '#' + val1.marketId)
          } else {
            arr.push(val1.matchId + '#' + this.marketId)
          }
        })
        if (arr.length === 0) return
        let obj = {
          groups: arr.join(','),
          userToken: ''
        }
        // 发送消息给服务端订阅主题可用于初始化数据
        _this.$socketio.emit('sport_match_market_topic_v2', obj, (data) => {
          let arr = JSON.parse(data)
          this.setOddStatus(arr.data[0].matchList)
        })
      },
      stopSocketio() {
        this.$socketio.off('sport_match_market_topic_v2')
      },
      // 设置赔率状态
      setOddStatus(data) {
        data.forEach(val1 => {
          this.matchList.forEach(item => {
            if (val1.matchId === item.matchId) { // 判断赛事id是否相同
              // 相同则赛事状态替换
              item.eventStatus = val1.eventStatus
              // 循环markets
              item.markets.forEach(item2 => {
                val1.markets.forEach(val2 => {
                  // 判断盘口id是否存在
                  if (item2.id === val2.id) {
                    // 相同则替换盘口状态
                    item2.status = val2.status
                    // 判断是否有赔率
                    if (val2.odds !== null && val2.odds.length > 0) {
                      item2.odds.forEach(item3 => {
                        val2.odds.forEach(val3 => {
                          if (item3.sid === val3.sid) {
                            if (item3.odds > val3.odds) { // 赔率变小
                              item3.style = 'down'
                            } else if (item3.odds < val3.odds) { // 赔率变大
                              item3.style = 'up'
                            }
                            item3.odds = val3.odds
                          }
                        })
                      })
                    }
                  }
                })
              })
            }
          })
        })
      },
      slideNext() {
        this.model += 2
        if (this.model > this.calcLen - 1) {
          this.model = this.calcLen - 1
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
.odds-item{
  width: 100%;
}
.d-inline-block{
  margin-left: 15px;
}
/deep/.card-lock{
  background: @dividing-line-color;
  i{
    color: @font-color4;
  }
}

.match-tab .v-tabs:not(.v-tabs--vertical):not(.v-tabs--right) > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-slide-group--has-affixes) .v-slide-group__prev{
  display: none;
}
.featured-match-list{
  &-single {
    &.success{
      background: none!important;
      border-color: rgba(0, 0, 0, 0.12) !important;
    }
  }
}
  .loadHeight{
    height: 150px;
  }
  .home-name-style{
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
.last-match{
    width: 16px;
    height: 10px;
    font-size: 12px;
    line-height: 30px;
    color: transparent;
}
/deep/.theme--light.v-tabs .v-tab--active:hover::before, .theme--light.v-tabs .v-tab--active::before{
  opacity: 0;
}
</style>
