import ajax from '@/utils/ajax.js'
// import { leftMenu } from '@/api/baseConfig'
// 左边导航
export default {
  sportMenu: (options = {}) => ajax.get('/sport/un/s/v2/pre_sports', options),
  // v2
  normalMenu: (options = {}) => ajax.get('/sport/un/s/v2/sports', options),
  // lives菜单
  livesMenu: (options = {}) => ajax.get('/sport/un/s/v2/live', options)
}
