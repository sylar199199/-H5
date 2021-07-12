<template>
  <div class="lottery-bet-history-detail">
    <ticketDetail type="2" />
  </div>
</template>

<script>
import ticketDetail from '@/views/users/lotteryBetHistory/ticketDetail'
export default {
  components: {
    ticketDetail
  }
}
</script>

<style lang="less" scoped>
.lottery-bet-history-detail{
  height: 100%;
  background: @bg-color;
  /deep/ .ticket-detail{
    &-t{
      padding: 10px 10px 5px !important;
      &-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .v-divider{
          display: none;
        }
        &-m{
          flex-grow: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          >p{
            margin: 0 !important;
            &:nth-child(1){
              font-size: 16px;
              color: @font-color1;
              font-weight: 500 !important;
              margin-right: 30px !important;
            }
            &:nth-child(2){
              font-size: 14px;
              color: @font-color1 !important;
              font-weight: 500 !important;
            }
            &:last-child{
              flex-grow: 1;
              text-align: right;
              font-size: 14px;
              color: @font-color2;
            }
          }
        }
        &-win{
          width: 40%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          &-tit{
            color: @font-color1 !important;
          }
          i{
            font-size: 20px !important;
          }
        }
      }
      .v-divider{
        display: none;
      }
      &-num{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        &-p{
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 20px;
          > p{
            width: 100%;
            font-size: 14px;
            font-weight: 500 !important;
            margin-bottom: 10px !important;
          }
          > div{
            min-width: 50%;
          }
        }
        &-m{
          order: -1;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          border-bottom: 1px solid @dividing-line-color;
          padding-bottom: 20px !important;
          margin-bottom: 0 !important;
          >li{
            width: 33%;
            justify-content: flex-start !important;
            span{
              padding-right: 10px;
              line-height: 24px;
              white-space: nowrap;
            }
            strong{
              color: @font-color1;
              line-height: 24px;
              white-space: nowrap;
            }
          }
        }
      }
    }
    &-list{
      height: auto;
      max-height: none !important;
      > .v-list-item{
        padding: 0 10px;
      }
      .odd-detail{
        padding-top: 10px;
        .odd-num{
          font-size: 18px !important;
        }
        &-content{
          &-t{
            min-height: 30px;
            display: flex;
            align-items: flex-start;
            padding-top: 6px !important;
            margin-bottom: 20px;
            > p {
              flex-shrink: 0;
              font-size: 16px;
              line-height: 30px;
              color: @font-color1;
              font-weight: 500 !important;
              margin-right: 10px !important;
              padding-top: 0 !important;
            }
            > div{
              transform: translateY(-2px);
              > div{
                width: 24px !important;
                height: 24px !important;
                min-width: auto !important;
                margin: 3px 10px 3px 0 !important;
                span{
                  font-size: 14px;
                  font-weight: normal !important;
                }
              }
              &.odd-detail-content-t-90{
                >div{
                  width: auto !important;
                  display: flex;
                  margin: 0 !important;
                  > div{
                    width: 24px !important;
                    height: 24px !important;
                    min-width: auto !important;
                    margin: 3px 10px 3px 0 !important;
                    span{
                      font-size: 14px;
                      font-weight: normal !important;
                    }
                  }
                }
              }
              &.odd-detail-content-t-3d{
                display: flex;
                flex-wrap: wrap;
                >div{
                  width: auto !important;
                  margin: 0 0 8px !important;
                  .v-avatar{
                    width: 24px !important;
                    height: 24px !important;
                    min-width: auto !important;
                  }
                }
              }
            }
          }
          &-b{
            flex-direction: row !important;
            >li{
              width: 33% !important;
              justify-content: flex-start !important;
              span{
                padding-right: 10px;
                line-height: 24px;
                white-space: nowrap;
              }
              strong{
                color: @font-color1;
                line-height: 24px;
                white-space: nowrap;
              }
            }
          }
        }
        .football-detail{
          display: flex;
          flex-direction: row !important;
          &-main{
            padding: 0 !important;
            width: 120px;
            margin-left: 5px;
            &-info{
              span{
                display: block;
                font-size: 14px;
                &:first-child{
                  color: @font-color1;
                  margin-bottom: 11px;
                }
              }
            }
            i{
              position: absolute;
              right: 10px;
              top: 10px;
            }
          }
          &-info{
            flex: 1 0 auto;
            >div{
              &:first-child{
                p{
                  font-size: 14px;
                  line-height: 24px;
                  color: @font-color1;
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
