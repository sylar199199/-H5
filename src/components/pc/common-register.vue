<template>
  <v-card
    class="common-register"
    height="220"
  >
    <v-card-title class="common-register-title font-weight-medium">Free Registration</v-card-title>

    <v-text-field
      class="common-register-inp"
      v-model="form.playerAccount"
      placeholder="Phone Number Or Email"
      outlined
      height="40"
      validate-on-blur
      :rules="rules.playerAccount">
    </v-text-field>

    <v-card-actions class="common-register-btn" @click="register">
      <v-btn class="common-register-btn-register text-capitalize" color="primary" block>Register</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { eventBus } from '@/utils'
export default {
  name: '',
  props: {},
  data() {
    return {
      form: {
        playerAccount: ''
      },
      rules: {
        playerAccount: [
          v => !!v || 'Phone Number / Email is required',
          this.$rules.limitaccountNew
        ],
        verifyCode: [val => (val || '').length > 0 || 'This field is required'],
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    register() {
      eventBus.emit('loginShow', 'register', this.form.playerAccount)
    }
  }
}
</script>

<style lang="less" scoped>
.common-register{
  padding: 0 10px;
  box-shadow: none !important;
  border-radius: 0;
  &-title{
    padding: 22px 0 25px;
    font-size: 16px;
    line-height: 1;
  }
  &-inp{
    margin-bottom: -2px;
    /deep/ .v-input__slot{
      min-height: auto;
    }
    /deep/ input{
      font-size: 12px;
    }
  }
  &-btn{
    padding: 0;
    &-register{
      height: 40px !important;
      box-shadow: none !important;
      /deep/ .v-btn__content{
        font-size: 16px;
      }
    }
  }
}
</style>
