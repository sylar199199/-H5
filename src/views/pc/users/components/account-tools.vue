<template>
  <div class="account-tools">
    <AccountFuncList type="2" />
  </div>
</template>
<script>
import AccountFuncList from '@/views/users/account/account-func-list'
export default {
  name: '',
  components: {
    AccountFuncList
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
    activeId() {

    }
  }
}
</script>

<style lang="less" scoped>
.account-tools{
  padding: 0 0 60px;
  /deep/ .account-func-list{
    padding-bottom: 0;

    > div {
      > .v-divider {
        &:last-child {
          display: none;
        }
        &:nth-last-child(3) {
          display: none;
        }
      }
    }
    .v-divider {
      &:not(.lighten-4) {
        display: none;
      }

      &.lighten-4 {
        padding-top: 24px !important;
        background-color: #fff !important;
        border: none;
      }
    }
    .v-list-item__action{
      display: none;
    }
    &-single{
      > div{
        min-height: auto !important;
      }
      .v-list-item__content{
        font-size: 16px !important;
        padding: 12px 0 !important;
      }
      .v-list-item__title{
        font-size: 16px !important;
        overflow: visible;
      }
      .v-list-item--active{
        color: @font-color1 !important;
      }
      .v-list-item__icon{
        margin: 13px 20px 13px 0 !important;
        i{
          font-size: 20px;
        }
      }
      &.active{
        i, .v-list-item__title{
          color: @primary !important;
        }
      }
      .v-divider.pt-3{
        padding-top: 20px !important;
      }
    }
    &-exit{
      width: 202px;
      height: 42px;
      margin: 30px auto 0 !important;
      padding: 0 !important;
      border: 1px solid @primary;
      border-radius: 4px;
      &::after{
        display: none;
      }
      .v-list-item__title{
        color: @primary;
      }
    }
  }
}
</style>
