<template>
  <v-text-field
    class="common-input"
    v-model.trim="calcValue"
    :placeholder="placeholder"
    required
    :height="height"
    @focus="rules"
    :rules="rules"
    :disabled="!!disabled"
    :type="type"
    :append-icon="appendIcon"
    :maxLength="maxLength"
    @update:error="changErrorState"
    @click:append="$emit('click:append')"
  >
    <template v-slot:prepend-inner>
      <slot name="prepend-inner"></slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </v-text-field>
</template>
<script>
import { modelStringMixins } from '@/mixins'
export default {
  name: '',
  mixins: [modelStringMixins],
  props: {
    rules: {
      type: Array,
      default() {
        return []
      }
    },
    placeholder: {
      default: ''
    },
    height: {
      default: 42
    },
    disabled: {
      default: false
    },
    type: {
      default: 'text'
    },
    appendIcon: {
      default: ''
    },
    maxLength: {
      default: ''
    }
  },
  data() {
    return {
      errorState: false // 账号规则是否匹配
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    changErrorState(bl) {
      this.errorState = !bl
      this.$emit('update:error', bl)
    }
  }
}
</script>

<style lang="less" scoped>
.common-input{
  padding: 0 !important;
  margin: 0 !important;
  &:not(.error--text){
    /deep/ .v-input__slot{
      transition: all linear .3s;
      margin-bottom: 0;
    }
    /deep/ .v-text-field__details{
      transition: all linear .3s;
      margin: 0 !important;
      padding: 0 !important;
      height: 0 !important;
      min-height: 0 !important;
    }
  }
  /deep/ .v-input__control{
    input{
      letter-spacing: 1px;
      &::placeholder{
        font-size: 14px !important;
        color: @font-color4 !important;
      }
    }
    .v-input__slot{
      &::before{
        border-color: rgba(0, 0, 0, .12) !important;
      }
    }
  }
  /deep/ .v-input__append-inner, /deep/ .v-input__prepend-inner{
    align-self: center;
    margin: 0 !important;
  }
}
</style>
