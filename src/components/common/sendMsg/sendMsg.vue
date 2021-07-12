<template>
  <div class="">
    <div v-if="!resetPanel">
      <h2 class="text-h5 font-weight-medium">Register to ILOT</h2>
      <v-form ref="form" v-model="formIsValid" class="register-form">
        <v-container>
          <v-row>
            <v-text-field
              v-model="form.playerAccount"
              placeholder="Phone Number Or Email"
              required
              outlined
              dense
              height="40px"
              :rules="rules.playerAccount">
              <!--  @blur="checkPlayerAccount" -->
            </v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="form.verifyCode"
              placeholder="OTP"
              required
              outlined
              dense
              height="40px"
              :rules="rules.verifyCode"
              >
              <template v-slot:append>
                <div class="send-msg  text-sm-body-2" @click="checkPlayerAccount">{{sendText}}</div>
              </template>
            </v-text-field>
          </v-row>
        </v-container>
        <v-btn
          :disabled="!formIsValid"
          class="rounded-sm white--text primary text-capitalize"
          block
          large
          @click="checkSend"
        >
          Next
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      form: {},
      formIsValid: true,
      rules: {
        playerAccount: [
          v => !!v || 'Phone Number / Email is required',
          this.$rules.limitaccountNew
        ],
        verifyCode: [val => (val || '').length > 0 || 'This field is required'],
      }
    }
  },
  components: {
    
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    // 验证账户是否存在
    async checkPlayerAccount() {
      if (!this.form.playerAccount) {
        return
      }
      const res = await this.$api.checkPlayerAccount({
        data: {
          playerAccount: this.form.playerAccount
        }
      })
      if (res.code !== 0) return
      this.sendFn()
    },
    // 发送验证码
    async sendFn() {
      if (this.sendFlag) return
      // this.form.playerAccount = this.form.mobplayerAccountile
      const res = await this.$api.mobileNumber({
        message: 'Sending verifyCode successfully', // 发送手机验证码成功
        data: this.form
      })
      if (res.code !== 0) return
      this.sendFlag = true
      this.inputFocus = false
      // 倒计时
      this.countDown()
    },
    countDown() {
      let i = 120
      let timeId = setInterval(() => {
        i -= 1
        this.sendText = 'Resend(' + i + 's)'
        if (i === 0) {
          this.sendText = 'Send'
          i = 120
          clearInterval(timeId)
          this.sendFlag = false
          if (this.form.playerAccount !== undefined) {
            this.inputFocus = true
          }
        }
      }, 1000)
    },
    checkSend() {

    },
  },
}
</script>

<style lang="" scoped>
</style>
