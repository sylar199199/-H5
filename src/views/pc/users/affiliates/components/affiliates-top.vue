<template>
  <div>
    <header class="affiliates-top d-flex justify-space-between align-center">
      <div class="affiliates-top-tit font-weight-medium">My account</div>
      <div class="affiliates-top-btn font-weight-medium" @click="blShowTransactionHistoryDialog = true">
        <v-icon size="20">mdi-file-document-multiple</v-icon>History
      </div>
    </header>

    <TransactionHistoryDialog v-model="blShowTransactionHistoryDialog" />
  </div>
</template>
<script>
import TransactionHistoryDialog from './transaction-history-dialog'
export default {
  components: {
    TransactionHistoryDialog
  },
  props: {},
  data() {
    return {
      blShowTransactionHistoryDialog: false
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
.affiliates-top{
  height: 65px;
  padding: 0 20px;
  &-tit{
    font-size: 22px;
    line-height: 25px;
  }
  &-btn{
    font-size: 16px;
    color: @primary;
    cursor: pointer;
    i{
      color: @primary;
      margin-right: 10px;
    }
  }
}
</style>
