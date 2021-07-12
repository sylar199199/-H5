<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="520px"
  >
    <v-card>
      <v-card-text class="px-sm-7 px-4">
        <v-container class="flex-column pa-0">
          <div class="text-center pt-5">
            <v-icon small class="success-icon" color="primary">mdi-check-circle</v-icon>
          </div>
          <p class="text-center text-sm-h5 text-h6 black--text mt-sm-3 mt-1 mb-5">{{$t('betSuccess.TITLE')}}</p>
          <p class="text-center text-sm-subtitle-2 mb-0 text-caption">{{$t('betSuccess.BOOKINGCODE')}}</p>
          <div class="d-flex align-center justify-center">
            <strong class="text-sm-h4 text-h5 primary--text mr-3">{{betSuccessData.bookingCode}}</strong>
            <input type="" :value="betSuccessData.bookingCode" id="codeInput">
            <v-btn
              class="copy-btn"
              icon
              color="primary"
              @click="copy(betSuccessData.bookingCode)"
            >
              <v-icon color="primary">mdi-content-copy</v-icon>
            </v-btn>
          </div>
          <!--订单信息-->
          <div class="grey lighten-2 rounded px-5 mt-sm-7 mt-4 pb-sm-5 pb-2 text-sm-subtitle-2 text-caption">
            <!--总金额-->
            <p class="d-flex justify-space-between align-center pt-sm-5 pt-2 mb-0">
              <span>{{$t('betSuccess.TOTAL-STAKE')}}</span>
              <strong class="black--text">{{parseFloat(betSuccessData.src.stakeTotal).toFixed(2)}}</strong>
            </p>
            <!--优惠券-->
            <p v-if="betSuccessData.coupon !==null" class="d-flex justify-space-between align-center pt-sm-5 pt-2 mb-0">
              <span>{{$t('betSuccess.COUPON')}}</span>
              <strong class="primary--text">- {{parseFloat(betSuccessData.coupon.discountAmount).toFixed(2)}}</strong>
            </p>
            <!--实付金额-->
            <p class="d-flex justify-space-between align-center pt-sm-5 pt-2 mb-0">
              <span>{{$t('betSuccess.TOTAL')}}</span>
              <strong class="black--text" v-if="betSuccessData.coupon ===null">{{parseFloat(betSuccessData.src.stakeTotal).toFixed(2)}}</strong>
              <strong class="black--text" v-else>{{parseFloat(betSuccessData.src.stakeTotal-betSuccessData.coupon.discountAmount).toFixed(2)}}</strong>
            </p>
            <!--预计奖金-->
            <p class="d-flex justify-space-between align-center pt-sm-5 pt-2 mb-0">
              <span>{{$t('betSuccess.POTENTIAL-WIN')}}</span>
              <!--<strong class="black&#45;&#45;text" v-if="successPotential.totalPotentialWin>0">{{parseFloat(successPotential.totalPotentialWin).toFixed(2)}}</strong>-->
              <strong class="black--text text-right">{{parseFloat(betSuccessData.src.pwStakeMaxRemain).toFixed(2)}}</strong>
            </p>
            <!--Max Bonus-->
            <p v-if="betSuccessData.src.bonusTotal > 0" class="d-flex justify-space-between align-center pt-sm-5 pt-2 mb-0">
              <span>{{$t('betSuccess.MAX-BONUS')}}</span>
              <strong class="black--text">{{parseFloat(betSuccessData.src.bonusTotal).toFixed(2)}}</strong>
            </p>
          </div>
        </v-container>
      </v-card-text>
      <!--分割线-->
      <v-divider class="mt-2"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="closePop"
        >
          {{$t('betSuccess.CANCEL')}}
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="closePop"
        >
          {{$t('betSuccess.OK')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'betSuccess',
    props: [
      'betSuccessData',
      'successPotential'
    ],
    data() {
      return {
        dialog: true
      }
    },
    methods: {
      // 复制bookingCode
      copy(value) {
        var copycode = document.getElementById('codeInput')
        copycode.select() // 选择对象
        document.execCommand('Copy') // 执行浏览器复制命令
        document.activeElement.blur()
        console.log('已复制好，可贴粘。')
        let msg = this.$t('betSuccess.COPY-MSG')
        this.$common.setMsg(msg, 'success')
      },
      // 关闭弹窗
      closePop() {
        this.$emit('closeDialog', false,)
      }
    }
  }
</script>

<style lang="less" scoped>
.success-icon{
  font-size: 80px !important;
}
  #codeInput{
    position: absolute;
    left: 0;
    opacity: 0;
  }
</style>
