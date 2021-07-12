<template>
  <div class="iframeH5">
    <iframe v-bind:src="weburl"
            id="ifrme"
            scrolling="no"
            frameborder="0"
            width="100%"
            height="100%"></iframe>
  </div>

</template>
<script>


import {mapGetters} from 'vuex'

export default {
  name: 'Iframe',
  data() {
    return {
      weburl: '',
    }
  },
  computed: {
    ...mapGetters(['contentData']),
  },
  created() {
  },
  mounted() {
    let _this = this
    this.weburl = this.$route.query.url
    window.addEventListener('message', function (e) {
      if (e.data && e.data.type === 'toh5lotteryBetHistory') {
        // _this.$router.push({name: 'lotteryBetHistory'})
        _this.$router.push('/lotteryBetHistory/' + e.data.gameId)
      }
      if (e.data && e.data.type === 'h5lotteryTicketDetail') {
        _this.$router.push({
          name: 'lotteryTicketDetail',
          params: {
            orderid: e.data.orderId,
          },
        })
      }
      // 跳转到lotto投注首页
      if (e.data && e.data.type === 'toh5lotto') {
        _this.$router.push({name: 'lotto'})
      }
      // 跳转到3d首页
      if (e.data && e.data.type === 'toh53Dlotto') {
        sessionStorage.setItem('oneMore', 'true')
        sessionStorage.setItem('rememberChoose', e.data.rememberChoose)
        let url = _this.contentData.url3
        _this.$router.push({
          path: '/iframe',
          query: {url},
        })
        location.reload()
      }
      // 跳转5/90投注页面
      if (e.data && e.data.type === 'toh5905Dlotto') {
        sessionStorage.setItem('oneMore', 'true')
        sessionStorage.setItem('gamerule', e.data.gamerule)
        sessionStorage.setItem('gametype', e.data.gametype)
        let url = _this.contentData.url6
        _this.$router.push({
          path: '/iframe',
          query: {url},
        })
        location.reload()
      }
      // 登录事件
      if (e.data && e.data.type === 'lotteryLogin') {
        _this.$store.dispatch('loginSuccess', {token: e.data.token})
      }
    }, false)
  },
  methods: {
  },
}

</script>

<style lang="less" scoped>
.iframeH5 {
  width: 100vw;
  height: 100vh;
  transform: translateX(0);
}
</style>
