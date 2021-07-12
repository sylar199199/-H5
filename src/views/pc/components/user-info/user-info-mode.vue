<template>
  <div class="user-info-modes">
    <v-btn height="32" class="text-capitalize" color="primary" outlined @click="blToolsShow = !blToolsShow">Bet History</v-btn>

    <FuncTools class="user-info-modes-list" :toolList="toolList" v-model="blToolsShow" />
  </div>
</template>
<script>
import FuncTools from './func-tools'
export default {
  components: {
    FuncTools
  },
  data() {
    return {
      toolList: [
        {id: 1, text: 'Sports History', to: 'pcSportBetHistory'},
        {id: 2, text: 'Lottery History', to: 'pcLotteryBetHistory'}
      ],
      blToolsShow: false
    }
  }
}
</script>

<style lang="less" scoped>
.user-info-modes{
  position: relative;
  &-list{
    left: 0;
  }
  @media screen and (max-width: 1200px) {
    &-list {
      left: calc(-50% - 60px);
    }
  }
}
</style>
