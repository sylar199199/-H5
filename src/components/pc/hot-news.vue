<template>
  <ILotHotNews class="hot-news" :moduleName="moduleName" type="2" />
</template>
<script>
import ILotHotNews from './hot-news/hot-news'
export default {
  components: {
    ILotHotNews
  },
  props: {
    moduleName: {
      default: ''
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.hot-news{
  height: 180px;
  background: #fff;
  box-sizing: border-box;
  padding: 0 10px 0 !important;
  margin: 0 !important;
  overflow: hidden;
  /deep/ .lot-hot-news-list-container{
    padding-bottom: 0 !important;
  }
  /deep/ &-top{
    height: 54px !important;
    padding: 7px 0 !important;
    margin: 0 !important;
    .col{
      padding: 0 !important;
    }
    &-tab{
      &.special{
        transform: translateX(10px);
      }
      .v-tabs-slider-wrapper{
        display: none;
      }
      >.v-item-group{
        height: 30px !important;
      }
      &-single{
        min-width: auto;
        width: auto;
        height: 30px;
        flex-grow: 0;
        font-size: 16px;
        line-height: 20px;
        margin-left: 6px !important;
        padding: 0 12px !important;
        color: @primary !important;
      }
    }
  }
  /deep/ &-list{
    height: 100px;
    box-sizing: border-box;
    padding-top: 10px;
    overflow: hidden;
    &-single{
      cursor: pointer;
      &-list{
        flex-wrap: wrap;
        padding-top: 10px;
        &-content{
          width: calc(50% - 30px);
          font-size: 14px;
          color: @font-color1;
          font-weight: 600 !important;
          line-height: 20px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin: 0 0 15px !important;
          -webkit-line-clamp: 1 !important;
          transition: color linear .3s;
          &:hover{
            color: @primary;
          }
        }
      }
    }
  }
}
</style>
