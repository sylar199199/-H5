<template>
  <component :is="componentName" v-bind="$attrs" v-on="$listeners"></component>
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
</style>
