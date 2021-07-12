export default {
  name: 'search',

  state: {
    blSearchBarShow: true, // 顶部搜索栏是否在显示
    blShowSearchInput: true, // 是否显示搜索框
    searchKey: '', // 搜索内容
    searchState: false, // 是否发起了搜索请求
    sportsSearchInfo: {} // sports筛选条件
  },

  getters: {
    blSearchBarShow: (state) => state.blSearchBarShow,
    blShowSearchInput: (state) => state.blShowSearchInput,
    searchKey: (state) => state.searchKey,
    searchState: (state) => state.searchState,
    sportsSearchInfo: (state) => state.sportsSearchInfo,
  },

  mutations: {
    SET_BL_SEARCH_BAR_SHOW(state, data) {
      state.blSearchBarShow = data
    },
    SET_BL_SHOW_SEARCH_INPUT(state, data) {
      state.blShowSearchInput = data
    },
    SET_SEARCH_KEY(state, data) {
      state.searchKey = data
    },
    SET_SEARCH_STATE(state, data) {
      state.searchState = data
    },
    SET_SPORTS_SEARCH_INFO(state, data) { // 修改sports列表筛选条件
      if (data) {
        state.sportsSearchInfo = {
          ...state.sportsSearchInfo,
          ...data
        }
      } else {
        state.sportsSearchInfo = {}
      }
    }
  },

  actions: {

  }
}
