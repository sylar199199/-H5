<template>
  <div class="sms-code-input">
    <CommonInput
      class="sms-code-input-main"
      v-model="calcValue"
      placeholder="OTP"
      :rules="rules.verifyCode"
      :maxLength="maxLength"
      type="tel"
      @click:append="showPass = !showPass"
      @blur="inputBlur"
    >
      <template v-slot:append>
        <SmsCodeSend class="send-msg" v-bind="$attrs" />
      </template>
    </CommonInput>

    <!-- 输入提示 -->
    <InputTips class="sms-code-input-tips" :len="maxLength" :text="calcValue" :blCheck="blCheck" />
  </div>
</template>
<script>
import CommonInput from '@/components/common/commonInput'
import SmsCodeSend from './SmsCodeSend'
import InputTips from './InputTips'
import { modelStringMixins } from '@/mixins'
export default {
  components: {
    CommonInput,
    SmsCodeSend,
    InputTips
  },
  mixins: [modelStringMixins],
  data() {
    return {
      maxLength: 6,
      blCheck: false,
      rules: {
        verifyCode: [val => (val || '').length > 0 || 'This field is required']
      }
    }
  },
  created() {
  },
  methods: {
    inputBlur() {
      if (this.calcValue) this.blCheck = true
    }
  }
}
</script>

<style lang="less" scoped>
.sms-code-input{
  width: 100%;
  margin: 15px 0 0 !important;
  padding: 0 !important;
  position: relative;
  &-main{
    /deep/ .send-msg{
      height: 24px;
      line-height: 24px;
      align-self: center;
      padding: 0 10px;
      background: @primary;
      cursor: pointer;
      span{
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
}
</style>
