import children from './entry'
const main = () => import(/* webpackChunkName: "home" */ '@/views/main/main')
const locking = () => import(/* webpackChunkName: "locking" */ '@/views/locking/locking')
const hotNews = () => import(/* webpackChunkName: "hotNews" */ '@/views/hot-news/hot-news-detail')
const download = () => import(/* webpackChunkName: "download" */ '@/views/download/download')
const iframeh5 = () => import(/* webpackChunkName: "iframeh5" */ '@/views/iframeh5/iframeh5')
const promotion = () => import(/* webpackChunkName: "promotion" */ '@/views/pc/promotion/promotion')
const headtohead = () => import(/* webpackChunkName: "headtohead" */ '@/views/headtohead/headtohead')

const ServiceUnavailable = () => import(/* webpackChunkName: "headtohead" */ '@/views/error/ServiceUnavailable')

export default [
  {
    path: '/',
    redirect: {
      path: '/home',
    },
  },
  {
    path: '/',
    component: main,
    children,
  },
  {
    path: '/locking',
    name: 'locking',
    component: locking,
  },
  {
    path: '/news-detail',
    name: 'hot-news-detail',
    meta: {
      title: 'Hot News Details',
    },
    component: hotNews,
  },
  {
    path: '/download',
    name: 'download',
    meta: {
      title: 'Download',
    },
    component: download,
  },
  {
    path: '/iframe',
    name: 'iframe',
    meta: {
      title: 'Iframe',
    },
    component: iframeh5,
  },
  {
    path: '/promotion',
    name: 'promotion',
    meta: {
      title: 'Promotion',
    },
    component: promotion,
  },
  {
    path: '/headtohead',
    name: 'headtohead',
    component: headtohead
  },
  {
    path: '/serviceunavailable',
    name: 'ServiceUnavailable',
    component: ServiceUnavailable
  }
]
