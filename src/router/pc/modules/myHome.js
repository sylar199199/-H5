
// 投注列表
const myHome = () => import(/* webpackChunkName: "pcHome" */ '@/views/pc/myHome/myHome')


export default [
  {
    path: 'home',
    name: 'pcHome',
    meta: {
      title: 'home',
      navIndex: 0,
      haveNav: true,
      keepAlive: true
    },
    component: myHome
  }
]
