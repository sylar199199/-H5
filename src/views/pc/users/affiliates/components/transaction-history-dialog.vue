<template>
  <div class="transaction-history-dialog">
    <v-dialog
      v-model="calcShow"
      attach=".transaction-history-dialog"
      transition="dialog-top-transition"
      no-click-animation
      width="464"
      max-width="80%"
    >
      <template v-slot:default="dialog">
        <v-card class="transaction-history-dialog-card d-flex flex-column">
          <div class="transaction-history-dialog-card-close d-flex align-center justify-end">
            <v-icon @click="calcShow = false">mdi-close</v-icon>
          </div>
          <div class="transaction-history-dialog-card-tit font-weight-medium text-center">Transaction history</div>
          <div class="transaction-history-dialog-card-main">
            <Transactions />
          </div>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
<script>
import Transactions from '@/views/pc/users/transactions/transactions'
import { dialogMixin } from '@/mixins'
export default {
  components: {
    Transactions
  },
  mixins: [dialogMixin],
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
.transaction-history-dialog{
  /deep/ &-card{
    height: 623px;
    max-height: 70vh;
    overflow: hidden;
    .v-toolbar{
      display: none;
    }
    &-close{
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      padding: 0 20px;
      flex-shrink: 0;
      i{
        cursor: pointer;
      }
    }
    &-tit{
      font-size: 24px;
      line-height: 1;
      padding: 15px 0 27px;
    }
    &-main{
      width: 100%;
      height: calc(100% - 126px);
      overflow-x: hidden;
      overflow-y: auto;
      .transactions{
        height: auto !important;
      }
    }
  }
}
</style>
