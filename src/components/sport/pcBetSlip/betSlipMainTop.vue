<template>
  <div class="bet-slip-main-top d-flex justify-space-between align-center">
    <BetSlipIcon />

    <div class="bet-slip-main-top-del" v-ripple>
      <v-icon size="22">mdi-trash-can-outline</v-icon>Remove all
    </div>
  </div>
</template>
<script>
import BetSlipIcon from './betSlipIcon'
import { dialogMixin } from '@/mixins'
export default {
  components: {
    BetSlipIcon
  },
  mixins: [dialogMixin],
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
.bet-slip-main-top{
  height: 55px;
  padding: 0 20px 0 23px;
  /deep/ .bet-slip-icon{
    color: @font-color1;
    .v-chip{
      width: 20px;
      height: 20px;
      padding: 0;
      display: inline-block;
      text-align: center;
    }
  }
  &-del{
    color: @font-color1;
    cursor: pointer;
    padding: 15px 10px;
    margin-right: -10px;
    .v-icon{
      margin-right: 6px;
    }
  }
}
</style>
