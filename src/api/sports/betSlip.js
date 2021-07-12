import ajax from '@/utils/ajax.js'

export default {
  // 获取投注单列表
  // ticketList: (options = {}) => ajax.post('/sport/api/ticket/list?pageNo=' + options.data.pageNo, {
  //   ...options,
  //   baseURL: linshi
  // }),
  // 投注单下单
  ticketCreate: (options = {}) => ajax.post('/sport/api/ticket/create', {
    ...options,
    deviceId: '00-E1-8C-B8-14-4C'
  }),
  // 预下注
  multipleCreate: (options = {}) => ajax.post('/sport/un/ticket/pre_create', {
    ...options,
    closeLoading: true
  }),
  // 获取购物车信息
  betCart: (options = {}) => ajax.get('/sport/api/cart', options),
  // 保存购物车信息
  saveBetCart: (options = {}) => ajax.post('/sport/api/cart', {
    ...options,
    closeLoading: true
  }),
  // booking Code接口
  bookingCodeInfo: (options = {}) => ajax.get('/sport/un/ticket/booking_code', {...options}),
  // 获取投注单信息
  getTicketsInfo: (options = {}) => ajax.get('/sport/api/ticket/view', options),
  // 获取可用优惠券
  availableCoupon: (options = {}) => ajax.post('/coupon/api/availableCoupon', {
    ...options,
    closeLoading: true
  }),
  // 投注配置
  getCfg: (options = {}) => ajax.get('/sport/un/ticket/cfg', options),
}
