<template>
  <div class="affiliates-outer">
    <i-lot-toolbar class="affiliates-toolbar" @goBack="$router.go(-1)" v-if="type === '1'"></i-lot-toolbar>

    <div class="affiliates">
      <div class="affiliates-bg"></div>

      <v-card class="affiliates-card">
        <div class="affiliates-card-t">
          <div class="affiliates-card-tit">Commission settlement</div>
          <div class="affiliates-card-money font-weight-bold">₦{{(accountInfo.balance || 0) | fmoney}}</div>
        </div>

        <!-- 已邀请人数 -->
        <AffiliatesUsersNum class="affiliates-card-num" />

        <div class="affiliates-card-btns d-flex justify-space-between">
          <v-btn
              class="affiliates-card-btns-btn register text-capitalize"
              color="primary"
              height="40"
              outlined
              @click="withdrawals"
          >
            Withdrawals
          </v-btn>
          <v-btn
              class="affiliates-card-btns-btn transfer register text-capitalize"
              height="40"
              color="primary"
              :disabled="!accountInfo.balance || accountInfo.balance < 1"
              @click="transfer"
          >
            Transfer
          </v-btn>
        </div>
      </v-card>

      <div class="affiliates-link">
        <div class="affiliates-link-tit font-weight-medium">My exclusive link</div>
        <template v-for="(item, index) in linkList">
          <div class="affiliates-link-li" :key="item.imageFileId">
            <div class="affiliates-link-li-content d-flex">
              <v-icon size="22">{{ item.icon }}</v-icon>
              <input
                  type="text"
                  :value="item.link"
                  :ref="`inp_${index}`"
                  :disabled="blDisabled"
                  @change="this.value = item.link"
              />
            </div>
            <v-btn
                class="affiliates-link-li-copy register text-capitalize"
                width="55"
                height="32"
                color="primary"
                @click="copy(index)"
            >
              Copy
            </v-btn>
          </div>
        </template>
      </div>
    </div>

    <TransferDialog v-model="blTransferDialogShow" :accountInfo="accountInfo" @transferFinish="transferFinish" />
  </div>
</template>
<script>
import TransferDialog from './components/transfer-dialog'
import AffiliatesUsersNum from './components/affiliates-users-num'
import { mapGetters } from 'vuex'
export default {
  name: 'affiliates',
  components: {
    TransferDialog,
    AffiliatesUsersNum
  },
  props: {
    type: {
      default: '1'
    }
  },
  data() {
    return {
      accountInfo: {},
      linkList: [],
      blTransferDialogShow: false,
      blDisabled: true
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['loginInfo', 'agentInfo'])
  },
  watch: {
    agentInfo: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        if (this.agentInfo.agentToken && (!oldVal || oldVal.agentToken !== newVal.agentToken)) {
          this.linkList = [
            {id: 1, link: this.agentInfo.appShareAddr, icon: 'mdi-cloud-download-outline'},
            {id: 2, link: this.agentInfo.webShareAddr, icon: 'mdi-account-check-outline'}
          ]
          this.getAgentInfo()
        } else {
          this.agentLogin()
        }
      }
    }
  },
  methods: {
    async agentLogin() {
      await this.$store.dispatch('agentLogin')
    },
    async getAgentInfo() {
      const res = await this.$api.queryAccountInfo({
        token: this.agentInfo.agentToken,
        data: {
          playerQuery: {
            accountType: 0,
            userAccount: this.loginInfo.userAccount,
            userCode: this.loginInfo.userCode
          }
        }
      })
      if (res.code !== 0) return
      this.accountInfo = res.data || {}
    },
    withdrawals() {
      this.$router.push({
        name: 'withdraw'
      })
    },
    transfer() {
      this.blTransferDialogShow = true
    },
    copy(n) {
      this.blDisabled = false
      this.$nextTick(() => {
        const oInp = this.$refs[`inp_${n}`][0]
        oInp.select()
        document.execCommand('copy')
        oInp.blur()
        setTimeout(() => {
          this.blDisabled = true
        }, 300)
      })
    },
    transferFinish(res) {
      this.getAgentInfo() // 刷新账户余额
      // this.accountInfo = {
      //   ...this.accountInfo,
      //   ...res
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.affiliates{
  position: relative;
  padding: 50px 15px 0;
  overflow-x: hidden;
  &-bg{
    position: absolute;
    height: 100vw;
    top: calc(-100vw + 160px);
    z-index: 0;
    border-radius: 50%;
    width: 150vw;
    left: -25vw;
    background: @primary;
  }
  &-card{
    position: relative;
    z-index: 1;
    height: 178px;
    box-sizing: border-box;
    padding: 20px 20px 0;
    margin-bottom: 28px;
    >div{
      text-align: center;
      line-height: 1;
    }
    &-tit{
      font-size: 12px;
      color: @font-color2;
      margin-bottom: 10px;
    }
    &-money{
      font-size: 24px;
      margin-bottom: 20px;
    }
    &-num{
      margin-bottom: 20px;
    }
    &-btns{
      &-btn{
        width: calc(50% - 3px);
        &.transfer{
          box-shadow: none !important;
        }
      }
    }
  }
  &-link{
    &-tit{
      font-size: 15px;
      line-height: 1;
      margin-bottom: 14px;
    }
    &-li{
      display: flex;
      margin-bottom: 20px;
      &-content{
        flex-grow: 1;
        height: 32px;
        font-size: 12px;
        line-height: 32px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-right: 10px;
        background: @bg-color;
        border-radius: 4px;
        i{
          margin: 0 7px 0 6px;
        }
        input{
          flex-grow: 1;
        }
      }
      &-copy{
        box-shadow: none !important;
      }
    }
  }
}
</style>
