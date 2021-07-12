<template>
  <div class="lottery-bet-history">
    <LotteryBetList type="2" ref="lotteryBetList" />
  </div>
</template>
<script>
import LotteryBetList from '@/views/users/lotteryBetHistory/lotteryBetList'
export default {
  name: '',
  components: {
    LotteryBetList
  },
  props: {},
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.lottery-bet-history{
  /deep/ .v-toolbar{
    display: none;
  }
  /deep/ .bet-list{
    &-ball{
      padding: 0 40px 8px;
      border-bottom: 10px solid @bg-color;
      &-single{
        margin: 0 !important;
        min-width: 73px;
        font-size: 16px;
        padding: 0;
        margin-right: 55px !important;
      }
    }
    &-type{
      height: 62px;
      padding: 10px 40px 0;
      background-color: #fff !important;
      border-bottom: 1px solid @dividing-line-color !important;
      border-radius: 0;
      &-list{
        background-color: #fff !important;
        >div{
          .v-slide-group__wrapper{
            height: 42px;
          }
          .v-slide-group__content{
            height: 42px;
            background-color: #fff !important;
            justify-content: flex-start;
            >div{
              margin: 0 !important;
              min-width: 73px;
              font-size: 16px;
              padding: 0;
              margin-right: 55px !important;
              flex-grow: 0;
            }
          }
        }
      }
    }
    &-list{
      max-height: none !important;
      padding: 0 10px;
      &-single{
        padding: 20px 0 !important;
        cursor: pointer;
        .v-divider{
          padding: 0 !important;
        }
        &-t{
          padding: 0 !important;
          &-name{
            font-size: 16px;
          }
          &-time{
            font-size: 14px;
            color: @font-color2 !important;
          }
          &-result{
            span{
              font-size: 18px !important;
            }
          }
        }
        &-b{
          padding: 0 !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px !important;
          &-no{
            font-size: 14px;
          }
          &-price{
            span{
              font-size: 14px !important;
              color: @font-color2;
              margin-right: 10px;
            }
            strong{
              font-size: 14px;
              font-weight: 500 !important;
            }
          }
          &-btn{
            transform: translateY(-5px);
          }
        }
      }
    }
  }
}
</style>
