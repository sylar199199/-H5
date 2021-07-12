<template>
  <div class="feature-match">
    <ilotFeaturedMatch type="2" v-bind="$attrs" />
  </div>
</template>
<script>
import ilotFeaturedMatch from '@/components/sport/ilotFeaturedMatch/ilotFeaturedMatch'
export default {
  components: {
    ilotFeaturedMatch
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
  methods: {
  }
}
</script>

<style lang="less" scoped>
.feature-match{
  padding-top: 1px;
  background: #fff;
  height: 220px;
  position: relative;
  &-btn{
    >i{
      color: #fff;
      font-weight: normal;
    }
    &.left{
      border-radius: 0 35px 35px 0;
      z-index: 9;
    }
    &.right{
      border-radius: 35px 0 0 35px;
    }
  }
  /deep/ .featured-match{
    margin: 0 !important;
    padding: 0 10px 0 !important;
    &-tab{
      padding: 7px 0 !important;
      margin: 0 !important;
    }
    &-list{
      &-single{
        width: 358px !important;
        height: 154px;
        min-width: auto !important;
        flex: 0 0 auto !important;
        margin-left: 0 !important;
        margin-right: 10px !important;
        margin-top: 0 !important;
        padding: 10px 10px 0 !important;
        box-shadow: none !important;
        &:last-child{
          margin-right: 0 !important;
        }
        &-name{
          font-size: 14px !important;
          line-height: 22px !important;
          min-height: 14px;
          margin-bottom: 12px !important;
          margin-top: -4px !important;
        }
        &-team{
          font-size: 16px !important;
          line-height: 24px !important;
          font-weight: normal !important;
        }
        &-time{
          > p{
            line-height: 24px !important;
            &:nth-child(1){
              font-size: 22px !important;
              margin-bottom: 2px !important;
            }
            &:nth-child(2){
              font-size: 14px !important;
            }
          }
        }
        .no-gutters{
          margin-top: 16px !important;
          >.font-weight-black{
            font-size: 16px;
            font-weight: 400 !important;
            color: @font-color1;
          }
        }
        .v-card{
          height: 38px;
          line-height: 38px;
          align-items: center;
          padding: 0 11px 0 17px !important;
        }
      }
    }
    .v-tabs-slider{
      display: none;
    }
    .v-tab{
      font-size: 18px;
    }
    .v-tabs-slider-wrapper{
      height: 0 !important;
    }
    .v-slide-group__wrapper{
      overflow-y: visible;
      //margin: 0 -10px 0 -11px;
    }
  }
  /deep/ .v-slide-group{
    .v-slide-group__prev, .v-slide-group__next{
      position: absolute;
      width: 23px;
      min-width: auto;
      height: 35px;
      line-height: 35px;
      background: rgba(0, 0, 0, .2);
      box-sizing: border-box;
      top: 62px;
      z-index: 9;
      pointer-events: auto;
      .v-icon__svg{
        color: #fff;
      }
    }
    .v-slide-group__prev{
      padding-right: 3px;
      left: 0;
      border-radius: 0 35px 35px 0;
    }
    .v-slide-group__next{
      padding-left: 3px;
      right: 0;
      border-radius: 35px 0 0 35px;
    }
  }
}
</style>
