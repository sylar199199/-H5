<template>
  <div class="transactions">
    <Transactions v-model="$attrs" ref="transactions" />

    <LoadMore @loadMore="loadMore" v-show="isInit && $refs.transactions && $refs.transactions.historyData.length > 0 && !$refs.transactions.blLoadAll" />

  </div>
</template>
<script>
import Transactions from '@/views/users/transactions/transactions'
import LoadMore from '@/components/pc/load-more'
export default {
  name: 'pcTransactions',
  components: {
    Transactions,
    LoadMore
  },
  props: {},
  data() {
    return {
      isInit: false
    }
  },
  created() {
  },
  mounted() {
    this.isInit = true
  },
  computed: {
  },
  methods: {
    loadMore() {
      this.$refs.transactions.loadMore()
    }
  }
}
</script>

<style lang="less" scoped>
.transactions{
  padding: 20px 0;
  background: #fff;
  /deep/ .v-toolbar{
    display: none !important;
  }
  /deep/ .transactions{
    height: auto !important;
    &-t{
      height: 36px !important;
      th{
        height: 36px !important;
        font-size: 16px;
        color: @font-color2;
      }
    }
    &-list{
      .list-item-table{
        &:first-child{
          height: 60px;
          >td{
            padding-top: 14px !important;
          }
        }
        td{
          height: 46px;
          p{
            height: 46px;
            font-size: 14px;
            line-height: 46px;
            border: none;
          }
        }
        &-l{
          p{
            color: @font-color2 !important;
          }
        }
        &-c{
          p{
            color: @font-color1;
          }
        }
        &-r{

        }
      }
    }
  }
}
</style>
