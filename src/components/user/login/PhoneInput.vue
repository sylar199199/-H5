<template>
  <div class="phone-input">
    <CommonInput
      class="phone-input-main"
      v-model="calcValue"
      placeholder="Mobile Number"
      :rules="rules.playerPhone"
      type="tel"
      @click:append="showPass = !showPass"
      @blur="inputBlur"
      :maxLength="maxLength"
    >
      <template v-slot:prepend-inner>
        <span class="phone-input-main-num d-block black--text font-weight-bold">+234</span>
      </template>
    </CommonInput>

    <!-- 输入提示 -->
    <InputTips class="phone-input-tips" :len="maxLength" :text="calcValue" :blCheck="blCheck" />
  </div>
</template>
<script>
import CommonInput from '@/components/common/commonInput'
import InputTips from './InputTips'
import { modelStringMixins } from '@/mixins'
export default {
  components: {
    CommonInput,
    InputTips
  },
  mixins: [modelStringMixins],
  props: {},
  data() {
    return {
      maxLength: 10,
      blCheck: false,
      rules: {
        playerPhone: [
          v => !!v || 'Phone Number is required',
          this.$rules.limitmobileNew
        ]
      }
    }
  },
  watch: {
    calcValue() {
      if (this.calcValue) {
        let str = this.value.toString().split('')
        if (str.length > 0 && str[0] === '0') {
          this.maxLength = 11
        } else {
          this.maxLength = 10
        }
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    inputBlur() {
      if (this.calcValue) this.blCheck = true
    }
  }
}
</script>

<style lang="less" scoped>
.phone-input{
  width: 100%;
  margin-top: 25px !important;
  position: relative;
  &-main{
    padding: 0 !important;
    /deep/ &-num{
      min-width: 50px;
      letter-spacing: 1px;
    }
    /deep/ .v-text-field__details{
      margin-top: 14px;
    }
  }
  &-tips{
    padding-left: 55px;
  }
}
</style>
