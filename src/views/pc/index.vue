<template>
  <div class="pc">
    <div class="pc-main">
      <div class="pc-main-top" ref="pcMainTop" v-click-outside="hideSearch">
        <!-- 搜索栏组件 -->
        <SearchBar />

        <!-- 导航组件 -->
        <CommonNav />

        <!-- 导航组件（顶部固定） -->
        <CommonNav module="fixed" />
      </div>

      <div class="pc-main-main">
        <CommonRouterView />
      </div>

      <!-- 底部导航 -->
      <CommonBottomNav />

      <!-- 结算弹框 -->
      <SettleAccounts />

      <!-- 侧边功能按钮 -->
      <SliderFunc />
    </div>
  </div>
</template>
<script>
import SearchBar from './components/search-bar'
import CommonNav from './components/common-nav'
import CommonBottomNav from './components/common-bottom-nav'
import SettleAccounts from '@/components/pc/settle-accounts'
import SliderFunc from './components/slider-func'
import { mapGetters } from 'vuex'
import { Observer, debounce } from '@/utils'
export default {
  name: 'pc',
  components: {
    SearchBar,
    CommonNav,
    CommonBottomNav,
    SettleAccounts,
    SliderFunc
  },
  data() {
    return {
    }
  },
  mounted() {
    this.initOberser()
  },
  computed: {
    ...mapGetters(['isLogin', 'blShowSearchInput'])
  },
  methods: {
    hideSearch() {
      if (this.blShowSearchInput) {
        this.$store.commit('SET_BL_SHOW_SEARCH_INPUT', false)
      }
    },
    initOberser() {
      const oberser = new Observer({threshold: 0.01}, debounce((bl) => {
        this.$store.commit('SET_BL_SEARCH_BAR_SHOW', bl)
      }, 100))
      oberser.observe(this.$refs.pcMainTop)
    }
  }
}
</script>

<style lang="less" scoped>
.pc{
  background: @bg-color;
  &-main{
    min-width: @pc-width;
    &-main{
      width: @pc-width;
      min-height: calc(100vh - 600px);
      margin: 0 auto 20px;
      box-sizing: border-box;
    }
  }
}
@media screen and (max-width: 1000px) {
  .pc{
    height: 100vh;
    overflow: auto;
  }
}
/deep/ *{
  line-height: 1;
  letter-spacing: 0;
  font-weight: normal;
}
</style>
