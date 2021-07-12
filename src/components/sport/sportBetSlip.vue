<template>
  <v-container class="pa-0 pt-2" fill-height min-width="100%" ref="betHeight">
    <div v-if="betList.length>0" class="bet-cart">
      <!--标题&remove按钮-->
      <div class="d-flex justify-space-between align-center px-sm-4 px-2">
        <div class="d-flex fill-height justify-center align-center">
          <span class="mr-2 text-sm-h6 text-subtitle-1">Betslip</span>
          <v-chip
            :class="betNum>0?'d-block':'d-none'"
            color="primary white--text"
            class="px-sm-2 px-1"
            x-small>
            <span class="text-subtitle-2">{{betNum}}</span>
          </v-chip>
        </div>
        <v-btn text small class="text-capitalize text-sm-subtitle-2 text-caption px-0" @click="removeAll">
          <v-icon small left class="mr-0">mdi-trash-can-outline</v-icon>
          Remove all
        </v-btn>
      </div>
      <v-divider class="mt-1"></v-divider>
      <!--选项卡-->
      <v-tabs class="bet-type-tab text-subtitle-2" height="40" center-active centered show-arrows v-model="betType" @change="changeType">
        <v-tab class="text-capitalize">Singles</v-tab>
        <v-tab class="text-capitalize" v-if="hideType">Multiple</v-tab>
        <!--<v-tab class="text-capitalize" :class="{'text-decoration-line-through':systemNoDrop}" v-if="hideType" :disabled="systemNoDrop">Syetem</v-tab>-->
      </v-tabs>
      <!--分割线-->
      <v-divider class="mt-1 pt-1 grey lighten-4 "></v-divider>
      <v-card
        class="rounded-0 overflow-y-auto"
        elevation="0"
        :height="listMaxHeight"
      >
        <!--赔率列表-->
        <v-list-item v-for="(item, index) in betData" :key="index" class="pt-sm-2 pt-1 px-sm-4 px-2" :class="[{'nodrop-color':item.status===false||!globalFlag},{'secondary':item.style!==''&& item.style!==undefined && item.status && globalFlag}]">
          <div class="d-flex item-border">
            <!--选择按钮-->
            <v-checkbox
              v-model="item.checked"
              class="align-self-center"
              :disabled="item.status===false||!globalFlag"
              @change="saveBetData(betData)"
            ></v-checkbox>
            <!--中间内容-->
            <v-list-item-content class="text-left pa-0 pt-sm-2 pt-1">
              <div class="text-truncate text-sm-subtitle-2 text-caption black--text odds-name" :class="{'name-pd':item.status===false|| !globalFlag}">
                <p class="odds-name-main text-truncate mb-0">
                  {{ item.team1 }} <span class="grey--text lighten-1 mx-2">VS</span> {{item.team2}}
                </p>
                <!--赔率不可以标志-->
                <v-chip
                  small
                  label
                  v-if="item.status===false||!globalFlag"
                  class="text--secondary odds-mark"
                >
                  unavailable
                </v-chip>
              </div>
              <!--赔率名称及赔率-->
              <p class="text-truncate py-sm-1 py-0 mb-0 text-sm-subtitle-2 text-caption black--text market-name">
                <span class="mr-2">{{ item.marketName }} </span>
                <span v-if="item.name && item.name !== 'null'">
                  <!--有带主客队名称的情况-->
                  <template v-if="item.name.indexOf(item.team1) > -1 || item.name.indexOf(item.team2) > -1">
                          <!--主客队名称都有的情况-->
                    <span class="mr-2" v-if="item.name.indexOf(item.team1) > -1 && item.name.indexOf(item.team2) > -1">{{item.name.replace(new RegExp(item.team1,'g'), 'home').replace(new RegExp(item.team2,'g'), 'away')}}</span>
                    <!--只有主队名称的情况-->
                    <span class="mr-2" v-if="item.name.indexOf(item.team1) > -1 && item.name.indexOf(item.team2) === -1">{{item.name.replace(new RegExp(item.team1,'g'), 'home')}}</span>
                    <!--只有客队名称的情况-->
                  <span class="mr-2" v-if="item.name.indexOf(item.team2) > -1 && item.name.indexOf(item.team1) === -1">{{item.name.replace(new RegExp(item.team2,'g'), 'away')}}</span>
                  </template>
                  <!--没有带主客队名称的情况-->
                  <template v-else>
                    <span class="mr-2">{{item.name}}</span>
                  </template>
                </span>
                <span class="mr-2" v-else>{{item.name}}</span>
                <span class="pa-1 font-weight-bold primary--text" v-if="item.style && item.status">{{ item.odds }}</span>
                <span class="pa-1 font-weight-bold" v-else>{{ item.odds }}</span>
              </p>
              <!--single的return和金额-->
              <div class="d-flex justify-space-between align-center pt-1 mb-4 pr-16 win" v-if="betType===0">
                <p class="mb-0 grey--text text-sm-subtitle-2 text-caption lighten-1 mt-1">potential win <strong class="font-weight-black black--text">{{parseFloat(item.potentialWin || 0).toFixed(2)}}</strong></p>
                <div class="single-input-width input-absolute">
                  <v-text-field
                    class="odds-input mt-1"
                    outlined
                    height="24"
                    min-height="24"
                    v-model="item.money"
                    :disabled="item.status===false||!globalFlag"
                    autocomplete="off"
                    maxlength="8"
                    pattern="[0-9]*"
                    oninput="if(value.length>8)value=value.slice(0,8)"
                    type="number"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    @onValueChange="saveBetData(this.betData)"
                    @change="moneyChange($event, item)"
                    @focus="changeVal($event,item.money,index)"
                    @blur="setVal(item.money,index)"
                    @input="changePotentialWin(item,'change')"
                    :rules="rules"></v-text-field>
                </div>
              </div>
            </v-list-item-content>
            <!--删除按钮-->
            <v-list-item-action class="align-self-start ma-0">
              <v-btn class="" icon color="grey lighten-1" @click="deleteBet(item)">
                <v-icon small>mdi-close-circle</v-icon>
              </v-btn>
            </v-list-item-action>
          </div>
        </v-list-item>
        <!--分割线-->
        <template v-if="type !== '2'">
          <v-divider class="pt-1 mb-5 grey lighten-4"></v-divider>
          <!--投注结算部分-->
          <singleBet v-if="betType===0" :betData="betData" :singleData="singleData" @getData="getData"></singleBet>
          <multipleBet v-else-if="betType===1" :betData="betData" :matchNum="matchNum" @getData="getData"></multipleBet>
          <syetemBet v-else-if="betType===2" :betData="betData" :matchNum="matchNum" @getData="getData"></syetemBet>
        </template>
      </v-card>
      <!--投注按钮-->
      <div class="bottom-bet" v-if="type !== '2'">
        <v-btn v-if="oddsChangeBet" class="text-capitalize align-center rounded-0"
               block
               elevation="0"
               x-large
               color="primary"
               @click="checkBetNow">
          <p class="mt-3">
            <strong class="text-sm-6 text-subtitle-1">Place Bet</strong> <br>
            <!--<span class="text-body-2">Max Win
              <span v-if="betType===0"> {{parseFloat(totalPotentialWin).toFixed(2)}}</span>
              <span v-else>{{parseFloat(potentialMax).toFixed(2)}}</span>
            </span>-->
          </p>
        </v-btn>
        <v-btn v-else class="text-capitalize align-center rounded-0"
               block
               elevation="0"
               x-large
               color="primary"
               @click="changeStyle">
          <p class="mt-3">
            <strong class="text-6">Accept Changes</strong>
          </p>
        </v-btn>
      </div>
    </div>
    <!--bookingCode-->
    <bookingCode v-if="betList.length===0"></bookingCode>
    <!--遮罩层,投注时出现-->
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!--成功提示框-->
    <betSuccess v-if="showSuccess" :betSuccessData="betSuccessData" :successPotential="successPotential" @closeDialog="closeDialog"></betSuccess>
  </v-container>
</template>

<script>
  import singleBet from '@/components/sport/betSlip/singleBet'
  import multipleBet from '@/components/sport/betSlip/multipleBet'
  import syetemBet from '@/components/sport/betSlip/syetemBet'
  import betSuccess from '@/components/sport/betSlip/betSuccess'
  import bookingCode from '@/components/sport/betSlip/bookingCode'
  import { mapMutations, mapGetters } from 'vuex'
  import { debounce } from '@/utils'

  export default {
    name: 'betSlip',
    components: {
      singleBet,
      multipleBet,
      syetemBet,
      betSuccess,
      bookingCode
    },
    props: {
      type: {
        type: String,
        default: '1' // 1: 移动端； 2：pc端
      }
    },
    data() {
      return {
        betNum: 0, // 购物车赔率数量
        betData: [],
        betType: 0, // 投注类型
        hideType: false, // 是否显示system、multiple
        systemNoDrop: false, // system是否可以点击
        minOdds: 0, // 最小赔率
        oldTime: '', // 获取购物车数据时间
        oddsChangeBet: true, // 赔率是否有变化
        acceptChange: false, // 是否接受赔率变化
        matchNum: [], // 赛事数量
        listMaxHeight: 500, // 最大高度
        singleData: {
          ticketNum: 0,
          totalStake: 0,
          potentialWin: 0,
          moneyChange: false, // 单个金额是否改变
        },
        multipleNum: 0,
        betState: false, // 判断multiple、system投注是否有两个不同赛事赔率
        potentialMin: 0,
        potentialMax: 0,
        singleMoney: 0, // 投注时传的单个金额
        totalMoney: 0, // 投注时传的总金额
        totalPotentialWin: 0, // 投注按钮上的预计奖金
        successPotential: {}, // 传给投注成功的potentialWin
        cfgData: {
          maxPayout: 0, // 最大赔付金额
           single: {
             minStake: 100, // 最小投注金额
             maxStake: 1000000, // 最大投注金额
             maxEvent: 30, // 最大投注数量
           },
          multiple: {
            minStake: 100, // 最小投注金额
            maxStake: 1000000, // 最大投注金额
            maxEvent: 30, // 最大投注数量
          },
          system: {
            minStake: 100, // 最小投注金额
            maxStake: 1000000, // 最大投注金额
            maxEvent: 20, // 最大投注数量
          },
        },
        noMoney: false, // 金额是否足够
        showSuccess: false, // 显示投注成功弹窗
        betSuccessData: {}, // 投注成功返回的数据
        couponData: {
          totalStake: 0,
          minOdds: 0,
        },
        overlay: false, // 遮罩层
        maxPayout: '', // multiple实际的最大赔付金额
        gameId: '', // sport游戏Id
        rules: [
          value => (value.toString()).length <= 8 || 'Max 8 characters',
          value => {
            const pattern = /^[0-9]*$/
            return pattern.test(value) || 'Only number.'
          },
          // value => (value === 0 || value >= 100) || 'More than 100'
        ]
      }
    },
    activated() {
      console.log('进入页面')
      this.setMoney()
    },
    computed: {
      ...mapGetters(['betList', 'loginInfo', 'betCoupon', 'isLogin', 'betTypeNum', 'multipleMoney', 'systemMoney', 'globalFlag', 'rebetTicket']),
      items () {
        return Array.from({ length: this.length }, (k, v) => v + 1)
      },
      length () {
        return 7000
      },
    },
    watch: {
      betType() {
        this.$store.commit('SET_BET_TYPE', this.betType)
      },
      betData() {
        this.$store.commit('SET_BET_DATA', this.betData)
      },
      singleData: {
        handler() {
          this.$store.commit('SET_SINGLE_DATA', this.singleData)
        },
        deep: true
      },
      matchNum() {
        this.$store.commit('SET_MATCH_NUM', this.matchNum)
      },
      totalPotentialWin() {
        this.$store.commit('SET_TOTAL_POTENTIAL_WIN', this.totalPotentialWin)
      },
      potentialMax() {
        this.$store.commit('SET_POTENTIAL_MAX', this.potentialMax)
      },
      'betList': {
        handler: debounce(function (newValue, oldValue) {
          if (this.isLogin) {
            if (oldValue === undefined) return
          }
          let id = this.$route.params.id
          if (id !== undefined && id !== '') return
          if (JSON.stringify(newValue) === JSON.stringify(oldValue)) return
          // bookingCode改变后的数据切换tab
          this.betType = this.betTypeNum
          if (this.betType > 0) {
            this.hideType = true
          }
          if (newValue.length > 0) {
            newValue.forEach(item => {
              item.status = !!item.odds
              if (item.money === '' || item.money === undefined) {
                item.money = 50
              }
              if (this.betType === 0) {
                item.potentialWin = item.money * item.odds
              }
            })
            this.betNum = newValue.length
          } else {
            this.betNum = 0
            // 当没有可用赔率时
            let obj = {
              status: this.betCoupon.status, // 是否使用优惠券
              couponId: '',
              coupon: 0,
              couponCode: '',
            }
            // this.statisticData.coupon = 0
            this.SET_COUPON(obj)
            // 断开购物车推送, 断开连接
            this.$socketio.off('sport_shopping_cart_topic_v2')
          }
          // 如果存在赔率, 已有数据状态替换掉betData
          let arr = newValue
          if (this.betData.length > 0) {
            arr.forEach(val => {
              this.betData.forEach(val1 => {
                if (val.sid === val1.sid) {
                  val.checked = val1.checked
                  val.status = val1.status
                  val.money = val1.money
                  val.odds = val1.odds
                  val.style = val1.style
                }
              })
            })
          }
          if (this.betType === 1 || this.betType === 2) {
            this.countMatchNum(arr)
          } else {
            this.countNum(arr)
          }
          this.betData = arr
          this.showMultiple(arr)
          // 当赔率数量变化时保存购物车
          if (oldValue !== undefined && newValue.length !== oldValue.length) {
            this.saveBetData(this.betData, 'notCount')
          }
          // 当赔率数量变化时重新调用推送
          if (oldValue === undefined || newValue.length !== oldValue.length) {
            this.simpleinitSocketio(this.betData)
          }
        }),
        immediate: true,
        deep: true
      },
      'isLogin': {
        handler(newValue, oldValue) {
          if (oldValue === undefined) return
          if (newValue) {
            this.getCarData('login')
            if (this.betType === 1 || this.betType === 2) {
              this.getCoupon()
              this.countMatchNum(this.betData)
            } else {
              this.countNum(this.betData)
            }
          } else {
            // 退出登录后清除购物车数据
            this.removeAll()
          }
        },
        // rebet
        immediate: true,
        deep: true
      },
      rebetTicket: {
        handler(newValue, oldValue) {
          if (newValue.ticketId) {
            this.getRebetInf(newValue.ticketId)
          }
        },
        immediate: true,
        deep: true
      },
      // 全局赛事状态
      globalFlag(newValue) {
        if (!newValue) {
          this.betData.forEach((val) => {
            val.checked = false
            // val.status = false
          })
        }
      },
      oddsChangeBet: {
        immediate: true,
        handler() {
          this.$emit('changeOddsBet', this.oddsChangeBet)
        }
      }
    },
    created() {
      this.betType = this.betTypeNum
      this.betNum = this.betList.length
      this.getCfg()
      if (this.betData.length === 0) {
        this.betData = this.betList
      }
      this.setMoney()
      console.log(this.betData)
      this.getCarData('cart')
      if (this.type === '2') {
        // 如果路由有参数执行rebet方法
        let id = this.$route.params.id
        if (id !== undefined && id !== '') {
          this.getRebetInf(id)
        } else {
          this.getCarData('cartLogin')
        }
      }
    },
    mounted() {
      this.setHeight()
    },
    methods: {
      ...mapMutations(['SET_BETTING', 'SYSTEM_MONEY', 'SET_CARDATA', 'MULTIPLE_MONEY', 'COUPON_LIST', 'SET_COUPON', 'COUPON_DATA', 'BET_TYPE', 'REBET_TICKET']),
      // 设置默认金额
      setMoney() {
        this.betData.forEach(value => {
          if (value.money === '' || value.money === undefined) {
            value.money = 50
          }
          if (!this.globalFlag && !this.isLogin) {
            value.checked = false
            // value.status = false
          }
        })
      },
      moneyChange(val, item) {
        this.$set(item, 'money', val)
        this.saveBetData(this.betData)
      },
      // 设置赔率列表的高度
      setHeight() {
        // let height = this.$refs.betHeight.offsetHeight
        let height1 = (window.innerHeight > 0) ? window.innerHeight : screen.height
        // let min = height - 190
        let max = height1 - 190
        this.listMaxHeight = max
      },
      // 获取投注配置
      async getCfg() {
        const res = await this.$api.getCfg({
          // data: {}
        })
        if (res.code !== 0) return
        this.gameId = res.data.gameId
        if (res.data.maxPayout) {
          this.cfgData.maxPayout = res.data.maxPayout
        }
        // 最小投注金额
        this.cfgData.single = {
          minStake: res.data.types.single.minStake,
          maxStake: res.data.types.single.maxStake,
          maxEvent: res.data.types.single.maxSelNum,
        }
        this.cfgData.multiple = {
          minStake: res.data.types.multiple.minStake,
          maxStake: res.data.types.multiple.maxStake,
          maxEvent: res.data.types.multiple.maxSelNum,
        }
        this.cfgData.system = {
          minStake: res.data.types.system.minStake,
          maxStake: res.data.types.system.maxStake,
          maxEvent: res.data.types.system.maxSelNum,
        }
      },
      // 查询余额 (目前没用)
      async queryBalance() {
        // let LoginStatus = this.$store.state.isLogin
        // if (window.isApp) {
        //   LoginStatus = window.iLotJsBridge.isLogin() === 'true'
        // }
        if (!this.isLogin) return
        const res = await this.$api.queryAccountInfo({
        })
        if (res.code === 0 && res.data) {
          this.balance = res.data.balance
          this.noMoney = this.totalMoney > this.balance
        }
      },
      // 关闭购物车
      closeCart() {
        this.$emit('getState', false)
      },
      // 是否显示system、multiple
      showMultiple(data) {
        if (data.length <= 1) {
          this.hideType = false
          this.betType = 0
          this.BET_TYPE(0)
          // 清除multiple的金额
          this.MULTIPLE_MONEY(0)
          // 清除System保存的金额
          let arr = []
          this.SYSTEM_MONEY(arr)
          this.countNum(this.betData)
          return
        }
        this.hideType = false
        for (let n = 0; n < data.length - 1; n++) {
          let val = data[n].matchId
          let val1 = data[n + 1].matchId
          if (val !== val1) {
            this.hideType = true
          }
        }
        if (this.betType !== 1 && this.betType !== 2) {
          this.betType = 0
        }
        let eventNum = 0
        data.forEach((val, i) => {
          if (val.checked) {
            eventNum++
          }
        })
        // 如果可用赔率大于15，system不可点击
        if (eventNum > this.cfgData.system.maxEvent) {
          this.systemNoDrop = true
          if (this.betType === 2) {
            this.betType = 1
            this.BET_TYPE(1)
          }
        }
        // 当可用赔率为0时
        if (eventNum === 0) {
          // this.hideType = false
          // this.betType = 0
          this.BET_TYPE(0)
          // 清除multiple的金额
          this.MULTIPLE_MONEY(0)
          // 清除System保存的金额
          let arr = []
          this.SYSTEM_MONEY(arr)
        }
        if (!this.hideType) {
          this.betType = 0
          this.BET_TYPE(0)
        }
      },
      // 切换投注类型
      changeType(val) {
        this.BET_TYPE(val)
        if (val === 0) { // single统计
          this.countNum(this.betData)
        } else if (val === 1 || val === 2) { // multiple
          // 设置预计奖金为0
          this.totalPotentialWin = 0
          this.countMatchNum(this.betData)
        }
      },
      // 删除赔率
      deleteBet(item) {
        this.SET_BETTING({item, flag: false})
      },
      // 删除所有赔率
      removeAll() {
        this.SET_BETTING({item: {}, flag: 'removeAll'})
      },
      // 计算potentialWin
      changePotentialWin(item, name) {
        item.money = parseFloat(item.money)
        if (name === 'change') {
          this.singleData.moneyChange = true
        } else {
          this.singleData.moneyChange = false
        }
        if (item.money !== '' && item.money !== undefined) {
          // 验证是否是数字，如果不是就变为0
          let pattern = /^[0-9]*$/
          if (!pattern.test(item.money)) {
            item.money = 0
          }
        }
        // 针对PotentialWin不改变
        let winMoney = item.money * item.odds
        item.potentialWin = winMoney
        this.betData.forEach(val => {
          if (val.sid === item.sid) {
            val.potentialWin = winMoney
          }
        })
        setTimeout(() => {
          this.$set(item, 'potentialWin', winMoney)
        }, 100)
        this.countNum(this.betData)
        this.$forceUpdate()
      },
      // 获取结算组件传过来的数据
      getData: debounce(function (data, betType, dataType) {
        console.log(dataType)
        if (dataType === 'singlemoney') { // 设置每个赔率的金额
          this.betData.forEach(item => {
            if (data !== '' && item.checked) {
              let pattern = /^[0-9]*$/
              if (!pattern.test(data)) {
                data = 0
              }
              item.money = data
              item.potentialWin = item.money * item.odds
            }
          })
          this.saveBetData(this.betData)
          // this.countNum(this.betData)
          this.$forceUpdate()
        } else if (dataType === 'couponData') {
          this.couponData = data
          this.potentialMin = data.potentialMin
          this.potentialMax = data.potentialMax
          this.totalMoney = data.totalStake
          this.multipleNum = data.ticketNum
          if (betType === 'multiple') {
            this.singleMoney = data.singleMoney
            this.maxPayout = data.maxPayout
          }
          this.getCoupon()
          this.saveBetData(this.betData)
        } else if (dataType === 'saveData') {
          this.saveBetData(this.betData)
        } else if (dataType === 'coupon') { // 选择优惠券
        }
      }, 500),
      // input设置为空
      changeVal(e, val, index) {
        let pannel = document.getElementById('allMoney')
        pannel.scrollIntoView(true)
        pannel.scrollIntoViewIfNeeded()
        let obj = e.srcElement
        // debugger
        if (val === 0 || val === '0') {
          obj.value = ''
          val = ''
          this.betData[index].money = ''
        }
        this.$forceUpdate()
      },
      // input值设置为0
      setVal(val, index) {
        if (val === '') {
          val = 0
          this.betData[index].money = 0
        }
        this.$forceUpdate()
      },
      // 获取可用优惠券
      getCoupon: debounce(async function () {
        // 判断是否登录
        // let LoginStatus = this.$store.state.isLogin
        // if (window.isApp) {
        //   LoginStatus = window.iLotJsBridge.isLogin() === 'true'
        // }
        if (!this.isLogin) return
        // 判断是否有赔率
        if (this.betData.length < 1 || this.couponData.totalStake === undefined || this.couponData.totalStake === 0 || this.couponData.totalStake === null) {
          // 当没有可用优惠券
          let obj = {
            status: this.betCoupon.status, // 是否使用优惠券
            couponId: '',
            coupon: 0,
            couponCode: '',
          }
          this.SET_COUPON(obj)
          // 清除之前优惠券数据
          let arr = []
          this.COUPON_DATA(arr)
          return
        }
        const res = await this.$api.availableCoupon({
          data: {
            details: [{
              betMoney: this.couponData.totalStake,
              odds: this.couponData.minOdds + '',
            }],
            gameType: 1,
            gameId: this.gameId
          }
        })
        if (res.code !== 0) return
        let dataList = res.data.availableCoupons
        if (dataList !== undefined && dataList.length > 0) {
          this.giftNodrop = true
          let max = parseFloat(dataList[0].faceValue)
          let num = 0
          let havCoupon = false // 优惠券列表是否有已选优惠券数据
          dataList.forEach((val, i) => {
            val.expireEndTime = this.$moment(val.expireEndTime).format('DD/MM/YYYY')
            val.expireBeginTime = this.$moment(val.expireBeginTime).format('DD/MM/YYYY')
            // 判断可用优惠券是否有已选的优惠券
            if (val.couponHid === this.betCoupon.couponId) {
              havCoupon = true
            }
            // 获取可用金额最大的优惠券
            if (max < parseFloat(val.faceValue)) {
              max = parseFloat(val.faceValue)
              num = i
            }
          })
          // 保存可用优惠券数据
          this.COUPON_DATA(dataList)
          // 判断是否使用优惠券
          if (this.betCoupon.status && !havCoupon) {
            let obj = {
              status: true, // 是否使用优惠券
              couponId: dataList[num].couponHid,
              coupon: dataList[num].faceValue,
              couponCode: dataList[num].couponCode,
            }
            this.SET_COUPON(obj)
          }
        } else {
          // 当没有可用优惠券
          let obj = {
            status: this.betCoupon.status, // 是否使用优惠券
            couponId: '',
            coupon: 0,
            couponCode: '',
          }
          this.SET_COUPON(obj)
          // 清除之前优惠券数据
          let arr = []
          this.COUPON_DATA(arr)
        }
      }),
      // 保存购物车信息
      saveBetData: debounce(async function (data, txt) {
        if (txt !== 'notCount') {
          if (this.betType === 1 || this.betType === 2) {
            this.countMatchNum(data)
          } else {
            this.countNum(data)
          }
        }
        // this.SET_CARDATA(this.betData)
        // 判断是否登录
        // let LoginStatus = this.$store.state.isLogin
        // if (window.isApp) {
        //   LoginStatus = window.iLotJsBridge.isLogin() === 'true'
        // }
        if (!this.isLogin) return
        let cartData = []
        if (data.length > 0) {
          data.forEach(val => {
            if (val.money === undefined || val.money === '') {
              val.money = 0
            }
            if (val.sid === '') {
              return
            }
            let obj = {
              checked: val.checked,
              marketSeqId: val.id,
              // marketId: val.marketId,
              odds: val.odds,
              outcomeId: val.outcomeId,
              oddsId: val.sid,
              stakeUnit: val.money,
            }
            cartData.push(obj)
          })
        }
        // 判断保存的类型
        let type = 'single'
        let stakeMoney = ''
        if (this.betType === 0) {
          type = 'single'
        } else if (this.betType === 1) {
          type = 'multiple'
          stakeMoney = this.multipleMoney
        } else if (this.betType === 2) {
          type = 'system'
        }
        await this.$api.saveBetCart({
          data: {
            items: cartData,
            type: type,
            stakeUnit: stakeMoney
          }
        })
      }, 500),
      // 获取购物车信息
      async getCarData(type) {
        // let LoginStatus = this.$store.state.isLogin
        // if (window.isApp) {
        //   LoginStatus = window.iLotJsBridge.isLogin() === 'true'
        // }
        if (!this.isLogin) return
        // let oldBetData = this.betList
        let name = 'cart'
        if (type === 'login') {
          name = 'cartLogin'
        }
        const res = await this.$api.betCart({})
        if (res.code !== 0) return
        this.setCartData(res.data, name)
      },
      // rebet投注单信息
      async getRebetInf(id) {
        const res = await this.$api.getTicketsInfo({
          data: {
            id: id
          }
        })
        if (res.code !== 0) return
        this.setCartData(res.data, 'rebet')
        let obj = {
          ticketId: '',
          num: Math.random(),
        }
        this.REBET_TICKET(obj)
      },
      // 整合获取到的数据放入购物车中
      setCartData(data, type) {
        let itemData = []
        if (type === 'cart' || type === 'cartLogin') {
          itemData = data.items
        } else if (type === 'bookingCode') {
          itemData = data.selections
        } else if (type === 'rebet') {
          itemData = data.selections
        }
        let cartNum = 0
        let money = 0
        if (data.type === 'single') { // 如果是single类型的
          cartNum = 0
        } else if (data.type === 'multiple') { // 如果是multiple类型的
          this.hideType = true
          cartNum = 1
          // 设置multiple金额
          if (type === 'cart' || type === 'cartLogin') { // 如果是获取购物车接口获取到的数据
            money = data.stakeUnit
          } else if (type === 'bookingCode') { // 如果是bookingCode获取的到数据
            money = data.bets[0].stakeUnit
          } else { // 如果是rebet获取的到数据
            money = data.bets[0].stakeUnitSrc
          }
          this.MULTIPLE_MONEY(money)
        } else if (data.type === 'system') { // 如果是system类型的
          this.hideType = true
          cartNum = 2
          // 设置system金额
          let moneyArr = []
          if (type === 'cart' || type === 'cartLogin') { // 如果是获取购物车接口获取到的数据
            if (data.webAdditional !== '') {
              moneyArr = JSON.parse(data.webAdditional)
            }
          } else if (type === 'bookingCode') { // 如果是bookingCode获取的到数据
            let arr = data.bets
            for (let i = arr.length - 1; i >= 0; i--) {
              moneyArr.push(arr[i].stakeUnit)
            }
          } else { // 如果是rebet获取的到数据
            let arr = data.bets
            for (let i = arr.length - 1; i >= 0; i--) {
              moneyArr.push(arr[i].stakeUnitSrc)
            }
          }
          this.SYSTEM_MONEY(moneyArr)
        }
        let newData = []
        itemData.forEach((val, i) => {
          let checkState = true
          let name = ''
          if (data.type === 'single' && type === 'bookingCode') {
            money = data.bets[i].stakeUnit
          } else if (data.type === 'single' && (type === 'cart' || type === 'cartLogin')) {
            money = val.stakeUnit
          } else if (data.type === 'single' && type === 'rebet') {
            money = data.bets[i].stakeUnitSrc
          }
          if (type === 'rebet' || type === 'bookingCode') {
            val.checked = true
          }
          let newOdd = 0
          let sid = ''
          if (!val.market) {
            val.market = {}
          }
          if (!val.match) {
            val.match = {}
          }
          if (val.market && val.market.odds && val.market.odds.length) {
            for (var a = 0; a < val.market.odds.length; a++) {
              if (val.outcomeId === val.market.odds[a].id) {
                name = val.market.odds[a].name
                sid = val.market.odds[a].sid
                if (val.market.odds[a].odds !== undefined && val.market.odds[a].odds !== null) {
                  newOdd = val.market.odds[a].odds
                }
                if (val.market.odds[a].active !== 1) { // 表示赔率不存在
                  val.checked = false
                  newOdd = 0
                }
              }
            }
          }
          // 判断盘口状态
          if (val.market.status) { // 说明赔率存在
          } else {
            val.checked = false
            checkState = false
            newOdd = 0
          }
          // 判断赛事状态
          if (val.match.eventStatus !== 'live' && val.match.eventStatus !== 'not_started') {
            val.checked = false
            checkState = false
            newOdd = 0
          }
          let item = {
            checked: val.checked,
            id: val.market.id,
            marketId: val.market.marketId,
            marketName: val.market.name,
            matchId: val.market.matchId,
            name: name,
            odds: newOdd,
            sid: sid,
            outcomeId: val.outcomeId,
            team: val.match.name,
            team1: val.match.homeName,
            team2: val.match.awayName,
            money: money,
            potentialWin: money * newOdd,
            status: checkState,
            type: data.type
          }
          newData.push(item)
        })
        let oldBetData = []
        if (this.betData.length === 0) {
          oldBetData = this.betList
        } else {
          oldBetData = this.betData
        }
        // this.SET_BETTING({item: {}, flag: 'removeAll'})
        let newArr = []
        if ((type === 'cart' || type === 'cartLogin') && oldBetData.length > 0) {
          // 判断本地购物车是否有数据，有数据把当前购物相同id的数据换成购物车里面获取的，否则全部替换
          oldBetData.forEach(val1 => {
            val1.money = Number(val1.money) || 0
            val1.status = !!val1.odds
            if (this.betType === 0) {
              val1.potentialWin = val1.money * val1.odds
            }
            newData.forEach(val2 => {
              if (val1.sid === val2.sid) {
                val1 = val2
                if (val1.odds === 0) {
                  val1.status = false
                  val1.checked = false
                }
              }
            })
            let item = val1
            newArr.push(item)
          })
          this.betData = newArr
          // this.SET_CARDATA(newArr)
          if (type !== 'cartLogin') {
            this.betType = cartNum
          }
        } else {
          this.betType = cartNum
          if (type === 'cart') {
            this.betData = this.betList
          } else {
            this.betData = newData
          }
          // this.SET_CARDATA(newData)
        }
        this.saveBetData(this.betData)
        this.simpleinitSocketio(this.betData)
        this.BET_TYPE(this.betType)
        // 判断是否显示multiple
        this.hideType = false
        for (let n = 0; n < this.betData.length - 1; n++) {
          let val = this.betData[n].matchId
          let val1 = this.betData[n + 1].matchId
          if (val !== val1) {
            this.hideType = true
          }
        }
        this.SET_CARDATA(this.betData)
        // 如果是multiple、system计算赛事数量
        if (this.betType === 1 || this.betType === 2) {
          this.countMatchNum(this.betData)
        } else {
          this.countNum(this.betData)
        }
      },
      // 计算赛事数量
      countMatchNum(data) {
        let idArr = []
        let canBetData = []
        this.oddsChangeBet = true
        data.forEach((val, i) => {
          if (val.checked) {
            idArr.push(val.matchId)
            canBetData.push(val)
          }
          if (val.style && val.status !== false && val.checked) { // 判断赔率是否有变化
            this.oddsChangeBet = false
          }
        })
        idArr.sort()
        if (idArr.length > 1) {
          this.betState = false
          for (let n = 0; n < idArr.length - 1; n++) {
            let val = idArr[n]
            let val1 = idArr[n + 1]
            if (val !== val1) {
              this.betState = true
            }
          }
        } else {
          this.betState = false
        }
        this.matchNum = []
        let arr1 = []
        let arr2 = []
        let n = 0
        // 获取比赛的id 赛事选择赔率数量
        for (var i = 0; i < idArr.length; i++) {
          if (i === 0) {
            // this.matchNum.push(1)
            arr2.push(1)
            arr1[i] = idArr[i]
          } else {
            if (idArr[i] === idArr[i - 1]) {
              // 如果id相等就+1
              arr2[n] += 1
            } else {
              // 不相等push id
              arr1.push(idArr[i])
              n++
              // this.matchNum[n] = 1
              arr2[n] = 1
            }
          }
        }
        this.matchNum = arr2
      },
      // 计算single的值
      countNum(data) {
        let num = 0
        let totalMoney = 0
        let potentialWin = 0
        let moneyArr = []
        this.oddsChangeBet = true
        if (data.length > 0) {
          let oddsArr = [] // 赔率数组
          data.forEach(item => {
            if (item.checked) {
              num++
              oddsArr.push(item.odds)
              // 判断赔率是否有变化
              if (item.style && item.status !== false) { // 判断赔率是否有变化
                this.oddsChangeBet = false
              }
              // 如果是single
              if (item.money !== undefined && item.money !== '') {
                // 验证是否是数字，如果不是就变为0
                let pattern = /^[0-9]*$/
                if (!pattern.test(item.money)) {
                  item.money = 0
                }
                item.potentialWin = item.money * item.odds
                moneyArr.push(item.money)
                totalMoney += parseFloat(item.money)
                potentialWin += parseFloat(item.money * item.odds)
              }
            }
          })
          // 判断每个单独赔率的金额是否相等
          let allSame = true
          moneyArr.forEach((value, i) => {
            if (i > 1) {
              if (value !== moneyArr[i - 1]) {
                allSame = false
              }
            }
          })
          // 不相同的话金额设置为0
          if (!allSame) {
            this.singleMoney = 0
          }
          // 计算最小赔率
          this.minOdds = Math.min(...oddsArr)
        }
        this.totalPotentialWin = potentialWin
        this.singleData.ticketNum = num
        this.singleData.totalStake = totalMoney
        this.totalMoney = totalMoney
        this.singleData.potentialWin = potentialWin
        this.couponData.totalStake = totalMoney
        this.couponData.minOdds = this.minOdds
        this.getCoupon()
      },
      // 查询是否可以投注
      async checkBetNow(fn) {
        try {
          if (this.betType === 1 || this.betType === 2) {
            if (!this.betState) {
              let msg = 'Please select more than one event!'
              this.$common.setMsg(msg, 'error')
              return false
            }
          }
          // 验证是否登录
          // let LoginStatus = this.$store.state.isLogin
          // if (window.isApp) {
          //   LoginStatus = window.iLotJsBridge.isLogin() === 'true'
          // }
          if (!this.isLogin) {
            // let msg = 'Please login!'
            // this.$common.setMsg(msg, 'error')
            this.$router.push({name: 'login'})
            return false
          }
          let data = this.betData
          let flag = true
          this.betData.forEach(item => {
            if (item.checked) {
              flag = false
            }
          })
          if (flag) {
            let msg = 'Please select bet!'
            this.$common.setMsg(msg, 'error')
            return
          }
          // 一单最大投注数量<30
          let eventNum = 0
          data.forEach((val, i) => {
            if (val.checked) {
              eventNum++
            }
          })
          // 最大投注数量
          let maxOddNum = this.cfgData.single.maxEvent
          // 最大投注金额
          let maxMoney = this.cfgData.single.maxStake
          if (this.betType === 1) { // multiple最大投注数量、金额
            maxOddNum = this.cfgData.multiple.maxEvent
            maxMoney = this.cfgData.multiple.maxStake
          } else if (this.betType === 2) { // system最大投注数量、金额
            maxOddNum = this.cfgData.system.maxEvent
            maxMoney = this.cfgData.system.maxStake
          }
          if (eventNum > maxOddNum) { // system最大投注数量
            let msg = 'No more than ' + maxOddNum + ' notes!'
            this.$common.setMsg(msg, 'error')
            return
          }
          // 投注金额验证
          if (this.betType === 0) { // single投注
            let moneyTip = false
            let moneyLess = false
            this.betData.forEach(item => {
              if (item.checked) {
                if (!item.money || item.money === '0') {
                  moneyTip = true
                  return
                }
                if (item.money < this.cfgData.single.minStake) {
                  moneyLess = true
                  return false
                }
              }
            })
            if (moneyTip) {
              let msg = 'Please enter the amount!'
              this.$common.setMsg(msg, 'error')
              return
            }
            if (moneyLess) {
              let msg = 'Minimum bet amount must be greater than ' + this.cfgData.single.minStake + ' !'
              this.$common.setMsg(msg, 'error')
              return
            }
          } else if (this.betType === 1) { // multiple投注
            if (this.singleMoney < this.cfgData.multiple.minStake) {
              let msg = 'Minimum bet amount must be greater than ' + this.cfgData.multiple.minStake + ' !'
              this.$common.setMsg(msg, 'error')
              return
            }
          }
          // 总投注金额
          if (parseFloat(this.totalMoney) > parseFloat(maxMoney)) {
            let msg = 'Exceeding the maximum bet amount !'
            this.$common.setMsg(msg, 'error')
            return
          }
          // 最大赔付金额
          let pwMoney = 0
          if (this.betType === 0) {
            pwMoney = this.totalPotentialWin
          } else {
            pwMoney = this.maxPayout
          }
          if (pwMoney > this.cfgData.maxPayout && this.cfgData.maxPayout > 0) {
            let msg = 'Exceeding the maximum compensation amount !'
            this.$common.setMsg(msg, 'error')
            return
          }
          // 判断用户资金是否足够
          this.noMoney = Number(this.loginInfo.balance) < this.totalMoney - this.betCoupon.coupon

          if (this.noMoney) {
            let msg = 'Insufficient account balance!'
            this.$common.setMsg(msg, 'error')
            return
          }
          // this.$emit('callbackFn', '', this.placeBet)
          await this.setBetData(this.betData)
        } finally {
          fn && fn()
        }
      },
      // 设置投注数据
      async setBetData(data) {
        let betsData = []
        let selectionsData = []
        let typeName = ''
        let selectedData = []
        data.forEach(item => {
          if (item.checked) {
            let obj = {
              odds: Number(item.odds),
              // oddsId: item.sid,
              outcomeId: item.outcomeId,
              marketSeqId: item.id,
            }
            selectedData.push(item)
            selectionsData.push(obj)
          }
        })
        let couponMoney = this.betCoupon.coupon
        if (parseFloat(couponMoney) > parseFloat(this.totalMoney)) {
          couponMoney = parseFloat(this.totalMoney)
        }
        let amountNum = 0 // 优惠券分摊金额
        if (this.betType === 0) { // single投注
          typeName = 'single'
          data.forEach(item => {
            if (item.checked) {
              let obj2 = {
                selectedSystems: [1],
                stakeTotal: Number(item.money),
                stakeUnit: Number(item.money),
              }
              betsData.push(obj2)
            }
          })
          if (betsData.length > 0) {
            amountNum = couponMoney / betsData.length
          }
        } else if (this.betType === 1) { // multiple投注
          typeName = 'multiple'
          betsData[0] = {
            selectedSystems: [this.matchNum.length],
            stakeTotal: Number(this.totalMoney),
            stakeUnit: Number(this.singleMoney)
          }
          if (this.multipleNum > 0) {
            amountNum = couponMoney / this.multipleNum
          }
        } else if (this.betType === 2) { // system投注
          typeName = 'system'
          this.systemMoney.forEach((item, i) => {
            let obj = {
              selectedSystems: [i + 1],
              stakeUnit: item
            }
            betsData.push(obj)
          })
        }
        // 是否接受赔率变化判断
        let changeType = 'higher'
        if (this.acceptChange) {
          changeType = 'any'
        }
        let obj = {
          bets: betsData,
          selections: selectionsData,
          coupon: {
            couponCode: this.betCoupon.couponCode,
            couponHid: this.betCoupon.couponId,
            amount: Number(couponMoney),
            amountOfComb: amountNum,
          },
          type: typeName,
          oddsChangeType: changeType
        }
        await this.betNow(obj, selectedData)
      },
      // 投注
      async betNow(data, selectedData) {
        this.overlay = true // 遮罩层出现
        const res = await this.$api.ticketCreate({
          data: data
        })
        this.overlay = false // 遮罩层消失
        if (res.code !== 0) {
          console.log(res)
          let code = res.data.reason.code
          console.log(code)
          if (code === -431 || code === -421 || code === -430) {
            this.oddsChangeBet = false
          }
          return
        }
        // 显示投注成功弹窗
        this.showSuccess = true
        this.betSuccessData = res.data
        this.successPotential = {
          potentialMin: 0,
          potentialMax: 0,
          totalPotentialWin: 0,
        }
        if (this.betType === 0) {
          this.successPotential.totalPotentialWin = this.totalPotentialWin
        } else {
          this.successPotential.potentialMin = this.potentialMin
          this.successPotential.potentialMax = this.potentialMax
        }
        // 当投注成功清除优惠券数据
        let obj = {
          status: true, // 是否使用优惠券
          couponId: '',
          coupon: 0,
          couponCode: '',
        }
        this.SET_COUPON(obj)
        // 删除购物车已投注的赔率
        selectedData.forEach(item => {
          if (item.checked) this.SET_BETTING({item, flag: false})
        })
        this.$store.commit('TRIGGER_BALANCE', Math.random())

        this.$store.dispatch('backToOtherPage') // 判断是否返回其它页面
      },
      // 修改赔率
      changeOdd(oddsData) {
        // debugger
        this.betData.forEach((val) => {
          // odds是否相等
          if (val.sid !== oddsData.oddsId) return
          // 赛事不可投或盘口不可投
          if (!oddsData.marketStatus || (oddsData.matchStatus !== 'live' && oddsData.matchStatus !== 'not_started') || parseInt(oddsData.oddsStatus) === 0) {
            val.money = 0
            val.odds = 0
            val.checked = false
            val.dropShow = false
            val.status = false
            val.potentialWin = 0
            return
          }
          // 赔率不存在或为0
          if (oddsData.odds === null || oddsData.odds === undefined || oddsData.odds === 0) {
            val.money = 0
            val.odds = 0
            val.checked = false
            val.dropShow = false
            val.status = false
            val.potentialWin = 0
            return
          }
          if (val.odds > oddsData.odds) {
            val.style = 'down'
            if (val.checked) {
              this.oddsChangeBet = false
            }
          } else if (val.odds < oddsData.odds) {
            val.style = 'up'
            if (val.checked) {
              this.oddsChangeBet = false
            }
          }
          // let time = this.$moment(new Date().getTime()).format('HH:mm:ss.SSSSSS')
          val.odds = oddsData.odds
          val.potentialWin = val.odds * val.money
          val.status = true
        })
        if (this.betType === 1 || this.betType === 2) {
          this.countMatchNum(this.betData)
        } else {
          this.countNum(this.betData)
        }
      },
      // 接受修改后的赔率
      changeStyle(fn) {
        try {
          this.oddsChangeBet = true
          this.acceptChange = true
          this.betData.forEach((val) => {
            if (val.style !== undefined && val.style !== '' && val.checked) {
              val.style = ''
            }
          })
          this.$forceUpdate()
          console.log(this.betData)
        } finally {
          fn && fn()
        }
      },
      // 购物车推送
      simpleinitSocketio(data) {
        let _this = this
        let arr = []
        data.forEach((val) => {
          arr.push(val.sid)
        })
        if (arr.length === 0) return
        let obj = {
          removeGroups: 'all',
          groups: arr.join(','),
          userToken: ''
        }
        // 发送消息给服务端订阅主题可用于初始化数据
        _this.$socketio.emit('sport_shopping_cart_topic_v2', obj, (data) => {
          // 购物车推送推送的数据
          let arr = JSON.parse(data)
          this.changeOdd(arr.data)
        })
      },
      // 关闭投注成功提示弹窗
      closeDialog() {
        this.showSuccess = false
      }
    },
    destroyed() {
      // 断开购物车推送
      if (!this.isLogin) return
      this.$socketio.off('sport_shopping_cart_topic_v2')
    },
  }
</script>

<style lang="less" scoped>
  .bet-cart{
    width: 100%;
    height: 100%;
  }
.input-absolute{
  position: absolute;
  right: 24px;
}
/deep/ .single-input-width{
  width: 94px;
  .v-text-field--outlined > .v-input__control > .v-input__slot {
   min-height: 26px;
   margin-bottom: 0;
  }
  .v-text-field__details{
    position: absolute;
    bottom: -30px;
    height: 20px;
    max-width: 120px;
  }
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 0;
  }
}
.nodrop-color{
 background-color: rgba(234, 235, 236, 1);
}
.odds-name{
  position: relative;
  .odds-mark{
    position: absolute;
    right: 0;
    top: 0;
  }
}
.name-pd{
  padding-right: 92px;
  line-height: 24px;
}
  .item-border{
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
  /deep/.bet-type-tab .v-tabs-slider-wrapper{
    padding: 0 2%;
  }
  /deep/.theme--light.v-tabs .v-tab--active:hover::before, .theme--light.v-tabs .v-tab--active::before{
    opacity: 0;
  }
</style>
