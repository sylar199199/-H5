
const Lottery = () => import(/* webpackChunkName: "pcLotto" */ '@/views/pc/lottery/lottery/lottery.vue')

export default [
  {
    path: 'lotto',
    name: 'pcLotto',
    meta: {
      title: 'Lotto',
      navIndex: 1,
      haveNav: true,
      // keepAlive: true
    },
    component: Lottery
  }
]
