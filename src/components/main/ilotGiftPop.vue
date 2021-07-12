<template>
  <v-dialog
    content-class="gift-pop-style"
    v-model="dialog"
    scrollable
    :width="iWidth"
    overlay-opacity="0.8"
    persistent
  >
    <v-card class="rounded-0 pa-0 overflow-hidden" color="transparent" elevation="0">
      <v-card-text class="amber accent-4 rounded-xl pa-0 gift-main" max-height="80%">
        <v-img width="100%" src="@/assets/img/giftPopBg.png"></v-img>
        <div class="main-txt pt-4">
          <p class="text-sm-h3 text-h4 text-center white--text font-weight-bold mt-6 mt-sm-11">Congratulations</p>
          <p class="text-center text-h5 text-sm-h4 white--text">You get {{$t('NGN-SYMBOL')}} {{giftMoney}} gifts</p>
        </div>
        <div class="d-flex align-center justify-center link-list-btn mb-5">
          <div class="btn-main">
            <v-img src="@/assets/img/receiveBtn.png" max-width="331" width="100%" @click="linkGiftList"></v-img>
          </div>
        </div>
      </v-card-text>
      <!--关闭按钮-->
      <v-card-actions class="d-flex align-center justify-center pa-0 transparent">
        <v-btn
          color="lighten-2"
          icon
          dark
          class="mt-5"
          @click="closePop"
        >
          <v-icon x-large>mdi-close-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'ilotGiftPop',
    props: {
      iWidth: {
        type: Number,
        default: 540,
      }
    },
    data() {
      return {
        dialog: false,
        giftMoney: 0 // 优惠券礼包金额
      }
    },
    watch: {
      'isLogin': {
        handler(newValue, oldValue) {
          if (oldValue === undefined) return
          if (newValue) {
            setTimeout(() => {
              this.getUnpopDiscount()
            }, 6000)
          }
        }
      }
    },
    methods: {
      // 获取大礼包
      async getUnpopDiscount() {
        const res = await this.$api.getUnpopDiscount({
          data: {
            userCode: this.loginInfo.playerCode,
          }
        })
        if (res.code !== 0) return
        this.giftMoney = res.data.dicountAmount
        if (this.giftMoney > 0) {
          this.dialog = true
        }
      },
      // 关闭优惠券礼包弹窗
      closePop() {
        this.dialog = false
      },
      // 跳转到优惠券列表
      linkGiftList() {
        console.log('跳转到优惠券列表')
        this.$router.push('/account/giftList')
        this.closePop()
      }
    }
  }
</script>

<style lang="less" scoped>
  .gift-pop-style{
    box-shadow: none !important;
  }
  .gift-main{
    position: relative;
    .main-txt{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .link-list-btn{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      .btn-main{
        width: 50%;
      }
    }
  }
</style>
