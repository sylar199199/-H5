<template>
  <div>
    <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    <v-card class="fill-height register-bg rounded-0" elevation="0" color="#FD8D5A">
      <v-card-text class="pa-0">
        <!--顶部标题-->
        <div class="top-title">
          <div class="title-main">
            <v-img width="80%" :max-width="mobileSize" class="ma-auto" contain src="~@/assets/img/promotion/register/title.png"></v-img>
          </div>
          <v-img max-height="597px" src="~@/assets/img/promotion/register/topBg.png"></v-img>
        </div>
        <!--优惠券列表-->
        <div class="register-coupon-list ma-auto mt-sm-10 mt-5 px-sm-8 px-4 pt-sm-8 pt-4">
          <v-row no-gutters>
            <v-col
              v-for="money in couponData"
              :key="money.id"
              cols="4"
              sm="4"
            >
              <v-card
                class="pa-sm-4 pa-2 transparent position"
                outlined
                tile
              >
                <div class="gift-num text-md-h4 text-sm-h5 text-subtitle-1 red--text darken-4 text-center">
                  {{$t('NGN-SYMBOL')}} <strong class="text-md-h3 text-sm-h4 text-h6 font-weight-bold">{{money.val}}</strong>
                </div>
                <v-img class="ma-auto" :max-width="mobileSize===285?'98':mobileSize===400?'130':mobileSize===500?'160':'285'" contain src="~@/assets/img/promotion/register/couponBg.png"></v-img>
              </v-card>
            </v-col>
          </v-row>
          <!--按钮-->
          <div class="receive-coupon ma-auto pt-4 pb-sm-8 pb-4">
            <v-btn @click="receiveAll" class="white--text font-weight-bold text-capitalize" large :x-large="mobileSize>400" elevation="0" rounded block color="#FC4D1E">Receive all</v-btn>
          </div>
        </div>
        <!--规则-->
        <div class="active-rules mt-6 mt-sm-12 pb-8">
          <!--标题-->
          <div class="rules-title overflow-hidden">
            <!--标题-->
            <p class="title-txt text-center white--text mb-0">
              <span class="d-flex align-center font-weight-bold text-subtitle-1 text-sm-h6 fill-height justify-center">Activity rules</span>
            </p>
            <!--背景-->
            <v-img width="60%" min-width="222" max-width="445" :aspect-ratio="89/13" class="ma-auto bg-zindex" src="~@/assets/img/promotion/invitation/titleBg.png"></v-img>
            <!--白色底-->
            <p class="title-bg text-center mb-0">
              <span class="white-bg pt-sm-4 px-sm-4 pt-2 px-2">
                <span class="white">0</span>
              </span>
            </p>
          </div>
          <v-card color="rgba(255, 255, 255, 0.4)" class="ma-auto pb-sm-4 px-sm-4 pa-sm-4 pb-2 px-2 rounded-0" width="86%" max-width="690" elevation="0">
            <!--规则内容-->
            <div class="white py-4 px-sm-4 px-2">
              <h3 class="text-subtitle-1 text-sm-h6 font-weight-bold text-left">Promotion Time:</h3>
              <p class="text-sm-subtitle-2 text-body-2 mb-2">15th May – 31st December (12:00am) 2021</p>
              <h3 class="text-subtitle-1 text-sm-h6 font-weight-bold text-left mt-4">Who can take part:</h3>
              <p class="text-sm-subtitle-2 text-body-2 mb-2">New users.</p>
              <h3 class="text-subtitle-1 text-sm-h6 font-weight-bold text-left mt-4">How to get gifts:</h3>
              <p class="text-sm-subtitle-2 text-body-2 mb-2">1. During the promotional period, new users will get welcome gifts after completing registration.</p>
              <p class="text-sm-subtitle-2 text-body-2 mb-2" :class="showMore?'':'text-truncate'">2. Users can only register once for the same account.</p>
              <!--隐藏的规则-->
              <div v-if="showMore">
                <h3 class="text-subtitle-1 text-sm-h6 font-weight-bold text-left mt-4">Rewards:</h3>
                <p class="text-sm-subtitle-2 text-body-2 mb-2"> New users will be rewarded with coupons for successful registration.</p>
                <h3 class="text-subtitle-1 text-sm-h6 font-weight-bold text-left mt-4">How to use coupons:</h3>
                <p class="text-sm-subtitle-2 text-body-2 mb-2">1. Only one coupon can be used for an order, and coupons cannot be combined.</p>
                <p class="text-sm-subtitle-2 text-body-2 mb-2">2. Each coupon can only be used once, and the remaining amount cannot be used in another order.</p>
                <p class="text-sm-subtitle-2 text-body-2 mb-2">3. Coupons can only be used within the validity period. Some coupons are subject to specific betting methods.</p>
                <h3 class="text-subtitle-1 text-sm-h6 font-weight-bold text-left mt-4">Terms and Conditions</h3>
                <p class="text-sm-subtitle-2 text-body-2 mb-2">1. This promotion applies to new and existing customers aged above 18.</p>
                <p class="text-sm-subtitle-2 text-body-2 mb-2">2. All rewards obtained from referral will be withdrawn for any form of cheating behaviors.</p>
                <p class="text-sm-subtitle-2 text-body-2 mb-2">3. Cheating includes but not limited to such behaviors as using the same computer or IP address to register multiple accounts in a day, and users inviting themselves to register in a bid to obtain referral rewards.</p>
              </div>
              <!--更多-->
              <p class="deep-orange--text accent-3 font-weight-bold text-center mb-0 mt-2" @click="showMore=!showMore">{{showMore?'Fold':'Read More'}}<v-icon color="deep-orange accent-3">{{showMore?'mdi-menu-up':'mdi-menu-down'}}</v-icon></p>
            </div>
          </v-card>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'registerGift',
    data() {
      return {
        showMore: false,
        couponData: [
          {
            id: 1,
            val: '10'
          },
          {
            id: 2,
            val: '20'
          },
          {
            id: 3,
            val: '20'
          },
          {
            id: 4,
            val: '60'
          },
          {
            id: 5,
            val: '120'
          },
          {
            id: 6,
            val: '120'
          },
        ],
      }
    },
    computed: {
      ...mapGetters(['isLogin']),
      mobileSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 285
          case 'sm': return 400
          case 'md': return 500
          // case 'lg': return 600
          // case 'xl': return 800
          default : return 570
        }
      }
    },
    methods: {
      receiveAll() {
        if (this.isLogin) {
          this.$router.push({name: 'home'})
        } else {
          this.$router.push({name: 'register'})
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.register-bg{
  /*background: url("~@/assets/img/promotion/register/topBg.png") no-repeat;*/
  /*background-size: 100% auto;*/
  /*background-position: top center;*/
}
.top-title{
  position: relative;
  .title-main{
    position: absolute;
    top: 8%;
    width: 100%;
    z-index: 2;
  }
}
  .register-coupon-list{
    width: 90%;
    max-width: 717px;
    background: url("~@/assets/img/promotion/register/couponBox.png") no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }
  .gift-num{
    position: absolute;
    top: 24%;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .receive-coupon{
    width: 90%;
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
    background-color: transparent;
    .white-bg{
      display: block;
      width: 86%;
      max-width: 690px;
      margin: auto;
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
