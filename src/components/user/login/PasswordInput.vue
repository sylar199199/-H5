<template>
  <CommonInput
    class="password-input"
    v-model="calcValue"
    :placeholder="placeholder"
    :rules="rules.password"
    :appendIcon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
    :type="showPass ? 'text' : 'password'"
    @click:append="showPass = !showPass"
  />
</template>
<script>
import CommonInput from '@/components/common/commonInput'
import { modelStringMixins } from '@/mixins'
export default {
  components: {
    CommonInput
  },
  mixins: [modelStringMixins],
  props: {
    module: {
      default: 'register'
    },
    placeholder: {
      default: 'Password'
    }
  },
  data() {
    return {
      rules: {
        password: [
          val => (val || '').length > 0 || 'This field is required'
        ]
      },
      showPass: false
    }
  },
  created() {
    if (this.module === 'register') {
      this.$set(this.rules.password, '1', this.$rules.limitpassword)
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.password-input{
  width: 100%;
  margin-top: 15px !important;
  padding: 0 !important;
}
</style>
