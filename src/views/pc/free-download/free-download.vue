<template>
  <div class="free-down">
    <div class="free-down-bg bg body-ms-viewport"></div>
    <v-row class="free-down-row" >
      <div class="free-down-row-l">
        <v-img src="~@/assets/img/free-download-app.png" height="643" width="429" style="margin-top: 72px"/>
      </div>
      <div class="free-down-row-r">
        <v-img src="~@/assets/img/never-miss-a-winning.png" height="108" width="360" aspect-ratio="360/108"/>
        <div class="free-down-row-r-desc" style="color: #5DA400;margin-top: 13px">
          <span>A super fun sports betting app, there are super many small games, always enjoy the fun of betting</span>
        </div>
        <div class="btn" color="#5DA400" @click="downloadApp()">
          <span style="margin-right: 18px"><v-img height="24px" width="27px" src="~@/assets/img/download/download.png"></v-img></span>Free Download
        </div>
      </div>
    </v-row>
  </div>

</template>

<script>

export default {
  name: 'FreeDownload',
  data() {
    return {
      width: 0,
      promotionCode: ''
    }
  },
  created() {
    this.width = document.body.clientWidth
    if (this.isLogin) {
      this.promotionCode = this.loginInfo.promotionCode
    } else {
      this.promotionCode = this.$route.query.code
    }
    window.ULink([{
      id: 'usr12kqmir09orh1', // 后台生成的裂变活动LinkID
      data: { // 传递的自定义动态参数
        code: this.promotionCode
      },
      selector: '#downlaod',
      auto: false, // 含义见下文
      lazy: true
    }])
  },
  methods: {
    async downloadApp() {
      // 直接浏览器打开最新的apk下载地址
      window.open(process.env.VUE_APP_DOWNLOAD_URL)
    }
  }
}
</script>

<style lang="less" scoped>
.free-down{
  position: relative;
  margin-bottom: -20px;
  &-bg{

  }
  &-row{
    margin: 0 !important;
    &-l{
      width: 435px;
    }
    &-r{
      margin-top: 82px;
      margin-left: 129px;
      width: 360px;
      &-desc{
        span{
          font-size: 16px;
          line-height: 24px;
        }
      }
    }
  }
}
.btn {
  background-color: #5DA400;
  border-radius: 32px;
  height: 64px;
  color: white;
  width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-top: 80px;
  cursor: pointer;
}
.bg {
  position: absolute;
  width: 100vw;
  min-width: 100%;
  height: 220px;
  left: 0;
  bottom: 0;
  background-color: @primary;
}
@media screen and (min-width: 1000px) {
  .bg {
    margin-left: calc(500px - 50vw);
  }
}
</style>
