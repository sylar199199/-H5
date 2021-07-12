<template>
  <div>
    <!--lottery购物车-->
    <IlotLotteryBet v-if="lotteryCarStatus" @successData="successData" />

    <!--投注成功弹窗-->
    <BetSuccess v-if="showSuccessTip" :betSuccessData="betSuccessData" @closePop="closePop" />
  </div>
</template>

<script>
import mixins from './mixins/mixins'
export default {
  name: 'ilotLotteryBetMain',
  components: {
    IlotLotteryBet: () => import('./ilotLotteryBet'),
    BetSuccess: () => import('./betSuccess')
  },
  mixins: [mixins],
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .num-border{
    padding: 1px;
  }
</style>
