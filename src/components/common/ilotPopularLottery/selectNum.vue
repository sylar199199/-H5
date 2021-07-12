<template>
  <v-card class="pa-sm-4 pa-2 mt-2 select-num" elevation="0" outlined @click="refresh">
    <div class="select-num-name font-weight-bold" v-if="type === '2'">{{ lotteryData.name }}</div>
    <div class="select-num-win d-flex justify-space-between align-center flex-wrap">
      <div class="select-num-win-num d-flex align-center" v-if="calcOnSale">
        <span class="text--disabled mr-2 text-sm-body-2 text-caption">{{lotteryData.title}}</span>
        <strong class="text-sm-h6 text-subtitle-1 font-weight-bold">{{$t('NGN-SYMBOL')}}{{lotteryData.MaxWinMoney * 10 | fmoney(0)}}</strong>
        <!--<strong class="text-h5 font-weight-bold" v-else>{{lotteryData.WinRate}}% </strong>-->
      </div>
      <!--时间-->
      <div class="select-num-win-time d-flex align-center" v-if="calcOnSale">
        <CountDown :cutKey="lotteryData.Issue" v-model="newTime" @cutOff="cutOff" />
        <template v-if="type !== '2'">
          <v-chip
              label
              x-small
              class="px-2"
              v-if="setTime(newTime, 'hh')>0"
          >
            {{setTime(newTime, 'hh')}}
          </v-chip>
          <span class="mx-sm-2 mx-1" v-if="setTime(newTime, 'hh')>0">:</span>
          <v-chip
              label
              x-small
              class="px-2"
          >
            {{setTime(newTime, 'mm')}}
          </v-chip>
          <span class="mx-sm-2 mx-1">:</span>
          <v-chip
              label
              x-small
              class="px-2"
          >
            {{setTime(newTime, 'ss')}}
          </v-chip>
        </template>
        <template v-else>
          <span v-if="setTime(newTime, 'hh') > 0">{{setTime(newTime, 'hh')}}h : </span>
          <span>{{setTime(newTime, 'mm')}}m : {{setTime(newTime, 'ss')}}s</span>
        </template>
      </div>
      <template v-else>
        <LotteryTips class="select-num-win-time tips" :lotteryInfo="lotteryData" :loadTimes="loadTimes" @cutOff="cutOff" />
      </template>
    </div>
    <!--选号码-->
    <div class="select-num-num d-flex justify-space-between align-center flex-wrap">
      <div class="d-flex align-center mt-sm-4 mt-sm-2 mt-1 flex-wrap">
        <v-responsive
          v-for="(num, index) in selectNumData"
          :key="index"
          :width="type === '2' ? '30' : mobileSize"
          :height="type === '2' ? '30' : mobileSize"
          :max-width="type === '2' ? '30' : mobileSize"
          class="select-num-num-single num-border mr-sm-1 mr-1 rounded-circle primary"
        >
          <v-responsive
            width="100%"
            height="100%"
            class="rounded-circle white text-center align-center">
            <span class="primary--text text-sm-h6 text-subtitle-1">{{num}}</span>
          </v-responsive>
        </v-responsive>
        <v-btn class="select-num-num-refresh" icon color="green" @click.stop="setNum">
          <v-icon :large="mobileSize>40" >mdi-sync</v-icon>
        </v-btn>
      </div>
      <v-btn
        class="mt-sm-4 mt-2 select-num-num-buy text-capitalize"
        depressed
        :loading="isReloading"
        :small="mobileSize===30"
        :large="mobileSize>30"
        color="primary"
        :disabled="!calcOnSale"
        @click="showLotteryCar"
      >
        Buy Now
      </v-btn>
    </div>
  </v-card>
</template>

<script>
  import CountDown from '@/components/func/count-down'
  import LotteryTips from '@/components/common/lottery-tips/lottery-tips'
  import {mapGetters, mapMutations} from 'vuex'
  import { fillZero } from '@/utils'
  import { eventTracking, eventKey } from '@/utils/fireBase'
  export default {
    name: 'selectNum',
    components: {
      CountDown,
      LotteryTips
    },
    props: {
      gameData: {
        type: Object,
        default() {
          return {}
        }
      },
      lotteryData: {
        type: Object,
        default() {
          return {
            id: process.env.VUE_APP_905_ID
          }
        }
      },
      type: {
        default: '1'
      }
    },
    data() {
      return {
        selectNumData: [],
        newTime: 0,
        gameTime: {
          hh: 0,
          mm: 0,
          ss: 0,
        },
        loadTimes: 20, // 数据异常，重试20次
        timer: null,
        numWidth: 50,
        beginTime: 0,
        id905: process.env.VUE_APP_905_ID,
        isReloading: false
      }
    },
    deactivated() {
      this.clearCutOffTimer()
    },
    beforeDestory() {
      this.clearCutOffTimer()
    },
    computed: {
      ...mapGetters(['isLogin', 'platformName']),
      mobileSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 30
          case 'sm': return 40
          default : return 60
        }
      },
      calcOnSale() {
        return this.lotteryData.IssueStat === '100' && this.newTime > 0 && this.lotteryData.startTime >= 0
      }
    },
    watch: {
      'lotteryData': {
        handler() {
          this.initTime()
          this.setNum()
        },
        immediate: true,
        deep: true
      },
    },
    methods: {
      ...mapMutations(['SET_LOTTERYCAR', 'SET_LOTTERYDATA']),
      initTime() { // 初始化时间
        if (!this.lotteryData || !this.lotteryData.id) return
        const start = new Date().getTime()
        this.newTime = Math.floor((this.lotteryData.end - start) / 1000)
        this.loadTimes = 20
      },
      // 获取随机数
      setNum() {
        let length = 5
        if (this.lotteryData.id === process.env.VUE_APP_905_ID) {
          length = 5
        } else {
          length = 3
        }
        var getNum = function(arr, n) {
          let x = 0
          if (n === 5) {
            x = parseInt((Math.random() * 90) + 1)
          } else {
            x = parseInt((Math.random() * 10))
          }
          // 90选5数字前需要加0
          if (x < 10 && n === 5) {
            x = '0' + x
          }
          // 90选5数字不能重复
          if (arr.length > 0 && n === 5) {
            if (arr.includes(x)) {
              getNum(arr, n)
            } else {
              arr.push(x)
            }
          } else {
            arr.push(x)
          }
          return arr
        }
        this.selectNumData = []
        for (let n = 0; n < length; n++) {
          getNum(this.selectNumData, length)
        }
      },
      // 设置时间格式
      setTime(time, type) {
        if (time < 0) time = 0
        let day = Math.floor(time / (24 * 3600)) // Math.floor()向下取整
        if (type === 'day') return day
        let hh = fillZero(Math.floor((time - day * 24 * 3600) / 3600))
        if (type === 'hh') return hh
        let mm = fillZero(Math.floor((time - day * 24 * 3600 - hh * 3600) / 60))
        if (type === 'mm') return mm
        let ss = fillZero(time - day * 24 * 3600 - hh * 3600 - mm * 60)
        if (type === 'ss') return ss
      },
      // 打开购物车
      showLotteryCar() {
        let fireObj = {
          buyClick: this.gameData.name
        }
         // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_HOME_QUICK_LOTTERY, this.gameData.name, fireObj)
        // window._czc.push(['_trackEvent', this.platformName + '-quicklottery', this.lotteryData.name + 'Buy'])
        if (!this.isLogin) {
          this.$router.push({name: 'login'})
          return
        }
        let obj = {
          GameID: this.lotteryData.id,
          Issue: this.lotteryData.Issue,
          winMoney: this.lotteryData.MaxWinMoney,
          MoneyPerBet: this.lotteryData.MoneyPerBet,
          PlayType: this.lotteryData.PlayType,
          time: this.newTime,
          selectNumData: this.selectNumData
        }
        this.SET_LOTTERYDATA(obj)
        this.SET_LOTTERYCAR(true)
      },
      cutOff() {
        const timeout = 10000 * (21 - this.loadTimes)
        if (this.loadTimes <= 0 || this.cutOffTimer) return
        this.cutOffTimer = setTimeout(() => {
          this.refresh()
        }, timeout)
      },
      clearCutOffTimer() {
        this.cutOffTimer && clearTimeout(this.cutOffTimer)
        this.cutOffTimer = null
      },
      // 刷新数据
      refresh() {
        this.clearCutOffTimer()
        if (this.isReloading) return
        if (!this.calcOnSale) {
          this.isReloading = true
          this.$emit('timeStatus', this.gameData, () => {
            this.loadTimes--
            setTimeout(() => {
              this.isReloading = false
            }, 500)
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .num-border{
    padding: 1px;
  }
  .select-num-num-refresh{
    color: @font-color3 !important;
  }
</style>
