<template>
  <div class="affiliates-dialog">
    <v-dialog
      attach=".affiliates-dialog"
      content-class="affiliates-dialog-container"
      v-model="calcShow"
      overlay-opacity="0.7"
      persistent
    >
      <v-card
        class="affiliates-dialog-card rounded-0 pa-0 overflow-hidden"
        :class="`type_${type}`"
        color="transparent"
        elevation="0"
        v-show="!blShowAgreement">
        <v-card-text class="affiliates-dialog-card-main">
          <template v-if="type === '2'">
            <v-img class="affiliates-dialog-card-main-img" width="258" height="142" src="~@/assets/img/views/pc/account/affiliates-dialog-bg2.png"></v-img>
          </template>
          <template v-else>
            <v-img class="affiliates-dialog-card-main-img" width="163" height="90" src="~@/assets/img/views/pc/account/affiliates-dialog-bg.png"></v-img>
          </template>

          <div class="affiliates-dialog-card-main-txt pt-4">
            <v-checkbox v-model="blAgree">
              <template v-slot:label>
                <div class="affiliates-dialog-card-main-txt-main">
                  I accept the<span @click.stop.prevent="blShowAgreement = true">《Term & Conditions》</span>
                </div>
              </template>
            </v-checkbox>
          </div>

          <LoadingBtn
            width="130"
            height="32"
            class="affiliates-dialog-card-main-confirm text-capitalize"
            :disabled="!blAgree"
            text="Confirm"
            @click="confirm"
          />
        </v-card-text>
        <!--关闭按钮-->
        <v-card-actions class="d-flex align-center justify-center pa-0 transparent">
          <v-btn
            color="lighten-2"
            icon
            dark
            class="affiliates-dialog-card-close mt-5"
            @click="close"
          >
            <v-icon x-large>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

      <AgreementAffiliates @back="blShowAgreement = false" @close="close" v-show="blShowAgreement" />
    </v-dialog>
  </div>
</template>
<script>
import AgreementAffiliates from './agreement-affiliates'
import LoadingBtn from '@/components/func/loading-btn'
import { dialogMixin } from '@/mixins'
import { mapGetters } from 'vuex'
export default {
  name: 'affiliatesDialog',
  props: {
    type: {
      type: String,
      default: '1' // 1: 移动端； 2：pc端
    }
  },
  components: {
    AgreementAffiliates,
    LoadingBtn
  },
  mixins: [dialogMixin],
  data() {
    return {
      blAgree: false,
      blShowAgreement: false
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['loginInfo'])
  },
  methods: {
    close() {
      this.calcShow = false
      this.blShowAgreement = false
    },
    async confirm(fn) {
      try {
        if (this.blAgree) {
          const res = await this.$api.applyAgent({
            data: {
              playerAccount: this.loginInfo.playerAccount,
              playerCode: this.loginInfo.playerCode
            }
          })
          this.close()
          if (res.code !== 0) return
          this.$store.commit('SET_LOGININFO', {channelStatus: 1})
          this.$router.push({
            name: 'affiliates'
          })
        }
      } finally {
        fn && fn()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.affiliates-dialog{
  /deep/ &-container{
    box-shadow: none !important;
    max-width: 600px;
    display: flex;
    justify-content: center;
  }
  /deep/ &-card{
    width: 270px;
    &.type_2{
      width: 452px;
      .affiliates-dialog-card-main-txt{
        width: 258px;
        margin: 30px auto;
        &-main{
          font-size: 14px !important;
        }
      }
      .affiliates-dialog-card-main-confirm{
        width: 340px !important;
        margin: 0 56px !important;
      }
    }
    &-main{
      min-height: 250px;
      background: #fff;
      border-radius: 12px !important;
      box-sizing: border-box;
      padding: 20px 0 40px !important;
      &-img{
        margin: 0 auto 28px;
      }
      &-txt{
        width: 100%;
        height: 16px;
        padding: 0 !important;
        margin-bottom: 25px;
        > .v-input{
          margin: 0;
          padding: 0;
        }
        .v-input__slot{
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          > *{
            flex-grow: 0;
          }
        }
        .v-input--selection-controls__input{
          width: 14px;
          height: 14px;
          .v-input--selection-controls__ripple{
            display: none;
          }
        }
        &-main{
          font-size: 12px;
          line-height: 16px;
          color: @font-color1;
          letter-spacing: 0;
          span{
            color: @primary;
            cursor: pointer;
          }
        }
      }
      &-confirm{
        margin: 0 auto !important;
        min-width: auto !important;
        &.disabled{
          .v-btn__content{
            color: @font-color3;
          }
        }
      }
    }
  }
}
</style>
