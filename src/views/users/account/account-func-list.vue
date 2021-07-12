<template>
  <v-list width="100%" class="account-func-list pt-4">
    <v-list-item-group
      color="primary"
    >
      <div
        class="account-func-list-single"
        :class="calcNowRoute === item.link ? 'active' : ''"
        v-for="(item, i) in items"
        :key="i">
        <template v-if="!item.module || item.module === type">
          <v-list-item class="pl-4 pr-1 d-flex align-center" @click="activeId(item)">
            <!--图标-->
            <v-icon dense class="black--text mr-4" v-text="item.icon"></v-icon>
            <!--名称-->
            <v-list-item-content class="py-sm-4 py-0">
              <v-list-item-title  class="d-flex justify-start text-sm-subtitle-2 text-subtitle-2">
                {{item.text}}
                <template v-if="item.id==='8'">
                  <MessageNum />
                </template>
              </v-list-item-title>
            </v-list-item-content>
            <!--箭头按钮-->
            <v-list-item-action>
              <v-btn x-small icon>
                <v-icon class="grey--text darken-1">mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
        <v-divider v-if="item.isDivider" class="pt-3 grey lighten-4"></v-divider>
        <v-divider v-if="!item.isDivider && i !== items.length - 1" class="ml-12  grey lighten-3"></v-divider>
      </div>
      <v-divider class="pt-3 grey lighten-4"></v-divider>
      <v-list-item class="account-func-list-exit pl-4 pr-4" @click="logOut({routeName: 'sports'})">
        <v-list-item-content class="text-center">
          <v-list-item-title  class="font-weight-medium primary--text">Log out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="pt-3 grey lighten-4"></v-divider>
    </v-list-item-group>

    <AffiliatesDialog v-model="blAffiliatesDialogShow" :type="type" />
  </v-list>
</template>

<script type="text/javascript">
import MessageNum from '@/components/common/message-num/message-num'
import serverMixins from './mixins/serverMixins'
import { logOutMixins } from '@/mixins'
import {mapGetters, mapMutations} from 'vuex'
import { eventTracking, eventKey } from '@/utils/fireBase'
export default {
  components: {
    MessageNum,
    AffiliatesDialog: () => import('./components/affiliates-dialog')
  },
  mixins: [serverMixins, logOutMixins],
  props: {
    type: {
      type: String,
      default: '1' // 1: 移动端； 2：pc端
    }
  },
  data() {
    return {
      items: [
        {id: '0', text: 'My info', icon: 'mdi-account-outline', link: 'editProfile', module: '2'},
        {id: '2', text: 'Coupon', icon: 'mdi-gift-outline', link: 'giftList' },
        {id: '3', text: 'Sports Bet History', icon: 'mdi-soccer', link: 'sportBetHistory' },
        {id: '4', text: 'Lottery Bet History', icon: 'mdi-numeric-9-plus-circle-outline', link: 'lotteryBetHistory', isDivider: true },
        {id: '20', text: 'Online Agent', icon: 'mdi-share-variant', link: 'affiliates'},
        {id: '5', text: 'Transaction History', icon: 'mdi-clipboard-flow-outline', link: 'transactions'},
        {id: '6', text: 'Change Password', icon: 'mdi-lock-open-minus-outline', link: 'changePassword' },
        {id: '7', text: 'Bank Account', icon: 'mdi-card-account-details-outline', link: 'bankAccount'},
        {id: '8', text: 'Messages', icon: 'mdi-bell-outline', link: 'message'},
        {id: '9', text: 'Collection', icon: 'mdi-star-outline', link: 'collection' },
        {id: '10', text: 'Promotions', icon: 'mdi-tag-multiple-outline', link: 'promotion', module: '1' },
        {id: '11', text: 'Help', icon: 'mdi-help-circle-outline', isDivider: true, module: '1'},
        {id: '12', text: 'About', icon: 'mdi-information-outline', module: '1'},
        // {id: '13', text: 'Theme', icon: 'mdi-format-color-fill', link: 'theme', module: '1'},
        {id: '1', text: 'Online Service', icon: 'mdi-face-agent' },
        // {id: '13', text: 'Log out', icon:'mdi-logout', link: '' }
      ],
      msgTotalNum: 0,
      blAffiliatesDialogShow: false
    }
  },
  created() {
    if (this.type === '2') {
      this.items.unshift()
    }
  },
  mounted() {
    this.getMsgNum()
  },
  computed: {
    ...mapGetters(['loginInfo', 'isLogin', 'isAgent', 'platformName']),
    calcNowRoute() {
      let str = this.$route.name
      if (str.includes('pc')) {
        str = str[2].toLowerCase() + str.substr(3)
      }
      return str
    }
  },
  methods: {
    ...mapMutations(['SET_LOGININFO']),
    activeId(item) {
      let fireObj = {
        clickOn: item.text
      }
       // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_ME_LIST, item.text, fireObj)
      if (item.id === '1') {
        this.linkServe()
      }
      if (item.id === '6') { // change password
        if (this.type === '1') {
          this.$emit('input', true)
          return
        }
      }
      if (item.id === '11') {
        this.eventBus.$emit('showDrawer')
        return
      }
      if (item.id === '12') {
        this.$router.push({path: '/help', query: {groupName: 'About Us', name: 'About Us'}})
        return
      }
      if (item.id === '20' && !this.isAgent) {
      // if (item.id === '20') {
        this.blAffiliatesDialogShow = true
        return
      }
      if (!item.link) return
      if (item.id === '4' || item.link === 'lotteryBetHistory') { // lottery投注记录
        this.$router.push('/lotteryBetHistory/' + process.env.VUE_APP_905_ID)
        return
      }
      this.$router.push({
        name: item.link
      })
    }
  }
}
</script>

<style lang="less" scoped>
.account-func-list-single{
  &.active{
    .v-list-item__title{
      font-weight: 500;
    }
  }
}
.account-content {
  position: relative;
  overflow-x: hidden;
}
.cover {
  height: 100vw;
  position: absolute;
  top: -60vw;
  z-index: 0;
  border-radius: 50%;
  width: 150vw;
  left: -25vw;
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
</style>
