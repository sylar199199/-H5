export default {
  methods: {
    // 客服中心
    linkServe() {
      let id = ''
      let mobile = ''
      let LoginStatus = this.isLogin
      if (window.isApp) {
        LoginStatus = window.App.isLogin
      }
      if (LoginStatus && this.loginInfo) {
        id = this.loginInfo.playerCode
        mobile = this.loginInfo.mobile
      }
      let url = process.env.VUE_APP_LIVE_CHAT_API + '?token=' + 'd76be986b43f4eecb83f42c3dbce2bc9' + '&customer_id=' + id + '&customer_mobile=' + mobile
      if (window.isApp) {
        url += '&from=android'
        // window.vm.$router.push({name: 'iframe', query: {url}})
        window.open(url, 'Serve')
      } else if (window.$isPc) {
        url += '&from=web'
        // window.vm.$router.push({name: 'iframe', query: {url}})
        // window.open(url, 'Serve')
        let iWidth = 750 // 弹出窗口的宽度;
        let iHeight = 500 // 弹出窗口的高度bai;
        let iTop = window.screen.availHeight - 30 - iHeight // 获得窗口的垂直位置;
        let iLeft = window.screen.availWidth - 10 - iWidth // 获得窗口的水平位置;
        window.open(url, 'Serve', 'height=' + iHeight + ', width=' + iWidth + ', top=' + iTop + ', left=' + iLeft + ', toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no')
      } else {
        url += '&from=app'
        // window.vm.$router.push({name: 'iframe', query: {url}})
        window.open(url, 'Serve')
      }
    }
  }
}
