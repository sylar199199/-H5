/**
 * @desc 导入所有路由文件
 * */
import myHome from './modules/myHome'
import lottery from './modules/lottery'
import sports from './modules/sports'
import hotNews from './modules/hot-news'
import freeDownload from './modules/free-download'
import user from './modules/users'
import help from './modules/help'
import promotion from './modules/promotion'
import iframe from './modules/iframe'

const mergeRoutes = (...args) => {
    return [].concat(...args)
}

export default mergeRoutes(
    myHome,
    lottery,
    sports,
    hotNews,
    freeDownload,
    user,
    help,
    promotion,
    iframe
)
