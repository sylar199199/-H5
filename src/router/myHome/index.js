
// 投注列表
const myHome = () => import(/* webpackChunkName: "lotteryList" */ '@/views/myHome/myHome')


export default [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: 'home',
      navIndex: 0,
      haveNav: true,
      keepAlive: true
    },
    component: myHome
  }
]
