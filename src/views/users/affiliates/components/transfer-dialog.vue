<template>
  <div class="transfer-dialog">
    <v-dialog
        attach=".transfer-dialog"
        content-class="transfer-dialog-container"
        v-model="calcShow"
        overlay-opacity="0.7"
        persistent
    >
      <v-card class="transfer-dialog-card rounded-0 pa-0 overflow-hidden" color="transparent" elevation="0">
        <v-card-text class="transfer-dialog-card-main">
          <div class="transfer-dialog-card-main-tit font-weight-medium">Transfer</div>
          <div class="transfer-dialog-card-main-content">Minimum Transfer withdrawal：<span class="font-weight-bold">₦{{ calcAmount }}</span></div>
          <div class="transfer-dialog-card-main-content"><span class="font-weight-bold">₦{{ calcAmount }}</span> can transfer commission funds to personal accounts.</div>
        </v-card-text>
        <v-card-actions class="transfer-dialog-card-btns">
          <v-btn
            width="58"
            height="24"
            class="transfer-dialog-card-btns-btn text-capitalize"
            @click="close"
          >
            Close
          </v-btn>
          <v-btn
            width="58"
            height="24"
            class="transfer-dialog-card-btns-btn text-capitalize"
            @click="confirm"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { dialogMixin } from '@/mixins'
import { mapGetters } from 'vuex'
import { throttle } from '@/utils'

export default {
  name: '',
  components: {},
  mixins: [dialogMixin],
  props: {
    accountInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      blAgree: false,
      playerAccountCode: '', // 资金账户
      isTransform: false
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['loginInfo', 'agentInfo']),
    calcAmount() {
      return parseInt(this.accountInfo.balance)
    }
  },
  watch: {
    calcShow() {
      if (!this.calcShow) this.blAgree = false
    }
  },
  methods: {
    close() {
      this.calcShow = false
    },
    confirm: throttle(async function () {
      if (this.isTransform) return
      // if (!this.playerAccountCode) {
      //   let res = await this.$api.queryAgentAccountCode({
      //     token: this.agentInfo.agentToken
      //   })
      //   if (res.code !== 0) return
      //   this.playerAccountCode = res.data
      // }
      let res = await this.$api.transferAgent({
        message: 'Transfer successful',
        token: this.agentInfo.agentToken,
        data: {
          accountCode: this.accountInfo.accountCode,
          agentCode: this.loginInfo.playerCode,
          currency: 'NGN',
          playerAccountCode: this.accountInfo.accountCode,
          playerCode: this.loginInfo.playerCode,
          paidAmount: this.calcAmount,
          toPayAmount: this.calcAmount,
          transChannel: window.platform
        }
      })
      this.isTransform = false
      if (res.code !== 0) return
      this.close()
      this.$emit('transferFinish', res.data)
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
.transfer-dialog{
  /deep/ &-container{
    box-shadow: none !important;
  }
  /deep/ &-card{
    width: 72%;
    min-width: 270px;
    max-width: 406px;
    border-radius: 3px !important;
    box-sizing: border-box;
    padding: 20px 10px 10px 20px !important;
    background-color: #fff !important;
    margin: 0 auto!important;
    &-main{
      padding: 0 !important;
      &-tit{
        font-size: 15px;
        line-height: 18px;
        margin-bottom: 10px;
      }
      &-content{
        font-size: 12px;
        color: @font-color2;
        line-height: 16px;
        margin-bottom: 12px;
        word-break: break-word;
        padding-right: 10px;
        span{
          font-size: 12px;
          line-height: 16px;
          color: @primary;
        }
      }
    }
    &-btns{
      justify-content: flex-end;
      padding: 0 !important;
      &-btn{
        background: none !important;
        box-shadow: none;
        .v-btn__content{
          font-size: 13px;
          color: @primary;
          letter-spacing: 0;
        }
      }
    }
  }
}
</style>
