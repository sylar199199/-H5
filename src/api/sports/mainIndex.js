import ajax from '@/utils/ajax.js'
// import { leftMenu } from '@/api/baseConfig'
// 操作日志
export default {
  // 查询bananer信息
  bananerPage: (options = {}) => ajax.post('/notice/un/bananerPage', options),
  // 获取大礼包
  getUnpopDiscount: (options = {}) => ajax.post('/coupon/api/getUnpopDiscount', options),
}
