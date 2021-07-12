<template>
  <div class="lott-quick-bet">
    <!-- lottery.svg -->
    <div class="tsb-top">
      <v-tabs
        v-model="tab"
        centered
        class="pl-0 pr-0"
        height="40px"
      >
        <div class="ml-4">
          <GlSvgIcon iconClass="lottery" class="icon icon-lott mt-0" />
        </div>
        <v-tab
          v-for="(item, index) in tabNav"
          :key="index"
          class="text-body-1 ml-0 pl-0 pr-0 text-capitalize"
          @change="checkItem(item)"
        >
          {{ item.gameName }}
        </v-tab>
      </v-tabs>
    </div>
    <v-tabs-items v-model="tab" class="mb-4" style="height: 36vw;">
      <v-tab-item  v-for="item in lotteriesList" :key="item.id" class="mt-4 pl-4 pr-4 ">
        <div >
          <v-card flat elevation="3" class="mb-2 tab-card">
            <v-list>
            <v-list-item :key="item.title">
              <v-list-item-content>
                <v-list-item-subtitle class="text-caption" v-if="item.gameType==10">Winning rate <strong class="text-body-1 black--text">{{item.jeckpot}}</strong></v-list-item-subtitle>
                <v-list-item-subtitle class="text-caption" v-if="item.gameType==11" >Next estimated jeckpot <strong class="text-body-1 black--text">₦{{item.jeckpot}}</strong></v-list-item-subtitle>
                <v-list-item-title class="mt-4">
                  <span v-for="(ele, n) in item.numbers" :key="n" class="draw-num primary--text" :style="{'border-color': theme.primary}">{{ele}}</span>
                  <v-btn icon @click="refresh(1)" class="">
                    <v-icon class="icon-sync text-h4 pl-0 primary--text font-weight-ragular">mdi-refresh</v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{item.lastDrawTime}}
                  <!-- <ilot-count-down :time="item.lastDrawTime"></ilot-count-down> -->
                </v-list-item-action-text>
                <v-btn
                  class="rounded-sm white--text text-body-1 text-capitalize primary"
                  @click="toBuy(item)"
                >
                  Buy Now
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            </v-list>
          </v-card>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script type="text/javascript">
import ilotCountDown from  '@/components/common/ilotCountDown/ilotCountDown'
export default {
  name: 'lottQuickBetting',
  data() {
    return {
      tab: '1',
      tabNav: [
        {
          gameName: '5/90',
          gameType: 11,
        },
        {
          gameName: '3D',
          gameType: 10,
        }
      ],
      lotteriesList: [
        {
          gameId: 5,
          gameIcon: 'http://xx/logo.png',
          gameUrl: 'http://xx/3D',
          gameName: '5 of 90',
          gameType: 11,
          // lastDrawTime: '2021/4/24 05:00:00',
          lastDrawTime: '05:00:00',
          numbers: ['02','03','05', '11', '35'],
          jeckpot: '1000000'
        },
        {
          gameId: 1,
          gameIcon: 'http://xx/logo.png',
          gameUrl: 'http://xx/3D',
          gameName: '3D',
          gameType: 10,
          lastDrawTime: '05:00:00',
          numbers: ['2','3','5'],
          jeckpot: '90%'
        },
      ],
      timeList: [
        {
          name: 'DAYS',
          time: '0'
        },
        {
          name: 'HOURS',
          time: '0'
        },
        {
          name: 'MINUTES',
          time: '0'
        },
        {
          name: 'SECONDS',
          time: '0'
        }
      ],
      theme: {}
    }
  },
  components: {
    ilotCountDown
  },
  created() {
  },
  mounted() {
    // this.getTradingSystemTime()
    // this.checkoutTime()
  },
  activated() {
    console.log(this.$vuetify.theme.themes.light)
    this.theme = this.$vuetify.theme.themes.light
  },
  methods: {
    checkoutTime() {
      // countdown(time, systemTimeOffset, lottoTime)
      this.lotteriesList.forEach(item => {
        this.gameCountdown(item)
      })
    },
    gameCountdown(item, callback) {
      let self = this
      console.log(item, self.systemTimeOffset)
      self.timeID = setInterval(() => {
        let timeArr = self.$common.countdown(item.lastDrawTime, self.systemTimeOffset, true)
        // console.log(timeArr)
        for (let index = 0; index < self.timeList.length; index++) {
          self.timeList[index].time = timeArr[index]
        }
        if (
          timeArr[0] === 0 &&
          timeArr[1] === 0 &&
          timeArr[2] === 0 &&
          timeArr[3] === 0
        ) {
          setTimeout(() => {
            if (callback) callback()
          }, 5000)
        }
      }, 1000)
    },
    // 计算时差
    async getTradingSystemTime() {
      let beforeTime = new Date().getTime()
      const res = await this.$api.timeSync()
      let afterTime = new Date().getTime()
      if (res.RetCode !== '0') return
      this.systemTimeOffset =
        new Date(res.Format01.HostTime).getTime() +
        (afterTime - beforeTime) / 2 -
        new Date().getTime()
    },
    checkItem(item) {
      console.log(item)
    },
    refresh(val) {

    },
    toBuy() {
    },
  },
}
</script>

<style lang="less" scoped>
.icon-lott {
  display: inline-block;
  vertical-align: bottom;
  width: 25vw;
  text-align: left;
  font-size: 2rem;
}
.tab-card {
  // border: 1px solid #ccc;
  border-radius: 4px;
}
.draw-num {
  display: inline-block;
  vertical-align: middle;
  width: 28px;
  height: 28px;
  margin: 0 5px;
  line-height: 24px;
  text-align: center;
  border: 1px solid #5da402;
  border-radius: 50%;
  &:first-child {
    margin-left: 0;
  }
}
</style>
