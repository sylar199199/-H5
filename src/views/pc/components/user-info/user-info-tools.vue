<template>
  <div class="user-info-tools d-flex align-center" :class="`type${type}`">
    <v-icon class="user-info-tools-icon" @click="checkUserInfo">mdi-account-circle</v-icon>

<!--    <FuncTools class="user-info-tools-list" :toolList="toolList" v-model="blToolsShow" />-->
  </div>
</template>
<script>
// import FuncTools from './func-tools'
export default {
  components: {
    // FuncTools
  },
  props: {
    type: {
      default: '1' // 1: 顶部搜索栏上用户信息； 2： 顶部导航栏上用户信息
    }
  },
  data() {
    return {
      toolList: [
        {id: 1, text: 'Coupon', to: ''},
        {id: 2, text: 'Bet History', to: ''},
        {id: 3, text: 'Deposit', to: ''},
        {id: 4, text: 'Withdraw', to: ''},
        {id: 5, text: 'Transaction', to: ''},
        {id: 6, text: 'My Account Info', to: ''},
        {id: 7, text: 'Log Out', to: '', special: true}
      ],
      blToolsShow: false
    }
  },
  methods: {
    checkUserInfo() {
      this.$router.push({
        name: 'pcAccount'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-info-tools{
  height: 36px;
  position: relative;
  &-icon{
    color: @font-color3;
    cursor: pointer;
  }
  &-list{
    left: 50%;
  }
  &.type2 .user-info-tools-list{
    left: calc(-50% - 120px);
  }
  @media screen and (max-width: 1200px) {
    &-list {
      left: calc(-50% - 100px);
    }
  }
}
</style>
