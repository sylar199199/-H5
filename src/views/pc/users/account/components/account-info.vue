<template>
  <div class="account-info d-flex">
    <div class="account-info-l d-flex align-center">
      <v-avatar size="100" class="account-info-l-avatar">
        <img src="~@/assets/img/views/pc/account/icon_ilot.png" alt="John" />
      </v-avatar>
      <div class="account-info-l-info">
        <p class="account-info-l-info-name font-weight-medium">{{loginInfo.playerNick}}</p>
        <span class="account-info-l-info-phone">{{loginInfo.mobile}}</span>
      </div>
    </div>
    <div class="account-info-r">
      <div class="account-info-r-t d-flex align-center">
        <span>Account Balance</span>
        <v-icon size="18" @click="blMoneyShow = !blMoneyShow">{{blMoneyShow ? 'mdi-eye' : 'mdi-eye-off'}}</v-icon>
        <RefreshBtn />
      </div>
      <p class="account-info-r-balance font-weight-bold">
        <template v-if="blMoneyShow">
          ₦{{loginInfo.balance | fmoney}}
        </template>
        <template v-else>
          ****
        </template>
      </p>
      <div class="account-info-r-btns d-flex align-center">
        <v-btn
          class="text-capitalize primary--text font-weight-medium"
          depressed
          outlined
          large
          width="44%"
          @click="linkNewPag('withdraw')"
        >
          Withdraw
        </v-btn>
        <v-btn
          class="ml-4 text-capitalize font-weight-medium"
          color="primary"
          dark
          depressed
          large
          width="44%"
          @click="linkNewPag('recharge')">
          Deposit
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import RefreshBtn from '@/components/func/refresh-btn'
import { userBalanceMinxins } from '@/mixins'
import { mapGetters } from 'vuex'
import { eventTracking, eventKey } from '@/utils/fireBase'
export default {
  components: {
    RefreshBtn
  },
  mixins: [userBalanceMinxins],
  props: {},
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['loginInfo', 'platformName']),
  },
  methods: {
    // 跳转页面
    linkNewPag(name) {
      let fireObj = {
        clickOn: name
      }
       // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_ME_LIST, name, fireObj)
      this.$router.push({name: name})
    },
    async getUserInfo() {
      this.$store.dispatch('getLoginInfo', true)
    }
  }
}
</script>

<style lang="less" scoped>
.account-info{
  height: 180px;
  box-sizing: border-box;
  padding: 20px 30px;
  background: #fff;
  &-l{
    padding-right: 40px;
    border-right: 1px solid @dividing-line-color;
    margin-right: 40px;
    &-avatar{
      margin-right: 20px;
      background: @bg-color;
      img{
        width: 79px;
        height: 35px;
        border-radius: 0;
      }
    }
    &-info{
      max-width: 120px;
      &-name{
        font-size: 24px;
        color: @font-color1;
        line-height: 28px;
        margin-bottom: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      &-phone{
        font-size: 16px;
        color: @font-color2;
        line-height: 22px;

      }
    }
  }
  &-r{
    flex: 1;
    padding-top: 3px;
    &-t{
      margin-bottom: 3px;
      span{
        font-size: 14px;
        color: @font-color2;
        margin-right: 5px;
      }
      button, i{
        padding: 5px;
        cursor: pointer;
      }
      /deep/ i{
        padding: 5px;
      }
    }
    &-balance{
      font-size: 30px;
      line-height: 30px;
      margin-bottom: 25px;
    }
    &-btns{
      /deep/ .v-btn{
        height: 42px;
        box-sizing: border-box;
        .v-btn__content{
          font-size: 16px;
        }
      }
    }
  }
}
</style>
