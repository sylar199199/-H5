<template>
  <div>
    <i-lot-toolbar @goBack="goBackSet" v-if="type !== '2'"></i-lot-toolbar>
    <!--顶部logo等信息-->
    <depositTopInfo :type="type" :payIfram="payIfram"></depositTopInfo>
    <div class="recharge pa-4" v-show="!payIfram">
      <!--充值金额-->
      <div class="recharge-model">
        <p class="recharge-model-l text-body-2 font-weight-bold">Amount（NGN）</p>
        <div class="recharge-model-r money d-flex justify-space-between flex-wrap mt-n2">
          <!--便捷充值金额-->
          <v-chip
              v-for="(num, index) in quickMoney"
              class="text-body-1 font-weight-medium mt-2 mb-2 recharge-item d-flex justify-center align-center"
              label
              large
              v-if="index < 5"
              :color="selectMoney===num ? 'primary' : 'secondary'"
              :class="[selectMoney===num ? 'white--text' : 'primary--text']"
              @click="select(num)"
              :key="index"
          >
            <span>{{$t('NGN-SYMBOL')}}{{num}}</span>
          </v-chip>
          <v-chip class="recharge-item input mt-2 mb-2" label large :color="inputMoney?'primary':'secondary'">
            <v-text-field
              v-model.trim="inputMoney"
              x-large
              type="number"
              :rules="moneyRule"
              autocomplete="off"
              pattern="[0-9]*"
              onkeyup='value=value.replace(/[^0-9]+/g,"")'
              :placeholder="isFocus ? '' : 'Any'"
              class="rounded-sm amount-input"
              @focus="isFocus = true"
              @blur="setMoney(inputMoney)"
              @input="anyMoney(inputMoney)"
            ></v-text-field>
          </v-chip>
        </div>
      </div>
      <!--提交按钮-->
      <LoadingBtn
        class="recharge-btn"
        :class="type === '1'?'mt-4':''"
        :disabled="!formIsValid"
        text="Deposit"
        @click="deposit"
      />
      <!--提示文字-->
      <div :class="type === '2'?'mx-4 mt-8':'mt-4'">
        <h3 class="text-body-2 font-weight-bold mb-2">Note</h3>
        <p class="text-sm-body-2 text-caption text--secondary">1. There are no fees charged for depositing with this payment method. Once your transaction is authorised, the amount will be credited to your account immediately.</p>
        <p class="text-sm-body-2 text-caption text--secondary">2. If the amount deposited doesn’t show, please click on “<v-icon small>mdi-autorenew</v-icon>” button</p>
      </div>
    </div>
    <!--iframe内嵌页面-->
    <v-card :class="type === '1'?'iframe-height':'pciframe-height'" elevation="0" v-if="payIfram">
      <iframe :src="payUrl"
              id="payIfra"
              :scrolling="type === '1'?'':'no'"
              frameborder="0"
              ref="payIfra"
              width="100%"
              height="100%">
      </iframe>
      <loadBlock class="load-style" :loadStaus="loadStaus"></loadBlock>
    </v-card>
  </div>
</template>

<script type="text/javascript">
import { jsBridge, APEvent } from '@/utils'
import { eventTracking, eventKey } from '@/utils/fireBase'
import LoadingBtn from '@/components/func/loading-btn'
// import PaymentSelector from './components/payment-selector'
// import ilotRechargeResult from './components/ilotRechargeResult'
import {mapGetters} from 'vuex'
import storage from '@/utils/storage'
import remoteLoad from '../../../utils/remoteLoad'
import depositTopInfo from './components/depositTopInfo'
import loadBlock from '../../../components/common/loading/loadBlock'
export default {
  name: 'recharge',
  components: {
    LoadingBtn,
    // PaymentSelector,
    // ilotRechargeResult,
    depositTopInfo,
    loadBlock
  },
  props: {
    type: {
      type: String,
      default: '1' // 1: 移动端； 2：pc端
    }
  },
  data() {
    return {
      moneyRule: [
        v => /^\d+$/.test(v)
      ],
      quickMoney: [],
      opayNum: '',
      inputMoney: '',
      selectMoney: '',
      isFocus: false,
      payIfram: false,
      payUrl: '',
      rechargeList: [
        {
          label: '₦20',
          value: '20',
          selected: true
        },
        {
          label: '₦50',
          value: '50',
          selected: false
        },
        {
          label: '₦100',
          value: '100',
          selected: false
        },
        {
          label: '₦200',
          value: '200',
          selected: false
        },
        {
          label: '₦500',
          value: '500',
          selected: false
        },
        {
          label: '₦10~1000',
          value: '',
          isDynamic: true,
          selected: false,
          placehoder: 'The custom'
        }
      ],
      insert: false,
      method: 0,
      amount: 0,
      loadStaus: false,
      companys: [],
      amountForm: {
        amount: '',
        payTypeCode: 'paystack',
        account: '',
        ip: '',
        mobile: '',
      },
      depositResult: {
        state: '',
        orderNo: '',
        reference: '',
        channelCode: 'paystack',
        type: 'deposit',
      },
      rules: {

      },
      showDialog: false,
      isConfirm: false,
      btnConfirm: 'Confirm',
      showCancle: false,
      showResult: false,
      chargeResult: {},
      showOpayNum: false,
    }
  },
  watch: {
    'amountForm.payTypeCode': {
      handler(newVal) {
        // console.log('newValllllll', newVal)
      }
    },
    inputMoney() {
      if ('' + this.inputMoney !== Math.floor(this.inputMoney)) {
        this.$nextTick(() => {
          this.inputMoney = Math.floor(this.inputMoney)
        })
      }
    }
  },
  computed: {
    ...mapGetters(['loginInfo', 'accountId', 'platformName']),
    formIsValid () {
      return (
        this.amountForm.amount
        // this.amountForm.payTypeCode
      )
    },
  },
  created() {
    this.getIp()
    this.payMode()
    this.queryFundsParams()
    this.opayNum = this.loginInfo.mobile
    this.amountForm.mobile = this.loginInfo.mobile
    this.amountForm.amount = this.rechargeList[0].value
  },
  mounted() {
    // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
    window.addEventListener('message', event => {
      // 根据上面制定的结构来解析iframe内部发回来的数据
      const data = event.data
      console.log(data)
      if (data.data === 'close') {
        // 关闭iframe
        this.payIfram = false
      }
      // if (data.data.customer.email) {
      //   console.log(data.data.customer.email)
      //   console.log(document.getElementById('payIfra').contentWindow)
      // }
    })
  },
  methods: {
    sendMessage() {
      // 外部vue向iframe内部传数据
      document.getElementById('payIfra').contentWindow.postMessage(this.type, process.env.VUE_APP_PLATFROM_URL)
    },
    // iframe
    setBtn() {
      let _this = this
      console.log(_this.payUrl)
      this.$nextTick(() => {
        const iframe = document.getElementById('payIfra')
        // 处理兼容行问题
        if (iframe.attachEvent) {
          iframe.attachEvent('onload', function () {
            // iframe加载完毕以后执行操作
            console.log('iframe已加载完毕')
            _this.sendMessage()
            _this.loadStaus = false
          })
        } else {
          iframe.onload = function () {
            // iframe加载完毕以后执行操作
            console.log('iframe已加载完毕')
            _this.sendMessage()
            _this.loadStaus = false
          }
        }
      })
    },
    // 获取ip
    async getIp() {
      await remoteLoad('https://pv.sohu.com/cityjson?ie=utf-8')
      this.amountForm.ip = window.returnCitySN.cip
    },
    // 便捷充值金额
    async queryFundsParams() {
      // this.showPop = true
      const res = await this.$api.queryFundsParams({
      })
      if (res.code !== 0) return
      // this.companys = res.data
      console.log(res.data)
      let arr = JSON.parse(res.data)
      console.log(JSON.parse(res.data))
      let arr2 = []
      arr.forEach((val, i) => {
        let money = parseInt(val.value) / 100000
        if (i < 6) {
          arr2.push(money)
        }
      })
      arr2.sort(function(a, b) {
        return a - b
      })
      console.log(arr2)
      this.quickMoney = arr2
      this.selectMoney = this.quickMoney[0]
    },
    // 选择金额
    select(item) {
      this.selectMoney = item
      this.inputMoney = ''
      this.amountForm.amount = item
    },
    // 输入金额
    anyMoney(val) {
      if (this.selectMoney) this.selectMoney = ''
    },
    setMoney(val) {
      val = val.toString().replace(/[^0-9]+/g, '')
      this.inputMoney = val
      console.log(this.inputMoney)
    },
    setAmout(val) {
      if (val) this.amountForm.amount = val
    },
    // 查询支付方式
    async payMode() {
      const res = await this.$api.payMode({
        data: {
          direction: 'receipt'
        }
      })
      if (res.code !== 0) return
      // var obj = {}
      this.companys = res.data
      // .reduce(function(item, next) {
      //   obj[next.payTypeCode] ? '' : obj[next.payTypeCode] = true && item.push(next)
      //   return item
      // }, [])
    },
    // 选择支付方式 (目前没有这个操作)
    changeSelect(item) {
      let fireObj = {
        clickOn: item.payTypeCode
      }
       // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_PAY_WAY, item.payTypeCode, fireObj)
      let payTypeCode = item.payTypeCode === this.amountForm.payTypeCode ? '' : item.payTypeCode
      this.showOpayNum = payTypeCode === 'opay'
      this.$set(this.amountForm, 'payTypeCode', payTypeCode)
    },
    // 充值
    async deposit(fn) {
      let fireObj = {
        clickConfirm: 'deposit'
      }
       // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_PAY_WAY, 'deposit', fireObj)
      try {
        if (this.selectMoney !== '' && this.selectMoney > 0) {
          this.amountForm.amount = Math.floor(this.selectMoney)
        } else if (this.inputMoney !== '' && this.inputMoney > 0) {
          this.amountForm.amount = this.inputMoney
        } else {
          let msg = 'Amount cannot be blank !'
          this.$common.setMsg(msg, 'error')
          return
        }
        if (this.amountForm.payTypeCode === 'opay') {
          if (!this.opayNum) {
            let msg = 'Mobile number cannot be blank !'
            this.$common.setMsg(msg, 'error')
            return
          }
        }
        let apiData = {}
        apiData = {
          payAmount: parseInt(this.amountForm.amount),
          ipAddress: this.amountForm.ip,
          payModeCode: this.amountForm.payTypeCode,
          country: 'ng',
          mobile: this.opayNum,
          transChannel: 4,
          transType: 1
        }
        const res = await this.$api.payment({
          // message: '充值成功',
          data: apiData
        })
        if (res.code !== 0) return
        storage.session.set('depositamount', parseInt(this.amountForm.amount))
        let url = res.data.cashierUrl
        this.depositResult.orderNo = res.data.orderNo
        this.depositResult.reference = res.data.reference
        // this.depositResult.channelCode = this.amountForm.payTypeCode
        // window.open(url, '_blank')
        // this.showDialog = true
        console.log(process.env.VUE_APP_PLATFROM_URL + '/#/rechargeSuccess?')
        this.payUrl = url
        this.payIfram = true
        this.loadStaus = true
        this.setBtn()
      } catch (err) {
      } finally {
        fn && fn()
      }
    },
    // 查询支付状态
    async checkResult(val) {
      // if (val === '0') {
        const res = await this.$api.checkDeposit({
          // message: '查询成功',
          data: {
            channelCode: this.depositResult.channelCode,
            paymentNo: this.depositResult.reference,
            thirdTransNo: this.depositResult.orderNo
          }
        })
        if (res.code !== 0) return
        if (res.data.status === 'SUCCESS') {
          if (window.isApp) {
            jsBridge.recordEventToAppsFlyer('Deposit')
          } else {
            APEvent('EVENT', 'Deposit')
          }
        }
        if (res.data.status === 'SUCCESS' || res.data.status === 'FAIL') {
          if (this.type === '2') {
            this.$router.push({
              name: 'rechargeSuccess',
              query: {
                amount: res.data.amount
              }
            })
            this.$store.dispatch('backToOtherPage') // 判断是否返回其它页面
          } else {
            this.showResult = true
          }
          this.chargeResult = {
            amount: res.data.amount,
            status: res.data.status
          }
          this.showDialog = false
        } else {
          this.showCancle = true
        }
    },
    // 倒计时
    countDown(val) {
      this.isConfirm = true
      let i = 10
      let timeId = setInterval(() => {
        i -= 1
        this.btnConfirm = `Confirm(${i}s)`
        this.dialogText = 'Your deposit has been approved, please wait for processing. It may take at most a few seconds.'
        if (i === 0) {
          this.checkResult(val)
          this.btnConfirm = 'Confirm'
          i = 120
          clearInterval(timeId)
          this.isConfirm = false
        }
      }, 1000)
    },
    hideResultSet() {
      this.showResult = false
    },
    goBackSet() {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="less" scoped>
.recharge-item {
  width: 30%;
  &.input{
    /deep/ input{
      color: #fff !important;
      font-weight: 500 !important;
    }
  }
}
.amount-input {
  /deep/ .v-input__slot {
    margin-bottom: 0;
    &:before,&:after {
      display: none;
    }
    input {
      text-align: center !important;
    }
  }
}
.iframe-height{
  height: calc(100vh - 114px);
}
.pciframe-height{
  height: calc(100vh - 180px);
}
  .load-style{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
</style>
