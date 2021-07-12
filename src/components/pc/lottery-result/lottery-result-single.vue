<template>
  <div class="lottery-result-single" @click="linkResult(resultInfo)">
    <div class="lottery-result-single-t d-flex justify-space-between align-center font-weight-medium">
      <div class="lottery-result-single-t-tit font-weight-medium">{{resultInfo.GameName}}</div>
      <div class="lottery-result-single-t-no">NO. {{ resultInfo.LastDrawIssue }}</div>
    </div>
    <ul class="lottery-result-single-main d-flex">
      <template v-for="(n, i) in calcNums">
        <li
          class="lottery-result-single-main-li text-center"
          :class="calcNums.length > 8 ? 'type2' : ''"
          :key="i"
          v-if="n"
        >
          <!--90选5开奖结果号码小于10情况下第一位补0-->
          {{ setContent(n) }}
        </li>
      </template>
    </ul>
    <div class="lottery-result-single-win font-weight-medium">{{!calcFootball ? 'Win':'Jackpot'}}: ₦ {{ resultInfo.MaxWin / 100 | fmoney }}</div>
  </div>
</template>
<script>
import linkResultMixins from '@/views/lottery/lotteryList/mixins/linkResultMixins'
import { fillZero } from '@/utils'
export default {
  name: '',
  mixins: [linkResultMixins],
  props: {
    resultInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      id905: Number(process.env.VUE_APP_905_ID), // 90/5
      idFootball: Number(process.env.VUE_APP_FOOTBALL_ID) // fooball
    }
  },
  created() {
  },
  computed: {
    calcNums() {
      return this.resultInfo.Numbers ? this.resultInfo.Numbers.split('|') : []
    },
    calcFootball() {
      return Number(this.resultInfo.GameID) === this.idFootball
    },
    calc905() {
      return Number(this.resultInfo.GameID) === this.id905
    }
  },
  mounted() {
  },
  methods: {
    setContent(n) {
      if (this.calcFootball) {
        let str = n
        switch (n) {
          case '2': str = 'X'; break
          case '4': str = '2'; break
          case '7': str = '*'; break
        }
        return str
      } else if (this.calc905) {
        return fillZero(n)
      }
      return n
    }
  }
}
</script>

<style lang="less" scoped>
.lottery-result-single{
  margin: 0 10px;
  padding: 10px 0 15px;
  cursor: pointer;
  &-t{
    margin-bottom: 6px;
    &-tit{
      font-size: 16px;
      line-height: 18px;
    }
    &-no{
      font-size: 12px;
      color: @font-color2;
    }
  }
  &-main{
    padding: 0;
    margin-bottom: 10px;
    &-li{
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background: #FFFFFF;
      box-sizing: border-box;
      border: 1px solid @primary;
      font-size: 14px;
      line-height: 18px;
      color: @primary;
      margin-right: 10px;
      flex-shrink: 0;
      padding: 0 1px;
      &.type2{
        width: auto;
        min-width: 14px;
        height: 20px;
        line-height: 18px;
        border-radius: 0;
        margin: 2px 2px 2px 0 !important;
      }
    }
  }
}
</style>
