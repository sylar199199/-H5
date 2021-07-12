export default {
  name: 'betSlip',

  state: {
    betType: 0, // 投注类型
    betData: [],
    singleData: {
      ticketNum: 0,
      totalStake: 0,
      potentialWin: 0,
      moneyChange: false, // 单个金额是否改变
    },
    matchNum: [], // 赛事数量
    totalPotentialWin: 0, // 投注按钮上的预计奖金
    potentialMax: 0
  },

  getters: {
    betType: (state) => state.betType,
    betData: (state) => state.betData,
    singleData: (state) => state.singleData,
    matchNum: (state) => state.matchNum,
    totalPotentialWin: (state) => state.totalPotentialWin,
    potentialMax: (state) => state.potentialMax
  },

  mutations: {
    SET_BET_TYPE(state, data) {
      state.betType = data
    },
    SET_BET_DATA(state, data) {
      state.betData = data
    },
    SET_SINGLE_DATA(state, data) {
      state.singleData = data
    },
    SET_MATCH_NUM(state, data) {
      state.matchNum = data
    },
    SET_TOTAL_POTENTIAL_WIN(state, data) {
      state.totalPotentialWin = data
    },
    SET_POTENTIAL_MAX(state, data) {
      state.potentialMax = data
    }

  },

  actions: {

  }
}
