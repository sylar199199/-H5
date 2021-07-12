<template>
  <div :class="[iMarign,iPadding]">
    <v-responsive :aspect-ratio="5/1" min-height="75">
      <v-carousel
        cycle
        v-model="model"
        :show-arrows="false"
        class="primary banner-icon"
        hide-delimiter-background
        height="100%"
        delimiter-icon="mdi-brightness-1"
      >
        <v-carousel-item
          v-for="(item,i) in imgArr"
          :key="i"
        >
          <v-img :aspect-ratio="5/1" :src="item.imgUrl" min-height="75" @click="linkImgUrl(item, i+1)"></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-responsive>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { eventTracking, eventKey } from '@/utils/fireBase'
  export default {
    name: 'homeBanner',
    props: {
      iMarign: {
        type: Array,
        default: function () {
          return ['ma-0']
        }
      },
      iPadding: {
        type: Array,
        default: function () {
          return ['pa-0']
        }
      },
    },
    data() {
      return {
        model: 0,
        imgArr: [],
      }
    },
    computed: {
      ...mapGetters(['platformName']),
    },
    created() {
    },
    mounted() {
      this.getBanner()
    },
    methods: {
      // 获取banner图片
      async getBanner() {
        let terminal = 'h5'
        // if (window.isApp) {
        //   terminal = 'app'
        // }
        const res = await this.$api.bananerPage({
          data: {
            moduleCode: 'header',
            saleTerminal: terminal
          }
        })
        if (res.code === 0) {
          this.imgArr = res.data
        }
      },
      // 点击图片跳转链接
      linkImgUrl(val, index) {
        console.log(val)
        let fireObj = {
          clickOn: val.title
        }
         // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_HOME_BANNER, val.title, fireObj)
        // window._czc.push(['_trackEvent', this.platformName + '-home', 'banner' + index])
        let url = val.picUrl
        if (url.indexOf('http') === -1) {
          url = 'http://' + val.picUrl
        }
        window.open(url)
      }
    }
  }
</script>

<style lang="less" scoped>
/deep/.banner-icon{
  .v-btn:before{
    background-color: #ffffff;
  }
  .theme--dark.v-btn--active:hover::before, .theme--dark.v-btn--active::before{
    opacity: 1;
  }
  .v-btn--icon.v-size--small{
    width: 12px !important;
    height: 12px !important;
  }
  .v-btn--icon.v-size--small .v-icon, .v-btn--fab.v-size--small .v-icon{
    width: 12px !important;
    height: 12px !important;
    font-size: 12px !important;
  }
}
/deep/.v-carousel__controls{
  height: auto;
  width: auto;
  margin: auto;
  left: 50% !important;
  transform: translate(-50%, -20%);
}
</style>
