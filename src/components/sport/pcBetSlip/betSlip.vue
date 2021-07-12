<template>
  <div class="bet-slip">
    <div class="bet-slip-btn d-flex flex-column justify-center align-center" v-ripple @click="blBetSlipShow = !blBetSlipShow">
      <v-img class="flex-grow-0" width="12" height="11" aspect-ratio="12/11" src="~@/assets/img/components/pc/settle-accounts/icon_top.png" v-show="!blBetSlipShow"></v-img>
      <v-img class="flex-grow-0" width="12" height="11" aspect-ratio="12/11" src="~@/assets/img/components/pc/settle-accounts/icon_bottom.png" v-show="blBetSlipShow"></v-img>

      <BetSlipIcon class="bet-slip-btn-info" :len="betList.length" />
    </div>

    <BetSlipMain v-model="blBetSlipShow" v-on="$listeners" ref="betSlipMain" />
  </div>
</template>
<script>
import BetSlipIcon from './betSlipIcon'
import BetSlipMain from './betSlipMain'
import { mapGetters } from 'vuex'
export default {
  components: {
    BetSlipIcon,
    BetSlipMain
  },
  props: {},
  data() {
    return {
      blBetSlipShow: false
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['betList']),
    blHasList() {
      return this.betList.length > 0
    }
  },
  watch: {
    blHasList() {
      this.blBetSlipShow = false
    }
  },
  methods: {
    getData(...args) {
      this.$refs.betSlipMain.getData(...args)
    },
    checkBetNow(...args) {
      this.$refs.betSlipMain.checkBetNow(...args)
    },
    changeStyle(...args) {
      this.$refs.betSlipMain.changeStyle(...args)
    },
    hideDialog() {
      this.$refs.betSlipMain.hideDialog()
    }
  }
}
</script>

<style lang="less" scoped>
.bet-slip{
  &-btn{
    width: 160px;
    height: 70px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #5DA400;
    cursor: pointer;
    &-info{
      margin-top: 4px;
      /deep/ .v-chip{
        width: 24px;
        height: 24px;
        padding: 0;
        display: inline-block;
        text-align: center;
      }
    }
  }
}
</style>
