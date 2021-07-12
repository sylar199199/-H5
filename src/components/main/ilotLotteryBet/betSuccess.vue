<template>
  <v-dialog
      v-model="dialog"
      persistent
      :max-width="mobileSize"
  >
    <v-card>
      <v-card-text class="px-sm-7 px-4">
        <!--关闭按钮-->
        <div class="d-flex align-center justify-end">
          <v-btn
              icon
              color=""
              class="mr-n4 mt-3"
              @click="closePop"
          >
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-container class="flex-column pa-0">
          <div class="text-center mt-n3">
            <v-icon x-sm-large large class="success-icon" color="primary">mdi-check-circle</v-icon>
          </div>
          <p class="text-center text-sm-h5 text-h6 black--text mt-sm-4 mt-2 mb-sm-5 mb-3">
            {{ $t('betSuccess.TITLE') }}</p>
          <!--订单信息-->
          <ul class="rounded mt-sm-7 mt-3 px-0 text-subtitle-1">
            <li class="d-flex justify-space-between align-center pt-sm-5 pt-2 mb-0 text-subtitle-2 text-sm-subtitle-1"
                v-for="(item, index) in betSuccessData.successArr" :key="index">
              <span class="font-weight-bold">{{ item.name }}</span>
              <strong class="black--text">{{ item.val }}</strong>
            </li>
          </ul>
        </v-container>
      </v-card-text>
      <div class="d-flex justify-space-between" style="width: 100%">
        <v-card-actions class="px-sm-7 px-4 pb-6">
          <v-btn class="text-capitalize align-center font-weight-bold"
                 block
                 elevation="0"
                 x-sm-large
                 large
                 outlined
                 width="120"
                 color="primary"
                 @click="linkHistory">
            View details
          </v-btn>
        </v-card-actions>
        <v-card-actions class="px-sm-7 px-4 pb-6" >
          <v-btn class="text-capitalize align-center font-weight-bold"
                 block
                 elevation="0"
                 x-large
                 height="45"
                 width="120"
                 color="primary"
                 @click="linkMore">
            One more
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
import {eventTracking, eventKey} from '@/utils/fireBase'

export default {
  name: 'betSuccess',
  props: [
    'betSuccessData',
    'successPotential',
  ],
  data() {
    return {
      dialog: true,
      id905: process.env.VUE_APP_905_ID, // 5/90id
      id3D: process.env.VUE_APP_3D_ID, // 3D
    }
  },
  computed: {
    ...mapGetters(['platformName', 'lotteryBetData', 'contentData']),
    mobileSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 300
        case 'sm':
          return 400
          // case 'md': return 500
          // case 'lg': return 600
          // case 'xl': return 800
        default :
          return 520
      }
    },
  },
  created() {
    console.log(this.betSuccessData)
  },
  methods: {
    // 关闭弹窗
    closePop() {
      let fireObj = {
        successedGoWhere: 'viewHistory',
      }
      // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_HOME_QUICK_LOTTERY, 'successedGoWhere_history', fireObj)

      this.$emit('closePop', false)
    },
    // 跳转到投注记录页面
    linkHistory() {
      let fireObj = {
        successedGoWhere: 'close',
      }
      // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_HOME_QUICK_LOTTERY, 'successedGoWhere_close', fireObj)

      this.closePop()
      this.$router.push({
        name: 'pcLotteryTicketDetail',
        params: {
          orderid: this.betSuccessData.orderId,
        },
      })
    },
    linkMore() {
      this.closePop()
      let url = ''
      if (this.lotteryBetData.GameID === this.id905) {
        sessionStorage.setItem('oneMore', 'true')
        sessionStorage.setItem('gamerule', '1')
        sessionStorage.setItem('gametype', '1005')
        url = this.contentData.url6 + '?content=' + this.contentData.content6
      }
      if (this.lotteryBetData.GameID === this.id3D) {
        sessionStorage.setItem('oneMore', 'true')
        sessionStorage.setItem('rememberChoose', '1')
        url = this.contentData.url3 + '?content=' + this.contentData.content3
      }
      if (this.$store.state.platformName === 'PC') {
        this.$router.push({
          name: 'pcIframe',
          query: {url},
        })
      } else {
        this.$router.push({
          name: 'iframe',
          query: {url},
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.success-icon {
  font-size: 100px !important;
}

#codeInput {
  position: absolute;
  left: 0;
  opacity: 0;
}
</style>
