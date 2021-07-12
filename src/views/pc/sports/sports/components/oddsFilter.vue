<template>
  <div class="odds-filter">
    <!--赔率过滤器-->
    <oddsRange :rangeState="true"></oddsRange>
  </div>
</template>
<script>
import oddsRange from '@/components/sport/oddsRangeMain'
export default {
  components: {
    oddsRange
  },
  props: {},
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.odds-filter{
  height: 183px;
  background: #fff;
  /deep/ .odds-range{
    box-shadow: none !important;
    &-close, &-divider{
      display: none;
    }
    &-top{
      padding: 20px 10px 15px !important;
      &-title{
        font-size: 16px !important;
        color: @font-color1;
        font-weight: 500 !important;
      }
    }
    &-card{
      padding: 0 10px !important;
      &-t{
        &-tit{
          display: none;
        }
        &-text{
          font-size: 14px;
          line-height: 1 !important;
        }
      }
      &-slider{
        .v-slider__track-container{
          height: 4px;
        }
        .v-slider__thumb{
          width: 10px;
          height: 10px;
        }
      }
      &-range{
        >span, >div{
          font-size: 12px;
          color: @font-color2;
        }
      }
    }
    &-btns{
      padding: 20px 10px 0 !important;
      justify-content: space-between;
      >div{
        width: 106px;
        height: 32px;
        flex: 0 0 auto;
        >div{
          margin: 0 !important;
        }
      }
      &-btn{
        width: 106px;
        height: 32px;
        &:not(.v-btn--has-bg){
          color: @primary;
        }
      }
    }
  }
}
</style>
