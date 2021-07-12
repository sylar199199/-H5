<template>
  <div class="">
    <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    <v-card class="position fill-height" height="100%" elevation="0" color="#ffe8d3">
      <!--标题及背景-->
      <div class="position">
        <div class="bg-title mt-sm-8 mt-4">
          <v-img class="ma-auto" contain src="~@/assets/img/promotion/invitation/topBgTitle.png" :aspect-ratio="577/136" width="80%" min-width="288" max-width="577" min-height="68"></v-img>
        </div>
        <v-img src="~@/assets/img/promotion/invitation/topBg.png" min-height="388" max-height="775"></v-img>
      </div>
      <!--规则-->
      <div class="active-rules mt-sm-n15 mt-n4">
        <!--标题-->
        <div class="rules-title">
          <!--标题-->
          <p class="title-txt text-center white--text mb-0">
            <span class="d-flex align-center text-subtitle-1 text-sm-h6 fill-height justify-center">Activity rules</span>
          </p>
          <!--背景-->
          <v-img width="60%" min-width="222" max-width="445" :aspect-ratio="89/13" class="ma-auto bg-zindex" src="~@/assets/img/promotion/invitation/titleBg.png"></v-img>
          <!--白色底-->
          <p class="title-bg text-center white--text mb-0">
            <span class="white-bg white rounded-t-lg">0</span>
          </p>
        </div>
        <v-card color="white" class="rounded-b-lg ma-auto mt-sm-n5 mt-n3 pa-2 pa-sm-4" width="80%" max-width="690" elevation="0">
          <v-card-text class="black--text">
            <h3 class="text-subtitle-1 text-sm-h6 mt-4 font-weight-bold text-left">Promotion Time</h3>
            <p class="text-sm-subtitle-1 text-subtitle-2 mb-2">15th May – 31st December (12:00am) 2021</p>
            <h3 class="text-subtitle-1 text-sm-h6 mt-4 font-weight-bold text-left">Who can take part</h3>
            <p class="text-sm-subtitle-1 text-subtitle-2 mb-2">All valid users on the platform</p>
            <h3 class="text-subtitle-1 text-sm-h6 mt-4 font-weight-bold text-left">How to get rewards</h3>
            <p class="text-sm-subtitle-1 text-subtitle-2 mb-2">1. Existing users who share the dedicated link with new users and invite them to register through the link will be rewarded.</p>
            <ul class="text-sm-subtitle-1 text-subtitle-2 pl-0 mb-2">
              <li>Step 1: share the dedicated link</li>
              <li>Step 2: new users open the link</li>
              <li>Step 3: new users finish registration</li>
            </ul>
            <p class="text-sm-subtitle-1 text-subtitle-2 mb-2" :class="showMore?'':'text-truncate'">2. Once the new referred user makes a deposit and places a bet, the referrer will get a certain percentage of rebate based on the bet amount.</p>
            <!--隐藏的规则-->
            <div v-if="showMore">
              <h3 class="text-subtitle-1 text-sm-h6 mt-4 font-weight-bold text-left">How to use coupons</h3>
              <p class="text-sm-subtitle-1 text-subtitle-2 mb-2">1. Only one coupon can be used for an order, and coupons cannot be combined.</p>
              <p class="text-sm-subtitle-1 text-subtitle-2 mb-2">2. Each coupon can only be used once, and the remaining amount cannot be used in another order.</p>
              <p class="text-sm-subtitle-1 text-subtitle-2 mb-2">3. Coupons can only be used within the validity period. Some coupons are subject to specific betting methods.</p>
              <h3 class="text-subtitle-1 text-sm-h6 mt-4 font-weight-bold text-left">Terms and Conditions</h3>
              <p class="text-sm-subtitle-1 text-subtitle-2 mb-2">1. This promotion applies to new and existing customers aged above 18.</p>

              <p class="text-sm-subtitle-1 text-subtitle-2 mb-2">2. All rewards obtained from referral will be withdrawn for any form of cheating behaviors.</p>

              <p class="text-sm-subtitle-1 text-subtitle-2 mb-2">3. Cheating includes but not limited to such behaviors as using the same computer or IP address to register multiple accounts in a day, and users inviting themselves to register in a bid to obtain referral rewards.</p>
            </div>
          </v-card-text>
          <!--隐藏的规则-->
          <!--更多-->
          <p class="deep-orange--text accent-3 font-weight-bold text-center mb-4" @click="showMore=!showMore">{{showMore?'Fold':'Read More'}}<v-icon color="deep-orange accent-3">{{showMore?'mdi-menu-up':'mdi-menu-down'}}</v-icon></p>
        </v-card>
      </div>
      <!--Invite rewards-->
      <div class="active-rules mt-sm-8 mt-4">
        <!--标题-->
        <div class="rules-title">
          <!--标题-->
          <p class="title-txt text-center white--text mb-0">
            <span class="d-flex align-center text-subtitle-1 text-sm-h6 fill-height justify-center">Invite rewards</span>
          </p>
          <!--背景-->
          <v-img width="60%" min-width="222" max-width="445" :aspect-ratio="89/13" class="ma-auto bg-zindex" src="~@/assets/img/promotion/invitation/titleBg.png"></v-img>
          <!--白色底-->
          <p class="title-bg text-center white--text mb-0">
            <span class="white-bg white rounded-t-lg">0</span>
          </p>
        </div>
        <v-card color="white" class="rounded-b-lg ma-auto mt-sm-n5 mt-n3 pa-2 pa-sm-4" width="80%" max-width="690" elevation="0">
          <div class="d-flex justify-center mt-sm-8 mt-4 align-vertical-top">
            <div class="d-flex flex-column align-center align-self-start" style="width: 50%">
              <v-img :max-width="mobileSize" contain src="~@/assets/img/promotion/invitation/addUser.png"></v-img>
              <span class="font-weight-bold text-sm-subtitle-1 text-subtitle-2 text-center mt-2">Invite new users to register</span>
            </div>
            <div class="d-flex flex-column align-center align-self-start" style="width: 50%">
              <v-img :max-width="mobileSize" contain src="~@/assets/img/promotion/invitation/gift.png"></v-img>
              <span class="font-weight-bold text-sm-subtitle-1 text-subtitle-2 text-center mt-2">Get a gift</span>
            </div>
          </div>
        </v-card>
      </div>
      <!--Earn commission-->
      <div class="active-rules mt-sm-8 mt-4">
        <!--标题-->
        <div class="rules-title">
          <!--标题-->
          <p class="title-txt text-center white--text mb-0">
            <span class="d-flex align-center text-subtitle-1 text-sm-h6 fill-height justify-center">Earn commission</span>
          </p>
          <!--背景-->
          <v-img width="60%" min-width="222" max-width="445" :aspect-ratio="89/13" class="ma-auto bg-zindex" src="~@/assets/img/promotion/invitation/titleBg.png"></v-img>
          <!--白色底-->
          <p class="title-bg text-center white--text mb-0">
            <span class="white-bg white rounded-t-lg">0</span>
          </p>
        </div>
        <v-card color="white" class="rounded-b-lg ma-auto mt-sm-n5 mt-n3 pa-2 pa-sm-4" width="80%" max-width="690" elevation="0">
          <div class="d-flex justify-center mt-sm-8 mt-4 align-vertical-top">
            <div class="d-flex flex-column align-center align-self-start" style="width: 50%">
              <v-img :max-width="mobileSize" contain src="~@/assets/img/promotion/invitation/expend.png"></v-img>
              <span class="font-weight-bold text-sm-subtitle-1 text-subtitle-2 text-center mt-2">Invite friends to
spend</span>
            </div>
            <div class="d-flex flex-column align-center align-self-start" style="width: 50%">
              <v-img :max-width="mobileSize" contain src="~@/assets/img/promotion/invitation/income.png"></v-img>
              <span class="font-weight-bold text-sm-subtitle-1 text-subtitle-2 text-center mt-2">You can get
commission</span>
            </div>
          </div>
        </v-card>
      </div>
      <!--按钮-->
      <div style="width: 80%" class="ma-auto mt-sm-n13 mt-n16 pb-5">
        <v-btn @click="linkAffiliates" color="#ffa900" :large="mobileSize<90" :x-large="mobileSize>45" block elevation="0" class="white--text rounded-lg text-capitalize font-weight-bold">Invite now</v-btn>
      </div>
    </v-card>
    <AffiliatesDialog v-model="blAffiliatesDialogShow"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'invitationGift',
    components: {
      AffiliatesDialog: () => import('@/views/users/account/components/affiliates-dialog')
    },
    data() {
      return {
        showMore: false, // 显示更多规则
        blAffiliatesDialogShow: false,
      }
    },
    computed: {
      ...mapGetters(['isLogin', 'isAgent']),
      mobileSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 45
          case 'sm': return 60
          // case 'md': return 500
          // case 'lg': return 600
          // case 'xl': return 800
          default : return 90
        }
      }
    },
    methods: {
      linkAffiliates() {
        if (this.isLogin) {
          if (this.isAgent) {
            this.$router.push({name: 'affiliates'})
          } else {
            this.blAffiliatesDialogShow = true
          }
        } else {
          this.$router.push({name: 'login'})
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.bg-title{
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
}
  .active-rules{
    position: relative;
    z-index: 2;
    top: -100px;
  }
  .rules-title{
    position: relative;
    z-index: 2;
    .bg-zindex{
      position: relative;
      z-index: 1;
    }
    .title-txt{
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      z-index: 2;
    }
    .title-bg{
      position: absolute;
      width: 100%;
      top: 45%;
      bottom: 0;
      z-index: 0;
      .white-bg{
        display: block;
        width: 80%;
        max-width: 690px;
        margin: auto;
      }
    }
  }
</style>
