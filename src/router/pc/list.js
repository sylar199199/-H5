import children from './entry'
const pc = () => import('@/views/pc')

export default [
  {
    path: '/pc',
    name: 'pc',
    component: pc,
    children,
    redirect: {
      path: '/pc/home',
    },
  }
]
