/**
 * @desc 导入所有路由文件
 * */
// import instrumenPanel from './instrumenPanel'
import sports from './sports'
import lottery from './lottery'
import users from './users'
import myHome from './myHome'

const mergeRoutes = (...args) => {
  return [].concat(...args)
}

export default mergeRoutes(
  // instrumenPanel,
  sports,
  lottery,
  users,
  myHome
)
