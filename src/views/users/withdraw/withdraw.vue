<template>
  <div class="recharge">
    <i-lot-toolbar  @goBack="goBackSet"></i-lot-toolbar>
    <v-form
      v-if="!showSend"
      ref="form"
      v-model="formIsValid"
      class="recharge-form pa-4"
    >
      <div class="recharge-form-single first">
        <p class="recharge-form-single-l text-body-2 font-weight-bold">Amount (NGN)</p>
        <div class="recharge-form-single-r d-flex text--disabled justify-space-between flex-wrap mt-n2">
          <v-text-field
              v-model.trim="form.payAmount"
              type="number"
              outlined
              required
              clearable
              dense
              class="text-body-2"
              pattern="[0-9]*"
              onkeyup='value=value.replace(/[^0-9]+/g,"")'
              :rules="[rules.required, rules.amount]"
              @blur="setMoney(form.payAmount)"
              prefix="₦"
              value="0"
          ></v-text-field>
          <span class="text-caption">Total:
            <strong class="red--text darken-2">₦{{accountData.balance | fmoney}}</strong>, Withdraw:
            <strong class="red--text darken-2">₦{{accountData.money | fmoney}}</strong>, Frozen:
            <strong class="red--text darken-2">₦{{accountData.noWithdrawMoney | fmoney}}</strong>
          </span>
        </div>
      </div>
      <div class="recharge-form-single">
        <div class="recharge-form-single-l d-flex justify-space-between align-center mt-8 font-weight-medium">
          <p class="text-body-2 font-weight-bold">Withdraw to</p>
          <!-- <v-spacer></v-spacer>
          <v-btn
            text
            class="text-capitalize primary--text mr-n4"
            @click="$router.push({name: 'addBankCard'})"
          >
           <v-icon left class="mr-0">
          mdi-plus
        </v-icon>Add Card</v-btn> -->
        </div>
        <div class="recharge-form-single-r bank-select">
          <div @click="showBankDialog" class="recharge-form-single-r-add">
            <v-text-field
                v-model="form.account.name"
                disabled
                outlined
                dense
                class="text-body-2"
                :rules="[rules.required]"
                placeholder="Please select a Account Number"
            ></v-text-field>
          </div>
          <BankCardList
            v-model="showBankList"
            :accountList="accountList"
            :selectBank="selectBank"
            @changeBank="changeBank"
            v-if="type === '2'"
          />
        </div>
      </div>

      <!-- <v-autocomplete
        v-model="form.account"
        :items="accountList"
        :filter="customFilter"
        item-text="name"
        persistent-hint
        return-object
        outlined
        required
        :rules="[rules.required]"
        placeholder="Account Number"
        :search-input.sync="searchSelect"
        @blur="changeCard"
      >
      </v-autocomplete> -->
      <!--<v-alert
        dense
        text
        border="left"
        color="orange darken-2"
        class="recharge-form-tips phone-tips text-sm-subtitle-2 text-caption"
      >
        <v-icon small color="orange darken-2">mdi-alert</v-icon>
        Withdrawal fee of 1.5% up to ₦2,000
      </v-alert>-->
      <LoadingBtn
        class="recharge-form-btn"
        :disabled="!formIsValid"
        text="Withdraw"
        @click="Withdrawals"
      />
    </v-form>
    <insetPassword :changePanel="showSend" :info="insertInfo" @insertBack="insetPasswordBack"></insetPassword>
    <div v-if="showSend" class="mx-4 pb-4">
      <v-btn
        class="rounded-sm white&#45;&#45;text mt-4 primary text-capitalize"
        :disabled="!isFinish"
        block
        large
        @click="confirm">
        Confirm
      </v-btn>
      </div>
    <!-- 发送信息 -->
    <!--<div class="send-OTP pa-8 text-center" v-if="showSend">
      <h6 class="mt-14 text-h6 font-weight-medium">Enter OTP</h6>
      <p class="text-caption text-center grey&#45;&#45;text text&#45;&#45;darken-2">Please enter the OTP sent to your account</p>
      <v-form ref="confirmForm" v-model="formIsValid2">
        <v-text-field
          v-model="verifyCode"
          outlined
          required
          :rules="[rules.verifyCode]"
          placeholder="OTP"
          class="mt-8"
        ></v-text-field>
        <v-btn
          class="rounded-sm white&#45;&#45;text mt-4 primary text-capitalize"
          :disabled="!formIsValid2"
          block
          large
          @click="confirm">
          Confirm
        </v-btn>
      </v-form>
    </div>-->
    <!-- 提示框 -->
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ warnMessage }}
    </v-snackbar>
    <!-- 选择银行列表框 -->
    <template v-if="type === '1'">
      <v-dialog
        v-model="showBankList"
        fullscreen
        transition="fade-transition"
        scrollable
        overlay-color="#fff"
        content-class="dialog-bank"
      >
        <div class="cover"></div>

        <BankCardList
          v-model="showBankList"
          :accountList="accountList"
          :selectBank="selectBank"
          @changeBank="changeBank"
        />
      </v-dialog>
    </template>
  </div>
</template>

<script type="text/javascript">
import BankCardList from './components/bank-card-list'
import LoadingBtn from '@/components/func/loading-btn'
import {mapGetters, mapMutations} from 'vuex'
import insetPassword from '../paymentPassword/components/insertPassword'
// import storage from '@/utils/storage'
import remoteLoad from '@/utils/remoteLoad'
import { debounce } from '@/utils'
import md5 from 'js-md5'
export default {
  name: 'withdraw',
  components: {
    BankCardList,
    LoadingBtn,
    insetPassword,
  },
  props: {
    type: {
      type: String,
      default: '1' // 1: 移动端； 2：pc端
    }
  },
  data() {
    return {
      formIsValid: true,
      formIsValid2: true,
      form: {
        verifyType: 1, // 1 otp 0 pay password
        country: 'NG',
        verifyCode: '',
        cardCode: '',
        bankCode: '',
        bankName: '',
        firstName: '',
        lastName: '',
        mobile: '',
        account: {
          name: ''
        }
      },
      insertInfo: {
        title: 'Payment Password',
        sub: 'Please enter the Payment Password'
      },
      showBankList: false,
      bankList: [],
      selectBank: {},
      accountList: [],
      showSend: false,
      verifyCode: '',
      searchSelect: null,
      newAccount: null,
      amount: 0,
      companys: [],
      amountForm: {
        amount: '',
        payTypeCode: '',
        account: '',
        ip: '',
        mobile: '',
      },
      depositResult: {
        state: '',
        orderNo: '',
        reference: '',
        channelCode: '',
        type: 'deposit',
      },
      nextVerifyCode: '', // 提现密码
      isFinish: false, // 可提交
      rules: {
        required: v => !!v || 'Withdrawal amount is required',
        amount: v => (this.accountData && this.accountData.money && parseFloat(v) < parseFloat(this.accountData.money)) || 'Cannot exceed the withdrawal amount',
        verifyCode: [val => (val || '').length > 0 || 'This field is required']
      },
      warnMessage: '',
      snackbar: false,
      timeout: 2000,
      showDialog: false,
      isConfirm: false,
      btnConfirm: 'Confirm',
      accountData: {
        money: '', // 可提现金额
        noWithdrawMoney: '0.00', // 不可提现金额
        balance: '', // 总金额
        currency: '', // 单位
      }
    }
  },
  watch: {
    'amountForm.payTypeCode': {
      handler(newVal) {
        // console.log('newValllllll', newVal)
      }
    },
    'form.bank': {
      handler(newVal) {
        console.log(newVal)
      }
    },
    searchSelect: {
      handler(newVal) {
        this.searchCard(newVal)
      }
    },
    'form.payAmount': {
      deep: true,
      handler() {
        if ('' + this.form.payAmount !== Math.floor(this.form.payAmount)) {
          this.$nextTick(() => {
            this.$set(this.form, 'payAmount', Math.floor(this.form.payAmount))
          })
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'loginInfo', 'accountId']),
  },
  created() {
    this.getIp()
    this.payMode()
    this.queryBalance()
    this.bank()
    this.bankAccount()
    this.amountForm.mobile = this.loginInfo.mobile
    // console.log(this.loginInfo)
  },
  mounted() {},
  methods: {
    ...mapMutations(['WITHDRAW_DATA']),
    // 获取ip
    async getIp() {
      await remoteLoad('https://pv.sohu.com/cityjson?ie=utf-8')
      this.amountForm.ip = window.returnCitySN.cip
    },
    setMoney(val) {
      val = val.toString().replace(/[^0-9]+/g, '')
      this.form.payAmount = val
      console.log(this.form.payAmount)
    },
    // 获取输入的密码
    insetPasswordBack(val) {
      console.log(val)
      if (val && val.length === 6) {
        this.nextVerifyCode = val
        this.isFinish = true
      }
    },
    async queryBalance() {
      // console.log(this.isLogin)
      let LoginStatus = this.isLogin
      if (window.isApp) {
        LoginStatus = window.App.isLogin
      }
      if (!LoginStatus) return
      let obj = {}
      const res = await this.$api.queryAccountInfo(obj)
      if (res.code !== 0) return
      // console.log('ressssss', res)
      this.accountData.money = res.data.withdrawableBalance
      // this.accountData.commissionBalance = res.data.commissionBalance
      this.accountData.balance = res.data.balance
      this.accountData.currency = res.data.currency
      this.accountData.noWithdrawMoney = res.data.balance - res.data.withdrawableBalance
      // this.withdrawForm.noPwd = res.data.first
    },
    select(item) {
      // console.log(item)
    },
    // 查询支付方式
    async payMode() {
      const res = await this.$api.payMode({
        data: {
          direction: 'receipt'
        }
      })
      if (res.code !== 0) return
      var obj = {}
      this.companys = res.data.reduce(function(item, next) {
        if (!obj[next.payTypeCode]) {
          obj[next.payTypeCode] = true
          item.push(next)
        }
        return item
      }, [])
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
    // 银行账户列表
    async bankAccount(val) {
      let data = {}
      if (val) {
        data = {
          bank: val.code
        }
      }
      const res = await this.$api.bankAccountList({
          // message: '查询成功',
        data
      })
      if (res.code !== 0) return
      this.accountList = res.data.map(item => {
        item.name = `${item.bankName} (${item.cardCode})`
        return item
      })
    },
    showBankDialog() {
      this.showBankList = !this.showBankList
    },
    changeBank(val) {
      if (val) {
        this.selectBank = val
        this.showBankList = false
        this.form.account = val
        this.bankAccount(val)
      }
    },
    customFilter (item, queryText, itemText) {
      // console.log(item, queryText, itemText)
      const textOne = item.name.toLowerCase()
      const textTwo = item.cardCode.toLowerCase()
      const searchText = queryText.toLowerCase()
      let select = textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1
      // console.log(select, item, this.form.account, textOne, textTwo)
      return select
    },
    searchCard(val) {
      // console.log(val)
      let newVal = null
      for (let i in this.accountList) {
        if (val === this.accountList[i].cardCode) {
          newVal = val
        }
      }
      if (!newVal) {
         this.newAccount = newVal
         // console.log('创建新值', this.newAccount, this.form.account)
      }
    },
    changeCard(val) {
      // console.log(val)
    },

    // 提现
    async Withdrawals(fn) {
      try {
        let valid = this.$refs.form.validate()
        if (valid) {
          // await this.sendMsg()
          this.showSend = true
        }
      } catch (err) {
      } finally {
        fn && fn()
      }
    },
    async sendMsg() {
      if (this.sendFlag) return
      const res = await this.$api.mobileNumber({
        message: 'Sending verification code successfully', // 发送验证码成功
        data: {
          codeUses: 3,
          playerAccount: this.loginInfo.playerAccount
        }
      })
      if (res.code !== 0) return
      this.showSend = true
    },
    // 收到短信 确认
     confirm: debounce(async function () {
      // let valid = this.$refs.confirmForm.validate()
      // if (!valid) return
      console.log('123123312')
      let obj = {
        cardCode: this.form.account.cardCode,
        bankCode: this.form.account.bank,
        bankName: this.form.account.bankName,
        firstName: this.form.account.firstName,
        lastName: this.form.account.lastName,
        mobile: this.loginInfo.mobile,
        transChannel: 4,
        verifyType: 0, // 1 otp 0 pay password
        country: 'NG',
        payAmount: Math.floor(this.form.payAmount),
        password: md5(md5(this.nextVerifyCode).toLocaleLowerCase()).toLocaleLowerCase()
        // verifyCode: this.verifyCode, // 验证码
      }
      // console.log('-----', obj, this.verifyCode)
      // if (this.verifyCode) {
      // }
      const res = await this.$api.withDrawal({
        data: obj
      })
      this.WITHDRAW_DATA('')
      if (res.code !== 0) return
      this.$router.push({name: 'withdrawalsSuccess'})
    }),
    goBackSet() {
      if (this.showSend) {
        this.showSend = false
      } else {
        this.$router.go(-1)
      }
    }
  },
}
</script>

<style lang="less" scoped>
.recharge{
  position: relative;
}
.send-OTP {
  position: absolute;
  top: 0;
  background: #fff;
  height: 100%;
  width: 100%;
  z-index: 99;
}
.dialog-bank {
  .cover {
    background: rgba(0, 0, 0, 0.4);
  }
}
</style>
