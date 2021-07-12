<template>
  <div>
    <!--平台logo和资金-->
    <div class="d-flex align-center pa-4">
      <div class="mr-2">
        <v-img :width="type === '1'?57:46" :height="type === '1'?25:20" src="~@/assets/img/components/pc/common-logo/logo.png"></v-img>
      </div>
      <span class="text-body-2 font-weight-bold">Official Deposit Services</span>
    </div>
    <!--总金额-->
    <div class="d-flex align-center px-4 mb-4" v-if="type==='1' && !payIfram">
      <span class="text-sm-body-2 text-caption text--disabled font-weight-bold">Account Balance:</span>
      <div class="ml-2 font-weight-bold">
        <template v-if="blMoneyShow">
          ₦{{loginInfo.balance | fmoney}}
        </template>
        <template v-else>
          ****
        </template>
      </div>
      <!--显示、隐藏金额按钮-->
      <div @click="blMoneyShow = !blMoneyShow" class="ml-4 mr-2">
        <v-icon size="18">{{blMoneyShow ? 'mdi-eye' : 'mdi-eye-off'}}</v-icon>
      </div>
      <!--刷新按钮-->
      <div class="refresh d-flex align-center justify-center">
        <RefreshBtn />
      </div>
    </div>
    <!--分割线-->
    <v-divider class="py-1 grey lighten-4" v-if="type==='1'"></v-divider>
  </div>
</template>

<script>
  import RefreshBtn from '@/components/func/refresh-btn'
  import { userBalanceMinxins } from '@/mixins'
  import {mapGetters} from 'vuex'
  export default {
    name: 'depositTopInfo',
    components: {
      RefreshBtn,
    },
    mixins: [userBalanceMinxins],
    props: {
      type: {
        type: String,
        default: '1' // 1: 移动端； 2：pc端
      },
      payIfram: {
        type: Boolean,
        default: false // false：显示; true: 隐藏
      }
    },
    computed: {
      ...mapGetters(['loginInfo'])
    },
  }
</script>

<style lang="less" scoped>
/deep/.refresh{
  height: 18px;
  line-height: 18px;
}
</style>
