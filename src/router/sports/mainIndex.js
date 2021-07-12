// 首页
const index = () => import('@/views/sports/index/index')


export default [
  {
    path: 'index',
    name: 'index',
    meta: {
      title: '首页',
    },
    component: index
  }
]
