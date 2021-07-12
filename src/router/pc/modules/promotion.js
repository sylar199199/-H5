
// 热门资讯
const promotion = () => import(/* webpackChunkName: "pcPromotion" */ '@/views/pc/promotion/promotion')


export default [
  {
    path: 'pcPromotion',
    name: 'pcPromotion',
    meta: {
      title: 'Promotion',
      navIndex: 0,
      haveNav: true,
      keepAlive: true
    },
    component: promotion,
  }
]
