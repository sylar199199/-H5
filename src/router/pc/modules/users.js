// 用户页
const user = () => import(/* webpackChunkName: "pcAccount" */ '@/views/pc/users')
const account = () => import(/* webpackChunkName: "pcEditProfile" */ '@/views/pc/users/account/account')
const transactions = () => import(/* webpackChunkName: "pcTransactions" */ '@/views/pc/users/transactions/transactions')
// 充值
const recharge = () => import(/* webpackChunkName: "pcRecharge" */ '@/views/pc/users/recharge/recharge')
// 充值成功
const rechargeSuccess = () => import(/* webpackChunkName: "pcRechargeSuccess" */ '@/views/pc/users/recharge-success/recharge-success')
// 提现
const withdraw = () => import(/* webpackChunkName: "pcWithdraw" */ '@/views/pc/users/withdraw/withdraw')
// 提现成功
const withdrawalsSuccess = () => import(/* webpackChunkName: "pcWithdrawalsSuccess" */ '@/views/pc/users/withdrawals-success/withdrawals-success')
// 添加银行卡
const addBankCard = () => import(/* webpackChunkName: "pcAddBankCard" */ '@/views/pc/users/add-bank-card/add-bank-card')
// 优惠券
const giftList = () => import(/* webpackChunkName: "pcGiftList" */ '@/views/pc/users/gift-list/gift-list')
// 竞彩游戏投注记录
const sportBetHistory = () => import(/* webpackChunkName: "pcSportBetHistory" */ '@/views/pc/users/sport-bet-history/sport-bet-history')
const ticketDetail = () => import(/* webpackChunkName: "pcTicketDetail" */ '@/views/pc/users/sport-bet-history-details/sport-bet-history-details')
// lottery投注记录
const lotteryBetHistory = () => import(/* webpackChunkName: "pcLotteryBetHistory" */ '@/views/pc/users/lottery-bet-history/lottery-bet-history')
// lottery投注详情
const lotteryTicketDetail = () => import(/* webpackChunkName: "pcLotteryTicketDetail" */ '@/views/pc/users/lottery-bet-history-detail/lottery-bet-history-detail')
// 游戏投注记录
const gameBetHistory = () => import(/* webpackChunkName: "pcGameBetHistory" */ '@/views/pc/users/game-bet-history/game-bet-history')
// 银行卡管理
const bankAccount = () => import(/* webpackChunkName: "pcBankAccount" */ '@/views/pc/users/bank-account/bank-account')
// 消息列表
const message = () => import(/* webpackChunkName: "pcMessage" */ '@/views/pc/users/message/message')
// 消息详情
const messageDetail = () => import(/* webpackChunkName: "pcMessageDetail" */ '@/views/pc/users/message-detail/message-detail')
// 消息详情
const collection = () => import(/* webpackChunkName: "pcCollection" */ '@/views/pc/users/collection/collection')
// 代理人结算页
const affiliates = () => import(/* webpackChunkName: "pcAffiliates" */ '@/views/pc/users/affiliates/affiliates')
// 修改密码
const changePassword = () => import(/* webpackChunkName: "pcChangePassword" */ '@/views/pc/users/change-password/change-password')

export default [
  {
    path: 'account',
    name: 'pcAccount',
    meta: {
      title: 'Personal Center',
      haveNav: true,
      keepAlive: true
    },
    component: user,
    redirect: {
      name: 'pcEditProfile',
    },
    children: [
      {
        path: 'editProfile',
        name: 'pcEditProfile',
        meta: {
          title: 'Personal Center'
        },
        component: account,
      },
      {
        path: 'transactions',
        name: 'pcTransactions',
        meta: {
          title: 'Transaction History'
        },
        component: transactions
      },
      {
        path: 'recharge',
        name: 'pcRecharge',
        meta: {
          title: 'Deposits'
        },
        component: recharge
      },
      {
        path: 'rechargeSuccess',
        name: 'pcRechargeSuccess',
        meta: {
          title: 'Deposit Success',
          navIndex: 4
        },
        component: rechargeSuccess
      },
      {
        path: 'withdraw',
        name: 'pcWithdraw',
        meta: {
          title: 'Withdraw'
        },
        component: withdraw
      },
      {
        path: 'withdrawalsSuccess',
        name: 'pcWithdrawalsSuccess',
        meta: {
          title: 'Withdrawals Success'
        },
        component: withdrawalsSuccess
      },
      {
        path: 'addBankCard',
        name: 'pcAddBankCard',
        meta: {
          title: 'Add Bank Card',
          navIndex: 4
        },
        component: addBankCard
      },
      {
        path: 'giftList',
        name: 'pcGiftList',
        meta: {
          title: 'Gift'
        },
        component: giftList
      },
      // 投注记录列表页面
      {
        path: 'sportBetHistory',
        name: 'pcSportBetHistory',
        meta: {
          title: 'sportBetHistory'
        },
        component: sportBetHistory
      },
      // 投注记录详情页面
      {
        path: '/ticketDetail',
        name: 'pcTicketDetail',
        meta: {
          title: 'Bet Detaills'
        },
        component: ticketDetail
      },
      // lottery投注记录列表页面
      {
        path: 'lotteryBetHistory',
        name: 'pcLotteryBetHistory',
        meta: {
          title: 'Lottery Bet History'
        },
        component: lotteryBetHistory
      },
      // lottery投注记录详情页面
      {
        path: 'lotteryTicketDetail/:orderid', // id-订单编号
        name: 'pcLotteryTicketDetail',
        meta: {
          title: 'Details',
          navIndex: 4
        },
        component: lotteryTicketDetail
      },
      {
        path: 'gameBetHistory',
        name: 'pcGameBetHistory',
        meta: {
          title: 'Game bet history'
        },
        component: gameBetHistory
      },
      {
        path: 'bankAccount',
        name: 'pcBankAccount',
        meta: {
          title: 'Bank Account List'
        },
        component: bankAccount
      },
      {
        path: 'message',
        name: 'pcMessage',
        meta: {
          title: 'Messages'
        },
        component: message
      },
      {
        path: 'messageDetail',
        name: 'pcMessageDetail',
        meta: {
          title: 'Messages'
        },
        component: messageDetail
      },
      {
        path: 'collection',
        name: 'pcCollection',
        meta: {
          title: 'Collection'
        },
        component: collection
      },
      {
        path: 'affiliates',
        name: 'pcAffiliates',
        meta: {
          title: 'Online-Agent',
          navIndex: 4
        },
        component: affiliates
      },
      {
        path: 'changePassword',
        name: 'pcChangePassword',
        meta: {
          title: 'Change Password',
          navIndex: 4
        },
        component: changePassword
      }
    ]
  },
]
