<template>
  <div class="home-container">
    <!--header-->
    <!--<homeHeader ref="homeHeader"></homeHeader>-->
    <!--中间内容-->
    <v-main :class="{'padding': isShowFootNav}">
      <v-container class="pa-0">
        <CommonRouterView />
      </v-container>
    </v-main>
    <!--footer-->
    <homeFooter />
  </div>
</template>

<script>
import homeFooter from '@/components/main/homeFooter'

export default {
  name: 'mainHome',
  components: {
    homeFooter
  },
  watch: {
  },
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
    isShowFootNav() {
      return !!this.$route.meta.haveNav
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
  /deep/ .v-main{
    height: 100%;
    .container{
      height: 100%;
    }
  }
  .padding{
    padding-bottom: 49px !important;
  }
}
</style>
