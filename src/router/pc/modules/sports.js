// 游戏页
const sports = () => import(/* webpackChunkName: "pcSports" */ '@/views/pc/sports/sports/sports')
const search = () => import(/* webpackChunkName: "pcSearch" */ '@/views/pc/sports/search/search')

export default [
  {
    path: 'sports',
    name: 'pcSports',
    meta: {
      title: 'Prematch List',
      navIndex: 2,
      haveNav: true
    },
    component: sports
  },
  {
    path: 'search',
    name: 'pcSearch',
    meta: {
      title: 'search',
      navIndex: 2
    },
    component: search
  }
]
