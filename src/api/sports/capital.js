import ajax from '@/utils/ajax.js'
// import { capital, market, game} from '@/api/baseConfig'


// 资金接口
export default {
  // 查询余额
  queryAccountInfo: (options = {}) => ajax.post('/funds/api/queryAccountInfo', options),
  // 银行列表
  bankList: (options = {}) => ajax.post('/funds/api/bankList', options),
  // 提现
  withDrawal: (options = {}) => ajax.post('/funds/api/withdrawal', options),
  // 支付
  payment: (options = {}) => ajax.post('/funds/api/payment', options),
  // 支付方式
  payMode: (options = {}) => ajax.post('/funds/api/payMode', options),
  // 账户流水
  transaction: (options = {}) => ajax.post('/funds/api/fundsDetail', options),
  // 账户列表
  bankAccountList: (options = {}) => ajax.post('/funds/api/accountBank', options),
  // 游戏投注记录
  gameBetList: (options = {}) => ajax.get('/game/un/getBetHistory', options),
  // 点击游戏
  clickGame: (options = {}) => ajax.get('/game/un/clickGame', options),
  // 体育投注记录
  sportBetList: (options = {}) => ajax.get('/sport/api/ticket/list', options),
  // 投注单详情
  ticketView: (options = {}) => ajax.get('/sport/api/ticket/view', options),
  // 获取cash out金额
  cashoutValue: (options = {}) => ajax.get('/sport/api/ticket/cashout', options),
  // cash out
  cashout: (options = {}) => ajax.post('/sport/api/ticket/cashout?id=' + options.data.id + '&bid=' + options.data.bid + '&value=' + options.data.value, options),
  // 充值结果查询
  checkDeposit: (options = {}) => ajax.post('/funds/api/payment/status', options),
  // 验证码校验
  checkPwdValid: (options = {}) => ajax.post('/funds/api/checkWithdrawalUserPwd', options),
  // 修改支付密码
  updatePayPwd: (options = {}) => ajax.post('/funds/api/accountUpdateUserPwd', options),
  // 添加银行卡
  addAccountBank: (options = {}) => ajax.post('/funds/api/addAccountBanks', options),
  // 删除银行卡
  delAccountBank: (options = {}) => ajax.post('/funds/api/delAccountBanks', options),
  // 优惠券列表
  giftList: (options = {}) => ajax.post('/coupon/api/queryCoupon', options),
}
