<template>
  <div class="winner-info">
    <div class="winner-info-t winner-info-item d-flex justify-space-between align-center">
      <div class="winner-info-t-win font-weight-medium">₦{{ winnerInfo.winAmount | fmoney }}</div>
      <div class="winner-info-item-info"></div>
    </div>
    <div class="winner-info-b winner-info-item d-flex justify-space-between align-center">
      <div class="winner-info-b-name">{{ winnerInfo.gameName || '' }}</div>
      <div class="winner-info-item-info">{{ winnerInfo.userAccount || '' }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    winnerInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.winner-info{
  background: #F7F7F7;
  margin: 0 10px;
  height: 62px;
  box-sizing: border-box;
  padding: 10px 10px 0;
  div{
    line-height: 1 !important;
  }
  &-t{
    margin-bottom: 16px;
    &-win{
      font-size: 14px;
      color: @font-color1;
    }
  }
  &-b{
    &-name{
      font-size: 14px;
      color: @font-color2;
    }
  }
  &-item{
    &-info{
      font-size: 12px;
      color: @font-color2;
    }
  }
}
</style>
