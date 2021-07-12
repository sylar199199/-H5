// 收藏
const collection = () => import('@/views/sports/collection/collection')

export default [
  {
    path: '/collection',
    name: 'collection',
    meta: {
      title: 'Collection',
      navIndex: 4
    },
    component: collection
  }
]
