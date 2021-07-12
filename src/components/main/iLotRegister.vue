<template>
  <div class="register  text-center pt-16 pl-10 pr-10">
    <!-- <toolbar :title="'Register'" @goBack="goBackSet"></toolbar> -->
    <div v-if="!resetPanel">
      <h2 class="mt-8 text-h5 font-weight-medium">Register to ILOT</h2>
      <v-form ref="form" v-model="formIsValid" class="register-form">
        <v-container class="mt-10">
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
                <p class="send-msg mt-1 text-caption primary--text" @click="checkPlayerAccount">{{sendText}}</p>
              </template>
            </v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="form.promotionCode"
              placeholder="Promotion Code"
              outlined
              dense
              height="40px">
            </v-text-field>
          </v-row>
          <v-row>

          <v-checkbox
            class="mt-0"
            v-model="form.isAgree"
            required
            :rules="[v => !!v || 'You must agree to continue!']"
            color="#5DA400">
            <template v-slot:label>
              <span class="text-caption" @click="$router.push({name: 'registrationProtocol'})">
                {{form.isAgree ? 'I have read and agreed《registration agreement》' : '《registration protocol》'}}
              </span>
            </template>
          </v-checkbox>
          </v-row>
        </v-container>
        <v-btn
          :disabled="!formIsValid"
          class="rounded-sm white--text primary text-capitalize"
          block
          large
          @click="checkNumber"
        >
          Next
        </v-btn>
        <p class="warning-tip mt-4 text-conption font-weight-medium" v-if="hasAccount">
          Already have an account?
          <span class=" primary--text" @click="$router.push({name: 'login'})" > Log In </span>
        </p>
      </v-form>
    </div>
    <div v-if="resetPanel">
      <i-lot-resetPassword :mobile="form.playerAccount" :verificationCode="form.verifyCode" :promotionCode="form.promotionCode" :isAgree="form.isAgree"></i-lot-resetPassword>
    </div>
    <i-lot-registration-protocol v-if="showProtocol" @closePanel="closePanel"></i-lot-registration-protocol>
  </div>
</template>

<script type="text/javascript">
  // import toolbar from '@/components/common/toolbar'
  import iLotResetPassword from './iLotResetPassword'
  import iLotRegistrationProtocol from '@/components/main/iLotRegistrationProtocol'
  // import rules from '@/utils/rules.js'
  export default {
    name: 'rigster',
    data() {
      return {
        form: {
          codeUses: 0,
          verifyCode: null,
        },
        playerAccount: null,
        verifyCode: null,
        isAgree: false,
        sendText: 'Send',
        sendFlag: false,
        hasAccount: true,
        formIsValid: true,
        rules: {
          playerAccount: [
            v => !!v || 'Phone Number / Email is required',
            this.$rules.limitaccountNew
          ],
          verifyCode: [val => (val || '').length > 0 || 'This field is required'],
        },
        resetPanel: false,
        showProtocol: false
      }
    },
    components: {
      // toolbar,
      iLotResetPassword,
      iLotRegistrationProtocol
    },
    created() {},
    mounted() {},
    methods: {
      goRegistration() {
        console.log(1)
      },
      sendMsg() {
        console.log('send')
      },
      registerSetPwdClose() {
        this.form.playerAccount = ''
        this.form.verifyCode = ''
        this.dialogRegisterSetPwdFlag = false
      },
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
      async checkNumber() {
        if (this.form.playerAccount === undefined || this.form.playerAccount === '') {
          this.$message({
            message: 'PlayerAccount cannot be empty', // 手机号不能为空
            type: 'warning'
          })
          return
        }
        if (this.form.verifyCode === '') {
          this.$message({
            message: 'Please enter your OTP', // 请输入验证码
            type: 'warning'
          })
          return
        }
        let valid = this.$refs.form.validate()
        if (valid) {
          const res = await this.$api.checkVerificationCode({
            message: 'Mobile phone verification successful', // 手机验证成功
            data: this.form
          })
          if (res.code === 0) {
            this.resetPanel = true
          }
        }
      },
      sendState(val) {
        if (val === '') {
          this.inputFocus = false
        } else if (!this.sendFlag) {
          this.inputFocus = true
        }
      },
      lookProtcol() {
        console.log('showProtocol')
        this.showProtocol = true
      },
      closePanel() {
        this.showProtocol = false
      },
      goBackSet() {
        this.$router.go(-1)
      }
    },
  }
</script>

<style lang="less" scoped>
.register {
//   h2 {
//     display: block;
//     margin-top: 12vh;
//     text-align: center;
//     font-size: 18px;
//   }
//   .register-form {
//     width: 80%;
//     margin: 5vh auto;
//     .send-msg {
//       font-size: 14px;
//       line-height: 1.5;
//       color: #5BA600;
//     }
//     .warning-tip {
//       margin-top: 15px;
//       font-size: 14px;
//       text-align: center;
//       span {
//         color: #5BA600;
//       }
//     }
//   }
  .warning-tip {
    font-size: 14px !important;
  }
}
</style>
