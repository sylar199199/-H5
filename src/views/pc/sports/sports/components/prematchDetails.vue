<template>
  <div class="prematch-details">
    <SportsBetting v-model="$attrs" v-on="$listeners" type="2" v-if="$route.query.status === 'not_started'" />

    <LivesBetting v-model="$attrs" v-on="$listeners" type="2" v-else />
  </div>
</template>
<script>
import SportsBetting from '@/views/sports/sports/sportsBetting/sportsBetting'
import LivesBetting from '@/views/sports/lives/livesBetting/livesBetting'
export default {
  components: {
    SportsBetting,
    LivesBetting
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
.prematch-details{
  background: #fff;
  padding-bottom: 20px;
  /deep/ .sportsBetting, /deep/ .livesBetting{
    .detailHeader{
      padding: 20px 10px !important;
      >span{
        font-size: 16px !important;
        line-height: 18px !important;
        padding: 0 !important;
      }
      >div{
        >div{
          width: 18px;
          height: 18px;
          > button{
            width: 100%;
            height: 100%;
            font-size: 20px !important;
          }
        }
        .clock-btn{
          margin-left: 16px;
          >button{
            margin-left: 0 !important;
          }
        }
      }
    }
    .detailTeamName{
      height: 18px;
      justify-content: flex-start !important;
      padding: 0 10px !important;
      margin-bottom: 20px;
      .nameBox{
        flex: 0 0 auto !important;
        width: auto;
        > p{
          font-size: 18px !important;
          color: @font-color1;
          font-weight: 400 !important;
        }
      }
      >span{
        line-height: 22px !important;
      }
      span{
        padding-top: 0 !important;
        font-size: 16px;
        color: @font-color2;
      }
    }
    .LMTbox{
      padding: 0 20px !important;
      border: none !important;
    }
    .detailListOutBox{
      height: auto;
      .bettingMenuDetail{
        >div{
          height: auto !important;
          >div{
            padding-bottom: 30px !important;
          }
        }
        .perItem{
          padding: 0 !important;
          .marketTitle{
            margin: 0 0 17px !important;
            padding: 0 10px !important;
            .text-truncate{
              font-size: 16px !important;
              line-height: 26px;
              color: @font-color1;
              padding-top: 0 !important;
              span{
                padding-right: 10px;
              }
            }
            .v-icon{
              font-size: 20px !important;
            }
          }
          .betBox{
            padding: 0 5px !important;
            .col{
              >span, .my-2 > span{
                min-height: 40px;
                height: auto;
                *{
                  font-size: 18px !important;
                  line-height: 40px;
                  font-weight: 300 !important;
                }
                em{
                  font-weight: 500 !important;
                }
                > .v-chip__content{
                  width: 100%;
                  > div{
                    align-items: center;
                    .text-truncate{
                      margin-bottom: 0 !important;
                    }
                  }
                  .oddItemIn-name{
                    padding: 8px 0;
                    p{
                      line-height: 24px !important;
                    }
                  }
                  >i {
                    top: 0;
                    right: -10px;
                  }
                }
              }
            }
          }
        }
        .v-divider{
          margin: 20px 10px 16px !important;
        }
      }
    }
  }
}
</style>
