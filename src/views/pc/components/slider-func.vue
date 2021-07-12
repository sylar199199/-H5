<template>
  <div class="slider-func">
    <div class="slider-func-btn slider-func-service d-flex flex-column align-center justify-center">
      <v-img class="slider-func-service-bg" src="~@/assets/img/views/pc/components/icon_service.png" width="20" height="20" />

      <div class="slider-func-service-main font-weight-medium" @click="linkServe">Online Service</div>
    </div>
    <div class="slider-func-btn slider-func-top d-flex flex-column align-center justify-center" @click="goTop">
      <v-icon>mdi-menu-up</v-icon>
      TOP
    </div>
  </div>
</template>
<script>
import serverMixins from '@/views/users/account/mixins/serverMixins'
import goTo from 'vuetify/es5/services/goto'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  mixins: [serverMixins],
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
    ...mapGetters(['isLogin', 'loginInfo']),
  },
  methods: {
    goTop() {
      goTo(0)
    }
  }
}
</script>

<style lang="less" scoped>
.slider-func{
  position: fixed;
  right: 0;
  bottom: 120px;
  z-index: 206;
  &-btn{
    width: 40px;
    height: 40px;
    background-color: #383C3F;
    margin-bottom: 2px;
    cursor: pointer;
  }
  &-service{
    position: relative;
    &-bg{
      flex: 0 0 auto;
    }
    &-main{
      position: absolute;
      width: 0;
      height: 100%;
      top: 0;
      right: 40px;
      background: @primary;
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
      &:before{
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        right: -4px;
        top: 15px;
        background: @primary;
        transform: rotate(45deg);
      }
    }
    &:hover{
      .slider-func-service-main{
        min-width: 128px;
        padding: 0 14px;
        overflow: visible;
      }
    }
  }
  &-top{
    font-size: 12px;
    color: #fff;
    i{
      font-size: 30px;
      color: #fff;
      margin-bottom: -6px;
      margin-top: -10px;
    }
  }
}
</style>
