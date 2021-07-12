// 热门资讯
const News = () => import(/* webpackChunkName: "pcNews" */ '@/views/pc/news/news')
const HotNewsDetail = () => import(/* webpackChunkName: "pcNewsDetail" */ '@/views/hot-news/hot-news-detail')


export default [
  {
    path: 'news',
    name: 'pcNews',
    meta: {
      title: 'News',
      navIndex: 0,
      haveNav: true,
      keepAlive: true
    },
    component: News,
  },
  {
    path: 'hotNewsDetail',
    name: 'hotNewsDetail',
    component: HotNewsDetail,
  }
]
