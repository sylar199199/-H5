import { mapGetters } from 'vuex'
export const userBalanceMinxins = {
  computed: {
    ...mapGetters(['blUserBalanceShow']),
    blMoneyShow: {
      get() {
        return this.blUserBalanceShow
      },
      set(val) {
        this.$store.commit('SET_BL_USER_BALANCE_SHOW', val)
      }
    }
  }
}
