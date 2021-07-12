<template>
  <div class="sport-bet-history-details">
    <ticketDetail type="2" />
  </div>
</template>

<script>
import ticketDetail from '@/views/users/sportBetHistory/ticketDetail'
export default {
  components: {
    ticketDetail
  }
}
</script>

<style lang="less" scoped>
.sport-bet-history-details{
  /deep/ .ticket-detail{
    &-t{
      position: relative;
      padding: 10px 10px 5px !important;
      &-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-m{
          flex-grow: 1;
          align-items: center;
          >div{
            margin: 0 !important;
          }
          .text-subtitle-1{
            font-size: 16px;
            color: @font-color1 !important;
            font-weight: 500;
          }
          .text--secondary{
            font-size: 14px;
            color: @font-color1 !important;
          }
        }
        .booking-code{
          width: 45%;
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
      &-money{
        display: flex;
        flex-wrap: wrap;
        >li{
          width: 33%;
          justify-content: flex-start !important;
          span{
            margin-right: 10px;
          }
        }
      }
      &-rebet{
        position: absolute;
        height: 30px;
        right: 20px;
        top: -30px;
        z-index: 99;
      }
    }
    &-list{
      height: auto;
      max-height: none !important;
      > .v-list-item{
        padding: 0 10px;
      }
      .odd-detail{
        .odd-num{
          font-size: 18px !important;
        }
        &-content{
          &-state{
            span{
              font-size: 14px;
              color: @font-color1 !important;
            }
            strong{
              &:last-child{
                width: 18%;
                text-align: right;
                justify-content: flex-end;
              }
            }
          }
          &-main{
            display: flex;
            &-l{
              flex-grow: 1;
              margin-right: 20px;
              padding-top: 10px;
              >div{
                p{
                  font-size: 14px;
                  color: @font-color1 !important;
                  line-height: 1;
                  >span{
                    font-size: 12px;
                    line-height: 14px;
                    color: @font-color2 !important;
                  }
                }
              }
            }
            &-r{
              width: 240px;
              >li{
                margin-bottom: 10px;
                span{
                  width: 85px;
                  font-size: 14px;
                  color: @font-color2;
                }
                strong{
                  flex-grow: 1;
                  font-size: 14px;
                  text-align: left !important;
                  font-weight: 500 !important;
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
