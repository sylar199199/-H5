import {mapGetters, mapMutations} from 'vuex'
export default {
  data() {
    return {
      showSuccessTip: false,
      betSuccessData: [] // 投注成功返回的值
    }
  },
  computed: {
    ...mapGetters(['lotteryCarStatus']),
  },
  methods: {
    ...mapMutations(['SET_LOTTERYCAR']),
    // 弹出lottery 成功弹窗
    successData(status, data) {
      this.SET_LOTTERYCAR(false)
      this.betSuccessData = data
      this.showSuccessTip = status
    },
    // 关闭投注成功弹窗
    closePop() {
      this.showSuccessTip = false
    }
  }
}
