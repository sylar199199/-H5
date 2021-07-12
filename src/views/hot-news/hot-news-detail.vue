<template>
  <div>
    <div v-if="isWeb">
      <Banner height="200" moduleCode="news" />
      <div class="head" @click="jumpToNews()">
        News | <span class="head-type">{{typeName}}</span>
      </div>
      <div v-if="hotNewsDetail != null">
        <v-row class="news-main" justify="space-between" dense>
          <v-col class="news-main-l">
            <div style="background-color: white">
              <div class="hot-news-title font-weight-bold">{{ hotNewsDetail.title }}</div>
              <div class="hot-news-publish-time font-weight-regular">{{ this.$moment(hotNewsDetail.createDate).format('DD/M/YYYY HH:mm:ss') }}</div>
              <div v-html="hotNewsDetail.content" class="hot-news-publish-content ql-editor"></div>
            </div>
          </v-col>
          <v-col class="news-main-r">
            <div class="news-main-r-download">
              <div class="news-main-r-download-title font-weight-bold">Free Download</div>
              <div class="news-main-r-download-center">
                <div class="news-main-r-download-center-qrcode">
                  <v-img src="~@/assets/img/components/pc/app-down-ewm/icon_ewm.png"></v-img>
                </div>
              </div>
              <div class="news-main-r-download-desc">You can also download <br> the iLot App via QR Code</div>
            </div>
            <grand-prize-winners/>
          </v-col>
        </v-row>
      </div>
    </div>
    <div v-else>
      <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
      <div v-if="hotNewsDetail != null" class="ql-container ql-snow">
        <div class="hot-news-title-app font-weight-medium">{{ hotNewsDetail.title }}</div>
        <div class="hot-news-publish-time-app font-weight-regular">{{ this.$moment(hotNewsDetail.createDate).format('YYYY-MM-DD HH:mm:ss') }}</div>
        <div v-html="hotNewsDetail.content" class="hot-news-publish-content ql-editor"></div>
      </div>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import GrandPrizeWinners from '@/components/pc/grand-prize-winners/grand-prize-winners'
import Banner from '@/views/pc/components/banner'
export default {
  name: 'hot-news-detail',
  components: {GrandPrizeWinners, Banner},
  created() {
    this.hotNewsId = this.$route.query.hotNewsId
    this.isWeb = this.$route.query.isWeb
    this.typeName = this.$route.query.typeName
    this.programId = this.$route.query.programId
    this.loadDetail()
  },
  data() {
    return {
      hotNewsDetail: Object,
      hotNewsId: String,
      typeName: String,
      programId: String,
      isWeb: Boolean,
    }
  },
  methods: {
    async loadDetail() {
      let resp = await this.$api.getHotNewsInfo({
        data: {
          id: this.hotNewsId
        }
      })
      if (resp != null && resp.code === 0) {
        this.hotNewsDetail = resp.data
      }
    },
    jumpToNews() {
      this.$router.push({
        name: 'pcNews',
        query: {
          programId: this.programId
        }
      })
    }
  }
}

</script>

<style scoped lang="less">
.head {
  font-size: 14px;
  line-height: 14px;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  &-type {
    opacity: 0.38;
  }
}
.hot-news-title {
  padding: 30px 15px 5px;
  font-size: 32px;
  line-height: 32px;
  color: #000000;
  opacity: 0.87;
  &-app {
    font-size: 15px;
    line-height: 15px;
    padding: 15px 15px 5px;
    color: #000000;
    opacity: 0.87;
  }
}


.hot-news-publish-time {
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 27px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 14px;
  color: #000000;
  opacity: 0.38;
  &-app {
    font-size: 10px;
    margin-left: 16px;
    margin-right: 16px;
    line-height: 10px;
    color: #000000;
    opacity: 0.38;
  }
}

.hot-news-publish-content {
  margin-bottom: 30px;
}

.news {
  &-main {
    width: 100%;
    height: 100%;
    margin: 0;

    &-l {
      flex: 0 0 747px;
      width: 745px;
      padding: 0;
    }

    &-r {
      flex: 0 0 243px;
      width: 243px;
      padding: 0;

      &-download {
        height: 250px;
        width: 100%;
        background-color: white;
        margin-bottom: 20px;

        &-title {
          color: @font-color1;
          padding-top: 19px;
          padding-left: 10px;
        }

        &-center {
          width: 100%;
          display: flex;
          justify-content: center;

          &-qrcode {
            margin-top: 28px;
            height: 120px;
            width: 120px;
          }
        }

        &-desc {
          text-align: center;
          font-size: 14px;
          line-height: 14px;
          color: @font-color3;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
