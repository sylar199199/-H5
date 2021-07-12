import { getRoutes } from '@/utils/common'

const routes = [
  // {
  //   path: '/',
  //   redirect: '/sports'
  // }
]

export default routes.concat(getRoutes(require.context('./', false, /\.js$/), './index.js'))
