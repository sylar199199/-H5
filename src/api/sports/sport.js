import ajax from '@/utils/ajax.js'
// import { leftMenu } from '@/api/baseConfig'
// 操作日志
export default {
  // socketio d
  socketio: (options = {}) => ajax.ws('', options),
  // 商户销售统计列表
  mcAllList: (options = {}) => ajax.post('/group/reportForm', options),
  // 中奖排名
  winMessage: (options = {}) => ajax.post('/notice/un/page', options),
  // 轮播图接口
  slideshow: (options = {}) => ajax.post('/user/un/slideshow', options),
  // 国家列表(Region)
  getCountry: (options = {}) => ajax.get('/sport/un/s/v2/countries', options),
  // // 获取推荐国家列表
  // getRecommendedCountry: (options = {}) => ajax.get('/sport/un/s/v2/countries', options),
  // 锦标赛列表(League)
  getTournamentInfo: (options = {}) => ajax.get('/sport/un/s/v2/tournaments', options),
  // 筛选时间列表(Time)
  getSportTimeFilter: (options = {}) => ajax.get('/sport/un/s/v2/time_filter', options),
  // Top赛事列表(Top Games)
  getTopGame: (options = {}) => ajax.get('/sport/un/s/v2/top', options),
  // 获取top赛事列表
  // getTopGameDetails: (options = {}) => ajax.post('/sport/api/getTopGameDetails', options),
  // 推荐联赛列表(Quick select)
  getTournamentRecommend: (options = {}) => ajax.get('/sport/un/s/v2/tournaments/recommends', options),
  // 赛事列表(PreMatch/Live)
  queryMatch: (options = {}) => ajax.get('/sport/un/s/v2/matches', options),
  // 获取体育详情
  getMatchDetail: (options = {}) => ajax.get('/sport/un/s/v2/match', options),
  // 体育赛事统计(Live)
  // queryLiveMatchCount: (options = {}) => ajax.get('/sport/un/s/live/stat', options),
  // ws 测试
  testws: (options = {}) => ajax.ws('/socket/sportLive/queryMatchDetail', options),
  // 收藏赛事列表
  likeList: (options = {}) => ajax.get('/sport/un/s/v2/likeList', options),
  // 收藏赛事
  like: (options = {}) => ajax.post('/sport/un/s/v2/like', options),
  // 取消收藏赛事
  unLike: (options = {}) => ajax.post('/sport/un/s/v2/unLike', options),
  // 按队名搜索赛事列表
  queryMatchByTeamName: (options = {}) => ajax.get('/sport/un/s/v2/search', options),
  // v2
  queryMatchByTeamName2: (options = {}) => ajax.get('/sport/un/s/v2/search', options),
  // // 获取有效的比赛国家信息接口
  // getCountry: (options = {}) => ajax.post('/sport2/api/getCountry?sportId=' + options.data.sportId, {
  //   ...options,
  //   baseURL: capital
  // }),
  // 获取热门赛事
  queryH5HotSport: (options = {}) => ajax.post('/sport/un/s/v2/h5/queryH5HotSport', options),
}
