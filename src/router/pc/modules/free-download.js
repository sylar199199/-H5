
// 热门资讯
const freeDownload = () => import(/* webpackChunkName: "pcDownload" */ '@/views/pc/free-download/free-download')


export default [
  {
    path: 'download',
    name: 'pcDownload',
    meta: {
      title: 'Free Download',
      navIndex: 0,
      haveNav: true,
      keepAlive: true
    },
    component: freeDownload,
  }
]
