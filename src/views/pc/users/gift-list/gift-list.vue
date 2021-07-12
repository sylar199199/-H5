<template>
  <div class="gift-list">
    <GiftList />
  </div>
</template>

<script>
import GiftList from '@/views/users/giftList/giftList'
export default {
  name: 'pcGiftList',
  components: {
    GiftList
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.gift-list{
  min-height: 100%;
  background: @bg-color;
  /deep/ .v-toolbar{
    display: none;
  }
  /deep/ .gift-list{
    box-shadow: none;
    .v-toolbar{
      height: 64px !important;
      box-sizing: border-box;
      padding: 6px 20px 12px 30px !important;
      .v-toolbar__content{
        width: 100%;
        height: 100% !important;
        padding-right: 0 !important;
        .v-tab{
          width: auto;
          min-width: auto;
          padding: 0 3px;
          margin-right: 60px;
          >p{
            font-size: 16px;
            margin-bottom: -6px !important;
          }
        }
        .type-select{
          width: 80px;
          .v-select__selections{
            margin-right: -10px;
          }
          .v-input__append-inner{
            padding: 0;
          }
        }
      }
    }
    .tab-content-box{
      background-color: @bg-color !important;
      padding: 10px 0 !important;
      .v-window-item >div{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        > .v-card {
          width: calc(50% - 6px);
          height: auto;
          min-height: auto;
          overflow: hidden;
          > .b-card{
            > div{
              &:first-child{
                width: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                > div{
                  padding: 0 !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
