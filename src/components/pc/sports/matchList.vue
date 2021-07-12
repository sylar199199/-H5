<template>
  <div class="match-list">
    <!--赛事列表-->
    <BettingMenu
      ref="btm"
      type="2"
      v-bind="$attrs"
    />

    <LoadMore v-on="$listeners" v-show="$refs.btm && $refs.btm.dealDoneArr.length > 0 && sortTimeQuery" />
  </div>
</template>
<script>
import BettingMenu from '@/components/sport/bettingMenu/BettingMenu'
import LoadMore from '@/components/pc/load-more'
export default {
  components: {
    BettingMenu,
    LoadMore
  },
  props: {
    type: {
      default: '2' // 2: 首页； 3: sports页面
    },
    sortTimeQuery: {
      default: true
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.match-list{
  padding: 10px 0 30px;
  background: #fff;
  /deep/ .betting-menu{
    &-group{
      &-top{
        height: 36px;
        margin-left: 10px !important;
        padding-right: 0 !important;
        margin-right: 10px !important;
        background-color: @bg-color !important;
        padding-left: 10px !important;
        &-tit{
          flex: 1 0 auto;
          font-size: 14px;
          color: @font-color3;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-weight: 500 !important;
        }
        .betting-menu-recommend{
          width: 188px;
          margin-left: 10px;
          span{
            font-size: 14px;
            color: @font-color3;
          }
        }
      }
      &-line{
      }
      &-list{
        &-single{
          margin: 0 10px;
          border-bottom: 1PX solid @dividing-line-color;
          &:last-child{
            border: none;
          }
          .v-divider{
            display: none;
          }
          >div{
            padding: 0 !important;
          }
          .betting-menu-ratio{
          }
          &-info{
            display: block;
            flex: 0 0 auto;
            min-width: 30px;
            margin-right: 10px;
            padding: 0 !important;
            &-time{
              height: 16px;
              font-size: 12px;
              line-height: 16px;
              color: @font-color1;
              margin-bottom: 10px;
              &-collection{
              }
            }
            &-id{
              font-size: 12px;
              line-height: 16px;
              color: @font-color3;
              margin-bottom: 0;
            }
          }
          &-name{
            display: block;
            flex-grow: 1;
            margin-top: 0 !important;
            .teamName{
              font-size: 14px;
              line-height: 16px;
              color: @font-color1;
              margin-bottom: 0;
              padding: 0 10px 0 0 !important;
              cursor: pointer;
              font-weight: normal !important;
              &:first-child{
                margin-bottom: 10px;
              }
            }
          }
          &-details{
            padding: 10px;
            cursor: pointer;
          }
          &-action{
            width: 188px;
            flex-shrink: 0;
            margin-left: 10px !important;
            margin-right: 0;
            .v-chip{
              width: 62px;
              height: 38px;
              max-width: 62px;
              padding: 0 !important;
              &.widther{
                width: 92px;
                max-width: 92px;
              }
            }
            .v-chip__content{
              width: 100%;
              font-size: 16px;
              font-weight: 700;
              line-height: 38px;
              display: flex;
              align-items: center;
              justify-content: center;
              span{
                font-size: 16px;
                font-weight: 700;
                line-height: 38px;
                text-align: center;
              }
              i{
                position: static !important;
              }
            }
          }
        }
      }
    }
  }
  &-more{
    height: 40px;
    font-size: 14px;
    color: @font-color1;
    text-align: center;
    line-height: 40px;
    background: #F3F4F6;
    margin: 20px 10px 0;
    cursor: pointer;
  }
}
</style>
