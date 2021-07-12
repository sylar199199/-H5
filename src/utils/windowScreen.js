/**
 * 窗口可视区域相关
*/

export default {
  // 获取窗口宽度
  getWidth() {
    return document.documentElement.clientWidth
  },
  // 获取窗口高度
  getHeight() {
    return document.documentElement.clientHeight
  },
  // 设置全屏
  fullScreen(ele) {
    const element = ele || document.documentElement
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    }
  },
  // 退出全屏
  exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  },
  /**
   * 是否全屏监听
   * @param {Function} 全屏回调函数
   * @param {Function} 退出全屏回调函数
   **/
  watchScreen(fullCb, exitCb) {
    window.addEventListener('resize', () => {
      const isFull = !!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement)
      if (isFull) {
        fullCb()
      } else {
        exitCb()
      }
    })
  },
}
