<template>
  <div class="sports-nav">
    <sportNavMenu :navType="calcNavType" type="2" @initPrematch="sportChange"></sportNavMenu>
  </div>
</template>
<script>
import sportNavMenu from '@/components/sport/sportNavMenu'
export default {
  components: {
    sportNavMenu
  },
  props: {
    modelValue: {
      dafault: 'prematch'
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    calcNavType() {
      return this.modelValue
    }
  },
  methods: {
    sportChange(...arg) {
      this.$emit('sportChange', ...arg)
    }
  }
}
</script>

<style lang="less" scoped>
.sports-nav{
  padding: 10px;
  background: #fff;
  /deep/ &-menu{
    background: #fff;
    &-main{
      height: 100%;
      padding: 0 18px;
      &-single{
        padding: 0 6px !important;
        margin-right: 50px !important;
        margin-left: 0 !important;
        &.active{
          position: relative;
          &:after{
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            left: 0;
            bottom: 0;
            background: @primary;
          }
          span{
            font-weight: 600;
            color: @font-color1;
          }
        }
        &::before{
          background: none;
        }
        span{
          display: inline-block;
          font-size: 18px;
          line-height: 38px;
          color: @font-color2;
        }
      }
    }
  }
}
</style>
