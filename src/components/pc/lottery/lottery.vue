<template>
  <div class="lottery">
    <ilotPopularLottery type="2" />

    <ul class="lottery-type d-flex">
      <template v-for="item in typeList" >
        <li class="lottery-type-li font-weight-medium" :key="item.id" @click="linkPage(item)">{{item.text}}</li>
      </template>
    </ul>
  </div>
</template>
<script>
import ilotPopularLottery from '@/components/common/ilotPopularLottery/ilotPopularLottery'
import quickAccessMixins from '@/components/common/ilotHomeQuickAccess/mixins/quickAccessMixins'
export default {
  name: '',
  components: {
    ilotPopularLottery
  },
  mixins: [quickAccessMixins],
  props: {},
  data() {
    return {
      typeList: [
        {id: 1, icon: '', text: '5/90', name: '90Select5'},
        {id: 2, icon: '', text: '3D', name: '3D'},
        {id: 3, icon: '', text: 'Football 14', name: 'Football 14'}
      ]
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.lottery{
  height: 197px;
  box-sizing: border-box;
  padding: 0 10px;
  background: #fff;
  position: relative;
  &-type{
    position: absolute;
    right: 12px;
    top: 20px;
    &-li{
      font-size: 16px;
      color: @primary;
      line-height: 19px;
      margin-left: 30px;
      cursor: pointer;
    }
  }
  /deep/ .popular-lottery{
    margin: 0 !important;
    > div{
      &:first-child{
        height: 54px !important;
        padding: 7px 0 !important;
        margin: 0 !important;
      }
    }
    &-img{
      flex-grow: 0;
      margin-top: 6px;
    }
    &-main{
      display: flex;
      justify-content: space-between;
      .select-num{
        width: 358px;
        height: 132px;
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid #CCCCCC;
        padding-top: 10px !important;
        margin-top: 0 !important;
        box-shadow: none !important;
        &-name{
          font-size: 22px;
          margin-bottom: 16px;
        }
        &-win{
          flex-wrap: nowrap !important;
          align-items: flex-start !important;
          &-num{
            flex-shrink: 0;
            margin-right: 10px;
            span{
              font-size: 14px;
              color: @font-color3;
              line-height: 20px;
              font-weight: normal;
              margin-right: 10px !important;
            }
            strong{
              font-size: 18px !important;
              line-height: 24px;
              color: @font-color1;
            }
          }
          &-desc{
            margin-bottom: 0 !important;
          }
          &-time, >p{
            flex-grow: 1;
            font-size: 14px;
            color: @font-color1;
            text-align: right;
            justify-content: flex-end;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-bottom: 0 !important;
            span{
              padding-left: 3px;
            }
          }
          &-time{
            margin-top: -38px;
            &.tips{
              flex-direction: column;
              align-items: flex-end;
              > p{
                &:first-child{
                  margin-bottom: 18px !important;
                }
              }
            }
          }
        }
        &-num{
          &-single{
            padding: 0;
            box-sizing: border-box;
            border: 2px solid @primary;
            flex: 0 0 auto;
            background-color: #fff !important;
            .v-responsive__content{
              height: 100%;
              span{
                font-size: 16px !important;
                line-height: 28px !important;
              }
            }
          }
          &-refresh{
            margin-top: -6px;
            margin-left: -6px;
            i{
              width: auto;
              font-size: 20px !important;
            }
          }
          &-buy{
            width: 80px;
            height: 30px;
            .v-btn__content{
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
