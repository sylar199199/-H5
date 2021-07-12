
// 热门资讯
const help = () => import(/* webpackChunkName: "pcHelp" */ '@/views/pc/help/help')


export default [
  {
    path: 'pcHelp',
    name: 'pcHelp',
    meta: {
      title: 'Help',
      navIndex: 0,
      haveNav: true,
      keepAlive: true
    },
    component: help,
  }
]
