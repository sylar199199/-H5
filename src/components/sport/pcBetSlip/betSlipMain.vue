<template>
  <v-card class="bet-slip-main" :class="calcShow ? '' : 'deactive'">
    <sportBetSlip type="2" v-on="$listeners" ref="sportBetSlip" />
  </v-card>
</template>
<script>
import sportBetSlip from '@/components/sport/sportBetSlip'
import { dialogMixin } from '@/mixins'
export default {
  components: {
    sportBetSlip
  },
  mixins: [dialogMixin],
  data() {
    return {
      checkbox: []
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getData(...args) {
      this.$refs.sportBetSlip.getData(...args)
    },
    checkBetNow(...args) {
      this.$refs.sportBetSlip.checkBetNow(...args)
    },
    changeStyle(...args) {
      this.$refs.sportBetSlip.changeStyle(...args)
    }
  }
}
</script>
<style lang="less" scoped>
.bet-slip-main{
  position: absolute;
  width: 500px;
  left: 0;
  top: 0;
  z-index: -2;
  transition: all linear .3s;
  transform: translateY(-100% + 0.5px);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .3) !important;
  &.deactive{
    transform: translateY(0);
    box-shadow: none !important;
  }
  /deep/ .v-tabs-bar__content {
    justify-content: center;
    .v-tab{
      min-width: auto;
      padding: 0 3px !important;
      margin: 0 50px !important;
      &.v-tab--active{
        font-weight: 500 !important;
      }
    }
  }
  /deep/ .container{
    padding-top: 0 !important;
    padding-bottom: 10px !important;
    display: flex;
    .bet-cart{
      overflow: hidden;
      .overflow-y-auto{
        max-height: calc(70vh - 210px);
        box-sizing: border-box;
        height: auto !important;
        >div{
          padding-top: 4px !important;
        }
      }
      > .d-flex{
        height: 40px;
        border-bottom: 1PX solid @dividing-line-color;
        .mr-2{
          font-size: 16px !important;
          color: @font-color1;
        }
        .v-chip{
          min-width: 20px;
          height: 20px;
          font-size: 16px;
          text-align: center;
          padding: 0 !important;
        }
        .v-btn__content{
          font-size: 16px;
          color: @font-color1;
        }
      }
      > .bet-type-tab{
        > .v-item-group{
          height: 48px !important;
          padding-bottom: 8px;
          border-bottom: 1px solid @bg-color;
        }
      }
      .v-divider{
        display: none;
      }
      > .v-sheet{
        .v-list-item{
          .text-truncate{
            font-size: 14px !important;
            line-height: 1 !important;
            color: @font-color1;
            font-weight: normal !important;
          }
          .odds-name{
            &-main{
              line-height: 20px !important;
              margin-bottom: 8px !important;
              margin-top: -3px !important;
            }
          }
          .market-name{
            padding: 0 !important;
            &:last-child{
              margin-bottom: 10px !important;
            }
          }
          .win{
            margin-top: 5px !important;
            margin-bottom: 10px !important;
            >p{
              font-size: 14px;
              line-height: 1 !important;
              color: @font-color3;
              strong{
                margin-left: 20px;
              }
            }
          }
          .v-input--checkbox{
            margin-top: 10px;
          }
          .odds-input{
          }
        }
      }
    }
  }
}
</style>
