<template>
  <div class="sport-bet-history">
    <SportBetList type="2" ref="sportBetList" />
  </div>
</template>

<script>
import SportBetList from '@/views/users/sportBetHistory/sportBetList'
export default {
  components: {
    SportBetList,
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.sport-bet-history{
  /deep/ .v-toolbar{
    display: none;
  }
  /deep/ .bet-list{
    > .v-tabs{
      .v-tabs-bar__content{
        padding: 0 40px;
        > .v-tab{
          margin: 0 !important;
          width: 73px;
          min-width: auto;
          font-size: 16px;
          padding: 0;
          margin-right: 55px !important;
        }
      }
    }
    > .v-divider{
      padding: 0 !important;
    }
    &-list{
      max-height: none !important;
      .ticket-details{
        &-main{
          padding: 0 16px 20px 10px !important;
          &-t{
            .text-subtitle-1{
              font-size: 16px !important;
              font-weight: bold;
              &:first-child{
                strong{
                  font-size: 16px !important;
                }
              }
              strong{
                font-size: 18px !important;
                font-weight: bold;
              }
            }
            .text--secondary{
              font-size: 14px !important;
              color: @font-color1 !important;
            }
          }
          &-c{
            display: flex;
            .v-divider{
              display: none;
            }
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
              width: 285px;
              >div{
                margin-bottom: 10px;
                span{
                  width: 85px;
                  font-size: 14px;
                  color: @font-color2;
                }
                strong{
                  flex-grow: 1;
                  font-size: 14px;
                  font-weight: 500 !important;
                }
              }
            }
          }
          .booking-code{
            &-tit{
              font-size: 14px;
              color: @font-color1 !important;
            }
            &-code{
              font-size: 16px;
            }
            &-btn{
              i{
                font-size: 20px;
              }
            }
          }
        }
      }
      .v-divider{
        padding: 0 !important;
        margin: 0 10px;
      }
    }
  }
}
</style>
