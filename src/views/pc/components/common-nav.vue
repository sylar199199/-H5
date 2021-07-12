<template>
  <div class="common-nav" :class="{'active': !blSearchBarShow, 'fixed': calcFixed}">
    <v-app-bar
        class="common-nav-container"
        :class="calcFixed ? 'active' : ''"
        color="#fff"
        :height="calcFixed ? '50' : '50'"
        flat
        ref="commonNav"
    >
      <CommonLogo class="common-nav-container-logo" v-if="calcFixed" />

      <div class="common-nav-container-title">
        Popular
        <!-- 子导航栏 -->
        <CommonNavSub class="common-nav-container-title-sub" :class="calcBlSubNavHide ? 'hide' : true" />
      </div>

      <!-- 导航栏 -->
      <v-tabs class="common-nav-container-main" hide-slider color="primary" >
        <template v-for="item in navList">
          <v-tab
            class="common-nav-container-main-item text-capitalize font-weight-bold"
            :class="item.to === $route.name ? 'active' : ''"
            :key="item.id"
            @click="changeTab(item)"
          >
            <template v-if="!calcFixed || !item.icon">
              {{ item.text }}
            </template>
            <template v-else>
              <v-icon size="28">{{ item.icon }}</v-icon>
            </template>
          </v-tab>
        </template>
      </v-tabs>

      <v-row class="common-nav-container-more" align="center" justify="end" v-show="calcFixed">
        <SearchBtn class="common-nav-container-more-search" />

        <!-- 登陆注册按钮 -->
        <LoginBtns module="nav" v-if="!isLogin" />

        <!-- 用户信息（登陆成功） -->
        <UserInfo class="common-nav-container-more-info" type="2" v-else />
      </v-row>
    </v-app-bar>

    <SearchInput v-show="blSearchShow" />
  </div>
</template>
<script>
import CommonLogo from '@/components/pc/common-logo'
import CommonNavSub from './common-nav-sub'
import SearchBtn from './search-btn'
import SearchInput from './search-input'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {
    CommonLogo,
    CommonNavSub,
    SearchBtn,
    SearchInput,
    LoginBtns: () => import('./login-btns/login-btns'),
    UserInfo: () => import('./user-info/user-info')
  },
  props: {
    module: {
      default: ''
    }
  },
  data() {
    return {
      navList: [
        {id: 1, text: 'Home', to: 'pcHome'},
        {id: 2, text: 'Lottery', to: 'pcLotto'},
        {id: 3, text: 'Sports', to: 'pcSports'},
        {id: 4, text: 'Help', to: 'pcHelp'},
        {id: 5, text: 'News', to: 'pcNews'},
        {id: 6, text: 'Promotions', to: 'pcPromotion'},
        {id: 7, text: 'Free Download', icon: 'mdi-cloud-download-outline ', to: 'pcDownload'}
      ]
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['blSearchBarShow', 'isLogin']),
    calcFixed() {
      return this.module === 'fixed'
    },
    calcBlSubNavHide() {
      return this.$route.name !== 'pcHome' || !this.blSearchBarShow || this.calcFixed
    },
    blSearchShow() {
      return this.calcFixed ^ this.blSearchBarShow
    }
  },
  methods: {
    changeTab(info) {
      this.eventBus.$emit('closeLMT')
      this.$router.push({
        name: info.to
      })
    }
  }
}
</script>

<style lang="less" scoped>
.common-nav{
  position: relative;
  background: #fff;
  z-index: 111;
  &:after{
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    bottom: 0;
    background: @primary;
  }
  &.fixed{
    width: 100%;
    position: fixed;
    background: #fff;
    left: 0;
    top: -100px;
    transition: all linear .3s;
    &.active{
      transform: translateY(100px);
    }
    &:not(.active) {
      .common-nav-container-title-sub{
        &.hide{
          height: 0 !important;
          padding: 0;
        }
      }
    }
  }
  &-container{
    width: @pc-width;
    margin: 0 auto;
    position: relative;
    &-logo{
      position: absolute;
      left: -95px;
      top: 10px;
      bottom: 0;
      margin: auto;
    }
    &-title{
      width: 180px;
      height: 50px;
      color: #fff;
      line-height: 50px;
      background: @primary;
      flex-shrink: 0;
      margin-left: -16px;
      box-sizing: border-box;
      padding: 0 20px;
      position: relative;
      &:not(:hover) {
        .common-nav-container-title-sub{
          &.hide{
            height: 0 !important;
            padding: 0;
          }
        }
      }
    }
    &-main{
      flex: 1 1 auto;
      padding-left: 30px;
      /deep/ .v-slide-group__prev{
        width: 0;
        flex: 0;
        min-width: 0;
      }
      /deep/ .v-slide-group__content{
        justify-content: space-between;
      }
      &-item{
        font-size: 16px;
        color: @font-color1 !important;
        transition: color linear .3s;
        //padding: 0 20px;
        min-width: auto;
        width: auto;
        letter-spacing: 0;
        flex: 0 0 auto;
        padding: 0 !important;
        &.active, &:hover{
          color: @primary !important;
        }
      }
    }
    &-more{
      &-search{

      }
      &-info{
        margin-right: -90px;
        /deep/ .refresh{
          margin-right: 10px;
        }
      }
    }
    /deep/ .v-toolbar__content{
      padding-right: 0;
    }
    &.active{
      .common-nav-container-main{
        width: auto;
        padding-right: 0;
        &-item{
          flex: 0 0 auto;
          padding: 0 15px;
          &.active{
            color: @primary !important;
          }
        }
      }
      .common-nav-container-more{
        flex: 0 0 auto;
        margin: 0 0 0 20px !important;
        /deep/ .login-btns{
          margin: 0 !important;
        }
      }
    }
  }
}
</style>
