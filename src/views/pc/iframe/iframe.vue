<template>
  <div class="iframe">
    <div class="box" :style="{'width': width + 'px', 'max-width': width + 'px','margin-left': -(width-1000)/2+ 'px'}">
      <div class="phone-box">
        <div class="phone">
          <iframe v-bind:src="weburl"
                  id="ifrme"
                  scrolling="no"
                  frameborder="0"
                  width="100%"
                  style="border-radius: 4px"
                  height="100%"></iframe>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Iframe',
  data() {
    return {
      width: 0,
      weburl: '',
    }
  },
  computed: {
    ...mapGetters(['contentData']),
  },
  watch: {
    '$route.query.url': {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== this.weburl) {
          this.weburl = newVal
        }
      },
    },
  },
  created() {
    this.width = document.body.clientWidth
  },
  mounted() {
    let _this = this
    this.weburl = this.$route.query.url
    window.addEventListener('message', function (e) {
      if (e.data && e.data.type === 'topclotteryBetHistory') {
        _this.$router.push({name: 'pcLotteryBetHistory'})
      }
      if (e.data && e.data.type === 'pclotteryTicketDetail') {
        _this.$router.push({
          name: 'pcLotteryTicketDetail',
          params: {
            orderid: e.data.orderId,
          },
        })
      }
      // 跳转到lotto投注首页
      if (e.data && e.data.type === 'topclotto') {
        _this.$router.push({name: 'pcLotto'})
      }
      // 跳转到3d首页
      if (e.data && e.data.type === 'topc3Dlotto') {
        sessionStorage.setItem('oneMore', 'true')
        sessionStorage.setItem('rememberChoose', e.data.rememberChoose)
        let url = _this.contentData.url3
        _this.$router.push({
          path: 'iframe',
          query: {url},
        })
        location.reload()
      }
      // 跳转5/90投注页面
      if (e.data && e.data.type === 'topc905lotto') {
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
  methods: {},
}
</script>

<style lang="less" scoped>
.iframe {
  height: 100%;
  position: relative;
  margin-bottom: -20px;

  .box {
    background: url("../../../assets/img/lotteryIframe/lotteryiframeBG.png");
    padding: 40px 0;

    .phone-box {
      width: 398px;
      height: 699px;
      background-color: rgba(255, 255, 255, 0.6);
      margin: 0 auto;
      padding-top: 16px;
      border-radius: 8px;

      .phone {
        width: 375px;
        height: 667px;
        margin: 0 auto;
      }
    }
  }
}
</style>
