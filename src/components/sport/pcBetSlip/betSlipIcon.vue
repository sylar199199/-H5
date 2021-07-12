<template>
  <div class="bet-slip-icon size-4 font-weight-medium">
    Betslip<v-chip class="bet-slip-icon-num" color="primary">{{ len }}</v-chip>
  </div>
</template>
<script>
export default {
  props: {
    iconSize: {
      type: Number
    },
    len: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.bet-slip-icon{
  color: @primary;
  &-num{
    margin-left: 5px;
  }
}
</style>
