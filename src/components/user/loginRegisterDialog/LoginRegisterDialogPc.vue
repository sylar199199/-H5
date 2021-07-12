<template>
  <component
    class="login-register-dialog-pc"
    :is="componentName"
    v-bind="$attrs"
    v-on="$listeners"></component>
</template>
<script>
import loginRegisterDialogMixins from './mixins/loginRegisterDialogMixins'
export default {
  mixins: [loginRegisterDialogMixins],
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.login-register-dialog-pc{
  height: auto;
  min-height: auto;
}
</style>
