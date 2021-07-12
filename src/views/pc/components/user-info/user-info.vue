<template>
  <v-row class="user-info" align="center" justify="end">
    <v-col class="user-info-money font-weight-medium" cols="auto">
      <template v-if="blMoneyShow">
        ₦{{loginInfo.balance | fmoney}}
      </template>
      <template v-else>
        ****
      </template>
    </v-col>
    <v-col @click="blMoneyShow = !blMoneyShow">
      <v-icon size="18">{{blMoneyShow ? 'mdi-eye' : 'mdi-eye-off'}}</v-icon>
    </v-col>
    <v-col class="refresh">
      <RefreshBtn />
    </v-col>
    <template v-if="type === '1'">
      <v-col class="col-right" @click="goDeposit">
        <v-btn height="32" class="text-capitalize" color="primary" outlined>Deposit</v-btn>
      </v-col>
      <v-col class="col-right">
        <UserInfoMode />
      </v-col>
    </template>
    <v-col class="col-right" @click="toMsgList">
      <MessageNum module="top" />
    </v-col>
    <v-col class="col-right">
      <UserInfoTools :type="type" />
    </v-col>
  </v-row>
</template>
<script>
import MessageNum from '@/components/common/message-num/message-num'
import RefreshBtn from '@/components/func/refresh-btn'
import UserInfoMode from './user-info-mode'
import UserInfoTools from './user-info-tools'
import { userBalanceMinxins } from '@/mixins'
import { mapGetters } from 'vuex'
export default {
  components: {
    MessageNum,
    RefreshBtn,
    UserInfoMode,
    UserInfoTools
  },
  mixins: [userBalanceMinxins],
  props: {
    type: {
      default: '1' // 1: 顶部搜索栏上用户信息； 2： 顶部导航栏上用户信息
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(['loginInfo'])
  },
  methods: {
    async getUserInfo(bl) {
      this.$store.dispatch('getLoginInfo')
    },
    goDeposit() {
      this.$router.push({
        name: 'pcRecharge'
      })
    },
    toMsgList() {
      this.$router.push({
        name: 'pcMessage'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-info{
  margin-left: -2px;
  flex: 0 0 auto;
  .col{
    padding: 0 5px;
    .v-icon{
      color: @font-color3;
      cursor: pointer;
    }
    &-money{
      color: @font-color1;
    }
    &.col-right{
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>
