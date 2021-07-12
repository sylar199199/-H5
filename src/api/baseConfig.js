/**
 * @desc 公用配置
*/

export const runingIP = process.env.VUE_APP_API_BASE_URL
export const baseURL = process.env.VUE_APP_API_BASE_URL
export const lotteryBaseUrl = process.env.VUE_APP_API_LOTTERY_URL
export const sockUrl = process.env.VUE_APP_API_SOCKET_URL

// 配置URL
export const account = baseURL
export const leftMenu = baseURL
export const capital = baseURL
export const market = baseURL
export const game = baseURL

// 获取api
export const getApis = (context, ignore) => {
  return context.keys().reduce((modules, modulePath) => {
    if (modulePath !== ignore) {
      modules = { ...modules, ...(context(modulePath).default || {}) }
    }
    return modules
  }, {})
}
