
// 热门资讯
const iframe = () => import(/* webpackChunkName: "pcIframe" */ '@/views/pc/iframe/iframe')


export default [
  {
    path: 'iframe',
    name: 'pcIframe',
    meta: {
      title: 'Iframe',
      navIndex: 0,
      haveNav: true
    },
    component: iframe,
  }
]
