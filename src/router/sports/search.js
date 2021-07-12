// 收藏
const search = () => import('@/views/sports/search/search')

export default [
  {
    path: '/search',
    name: 'search',
    meta: {
      title: 'Search',
      navIndex: 2
    },
    component: search
  }
]
