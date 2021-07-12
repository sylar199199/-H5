<template>
  <div class="banner" :class="{'disabled': isInit && !imgArr.length}">
    <v-responsive>
      <v-carousel
        cycle
        v-model="model"
        hide-delimiter-background
        :show-arrows="false"
        cycle
        interval="3000"
        class=" banner-icon"
        :height="height || '100%'"
        delimiter-icon="mdi-brightness-1"
      >
        <template v-for="(item, i) in imgArr">
          <v-carousel-item
              class="banner-single"
              :key="i"
              @click="linkImgUrl(item)"
          >
            <v-img class="banner-single-img" contain :src="item.imgUrl || ''"></v-img>
          </v-carousel-item>
        </template>
      </v-carousel>
    </v-responsive>
  </div>
</template>

<script>
import { throttle } from '@/utils'
export default {
  name: 'homeBanner',
  props: {
    height: {
      type: String,
      default: ''
    },
    moduleCode: {
      default: ''
    }
  },
  data() {
    return {
      model: 0,
      imgArr: [],
      isInit: false
    }
  },
  created() {
    this.getBanner()
  },
  mounted() {
  },
  methods: {
    // 获取banner图片
    async getBanner() {
      try {
        const res = await this.$api.bananerPage({
          data: {
            moduleCode: this.moduleCode || 'sport',
            saleTerminal: 'pc'
          }
        })
        if (res.code === 0) {
          this.imgArr = res.data || []
        }
      } finally {
        this.isInit = true
      }
    },
    // 点击图片跳转链接
    linkImgUrl: throttle(function (val) {
      if (!val.picUrl) return
      if (val.picUrl.indexOf('http') !== -1) {
        window.open(val.picUrl)
      } else {
        window.open('http://' + val.picUrl)
      }
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
.banner{
  background: #0E2310;
  &.disabled{
    height: 0;
    overflow: hidden;
  }
  &-single{
    cursor: pointer;
    /deep/ &-img{
      height: 100%;
      .v-image__image{
        height: 100%;
        background-size: 100% 100%;
        filter: blur(0);
      }
    }
  }
  /deep/ .v-carousel__controls{
    pointer-events: none;
    .v-btn{
      pointer-events: all;
    }
  }
}
.banner-icon{
  .v-btn:before{
    background-color: #ffffff;
  }
  .theme--dark.v-btn--active:hover::before, .theme--dark.v-btn--active::before{
    opacity: 1;
  }
  .v-btn--icon.v-size--small{
    width: 14px !important;
    height: 14px !important;
    margin: 0 6px !important;
  }
  .v-btn--icon.v-size--small .v-icon, .v-btn--fab.v-size--small .v-icon{
    width: 14px !important;
    height: 14px !important;
  }
}
</style>
