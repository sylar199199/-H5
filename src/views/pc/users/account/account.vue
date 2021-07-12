<template>
  <div class="account">
    <AccountInfo class="account-module" />

    <AccountEdit />
  </div>
</template>
<script>
import AccountInfo from './components/account-info'
import AccountEdit from './components/account-edit'
export default {
  components: {
    AccountInfo,
    AccountEdit
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
.account{
  .account-module{
    border-bottom: 10px solid @bg-color;
  }
}
</style>
