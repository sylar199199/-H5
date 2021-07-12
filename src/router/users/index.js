
// 登录
const login = () => import(/* webpackChunkName: "login" */ '@/views/users/login/login')
// 注册
const register = () => import(/* webpackChunkName: "register" */ '@/views/users/register/register')
// 注册检查页
const registerCheck = () => import(/* webpackChunkName: "register" */ '@/views/users/register/RegisterCheck')
// 注册确认页
const registerSure = () => import(/* webpackChunkName: "register" */ '@/views/users/register/RegisterSure')
// 注册成功页
const registerSuccess = () => import(/* webpackChunkName: "register" */ '@/views/users/register/RegisterSuccess')
// 注册协议
const registrationProtocol = () => import(/* webpackChunkName: "registrationProtocol" */ '@/views/users/register/registrationProtocol')
// 重置密码
const resetPassword = () => import(/* webpackChunkName: "resetPassword" */ '@/views/users/register/resetPassword')
// 重置密码成功
const resetPasswordSuccess = () => import(/* webpackChunkName: "resetPassword" */ '@/views/users/register/ResetPasswordSuccess')
// 设置密码
const retrievePassword = () => import(/* webpackChunkName: "retrievePassword" */ '@/views/users/retrievePassword/retrievePassword')
// 验证码接受异常页面
const receiveEmailFail = () => import(/* webpackChunkName: "retrievePassword" */ '@/views/users/receiveEmailFail/ReceiveEmailFail')
// 个人中心
const account = () => import(/* webpackChunkName: "accountCenter" */ '@/views/users/account/account')
// 编辑个人中心
const editProfile = () => import(/* webpackChunkName: "editProfile" */ '@/views/users/account/editProfile')
// 消息列表
const message = () => import(/* webpackChunkName: "message" */ '@/views/users/message/message')
// 消息详情
const messageDetail = () => import(/* webpackChunkName: "messageDetail" */ '@/views/users/message/messageDetail')
// 支付密码
const paymentPassword = () => import(/* webpackChunkName: "paymentPassword" */ '@/views/users/paymentPassword/paymentPassword')
// 充值
const recharge = () => import(/* webpackChunkName: "recharge" */ '@/views/users/recharge/recharge')
// 提现
const withdraw = () => import(/* webpackChunkName: "withdraw" */ '@/views/users/withdraw/withdraw')
// 提现成功
const withdrawalsSuccess = () => import(/* webpackChunkName: "withdrawalsSuccess" */ '@/views/users/withdraw/withdrawalsSuccess')
// 充值成功
const rechargeSuccess = () => import(/* webpackChunkName: "rechargeSuccess" */ '@/views/users/recharge/rechargeSuccess')
// 帮助页面
const help = () => import(/* webpackChunkName: "help" */ '@/views/users/help/help')
// 优惠券
const giftList = () => import(/* webpackChunkName: "giftList" */ '@/views/users/giftList/giftList')
// 游戏投注记录
const gameBetHistory = () => import(/* webpackChunkName: "gameBetHistory" */ '@/views/users/gameBetHistory/gameBetHistory')
// 流水
const transactions = () => import(/* webpackChunkName: "transactions" */ '@/views/users/transactions/transactions')
// 银行卡管理
const bankAccount = () => import(/* webpackChunkName: "bankAccount" */ '@/views/users/bankAccount/bankAccount')
// 添加银行卡
const addBankCard = () => import(/* webpackChunkName: "addBankCard" */ '@/views/users/bankAccount/addBankCard')
// 竞彩游戏投注记录
const sportBetHistory = () => import(/* webpackChunkName: "sportBetHistory" */ '@/views/users/sportBetHistory/sportBetList')
const ticketDetail = () => import(/* webpackChunkName: "ticketDetail" */ '@/views/users/sportBetHistory/ticketDetail')
// 设置主题颜色
const theme = () => import(/* webpackChunkName: "theme" */ '@/views/users/theme/theme')
// lottery投注记录
const lotteryBetHistory = () => import(/* webpackChunkName: "lotteryBetHistory" */ '@/views/users/lotteryBetHistory/lotteryBetList')
// 代理人结算页
const affiliates = () => import('@/views/users/affiliates/affiliates')
// lottery投注详情
const lotteryTicketDetail = () => import(/* webpackChunkName: "ticketDetail" */ '@/views/users/lotteryBetHistory/ticketDetail')
// 邀请送礼包
const invitationGift = () => import(/* webpackChunkName: "promotion" */ '@/views/users/promotion/invitationGift')
// 下载送礼包
const downloadGift = () => import(/* webpackChunkName: "promotion" */ '@/views/users/promotion/downloadGift')
// 注册送礼包
const registerGift = () => import(/* webpackChunkName: "promotion" */ '@/views/users/promotion/registerGift')

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Log In',
      navIndex: 4,
      haveNav: true,
      keepAlive: true
    },
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Register',
      navIndex: 4,
      keepAlive: true
    },
    component: register,
  },
  {
    path: '/registerCheck',
    name: 'registerCheck',
    meta: {
      title: 'Register',
      navIndex: 4,
      keepAlive: true
    },
    component: registerCheck,
  },
  {
    path: '/registerSure',
    name: 'registerSure',
    meta: {
      title: 'Registration confirm',
      navIndex: 4,
      keepAlive: true
    },
    component: registerSure,
  },
  {
    path: '/registerSuccess',
    name: 'registerSuccess',
    meta: {
      title: 'Register',
      navIndex: 4,
      keepAlive: true
    },
    component: registerSuccess,
  },
  {
    path: '/retrievePassword',
    name: 'retrievePassword',
    meta: {
      title: 'Change Password',
      navIndex: 4
    },
    component: retrievePassword,
  },
  {
    path: '/receiveEmailFail',
    name: 'receiveEmailFail',
    meta: {
      title: 'Change Password',
      navIndex: 4
    },
    component: receiveEmailFail,
  },
  {
    path: '/registrationProtocol',
    name: 'registrationProtocol',
    meta: {
      title: 'Register',
      navIndex: 4,
      keepAlive: true
    },
    component: registrationProtocol,
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    meta: {
      title: 'Reset Password',
      navIndex: 4
    },
    component: resetPassword,
  },
  {
    path: '/resetPasswordSuccess',
    name: 'resetPasswordSuccess',
    meta: {
      title: 'Reset Password',
      navIndex: 4
    },
    component: resetPasswordSuccess,
  },
  {
    path: '/paymentPassword',
    name: 'paymentPassword',
    meta: {
      title: 'Set Password',
      navIndex: 4
    },
    component: paymentPassword,
  },
  {
    path: '/account',
    name: 'account',
    meta: {
      title: 'Personal Center',
      navIndex: 4,
      haveNav: true,
      // keepAlive: true
    },
    component: account
  },
  {
    path: '/account/editProfile',
    name: 'editProfile',
    meta: {
      title: 'Edit Profile',
      navIndex: 4
    },
    component: editProfile
  },
  {
    path: '/account/giftList',
    name: 'giftList',
    meta: {
      title: 'Coupon',
      navIndex: 4,
      keepAlive: true
    },
    component: giftList
  },
  {
    path: '/account/gameBetHistory',
    name: 'gameBetHistory',
    meta: {
      title: 'Game bet history',
      navIndex: 4
    },
    component: gameBetHistory
  },
  {
    path: '/account/transactions',
    name: 'transactions',
    meta: {
      title: 'Transaction History',
      navIndex: 4
    },
    component: transactions
  },
  // 投注记录列表页面
  {
    path: '/sportBetHistory',
    name: 'sportBetHistory',
    meta: {
      title: 'Sports Bet History',
      navIndex: 4
    },
    component: sportBetHistory
  },
  // 投注记录详情页面
  {
    path: '/ticketDetail',
    name: 'ticketDetail',
    meta: {
      title: 'TicketDetail',
      navIndex: 4
    },
    component: ticketDetail
  },
  // lottery投注记录列表页面
  {
    path: '/lotteryBetHistory/:gameId', // gameId-游戏id
    name: 'lotteryBetHistory',
    meta: {
      title: 'Lottery Bet History',
      navIndex: 4
    },
    component: lotteryBetHistory
  },
  // lottery投注记录详情页面
  {
    path: '/lotteryTicketDetail/:orderid', // id-订单编号
    name: 'lotteryTicketDetail',
    meta: {
      title: 'Details',
      navIndex: 4
    },
    component: lotteryTicketDetail
  },
  {
    path: '/message',
    name: 'message',
    meta: {
      title: 'Messages',
      navIndex: 4
    },
    component: message
  },
  {
    path: '/messageDetail',
    name: 'messageDetail',
    meta: {
      title: 'Messages',
      navIndex: 4
    },
    component: messageDetail
  },
  {
    path: '/recharge',
    name: 'recharge',
    meta: {
      title: 'Deposits',
      navIndex: 4
    },
    component: recharge
  },
  {
    path: '/rechargeSuccess',
    name: 'rechargeSuccess',
    meta: {
      title: 'Deposit Success',
      navIndex: 4
    },
    component: rechargeSuccess
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    meta: {
      title: 'Withdraw',
      navIndex: 4
    },
    component: withdraw
  },
  {
    path: '/withdrawalsSuccess',
    name: 'withdrawalsSuccess',
    meta: {
      title: 'Withdrawals Success',
      navIndex: 4
    },
    component: withdrawalsSuccess
  },
  {
    path: '/bankAccount',
    name: 'bankAccount',
    meta: {
      title: 'Bank Account List',
      navIndex: 4
    },
    component: bankAccount
  },
  {
    path: '/addBankCard',
    name: 'addBankCard',
    meta: {
      title: 'Add Bank Card',
      navIndex: 4
    },
    component: addBankCard
  },
  {
    path: '/help',
    name: 'Help',
    meta: {
      title: 'Help',
      navIndex: 4,
      // keepAlive: true
    },
    component: help
  },
  {
    path: '/theme',
    name: 'theme',
    meta: {
      title: 'Theme',
      navIndex: 4
    },
    component: theme
  },
  {
    path: '/affiliates',
    name: 'affiliates',
    meta: {
      title: 'Online-Agent',
      navIndex: 4
    },
    component: affiliates
  },
  // 邀请送礼包
  {
    path: '/promotion/invitationGift',
    name: 'invitationGift',
    meta: {
      title: 'Promotion',
      navIndex: 4
    },
    component: invitationGift
  },
  {
    path: '/promotion/downloadGift',
    name: 'downloadGift',
    meta: {
      title: 'Promotion',
      navIndex: 4,
      keepAlive: true
    },
    component: downloadGift
  },
  {
    path: '/promotion/registerGift',
    name: 'registerGift',
    meta: {
      title: 'Promotion',
      navIndex: 4
    },
    component: registerGift
  },
]
