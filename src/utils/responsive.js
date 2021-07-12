/**
 * 组件模块整体缩放
 * @param {HTMLElement} elm
 * @param {string} center top
 * @param {number} val 缩放比例
 */
function componentAuto(el, position, val) {
  if (val === '' || val === null) {
  } else {
    if (screen.width >= 1920) {
      if (position === 'top') {
        el.style.transformOrigin = '0 0'
      }
      el.style.transform = 'scale(1,1)'
    } else if (screen.width >= 1680) {
      if (position === 'top') {
        el.style.transformOrigin = '0 0'
      }
      el.style.transform = 'scale(0.9,0.9)'
    } else if (screen.width >= 1440) {
      // 中等屏幕等比例 中心缩放
      if (position === 'top') {
        el.style.transformOrigin = '0 0'
      }
      el.style.transform = 'scale(0.75,0.75)'
    } else if (screen.width >= 800) {
      if (position === 'top') {
        el.style.transformOrigin = '0 0'
      }
      // el.style.transform = 'scale(0.6,0.6)'
    } else {
    }
  }
}
export default {
  componentAuto
}
