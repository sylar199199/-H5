// 滚球
const lives = () => import('@/views/sports/lives/lives')
// 单场比赛
const livesBetting = () => import('@/views/sports/lives/livesBetting/livesBetting')


export default [
  {
    path: '/lives',
    name: 'lives',
    meta: {
      title: 'Lives List',
      navIndex: 2,
      keepAlive: true
    },
    component: lives
  },
  {
    path: '/livesBetting',
    name: 'livesBetting',
    meta: {
      title: 'Live Match',
      navIndex: 2,
      haveNav: true,
      // keepAlive: true
    },
    component: livesBetting
  }
]
