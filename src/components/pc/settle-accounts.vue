<template>
  <div class="settle-accounts" :class="calcShow ? '' : 'disabled'" v-click-outside="hideDialog">
    <div class="settle-accounts-main">
      <v-card class="settle-accounts-main-card">
        <v-row class="align-center">
          <v-col cols="auto">
            <BetSlip
              class="settle-accounts-main-card-betslip"
              ref="betslip"
              @changeOddsBet="changeOddsBet"
            />
          </v-col>
          <v-col class="settle-accounts-main-card-set">
            <singleBet v-if="betTypeNum===0" :betData="betData" :singleData="singleData" type="2" :betType="betTypeNum" @getData="getData" />
            <multipleBet class="multiple-bet" v-else-if="betTypeNum===1" :betData="betData" :matchNum="matchNum" type="2" :betType="betTypeNum" @getData="getData" />
            <syetemBet v-else-if="betTypeNum===2" :betData="betData" :matchNum="matchNum" :betType="betTypeNum" @getData="getData" />
          </v-col>
          <v-col cols="auto">
            <LoadingBtn
              class="settle-accounts-main-card-buy"
              width="200"
              height="70"
              :text="oddsChangeBet ? 'Bet Now' : 'Accept Changes'"
              @click="checkBetNow"
            />
          </v-col>
        </v-row>

        <!-- 优惠券弹框 -->
        <GiftSelectPopup />
      </v-card>
    </div>
  </div>
</template>
<script>
import BetSlip from '../sport/pcBetSlip/betSlip'
import singleBet from '@/components/sport/betSlip/singleBet'
import multipleBet from '@/components/sport/betSlip/multipleBet'
import syetemBet from '@/components/sport/betSlip/syetemBet'
import GiftSelectPopup from '../sport/pcBetSlip/giftSelectPopup'
import LoadingBtn from '@/components/func/loading-btn'
import { mapGetters } from 'vuex'
export default {
  components: {
    BetSlip,
    singleBet,
    multipleBet,
    syetemBet,
    GiftSelectPopup,
    LoadingBtn
  },
  props: {},
  data() {
    return {
      oddsChangeBet: true
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['betList', 'betTypeNum', 'betData', 'singleData', 'matchNum']),
    calcShow() {
      return this.betList.length > 0
    }
  },
  methods: {
    getData(...args) {
      this.$refs.betslip.getData(...args)
    },
    checkBetNow(...args) {
      if (this.oddsChangeBet) {
        this.$refs.betslip.checkBetNow(...args)
      } else {
        this.$refs.betslip.changeStyle(...args)
      }
    },
    hideDialog() {
      if (this.calcShow) {
        this.$refs.betslip && this.$refs.betslip.hideDialog()
      }
    },
    changeOddsBet(bl) {
      this.oddsChangeBet = bl
    }
  }
}
</script>

<style lang="less" scoped>
.settle-accounts{
  position: fixed;
  width: 100%;
  height: 120px;
  min-width: @pc-width;
  left: 0;
  z-index: 201;
  bottom: 0;
  background: #fff;
  transform: translateY(0);
  transition: translateY linear .3s;
  box-shadow: 0px -1px 0px 0px #CCCCCC;
  &.disabled{
    overflow: hidden;
    transform: translateY(130px);
  }
  /deep/ .v-dialog__content{
    align-items: flex-end;
  }
  /deep/ &-main{
    height: 100%;
    position: relative;
    overflow: visible;
    &-card{
      width: @pc-width;
      min-width: @pc-width;
      margin: 0 auto;
      height: 100%;
      box-shadow: none !important;
      border-radius: 0;
      position: relative;
      overflow: visible;
      >.row{
        height: 100%;
        margin-top: 0;
      }
      &-betslip{
        margin-right: 20px;
      }
      &-set{
        display: flex;
        padding: 0 12px;
        .bet{
          &.multiple-bet{
            height: 96px;
          }
          height: 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-wrap: wrap;
          >div{
            width: 250px;
            height: 20px;
            padding: 0!important;
            margin-right: 60px!important;
            .grey--text{
              font-size: 14px;
              line-height: 20px;
              color: @font-color2;
            }
            strong{
              width: 106px;
              white-space: nowrap;
            }
          }
          .stake-container{
            margin-bottom: 5px !important;
            >div:nth-child(2){
              width: 116px;
            }
            >.d-flex{
              justify-content: flex-start !important;
            }
            &-num, &-x{
              font-size: 14px;
              color: @font-color1;
            }
            &-x{
              padding: 0 !important;
            }
            &-input{
              display: flex;
              align-items: center;
              flex-shrink: 0;
              &-btn{
                width: 20px;
                height: 20px;
                background: #F3F4F6;
                box-sizing: border-box;
                border: 1PX solid #DADADA;
                font-size: 16px;
                color: #ABABAB;
                text-align: center;
                line-height: 18px;
                cursor: pointer;
                flex-shrink: 0;
                border-radius: 0;
                user-select:none;
                &.reduce{
                  margin-left: 8px;
                }
              }
              .v-input{
                width: 45px;
                height: 20px;
                min-width: auto;
                flex: 0 0 auto;
                border: none;
                border-top: 1PX solid #DADADA;
                border-bottom: 1PX solid #DADADA;
                border-radius: 0;
                .v-input__slot{
                  min-height: auto;
                  padding: 0 !important;
                  input{
                    font-size: 14px;
                    text-align: center;
                    color: @font-color1;
                    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
                      -webkit-appearance: none;
                      margin: 0;
                    }
                  }
                }
                .v-text-field__details{
                  display: none;
                }
                fieldset{
                  display: none;
                }
              }
              .single-input-width{
                width: auto;
              }
            }
          }
          .multiple-odds{
            order: -1;
            margin-bottom: 5px !important;
            strong{
              width: 116px;
              font-size: 14px;
              color: @font-color1;
            }
          }
          .total-take{
            margin-bottom: 5px;
            strong{
              width: 116px;
              font-size: 14px;
              color: @font-color1;
            }
          }
          .coupon{
            >div:nth-child(2){
              width: 116px;
              font-size: 14px;
              color: @font-color1;
            }
            strong{
              color: @font-color1 !important;
              &:before{
                content: "-";
                font-size: 14px;
                padding-right: 2px;
              }
            }
          }
          .payment, .total-potential-win{
            strong{
              width: 106px;
              font-size: 14px;
              color: @font-color1;
              letter-spacing: 0;
            }
          }
        }
      }
      &-buy{
        margin: 0 !important;
        font-size: 24px;
      }
    }
  }
}

</style>
