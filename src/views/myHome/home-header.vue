<template>
  <div style="z-index: 10;width: 100%;" class="fixed-bar">
    <v-row class="fixed-bar-row ma-0" style="height: 41px;width: 100%;background-color: white;justify-content: center;align-items: center">
      <div class="text-left ml-2 ml-sm-4 d-flex justify-start">
        <v-img max-height="20" min-width="60" :aspect-ratio="3/1" contain src="@/assets/img/ilot-logo.png"></v-img>
      </div>
      <v-spacer></v-spacer>
      <v-btn elevation="0" small color="primary" class="mr-sm-4 mr-2 text-caption text-capitalize" v-if="!isApp" @click="click">Free Download</v-btn>
      <!--<div class="header-free-down" v-if="!isApp" @click="click">Free Download</div>-->
    </v-row>
    <div style="background-color: #353A46;opacity: 0.1;height: 1px;width: 100%"></div>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'
import { eventTracking, eventKey } from '@/utils/fireBase'
export default {
  name: 'home-header',
  data() {
    return {
      isApp: false
    }
  },
  computed: {
    ...mapGetters(['platformName']),
  },
  mounted() {
    this.isApp = window.isApp
  },
  methods: {
    click() {
      let obj = {
        clickFrom: this.platformName
      }
       // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_FREE_DOWNLOAD, '', obj)
      // window._czc.push(['_trackEvent', this.platformName + '-home', 'download'])
      this.$router.push({path: '/download'})
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.fixed-bar{
}
.header-free-down {
  background-color: #5BA600;
  border-radius: 2px;
  height: 22px;
  color: white;
  padding-left: 3px;
  padding-right: 3px;
  font-size: 9px;
  margin-right: 14px;
  text-align: center;
  line-height: 22px;
}
</style>
