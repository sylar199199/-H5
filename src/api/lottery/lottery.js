import ajax from '@/utils/ajax.js'
import { lotteryBaseUrl } from '@/api/baseConfig'
const BASE_URL = '/'

export default {
  lotteries: (options = {}) => ajax.post('lottery/lotteries', {options, baseURL: BASE_URL}),
  histories: (options = {}) => ajax.post('lottery/histories', {options, baseURL: BASE_URL}),
  // sharedTopic: (options = {}) => ajax.post('lottery/sharedTopic', {options, baseURL: BASE_URL}),
  // 查询游戏期
  gameIssue: (options = {}) => ajax.post('/engine/T300111', {
    ...options,
    normalData: true,
    frontSN: true,
    Lang: 'en_US',
    FrontSN: options.data.FrontSN,
    baseURL: lotteryBaseUrl
  }),
  // 投注
  gameBet: (options = {}) => ajax.post('/engine/T301200', {
    ...options,
    normalData: true,
    frontSN: true,
    Lang: 'en_US',
    FrontSN: options.data.FrontSN,
    baseURL: lotteryBaseUrl
  }),
  // 查询游戏列表
  gameList: (options = {}) => ajax.get('/game/un/gameList', options),
  // 心跳
  heartbeat: (options = {}) => ajax.post('/engine/T300100', {
    ...options,
    normalData: true,
    frontSN: true,
    Lang: 'en_US',
    FrontSN: options.data.FrontSN,
    baseURL: lotteryBaseUrl
  }),
  // 时间同步
  updateTime: (options = {}) => ajax.post('/engine/T300101', {
    ...options,
    normalData: true,
    Lang: 'en_US',
    baseURL: lotteryBaseUrl
  }),
  // 开奖公告
  getLotteryResult: (options = {}) => ajax.post('/engine/T300153', {
    ...options,
    normalData: true,
    frontSN: true,
    Lang: 'en_US',
    FrontSN: options.data.FrontSN,
    baseURL: lotteryBaseUrl
  }),
  // 游戏列表详情
  getGameInfo: (options = {}) => ajax.post('/engine/T300154', {
    ...options,
    normalData: true,
    frontSN: true,
    Lang: 'en_US',
    FrontSN: options.data.FrontSN,
    baseURL: lotteryBaseUrl
  }),
  // 查询投注记录
  getBetHistory: (options = {}) => ajax.post('/engine/T300140', {
    ...options,
    normalData: true,
    frontSN: true,
    FrontSN: options.data.FrontSN,
    baseURL: lotteryBaseUrl,
    Lang: 'en_US'
  }),
  // 投注详情 300141
  getBetDetail: (options = {}) => ajax.post('/engine/T300141', {
    ...options,
    normalData: true,
    frontSN: true,
    Lang: 'en_US',
    FrontSN: options.data.FrontSN,
    baseURL: lotteryBaseUrl
  }),
  // 投注详情 300141
  getLotteryMatchDetail: (options = {}) => ajax.post('/engine/T300113', {
    ...options,
    normalData: true,
    frontSN: true,
    Lang: 'en_US',
    FrontSN: options.data.FrontSN,
    baseURL: lotteryBaseUrl
  }),
  // 赛事信息
  guessingMsg: (options = {}) => ajax.post('/engine/T300113', {
    ...options,
    normalData: true,
    Lang: 'en_US',
    baseURL: lotteryBaseUrl
  }),
  // 查询可销售游戏
  checkSaleGame: (options = {}) => ajax.post('/engine/T300110', {
    ...options,
    normalData: true,
    Lang: 'en_US',
    baseURL: lotteryBaseUrl
  }),
}
