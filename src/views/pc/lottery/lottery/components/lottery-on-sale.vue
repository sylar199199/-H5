<template>
  <div class="lottery-on-sale">
    <div class="lottery-on-sale-top">
      <v-img width="83" height="29" src="@/assets/img/views/pc/lottery/icon_lottery_sale.png"></v-img>
    </div>

    <on-sale
      class="pl-4 pr-4"
      :lotteriesList="lotteriesList"
      :sharedTopicList="sharedTopicList"
      :load-more-count="onSaleLoadMoreCount"
      type="2"
      @loadNewData="loadNewData"
      @toBuyBack="toBuy"
      @toSharedBack="toShared"
      @loadOver="loadOver()"
    />
  </div>
</template>
<script>
import OnSale from '@/views/lottery/lotteryList/components/onSale'
import mixins from '@/views/lottery/lotteryList/mixins'
export default {
  components: {
    OnSale
  },
  props: {},
  mixins: [mixins],
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    calcLotteriesList() {
      return this.lotteriesList.slice(0, 3)
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.lottery-on-sale{
  background: #fff;
  padding-bottom: 1px;
  &-top{
    padding: 13px 10px 12px;
  }
  /deep/ .on-sale{
    padding: 0 !important;
    &-single{
      margin: 0 10px 20px !important;
      padding-top: 10px;
      border: 1px solid @dividing-line-color;
      >.v-list{
        padding: 0 !important;
      }
      &-top{
        height: 60px;
        margin: 0 10px !important;
        padding: 0 !important;
        &-l{
          &-avatar{
            width: 60px !important;
            height: 60px !important;
            min-width: 50px !important;
            .v-avatar{
              width: 60px !important;
              min-width: auto !important;
              height: 60px !important;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
          &-num{
            flex-shrink: 0;
            >span{
              line-height: 1 !important;
              &:nth-child(1) {
                font-size: 22px !important;
                font-weight: 500 !important;
                margin-bottom: 10px !important;
              }
              &:nth-child(2) {
                font-size: 14px !important;
                color: @font-color2 !important;
                font-weight: normal !important;
              }
            }
          }
        }
        &-r{
          >span{
            line-height: 1 !important;
            &:nth-child(1) {
              font-size: 18px !important;
              line-height: 22px !important;
              font-weight: bold !important;
              margin-bottom: 6px !important;
            }
            &:nth-child(2) {
              font-size: 14px !important;
              color: @font-color2 !important;
            }
          }
          &.tips{
            flex-direction: column;
            align-items: flex-end;
          }
        }
        &-desc{

        }
        >.v-list-item__content{
          margin: 0 !important;
        }
        &-tit{
          margin-bottom: 6px;
          span{
            font-size: 22px !important;
            color: @font-color1 !important;
            line-height: 1 !important;
            background: none !important;
            padding-left: 10px !important;
          }
        }
        &-id{
          span{
            font-size: 16px !important;
            color: @font-color2 !important;
            line-height: 1 !important;
            background: none !important;
            padding-left: 10px !important;
          }
        }
        &-time{
          min-height: auto;
          height: auto;
          font-size: 16px !important;
          color: @font-color2 !important;
          line-height: 1 !important;
          padding: 0 !important;
          span{
            font-size: 18px;
            color: @font-color1;
            margin-bottom: 10px;
          }
        }
      }
      .v-divider{
        display: none;
      }
      &-content{
        font-size: 24px !important;
        line-height: 24px;
        color: @font-color1 !important;
        font-weight: bold !important;
        margin-top: 10px !important;
      }
      &-btn{
        margin: 16px 0 10px;
        padding: 0 !important;
        >button{
          width: 120px;
          height: 32px;
          background: @primary;
          border-radius: 4px !important;
          &.v-btn--disabled{
            background: rgba(0, 0, 0, 0.12);;
            span{
              color: @font-color4 !important;
            }
          }
          span{
            font-size: 18px;
            color: #fff;
            font-weight: 500;
            i{
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
