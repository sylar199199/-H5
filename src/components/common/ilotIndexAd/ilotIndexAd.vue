<template>
  <div class="ilot-ad">
    <v-dialog
      attach=".ilot-ad"
      content-class="ilot-ad-main ad-style"
      v-model="dialog"
      scrollable
      :max-width="iWidth"
      overlay-opacity="0.8"
      persistent
    >
      <v-card class="ilot-ad-main-card rounded-0 pa-0" color="transparent">
        <v-responsive v-if="adData.length>0" :class="[iPadding]" class="white" :aspect-ratio="9/11">
          <v-img :src="adData[0].imgUrl" alt="" class="secondary" @click="linkAd" :aspect-ratio="9/11"></v-img>
        </v-responsive>
        <v-responsive v-else :class="[iPadding]" class="default secondary py-8" :aspect-ratio="9/11">
          <v-img src="@/assets/img/imgLogo.png" alt="" class="secondary ma-auto" max-width="206" :aspect-ratio="9/11"></v-img>
        </v-responsive>
        <!--关闭按钮-->
        <v-card-actions class="d-flex align-center justify-center mt-2">
          <v-btn
            color="lighten-2"
            icon
            dark
            @click="dialog = false"
          >
            <v-icon x-large>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import remoteLoad from '@/utils/remoteLoad'
  import { eventTracking, eventKey } from '@/utils/fireBase'
  export default {
    name: 'ilotIndexAd',
    props: {
      type: {
        type: String,
        default: '1' // 1: 移动端； 2：pc端
      },
      iWidth: {
        type: Number,
        default: 540,
      },
      iPadding: {
        type: Array,
        default: function () {
          return ['pa-0']
        }
      }
    },
    data() {
      return {
        dialog: false,
        adData: [],
      }
    },
    computed: {
      ...mapGetters(['adKey']),
    },
    created() {
      this.setKey()
      // if (window.performance.navigation.type !== 1) { // 非刷新状态
      //   this.setKey()
      // }
    },
    methods: {
      ...mapMutations(['SET_ADKEY']),
      // 设置唯一标识
      setKey() {
        if (this.adKey === '' || this.adKey === undefined || this.adKey === 'undefined') {
          // let key = Math.random().toString()
          this.getIp()
          // let d = new Date().getTime()
          // let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          //   var r = (d + Math.random() * 16) % 16 | 0
          //   d = Math.floor(d / 16)
          //   return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
          // })
          // this.SET_ADKEY(uuid)
        } else {
          this.getBanner()
        }
      },
      // 获取ip
      async getIp() {
        await remoteLoad('https://pv.sohu.com/cityjson?ie=utf-8')
        let key = window.returnCitySN.cip + 'ilot'
        this.SET_ADKEY(key)
        this.getBanner()
      },
      // 获取banner图片
      async getBanner() {
        const res = await this.$api.bananerPage({
          data: {
            moduleCode: 'activity',
            saleTerminal: this.type === '2' ? 'pc' : 'h5',
            virtualKey: this.adKey,
          }
        })
        if (res.code === 0 && res.data) {
          this.adData = res.data
          if (this.adData.length > 0) {
            this.dialog = true
          }
        }
      },
      linkAd() {
        let suffix = this.adData[0].title
        let obj = {
          showOn: suffix
        }
         // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_HOME_FULL_SCREEN, suffix, obj)
        this.dialog = false
        if (this.adData.length > 0) {
          let url = this.adData[0].picUrl
          // window.location.href = url
          window.open(url, '_blank')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.ilot-ad{
  /deep/ .v-dialog{
    background: none !important;
    box-shadow: none;
    >div{
      background: none !important;
    }
  }
}
.ad-style{
  border-radius: 0 !important;
  box-shadow: none !important;
}
</style>
