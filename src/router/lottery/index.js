
// 投注列表
const lotteryList = () => import(/* webpackChunkName: "lotteryList" */ '@/views/lottery/lotteryList')
// lotto首页
// const lotto = () => import(/* webpackChunkName: "lotteryList" */ '@/views/lottery/lotto/lotto')

export default [
  {
    path: '/lottery/lotteryList',
    name: 'lotteryList',
    meta: {
      title: 'Lottery List',
      navIndex: 1,
      haveNav: true,
      // keepAlive: true
    },
    component: lotteryList
  },
  {
    path: '/lotto',
    name: 'lotto',
    meta: {
      title: 'Lotto',
      navIndex: 1,
      haveNav: true,
      // keepAlive: true
    },
    component: lotteryList
  }
]
