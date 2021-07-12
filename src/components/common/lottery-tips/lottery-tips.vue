<template>
  <div class="lottery-tips">
    <p class="on-sale-single-top-desc text--secondary text-sm-subtitle-2 text-caption text-right">{{isOnSaleTime ? 'Returning' : 'Sales Closed'}}</p>
    <p class="on-sale-single-top-desc text--secondary text-sm-subtitle-1 text-caption text-right">{{ calcTips }}</p>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    lotteryInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    loadTimes: {
      default: 10
    }
  },
  data() {
    return {
      id905: Number(process.env.VUE_APP_905_ID), // 5/90id
      id3D: Number(process.env.VUE_APP_3D_ID), // 3D
      idFootball: Number(process.env.VUE_APP_FOOTBALL_ID) // fooball
    }
  },
  computed: {
    calcGameId() {
      return Number((this.lotteryInfo.id || (this.lotteryInfo.detail && this.lotteryInfo.detail.GameID)) || '')
    },
    isOnSaleTime() {
      if (!this.calcGameId || this.calcGameId === this.idFootball) {
        return true
      }
      const now = this.$common.getRealTime().getHours()
      let s = 7
      let e = 19
      if (this.calcGameId === this.id3D) {
        s = 10
        e = 22
      }
      return now >= s && now < e
    },
    calcTips() {
      if (this.isOnSaleTime || this.calcGameId === this.idFootball) {
        return ' '
      }
      if (this.calcGameId === this.id905) {
        return 'Selling time: 7:00am - 7:00pm'
      }
      return 'Selling time: 10:00am - 10:00pm'
    }
  },
  watch: {
    isOnSaleTime: {
      immediate: true,
      handler(newVal) {
        this.cutOff()
      }
    },
    loadTimes() {
      this.cutOff()
    }
  },
  methods: {
    cutOff() {
      if (this.isOnSaleTime) {
        this.$emit('cutOff', 60000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.lottery-tips{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p{
    text-align: right;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 0 !important;
    &:first-child{
      font-size: 16px !important;
      color: @font-color1 !important;
      line-height: 22px !important;
    }
    &:last-child{
      line-height: 22px;
      height: 22px;
      margin-bottom: 0 !important;
    }
  }
}
</style>
