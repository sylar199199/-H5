<template>
  <LoadingBtn
    class="sms-code-send text-sm-body-2"
    :disabled="sendFlag || !calcAccountCorrect"
    :text="sendText"
    @click="checkPlayerAccount"
  />
</template>
<script>
import LoadingBtn from '@/components/func/loading-btn'
import { eventTracking, eventKey } from '@/utils/fireBase'
import { mapGetters } from 'vuex'
export default {
  components: {
    LoadingBtn
  },
  props: {
    accountType: {
      default: ''
    },
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    module: {
      default: 'register' // 类型：login/register
    }
  },
  data() {
    return {
      sendText: 'Send',
      sendFlag: false,
      playerAccount: ''
    }
  },
  created() {
  },
  mounted() {
  },
  beforeDestory() {
    this.clearTimer()
  },
  computed: {
    ...mapGetters(['platformName']),
    calcAccountCorrect() {
      if (this.accountType === 1) {
        return this.$rules.limitemail(this.form.playerAccount) === true
      } else if (this.accountType === 0) {
        return this.$rules.limitmobileNew(this.form.playerAccount) === true
      }
      return !!this.form.playerAccount
    }
  },
  methods: {
    // 验证账户是否存在
    async checkPlayerAccount(fn) {
      try {
        if (this.sendFlag) return // 防止重复发送
        if (!this.form.playerAccount) return
        this.sendFlag = true
        console.log(this.form.playerAccount)
        this.playerAccount = this.form.playerAccount.toString().replace(/^0{1,}/g, '')
        console.log(this.playerAccount)
        await this.sendFn() // 发送验证码
      } finally {
        this.sendFlag = false
        fn && fn()
      }
    },
    // 发送验证码
    async sendFn() {
      if (this.module === 'payment') {
         // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_SET_PAYMENT_PWD, 'send', {clickOn: 'Send'})
      }
      // this.form.playerAccount = this.form.mobplayerAccountile
      const res = await this.$api.mobileNumber({
        message: 'Sending verifyCode successfully', // 发送验证码成功
        data: {
          playerAccount: this.playerAccount,
          codeUses: this.form.codeUses || 0
        }
      })
      if (res.code !== 0) return
      this.inputFocus = false
      // 倒计时
      this.countDown()
    },
    countDown() {
      setTimeout(() => this.sendFlag = true)
      let i = 120
      this.clearTimer()
      this.cutdownTimer = setInterval(() => {
        i -= 1
        this.sendText = 'Resend(' + i + 's)'
        if (i === 0) {
          this.sendText = 'Send'
          i = 120
          clearInterval(this.cutdownTimer)
          this.sendFlag = false
          if (this.form.playerAccount !== undefined) {
            this.inputFocus = true
          }
        }
      }, 1000)
    },
    clearTimer() {
      if (this.cutdownTimer) {
        clearInterval(this.cutdownTimer)
        this.cutdownTimer = null
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
