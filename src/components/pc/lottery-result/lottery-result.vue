<template>
  <div class="lottery-result">
    <div class="lottery-result-tit font-weight-medium">Lottery Result</div>

    <v-divider class="lottery-result-divider"></v-divider>

    <template v-for="item in resultList">
      <LotteryResultSingle class="lottery-result-single" :resultInfo="item" :key="item.id" />
    </template>
  </div>
</template>
<script>
import LotteryResultSingle from './lottery-result-single'
export default {
  name: '',
  components: {
    LotteryResultSingle
  },
  props: {},
  data() {
    return {
      resultList: [],
      gameIdArr: [
        {
          name: '3D',
          id: process.env.VUE_APP_3D_ID
        },
        {
          name: '90/5',
          id: process.env.VUE_APP_905_ID
        },
        {
          name: 'football13',
          id: process.env.VUE_APP_FOOTBALL_ID
        }
      ]
    }
  },
  created() {
  },
  mounted() {
    this.getLotteryResult()
  },
  methods: {
    // 获取开奖公告
    async getLotteryResult () {
      let Format01 = {}
      let Format02 = []
      this.gameIdArr.forEach(val => {
        let obj = {
          GameID: val.id,
          Issue: '-1'
        }
        Format02.push(obj)
      })
      const res = await this.$api.getLotteryResult({
        data: {Format01, Format02}
      })
      if (res.RetCode !== '0') return
      this.resultList = res.Format02 || []
      // this.setShowData(res.Format02)
    }
  }
}
</script>

<style lang="less" scoped>
.lottery-result{
  background: #fff;
  min-height: 350px;
  &-tit{
    font-size: 16px;
    color: @font-color1;
    line-height: 16px;
    padding: 20px 10px;
  }
  &-divider{
    margin: 0 10px;
  }
  &-single{
    border-bottom: 1PX solid @dividing-line-color;
    margin-bottom: 4px;
    &:last-child{
      border: none;
    }
  }
}
</style>
