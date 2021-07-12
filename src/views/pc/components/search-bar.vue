<template>
  <div class="search-bar" ref="searchBar">
    <v-row class="search-bar-container" justify="space-between" align="center">
      <v-col class="search-bar-logo d-flex align-end" cols="auto">
        <CommonLogo class="search-bar-logo-common" :top="true" />
        <IlotLogo class="search-bar-logo-ilot" />
      </v-col>
      <v-col cols="auto">
        <div class="search-bar-tools d-flex align-center">
          <v-spacer></v-spacer>

          <!-- 搜索按钮 -->
          <SearchBtn />

          <!-- 登陆/注册（未登录时显示） -->
          <LoginBtns v-if="!isLogin" />

          <!-- 用户信息（已登录时显示） -->
          <UserInfo v-else />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CommonLogo from '@/components/pc/common-logo'
import IlotLogo from '@/components/pc/ilot-logo'
import SearchBtn from './search-btn'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {
    CommonLogo,
    IlotLogo,
    SearchBtn,
    LoginBtns: () => import('./login-btns/login-btns'),
    UserInfo: () => import('./user-info/user-info')
  },
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
    ...mapGetters(['isLogin'])
  }
}
</script>

<style lang="less" scoped>
.search-bar{
  background: #fff;
  height: 80px;
  &-container{
    width: @pc-width;
    margin: 0 auto;
  }
  .row{
    height: 100%;
  }
  &-logo{
    padding-left: 0;
    &-common{
      margin-right: 22px;
    }
  }
  &-tools{
  }
}
</style>
