<template>
  <v-footer
    :app="showFooter"
    fixed
    class="transparent rounded-t-lg py-0 px-2"
    :class="showFooter?'d-block':'d-none'"
  >
    <v-container class="px-0 py-2 bet-cart" v-if="footNavFlag">
      <!--navigation-->
      <i-lot-bottom-navigation :cartCount="betNum" />
    </v-container>
  </v-footer>
</template>

<script>
  import {mapGetters} from 'vuex'
  import iLotBottomNavigation from '@/components/common/iLotBottomNavigation/iLotBottomNavigation'
  export default {
    name: 'homeFooter',
    components: {
      iLotBottomNavigation
    },
    data() {
      return {
        showFooter: true, // 当前组件是否显示
        betNum: '0', // 购物车赔率数量
        footNavFlag: false // 是否显示底部导航
      }
    },
    computed: {
      ...mapGetters(['betList'])
    },
    watch: {
      'betList': {
        handler(newValue, oldValue) {
          this.betNum = (newValue.length || 0).toString()
        },
        immediate: true,
        deep: true
      },
      '$route': {
        handler(newVal, oldVal) {
          this.isShowFootNav()
        }
      },
    },
    beforeMount() {
      this.isShowFootNav()
    },
    methods: {
      // 判断是否显示底部导航
      isShowFootNav() {
        this.footNavFlag = !!this.$route.meta.haveNav
      }
    }
  }
</script>

<style lang="less" scoped>
  .bet-cart{
    position: relative;
    .cart-close{
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .v-bottom-sheet.v-dialog{
    overflow: auto;
    background-color: #ffffff;
  }
</style>
