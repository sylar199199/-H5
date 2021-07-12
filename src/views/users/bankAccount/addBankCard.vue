<template>
  <div>
    <i-lot-toolbar @goBack="goBackSet"></i-lot-toolbar>
    <div class="add-bank-card mt-4 pl-4 pr-4 text-center">
      <v-form
        ref="form"
        v-model="validBank"
        v-if="!passPanel"
      >
        <v-autocomplete
          v-model="form.bank"
          :items="bankList"
          :filter="customFilter"
          item-text="name"
          item-value="code"
          persistent-hint
          return-object
          required
          :rules="[rules.required]"
          label="Please select a bank"
          placeholder="Please select a ban"
        ></v-autocomplete>
        <v-text-field
            v-model.trim="form.cardNumber"
            label="Account Number"
            placeholder="Account Number"
            type="number"
            pattern="[0-9]*"
            clearable
            minlength="10"
            maxlength="20"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            :rules="[rules.required, rules.cardNumber]"
            @input="form.cardNumber=form.cardNumber.replace(/[^\d]/g,'')"
          ></v-text-field>
        <v-text-field
            v-model="form.firstName"
            label="First Name"
            placeholder="First Name"
            :disabled="loginInfo.firstName!==''"
            :rules="[rules.required]"
            clearable
          ></v-text-field>
        <v-text-field
            v-model="form.lastName"
            label="Last Name"
            placeholder="Last Name"
            :disabled="loginInfo.lastName!==''"
            :rules="[rules.required]"
            clearable
          ></v-text-field>
        <v-text-field
          v-model="form.bvn"
          label="BVN"
          type="number"
          pattern="[0-9]*"
          placeholder="BVN"
          minlength="11"
          oninput="if(value.length>11)value=value.slice(0,11)"
          :disabled="loginInfo.bvn!==''"
          onkeyup="value=value.replace(/[^\d]/g,'')"
          :rules="[rules.required, rules.bvn]"
          clearable
        ></v-text-field>
          <!-- <p class="text-caption text-left">Please choose the payment method</p>
          <v-radio-group
            v-model="form.verifyType"
            mandatory
            row
            class="select-type"
          >
            <v-radio
              v-for="n in typeOptions"
              :key="n.value"
              :label="n.label"
              :value="n.value"
              :rules="[rules.required]"
              cols="5"
              class="text-caption"
            >
            <template v-slot:label>
              <span class="text-caption">{{n.label}}</span>
            </template>
            </v-radio>
          </v-radio-group> -->
          <v-row class="mt-4 ml-0 mr-0">
            <v-btn
              color="primary"
              class="rounded-sm white--text  mb-16 text-capitalize"
              block
              large
              :disabled="!validBank"
              @click="next"
            >
              Next
            </v-btn>
          </v-row>
      </v-form>
      <i-insetPassword :changePanel="passPanel" :info="insertInfo" @insertBack="insetPasswordBack"></i-insetPassword>
      <v-btn
        :disabled="!isFinish"
        color="primary"
        class="rounded-sm white--text mt-8 text-capitalize"
        width="80%"
        large
        v-if="passPanel"
        @click="submit"
        >
        Finish
      </v-btn>
      <!--忘记密码-->
      <p v-if="passPanel && form.verifyType === '0'" class="primary--text text-center mt-2" @click="forgotPwd">Forgot Payment Password?</p>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters} from 'vuex'
  import md5 from 'js-md5'
  import insetPassword from '../paymentPassword/components/insertPassword'
  import { debounce } from '@/utils'
  export default {
    name: 'addBankCard',
    data() {
      return {
        form: {
          bank: '',
          cardNumber: '',
          bankCode: '',
          firstName: '',
          lastName: '',
          bankName: '',
          verifyType: '0',
          bvn: '',
          type: 'addCard',
          noPwd: false,
        },
        validBank: true,
        bankList: [],
        typeOptions: [
          {
            label: 'Payment Password',
            value: '0'
          },
          {
            label: 'Enter OTP',
            value: '1'
          }
        ],
        passPanel: false,
        insertInfo: {
          title: 'Payment Password',
          sub: 'Please enter the Payment Password'
        },
        isFinish: false,
        rules: {
          required: v => !!v || 'This field is required',
          cardNumber: val => (val || '').length >= 10 || 'The length is between 10 and 20 characters',
          bvn: v => (v || '').length === 11 || 'The length is 11 characters',
        },
        nextVerifyCode: ''
      }
    },
    components: {
      'i-insetPassword': insetPassword
    },
    computed: {
      ...mapGetters(['isLogin', 'loginInfo']),
    },
    created() {
      this.queryBalance()
      this.form.bvn = this.loginInfo.bvn
      this.form.firstName = this.loginInfo.firstName
      this.form.lastName = this.loginInfo.lastName
      this.bank()
    },
    mounted() {},
    methods: {
      // 查询是否有提现密码
      async queryBalance() {
        // let LoginStatus = this.isLogin
        // if (window.isApp) {
        //   LoginStatus = window.App.isLogin
        // }
        // if (!LoginStatus) return
        // let obj = {}
        // const res = await this.$api.queryAccountInfo(obj)
        // if (res.code !== 0) return
        // console.log(res.data)
        // this.form.noPwd = res.data.first
      },
      // 银行列表
      async bank() {
        const res = await this.$api.bankList({})
        if (res.code !== 0) return
        this.bankList = res.data
        this.bankList.forEach((value, n) => {
          value['id'] = n
        })
        // console.log(res.data)
      },
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.code.toLowerCase()
        const searchText = queryText.toLowerCase()
        // console.log(this.form.bank)
        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      async next() {
        let valid = await this.$refs.form.validate()
        if (valid) {
          console.log('ok')
        }
        if (this.form.verifyType === '1') {
          this.insertInfo = {
            title: 'Enter OTP',
            sub: 'Please enter the OTP sent to your phone'
          }
        } else if (this.form.verifyType === '0') {
          this.insertInfo = {
            title: 'Payment Password',
            sub: 'Please enter the Payment Password'
          }
        }
        this.passPanel = true
      },

      // 发送验证码
      async sendFn() {
        let th = this
        if (this.sendFlag) return
        // let accountNum = ''
        // if (this.otpForm.type === 1) {
        //   accountNum = this.otpForm.mobile
        // } else {
        //   accountNum = this.otpForm.email
        // }
        let typeNum = 3
        if (this.withdraw.type === 'withdraw') { // 提现
          typeNum = 3
        } else if (this.withdraw.type === 'addCard') { // 添加银行卡
          typeNum = 6
        }
        const res = await this.$api.mobileNumber({
          message: 'Sending verification code successfully', // 发送手机验证码成功
          data: {
            playerAccount: this.otpForm.account,
            codeUses: typeNum,
          }
        })
        if (res.code !== 0) {
          this.failMsg = res.msg
          return
        }
        this.sendFail = false
        th.sendFlag = true
        th.inputFocus = false
        // 倒计时
        th.countDown()
        // this.sendFail = false
      },
      insetPasswordBack(val) {
        console.log(val)
        if (val && val.length === 6) {
          this.nextVerifyCode = val
          this.isFinish = true
        }
      },
      submit: debounce(async function () {
        let Code = ''
        let paymentPwd = ''
        if (this.form.verifyType === '0') {
          paymentPwd = md5(md5(this.nextVerifyCode).toLocaleLowerCase()).toLocaleLowerCase()
        } else if (this.form.verifyType === '1') {
          Code = this.nextVerifyCode
        }
        console.log()
        let cardData = {
          accountHolder: this.form.firstName + this.form.lastName,
          bank: this.form.bank.code,
          bankName: this.form.bank.name,
          cardCode: this.form.cardNumber,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          verifyCode: Code,
          verifyType: this.form.verifyType,
          password: paymentPwd,
          bvn: this.form.bvn
        }
        const res = await this.$api.addAccountBank({
          message: 'Added successfully',
          data: cardData
        })
        if (res.code !== 0) return
        this.result = res.data
        this.$router.push({
          name: 'bankAccount'
        }) // 返回银行列表页面
      }),
      goBackSet() {
        if (this.passPanel) {
          this.passPanel = false
        } else {
          this.$router.go(-1)
        }
      },
      forgotPwd() {
        console.log('忘记密码')
        this.$router.push({
          name: 'paymentPassword',
          query: {
            model: 'forgot'
          }
        })
      }
    },
  }
</script>

<style lang="less" scoped>
.select-type {
  /deep/ .v-radio {
  }
}
</style>
