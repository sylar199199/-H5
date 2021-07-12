<template>
  <v-responsive :class="[iMarign,iPadding,iRounded]" elevation="0" :aspect-ratio="25/4" :min-height="60" class="secondary">
    <v-img v-if="activityData.length>0 && activityData[0].imgUrl!==null" :src="activityData[0].imgUrl" alt="" class="secondary" @click="linkActive" :class="[iRounded]" min-height="60" :aspect-ratio="25/4"></v-img>
    <v-img v-else src="@/assets/img/noPic.png" alt="" class="secondary" :aspect-ratio="25/4" :min-height="60" :class="[iRounded]"></v-img>
  </v-responsive>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { eventTracking, eventKey } from '@/utils/fireBase'
  export default {
    name: 'ilotActivityOperation',
    props: {
      activityType: {
        type: String,
        default: 'header1'
      },
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
      iRounded: {
        type: String,
        default: 'rounded-0'
      }
    },
    data() {
      return {
        activityData: []
      }
    },
    mounted() {
      this.getBanner()
    },
    computed: {
      ...mapGetters(['platformName'])
    },
    methods: {
      // 获取banner图片
      async getBanner() {
        const res = await this.$api.bananerPage({
          data: {
            moduleCode: this.activityType,
            saleTerminal: window.$isPc ? 'pc' : 'h5'
          }
        })
        if (res.code === 0) {
          this.activityData = res.data
        }
      },
      linkActive() {
        let name = ''
        if (this.activityType === 'header1') {
          name = 'home'
        } else {
          name = this.activityType
        }
        let suffix = this.activityData[0].title
        let obj = {
          clickOn: suffix
        }
        // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_MID_BANNER, name + '_' + suffix, obj)

        // window._czc.push(['_trackEvent', this.platformName + '-midBanner', name])
        if (this.activityData && this.activityData.length > 0) {
          let url = this.activityData[0].picUrl
          window.location.href = url
        }
      }
    }
  }
</script>

<style scoped>

</style>
