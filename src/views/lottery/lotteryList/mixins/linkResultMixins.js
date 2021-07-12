export default {
  methods: {
    // 跳转到对应开奖公告
    linkResult(data) {
      let url = ''
      let id = ''
      if (data.GameID === process.env.VUE_APP_3D_ID) {
        url = process.env.VUE_APP_3D_URI_RESULT
        id = process.env.VUE_APP_3D_ID
        // window.location.href = url
        // window.open(url, '_blank')
      } else if (data.GameID === process.env.VUE_APP_905_ID) {
        url = process.env.VUE_APP_905_URI_RESULT
        id = process.env.VUE_APP_905_ID
        // window.open(url, '_blank')
      } else if (data.GameID === process.env.VUE_APP_FOOTBALL_ID) {
        url = process.env.VUE_APP_FOOTBALL_URI_RESULT
        id = process.env.VUE_APP_FOOTBALL_ID
      }
      url = url + '?backURL=' + encodeURIComponent(window.location.href) + '&gameId=' + id
      // console.log('url', url)
      // window.open(url, '_blank')
      // window.location.href = url
      this.$router.push({name: 'iframe', query: {url}})
    }
  }
}
