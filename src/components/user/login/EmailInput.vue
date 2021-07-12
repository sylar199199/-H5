<template>
  <div class="email-input">
    <CommonInput
      class="email-input-main"
      v-model="calcValue"
      placeholder="Please Enter Your Email"
      :rules="rules.playerEmail"
      @blur="inputBlur"
      @update:error="changErrorType"
    />

    <div class="email-input-tips d-flex align-center" :class="{'hide': !calcValue}">
      <span class="email-input-tips-l" :class="{'active': calcValue}"></span>
      <p class="font-weight-medium" :class="{'active': calcValue.indexOf('@') !== -1, 'checked': blCheck}">@</p>
      <span class="email-input-tips-r" :class="{'active': accountState, 'checked': blCheck}"></span>
    </div>
  </div>
</template>
<script>
import CommonInput from '@/components/common/commonInput'
import { modelStringMixins } from '@/mixins'
export default {
  name: '',
  components: {
    CommonInput
  },
  mixins: [modelStringMixins],
  props: {},
  data() {
    return {
      rules: {
        playerEmail: [
          v => !!v || 'Email is required',
          this.$rules.limitemail
        ]
      },
      blCheck: false,
      accountState: false // 账号规则是否匹配
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    inputBlur() {
      if (this.calcValue) this.blCheck = true
    },
    changErrorType(bl) {
      this.accountState = !bl
    }
  }
}
</script>

<style lang="less" scoped>
.email-input{
  width: 100%;
  margin-top: 25px !important;
  position: relative;
  &-main{
    /deep/ .v-text-field__details{
      margin-top: 14px;
    }
  }
  &-tips{
    position: absolute;
    left: 0;
    top: 45px;
    &.hide{
      opacity: 0;
    }
    p{
      &.checked:not(.active) {
        color: #f44336 !important;
      }
    }
    span{
      height: 3px;
      background: @dividing-line-color;
      &.active{
        background: @primary;
      }
      &.checked:not(.active) {
        background: #f44336 !important;
        color: #f44336 !important;
      }
    }
    &-l{
      width: 50px;
    }
    &-r{
      width: 30px;
    }
    p{
      font-size: 12px;
      color: @font-color3;
      padding: 0 5px;
      margin: 0 !important;
      &.active{
        color: @primary;
      }
    }
  }
}
</style>
