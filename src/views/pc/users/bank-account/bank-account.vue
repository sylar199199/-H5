<template>
  <div class="bank-account">
    <BankAccount type="2" />
  </div>
</template>
<script>
import BankAccount from '@/views/users/bankAccount/bankAccount'
export default {
  components: {
    BankAccount
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
.bank-account{
  /deep/ .v-toolbar{
    box-sizing: content-box;
    padding: 6px 0;
    border-bottom: 1px solid @dividing-line-color !important;
    .v-btn{
      display: none;
    }
    .v-toolbar__title{
      margin-left: 7px;
      font-weight: 500 !important;
    }
  }
  /deep/ .bank-account{
    padding: 30px 20px !important;
    .row--dense{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 !important;
      >div{
        width: calc(50% - 9px);
        padding: 0;
        margin: 0;
        flex: 0 0 auto;
        margin-bottom: 20px !important;
        .v-card__subtitle{
          font-size: 14px !important;
        }
      }
    }
    &-add{
      width: calc(50% - 9px);
      min-height: 80px;
      .v-btn{
        height: 100%;
        margin: 0 !important;
        &__content{
          font-size: 14px;
        }
      }
    }
  }
}
</style>
