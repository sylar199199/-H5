<template>
  <div >
    <div class="drawer" v-if="showDrawer">
      <div style="background-color: white;width: 319px;height: 100%;opacity: 1;">
        <v-list >
          <v-icon class="mt-2 ml-4 pa-0" @click="openDrawer" style="margin-bottom: 5px;color: #000000">mdi-close</v-icon>
          <div v-for="(menu,groupIndex) in menus" v-bind:key="groupIndex" class="pa-0 ma-0">
            <div style="background: #FFFFFF" >
              <v-row style="padding-top: 15px;margin-left: 16px;align-items: center" class="ma-0 ml-4" @click="jumpToHelpDetail(menu, null)">
                <span class="drawer-group" @click="menu.isOpen = !menu.isOpen">{{ menu.groupName }}</span>
                <v-icon v-if="menu.items.length > 0" class="mr-4">{{menu.isOpen ?'mdi-menu-up':'mdi-menu-down'}}</v-icon>
              </v-row>
              <div v-if="menu.isOpen">
                <div v-for="(item,index) in menu.items" :key="index" class="drawer-item" :class="selectMenuName === item ? 'active' : ''"
                     @click="jumpToHelpDetail(menu, item)">
                  <span >{{ item.itemTitle }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-list>
      </div>
      <div style="opacity: 0.87;background-color: #474747;flex: 1" @click="showDrawer = !showDrawer"></div>
    </div>
    <v-row style="height: 41px;width: 100%;background-color: white;justify-content: center;align-items: center;"
           class="ma-0">
      <div style="margin-left: 14px;" class="font-weight-bold text-sm-h6 text-subtitle-1">
        Me
      </div>
      <v-spacer></v-spacer>
      <v-btn elevation="0" small color="primary" class="mr-sm-4 mr-2 text-caption text-capitalize" v-if="!isApp" @click="click">Free Download</v-btn>
    </v-row>
    <div class="account-list" style="position: relative;overflow-y: auto;height: calc(100vh - 41px)">
      <!-- <toolbar :title="'Personal Center'" @goBack="goBackSet"></toolbar> -->
      <v-list class="pt-0 pb-0 account-content">
        <div class="primary cover absolute"></div>
        <v-list-item class="pt-sm-2 pt-0 pb-0">
          <v-list-item-avatar class="mr-1" width="12vw" height="12vw">
            <!-- <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
               v-if="loginInfo.avator"
            > -->
            <div class="icon-avator dl-flex justify-center align-center">
              <GlSvgIcon iconClass="logoOutline" class="logo"/>
            </div>
          </v-list-item-avatar>
          <v-list-item-content class="pl-2" @click="$router.push({name: 'editProfile'})">
            <p class="font-weight-medium white--text text-sm-h5 text-h6 mb-sm-2 pb-0">{{loginInfo.playerNick}}</p>
            <v-list-item-subtitle class="white--text text-sm-subtitle-1 text-subtitle-2">
              {{loginInfo.playerAccount}}
            </v-list-item-subtitle>
            <!--<v-list-item-subtitle
              class="text-caption d-flex justify-start align-center"
              v-if="loginInfo.promotionCode && loginInfo.promotionCode!==''">
              Promotion Code：
              <span color="primary" class="text-body-1 light-green&#45;&#45;text text&#45;&#45;darken-3">{{loginInfo.promotionCode}}</span>
              <v-btn
                x-small
                class="text-capitalize ml-2 light-green&#45;&#45;text "
                color="#edf5e4"
                raised
                dark
                elevation="0"
                @click.stop="copy(loginInfo.promotionCode)"
              >Copy</v-btn>
            </v-list-item-subtitle>-->
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="$router.push({name: 'editProfile'})">
              <v-icon  class="white--text text--lighten-4">mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider class="pt-2 grey lighten-4"></v-divider>
        <v-card class="mt-0 ml-4 mr-4" elevation="1">
          <v-list>
            <v-list-item>
              <v-list-item-content class="text-center">
                <div>
                  <span class="text-sm-subtitle-2 text-caption grey--text">Account Balance</span>
                  <v-btn icon @click="manyState">
                    <v-icon class="text-h6">{{userMoney.showMoney? 'mdi-eye':'mdi-eye-off'}}</v-icon>
                  </v-btn>
                  <v-btn icon @click="queryBalance(true)" class="position ml-n3">
                    <v-icon class="icon-sync text-h6 pl-0">mdi-refresh</v-icon>
                  </v-btn>
                </div>
                <h4 class="text-h6">
                  <template v-if="userMoney.showMoney">
                    ₦{{loginInfo.balance | fmoney}}
                  </template>
                  <template v-else>
                    ****
                  </template>
                  <span class="text-caption"></span>
                </h4>
                <div class="d-flex justify-center mt-4">
                  <v-btn
                      class="text-capitalize primary--text"
                      depressed
                      outlined
                      width="44%"
                      @click="linkNewPag('withdraw')"
                  >
                    Withdraw
                  </v-btn>
                  <v-btn
                      class="ml-4 text-capitalize"
                      color="primary"
                      dark
                      depressed
                      width="44%"
                      @click="linkNewPag('recharge')">
                    Deposit
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>

        <AccountFuncList class="mb-9" v-model="showSelect" />

        <account_footer v-if="false" @topClick="backTop"></account_footer>

      </v-list>
      <v-dialog
          v-model="showSelect"
          max-width="75w"
      >
        <v-card>
          <v-card-title class="headline text-h5">
            Select Type
          </v-card-title>
          <v-card-text style="height: 100px">
            <p class="mt-2" v-for="(item) in changeModelist" :key="item.type" @click="toChange(item.type)">{{item.name}}</p>
            <!--<v-radio-group
              v-model="changeMode"
              column
              @change="toChange(changeMode)"
            >
              <v-radio
                v-for="(item) in changeModelist"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></v-radio>
            </v-radio-group>-->
          </v-card-text>
        </v-card>
      </v-dialog>

    </div>
  </div>
</template>

<script type="text/javascript">
// import toolbar from '@/components/common/toolbar'
import AccountFuncList from './account-func-list'
import account_footer from '@/views/users/account/account_footer'
import {mapGetters, mapMutations} from 'vuex'
import { eventTracking, eventKey } from '@/utils/fireBase'
export default {
  name: 'personalCenter',
  components: {
    AccountFuncList,
    account_footer
  },
  data() {
    return {
      selectMenuName: '',
      showDrawer: false,
      isApp: {
        type: Boolean,
        default: false
      },
      userMoney: {
        userMoney: '0',
        currency: '',
        showMoney: false,
        money: '0',
      },
      showSelect: false,
      changeMode: null,
      changeModelist: [
        {
          type: '7',
          name: 'Login Password'
        },
        {
          type: '5',
          name: 'Payment Password'
        },
      ],
      //
      menus: [
        {
          groupName: 'About Us',
          isOpen: false,
          name: 'aboutUs',
          items: []
        },
        {
          groupName: 'How To Play',
          isOpen: false,
          items: [
            {
              itemTitle: 'How To Register',
              isSelect: false,
              name: 'howToRegister'
            },
            {
              itemTitle: 'How To Login',
              isSelect: false,
              name: 'howToLogin'
            },
            {
              itemTitle: 'How To Change Your Password',
              isSelect: false,
              name: 'howToChangeYourPassword'
            },
            {
              itemTitle: 'How To Deposit',
              isSelect: false,
              name: 'howToDeposit'
            },
            {
              itemTitle: 'How To Withdraw',
              isSelect: false,
              name: 'howToWithdraw'
            },
          ],
        },
        {
          groupName: 'Tutorials',
          isOpen: false,
          items: [
            {
              itemTitle: 'Sport Betting',
              isSelect: false
            },
            {
              itemTitle: 'Lottery',
              isSelect: false
            }
          ],
        },
        {
          groupName: 'Terms & Conditions',
          isOpen: false,
          name: 'termsConditions',
          items: [
          ],
        },
        {
          groupName: 'Privacy & Security',
          isOpen: false,
          name: 'privacySecurity',
          items: [
          ],
        },
        {
          groupName: 'Agent',
          isOpen: false,
          items: [
          ],
        },
        {
          groupName: 'FAQs',
          isOpen: false,
          name: 'FAQs',
          items: [
          ],
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'loginInfo', 'accountId', 'platformName']),
    watchAccount () {
      return this.$store.state.accountShow
    }
  },
  created() {
    this.queryBalance()
    this.eventBus.$on('showDrawer', target => {
      this.showDrawer = !this.showDrawer
    })
  },
  mounted () {
    this.isApp = this.$isApp
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  beforeRouteEnter(to, from, next) {
    if (!window.vm.$store.state.isLogin) {
      window.vm.$router.replace({
        name: 'login'
      })
      next(false)
    } else {
      next()
    }
  },
  methods: {
    ...mapMutations(['MONEY_STATE', 'SET_LOGININFO']),
    // 跳转页面
    linkNewPag(name) {
      let fireObj = {
        clickOn: name
      }
      // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_ME_LIST, name, fireObj)
      this.$router.push({name: name})
    },
    // 查询余额
    async queryBalance(bl) {
      const info = this.$store.dispatch('getLoginInfo', bl)
      this.userMoney.money = this.userMoney.userMoney = info.balance
      this.userMoney.currency = info.currency
      if (this.userMoney.showMoney === 'true' || this.userMoney.showMoney === true) {
        this.userMoney.userMoney = `₦${info.balance.toLocaleString()}`
      } else {
        // this.userMoney.userMoney = ((info.balance).toString()).replace(/[^\D.]/g, '✱')
      }
    },
    getState(value, num, data) {
      this.addState = false
      if (num === '11') {
        this.componentId = ''
        this.showNav = false
        this.withdrawShow = true
        this.inforState = false
      } else {
        this.inforState = false
        if (data !== '' && data !== undefined) {
          if (data === 'addCard') {
            this.addState = true
          } else if (data === 'msg') {
            this.$emit('moneyInfo', 'msg')
          } else if (data === 'bank') { // 添加银行卡过来的
            this.inforData.state = 4
            this.inforData.data = this.loginInfo
            this.inforState = true
          } else if (data === 'userInfor') {
            this.getInfor()
          } else {
            this.paymentData.returnPage = data.returnPage
            if (data.type === 'SET') { // 未设置密码返回的值
              this.paymentData.state = '2'
            } else if (data.type === 'RESET') { // 忘记密码返回的值
              this.paymentData.state = '1'
            }
          }
        }
        this.componentId = num
        this.showNav = value
        this.depositShow = false
        this.withdrawShow = false
      }
    },
    // 更改账户显示状态
    manyState() {
      if (this.userMoney.showMoney) {
        this.userMoney.showMoney = false
        sessionStorage.setItem('showMoney', '1')
        // this.userMoney.userMoney = (this.userMoney.money.toString()).replace(/[^\D.]/g, '✱')
      } else {
        this.userMoney.showMoney = true
        // this.userMoney.userMoney = `₦${this.userMoney.money.toString()}`
        sessionStorage.setItem('showMoney', '2')
      }
      this.$emit('moneyInfo', this.userMoney)
    },
    copy(value) {
      var input = document.createElement('input') // 直接构建input
      input.value = value // 设置内容
      document.body.appendChild(input) // 添加临时实例
      input.select() // 选择实例内容
      document.execCommand('Copy') // 执行复制
      document.body.removeChild(input) // 删除临时实例
      this.$message.success('Copy succeeded') // 复制成功
    },
    toChange(type) {
      console.log(type)
      if (type === '5') {
        this.$router.push({
          name: 'paymentPassword'
        })
        this.changeMode = null
        return
      }
      this.$router.push({
        name: 'retrievePassword',
        query: {
          type
        }
      })
      this.changeMode = null
    },
    toDeposit() {
      console.log('toDeposit')
    },
    toWithdraw() {
      console.log('toWithdraw')
    },
    goBackSet () {
      this.$router.go(-1)
    },
    topClick() {
      console.log('start scroll')
      window.scrollTop(0)
          // document.load().scrollTop(0)
      // let distance = document.documentElement.scrollTop || document.body.scrollTop
      // let step = distance / 30
      // (function jump() {
      //   if (distance > 0) {
      //     distance -= step
      //     window.scrollTo(0, distance)
      //     setTimeout(jump, 10)
      //   }
      // })();
    },
    backTop () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    // 点击下载app
    click() {
      // window._czc.push(['_trackEvent', this.platformName + '-user', 'download'])
      this.$router.push({path: '/download'})
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop () {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },
    openDrawer() {
      this.showDrawer = !this.showDrawer
    },
    jumpToHelpDetail(menu, item) {
      if (menu.items.length !== 0) {
        this.selectMenuName = item
        console.log(item.itemTitle)
        this.$router.push({path: '/help', query: {groupName: menu.groupName, name: item.itemTitle}})
      } else {
        this.selectMenuName = menu.groupName
        console.log(menu.groupName)
        this.$router.push({path: '/help', query: {groupName: menu.groupName, name: menu.groupName}})
      }
    }
  },
}
</script>

<style lang="less" scoped>
.account-content {
  position: relative;
  overflow-x: hidden;
}
.cover {
  height: 100vw;
  position: absolute;
  top: -15%;
  z-index: 0;
  border-radius: 50%;
  width: 150vw;
  left: -25vw;
  max-height: 380px;
}
.icon-avator {
  width: 12vw;
  height: 12vw;
  border-radius: 50%;
  border: 2px solid #fff;
  box-sizing: border-box;
  .logo {
    width: 80%;
    height: 100%;
  }
}
.position {
  position: absolute;
  right: 3vw;
}
// .icon-sync {
//   transform: rotate(120deg);
// }
.drawer {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row
}
.drawer-group {
  flex: 1;
  font-size: 16px;
  line-height: 16px;
  color: #000000;
  opacity: 0.87;
  font-weight: 600;
}

.drawer-item {
  font-size: 15px;
  font-weight: 400;
  margin-top: 15px;
  line-height: 15px;
  margin-left: 16px;
  padding-left: 16px;
  color: @font-color1;
  &:hover{
    color: @primary !important;
  }

}
</style>
