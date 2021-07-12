// 引入各个模块接口
import homePage from './modules/homePage'
import sports from './sports'
// import game from './game'
import lottery from './lottery'
import hotNews from './hot-news'
import download from './download'

// 合并接口
const mergeApi = (...args) => {
    return Object.assign({}, ...args)
}

export default mergeApi(
    homePage,
    sports,
    // game,
    lottery,
    hotNews,
    download
)

