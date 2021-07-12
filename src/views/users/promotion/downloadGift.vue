<template>
  <div>
    <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    <v-card class="position fill-height rounded-0 download-bg" height="100%" elevation="0" color="#4E4FFB">
      <v-card-text class="black--text">
        <!--标题-->
        <v-img class="ma-auto mt-sm-8 mt-4" width="80%" contain max-width="609" src="~@/assets/img/promotion/download/title.png"></v-img>
        <!--优惠券-->
        <v-row no-gutters justify="center" align="center" class="mt-sm-8 mt-4">
          <!--优惠券-->
          <v-col
            cols="4"
            sm="4"
          >
            <v-card
              class="pa-2 transparent"
              outlined
              tile
            >
              <v-img class="ma-auto" contain :max-width="mobileSize" src="~@/assets/img/promotion/download/giftBg.png"></v-img>
              <div class="gift-show text-md-h4 text-sm-h5 text-subtitle-1 deep-orange--text darken-4">
                {{$t('NGN-SYMBOL')}} <strong class="text-md-h3 text-sm-h4 text-h6 font-weight-bold">10</strong>
              </div>
            </v-card>
          </v-col>
          <v-col
            cols="2"
            sm="1"
          >
            <v-card
              class="pa-2 transparent"
              outlined
              tile
            >
              <v-img class="ma-auto" contain :max-width="mobileSize===100?'30':mobileSize===150?'40':'60'" src="~@/assets/img/promotion/download/addIcon.png"></v-img>
            </v-card>
          </v-col>
          <!--优惠券-->
          <v-col
            cols="4"
            sm="4"
          >
            <v-card
              class="pa-2 transparent"
              outlined
              tile
            >
              <v-img class="ma-auto" contain :max-width="mobileSize" src="~@/assets/img/promotion/download/giftBg.png"></v-img>
              <div class="gift-show text-md-h4 text-sm-h5 text-subtitle-1 deep-orange--text darken-4">
                {{$t('NGN-SYMBOL')}} <strong class="text-md-h3 text-sm-h4 text-h6 font-weight-bold">120</strong>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <!--下载按钮-->
        <div style="width: 80%" class="ma-auto mt-sm-10 mt-5">
          <v-img @click="downloadApp()" class="ma-auto" contain :max-width="mobileSize===100?'281':mobileSize===150?'400':'563'" src="~@/assets/img/promotion/download/downloadBtn.png"></v-img>
        </div>
        <!--规则-->
        <div class="active-rule ma-auto mt-sm-10 mt-5 pa-sm-8 pa-4">
          <!--标题-->
          <h2 class="d-flex align-center justify-center">
            <GlSvgIcon iconClass="leftIcon" class="livesignal mr-1"/>
            <strong class="text-subtitle-1 text-sm-h6 text-md-h5 font-weight-bold white--text mx-2 mx-sm-4">Activity rules</strong>
            <GlSvgIcon iconClass="rightIcon" class="livesignal mr-1"/>
          </h2>
          <!--规则内容-->
          <div class="white--text">
            <h3 class="text-subtitle-2 text-sm-subtitle-1 mt-4 font-weight-bold text-left">Promotion Time:</h3>
            <p class="text-sm-subtitle-2 text-body-2 mb-2">15th May – 31st December (12:00am) 2021</p>
            <h3 class="text-subtitle-2 text-sm-subtitle-1 mt-4 font-weight-bold text-left">Who can take part:</h3>
            <p class="text-sm-subtitle-2 text-body-2 mb-2">Users who haven’t logged into the APP.</p>
            <h3 class="text-subtitle-2 text-sm-subtitle-1 mt-4 font-weight-bold text-left">How to get gifts:</h3>
            <p class="text-sm-subtitle-2 text-body-2 mb-2">1. During the promotional period, users download the APP will get relevant gift when they log in for the first time.</p>
            <p class="text-sm-subtitle-2 text-body-2 mb-2" :class="showMore?'':'text-truncate'">2. Users who download the APP on the same device only get rewarded once.</p>
            <!--隐藏的内容-->
            <div v-if="showMore">
              <p class="text-sm-subtitle-2 text-body-2 mb-2">3. Users who download the APP and finish registration will get multiple gifts.</p>
              <h3 class="text-subtitle-2 text-sm-subtitle-1 mt-4 font-weight-bold text-left">Rewards:</h3>
              <p class="text-sm-subtitle-2 text-body-2 mb-2"> Users who download the APP will get coupons when they log in for the first time.</p>
              <h3 class="text-subtitle-2 text-sm-subtitle-1 mt-4 font-weight-bold text-left">How to use coupons:</h3>
              <p class="text-sm-subtitle-2 text-body-2 mb-2">1. Only one coupon can be used for an order, and coupons cannot be combined.</p>
              <p class="text-sm-subtitle-2 text-body-2 mb-2">2. Each coupon can only be used once, and the remaining amount cannot be used in another order.</p>
              <p class="text-sm-subtitle-2 text-body-2 mb-2">3. Coupons can only be used within the validity period. Some coupons are subject to specific betting.</p>
              <h3 class="text-subtitle-2 text-sm-subtitle-1 mt-4 font-weight-bold text-left">Terms and Conditions</h3>
              <p class="text-sm-subtitle-2 text-body-2 mb-2">1. This promotion applies to new and existing customers aged above 18.</p>
              <p class="text-sm-subtitle-2 text-body-2 mb-2">2. All rewards obtained from referral will be withdrawn for any form of cheating behaviors.</p>
              <p class="text-sm-subtitle-2 text-body-2 mb-2">3. Cheating includes but not limited to such behaviors as using the same computer or IP address to register multiple accounts in a day, and users inviting themselves to register in a bid to obtain referral rewards.</p>
            </div>
            <!--更多-->
            <p class="font-weight-bold text-center mb-0 mt-sm-4 mt-0" @click="showMore=!showMore">{{showMore?'Fold':'Read More'}}<v-icon color="white">{{showMore?'mdi-menu-up':'mdi-menu-down'}}</v-icon></p>
          </div>
        </div>
      </v-card-text>
      <!--底部背景-->
      <div>
        <v-img src="~@/assets/img/promotion/download/bottomBg.png"></v-img>
      </div>
    </v-card>
  </div>
</template>

<script>
import { jsBridge } from '@/utils'
  export default {
    name: 'downloadGift',
    data() {
      return {
        showMore: false, // 显示更多规则
      }
    },
    computed: {
      mobileSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 100
          case 'sm': return 150
          // case 'md': return 500
          // case 'lg': return 600
          // case 'xl': return 800
          default : return 199
        }
      }
    },
    methods: {
      async downloadApp() {
        console.log('1111')
        let url = process.env.VUE_APP_DOWNLOAD_URL
        // window._czc.push(['_trackEvent', this.platformName + '-download', 'download'])
        // 直接浏览器打开最新的apk下载地址
        // let upgradeInfo = await this.$api.getUpgradeInfo()
        // let downloadInfo = await this.$api.getFileById({
        //   data: {
        //     id: upgradeInfo.data.sysUpgradePackage.upgradeSoftFileId
        //   },
        //   baseURL: process.env.VUE_APP_FILE_DOWNLOAD
        // })
        if (window.isApp) {
          jsBridge.jumpToWeb(url)
          // jsBridge.jumpToWeb(downloadInfo.data.innerUrl + '?code=123456')
        } else {
          window.open(url)
          // window.open(downloadInfo.data.innerUrl + '?code=123456')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.download-bg{
  background: url("~@/assets/img/promotion/download/bg.png") no-repeat;
  background-size: 100% 100%;
  background-position: top center;
}
  .gift-show{
    position: absolute;
    top: 25%;
    bottom: 0;
    text-align: center;
    left: 0;
    right: 0;
  }
  .active-rule{
    width: 95%;
    min-width: 240px;
    max-width: 664px;
    background: #533CDA;
    border-image: linear-gradient(0deg, #5B00D4, #AE37FC) 10 10;
    border-radius: 20px;
  }
</style>
