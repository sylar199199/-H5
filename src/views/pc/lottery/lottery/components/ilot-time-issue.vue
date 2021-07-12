<template>
  <div class="time-issue">
    <p class="time-issue-date font-weight-medium">
      {{this.gameIssueData.Issue}}<span class="text-body-2 text--disabled text-truncate">Cut-off: {{gameIssueData.EndSaleTime | timeFormat}}</span>
    </p>
    <span class="time-issue-time font-weight-medium">{{ calcShowTime }}</span>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters} from 'vuex'
  import { throttle } from '@/utils'

  export default {
    name: 'timeAndIssue',
    props: [
      'GameID'
    ],
    data() {
      return {
        timer: null, // 心跳timer
        secondCount: 0, // 秒心跳，每一秒加1
        newdate: this.$moment(new Date()).format('DD/MM/yy HH:mm:ss'), // 当前时间，时钟
        lastTime: 0, // 停止销售时间-当前时间
        timeIssue: 0
      }
    },
    created() {
    },
    mounted() {
      this.gameIssue()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    computed: {
      ...mapGetters(['gameIssueData']),
      calcTime() {
        const t = this.lastTime - this.secondCount
        return t > 0 ? t : 0
      },
      calcShowTime() { // 变换倒计时时间，当小于0 重新获取期号
        let time = this.calcTime
        if (time > 0) {
          let timeData = ''
          let day = Math.floor(time / (24 * 3600)) // Math.floor()向下取整
          if (day > 0) {
            timeData = day + 'd:'
          }
          let hh = Math.floor((time - day * 24 * 3600) / 3600)
          if (hh > 0) {
            timeData += hh + 'h:'
          }
          let mm = Math.floor((time - day * 24 * 3600 - hh * 3600) / 60)
          timeData += mm + 'm:'
          let ss = time - day * 24 * 3600 - hh * 3600 - mm * 60
          timeData += ss + 's'
          return 'Time Left: ' + timeData
        } else {
          clearInterval(this.timer)
          if (this.lastTime > 0) this.beginGameIssueTimer(true)
          return 'Returning'
        }
      }
    },
    watch: {
      gameIssueData(newValue, oldValue) {
        this.callastTime()
      },
      deep: true
    },
    methods: {
      setClick() {
        this.timer = setInterval(() => {
          this.secondCount++
        }, 1000)
      },
      beginGameIssueTimer(bl) {
        if (bl) {
          this.timeIssue = 0
        }
        this.timeIssue += 10000
        setTimeout(() => {
          this.gameIssue()
        }, this.timeIssue)
      },
      // 游戏期数
      async gameIssue() {
        let data = {
          GameID: this.GameID,
          Issue: '-1',
          RecBegin: 0,
          QueryCount: 30
        }
          let res = await this.$api.gameIssue({ data })
        if (res.RetCode === '0') {
          this.$store.commit('SET_GAMEISSUEDATA', res.Format02[0])
        }
      },
      // 计算 lastTime 停止销售时间-当前时间
      callastTime: throttle(function () {
        let sec = new Date(this.$common.toMyLocalTime(this.gameIssueData.EndSaleTime, true)).getTime()
        let now = new Date().getTime()
        this.lastTime = parseInt((sec - now) / 1000)
        if (this.lastTime > 0) {
          this.setClick()
        } else {
          this.beginGameIssueTimer()
        }
      })
    },
  }
</script>

<style lang="less" scoped>
.time-issue{
  &-date{
    font-size: 14px;
    color: @font-color1;
    margin-bottom: 20px !important;
    span{
      color: @font-color2 !important;
      padding-left: 20px;
    }
  }
  &-time{
    font-size: 18px;
  }
}
</style>
