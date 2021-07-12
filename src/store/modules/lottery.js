
export default {
  name: 'lottery',

  state: {
    gameIssueData: {},
    MoneyPerBet: {},
    gameList: [],
    betArr: [],
    betMoneyObj: {},
    WagerIssue: []
  },

  getters: {
    betArr: state => state.betArr,
    gameIssueData: state => state.gameIssueData,
    betMoneyObj: state => state.betMoneyObj,
    WagerIssue: state => state.WagerIssue
  },

  mutations: {
    SET_BETARR(state, data) {
      // football14投注
      state.betArr = data
    },
    SET_BETMONEYOBJ(state, data) {
      state.betMoneyObj = data
    },
    SET_GAMEISSUEDATA(state, data) {
      // storage.set('betLists', data)
      state.gameIssueData = data
    },
    // 投注期号
    SET_WAGERISSUE(state, data) {
      state.WagerIssue = data
    },
  },

  actions: {

  }
}
