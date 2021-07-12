// 游戏页
const sports = () => import('@/views/sports/sports/sports')
// 赛事列表页
const list = () => import('@/views/sports/sports/list/list')
// 单场比赛
const sportsBetting = () => import('@/views/sports/sports/sportsBetting/sportsBetting')
// 赛事历史
const matchHistory = () => import('@/views/sports/sports/matchHistory/matchHistory')
// 购物车
const betSlip = () => import('@/views/sports/betSlip/betSlip')

export default [
  {
    path: '/sports',
    name: 'sports',
    meta: {
      title: 'Prematch List',
      navIndex: 2,
      haveNav: true,
      // keepAlive: true
    },
    component: sports
  },
  {
    path: '/sports/:tab',
    name: 'sportsTab',
    meta: {
      title: 'Prematch Home',
      navIndex: 2,
      haveNav: true
    },
    component: sports
  },
  {
    path: '/sport/list',
    name: 'sportList',
    meta: {
      title: 'Prematch List',
      navIndex: 2,
    },
    component: list
  },
  {
    path: '/sport/list/:slot/:category/:tournament/:country/:time', // slot-(赛前prematch 赛中lives) category-体育类型 tournament-联赛id country-国家编码 time-时间
    name: 'list',
    meta: {
      title: 'Prematch List',
      navIndex: 2
    },
    component: list
  },
  {
    path: '/sportsBetting',
    name: 'sportsBetting',
    meta: {
      title: 'Prematch',
      navIndex: 2,
      haveNav: true,
      // keepAlive: true
    },
    component: sportsBetting
  },
  {
    path: '/matchHistory',
    name: 'matchHistory',
    meta: {
      title: 'MatchHistory',
      navIndex: 2
    },
    component: matchHistory
  },
  // 购物车
  {
    path: '/betSlip',
    name: 'betSlip',
    meta: {
      title: 'Bet Slip',
      navIndex: 3,
      haveNav: true,
      // keepAlive: true
    },
    component: betSlip
  },
]
