<template >
  <div>
    <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    <div
        style="height: 100%;width: 100%;background-color: white;display: flex;justify-content: center;align-items: center;flex-flow: column">

      <div style="height: 90px;width: 90px;margin-top: 35px;">
        <v-img src="../../assets/img/download/ilot_icon.png" aspect-ratio="1"></v-img>
      </div>

      <span style="font-size: 30px;color: #000000;margin-top: 30px;line-height: 30px" class="font-weight-bold">iLOT</span>
      <span class="tips">A super fun sports betting app, there are super many small games, always enjoy the fun of betting</span>
      <v-btn id="downlaod" class="btn" color="#5DA400" @click="downloadApp()" elevation="0">
        <span style="margin-right: 10px"><v-img height="16px" width="18px" src="../../assets/img/download/download.png"></v-img></span>Free Download
      </v-btn>
      <v-img height="294px" width="200px" src="../../assets/img/download/ilot_app.png" style="margin-top: 41px"></v-img>
    </div>
  </div>

</template>
<script>
import { mapGetters } from 'vuex'
import { jsBridge } from '@/utils'
import { eventTracking, eventKey } from '@/utils/fireBase'
export default {
  name: 'download',
  computed: {
    ...mapGetters(['platformName', 'loginInfo', 'isLogin']),
  },
  data() {
    return {
      promotionCode: '',
      showDialog: function () {
        return '<div style="position:fixed;left:0;top:0;background:rgba(255,0,255,0.5);width:100%;height:100%;z-index:19910324;"></div>'
      }
    }
  },
  created() {
    this.promotionCode = this.$route.query.promotionCode
    window.ULink([{
      id: 'usr12kqmir09orh1', // 后台生成的裂变活动LinkID
      data: { // 传递的自定义动态参数
        code: this.promotionCode
      },
      selector: '#downlaod',
      auto: false, // 含义见下文
      useOpenInBrowerTips: 'default',
      proxyOpenDownload: function (defaultAction, LinkInstance) {
        if (LinkInstance.solution.type === 'scheme') {
          // qq或者微信环境特殊处理下
          if (window.ULink.isWechat || window.ULink.isQQ) {
            // 在qq或者微信环境执行内置逻辑，具体内置逻辑为:当设置了useOpenInBrowerTips字段时，qq&&微信&&scheme时，启用蒙层提示去浏览器打开
            defaultAction()
          } else {
            window.location.href = LinkInstance.solution.downloadUrl
          }
        } else if (LinkInstance.solution.type === 'universalLink') {
          // universalLink 唤起应当由服务端提供一个带重定向到appstore的universallink地址。因此，此处不应写逻辑，友盟会在近期上线universalLink 重定向功能。
        }
      },
    }])
  },
  methods: {
    async downloadApp() {
      let obj = {
        clickFrom: this.platformName
      }
       // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_PAGE_DOWNLOAD, '', obj)
      // window._czc.push(['_trackEvent', this.platformName + '-download', 'download'])
      // 直接浏览器打开最新的apk下载地址
      if (window.isApp) {
        jsBridge.jumpToWeb(process.env.VUE_APP_DOWNLOAD_URL)
      } else {
        const ele = document.createElement('a')
        ele.setAttribute('href', process.env.VUE_APP_DOWNLOAD_URL)
        ele.setAttribute('download', 'download')
        ele.click()
      }
    },
  }
}

</script>

<style scoped>
.tips {
  text-align: center;
  font-size: 12px;
  opacity: 0.54;
  color: #000000;
  margin-top: 8px;
  margin-left: 38px;
  margin-right: 38px;
}

.btn {
  background-color: #5DA400;
  border-radius: 2px;
  height: 40px;
  color: white;
  width: 300px;
  font-size: 15px;
  margin-top: 31px;
}
</style>
