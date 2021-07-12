<template>
  <div class="recieve-error-btn" @click="goFeedback">
    Can't receive {{Number(accountType) === 1 ? 'emails' : 'verification code'}}?
  </div>
</template>
<script>
import { loginRegisterDialogMixins } from '@/mixins'
export default {
  mixins: [loginRegisterDialogMixins],
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    accountType: {
      default: 1
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async goFeedback() {
      this.$store.commit('SET_PRE_REGISTER_INFO', {...this.form, accountType: this.accountType})
      await this.loginDialogFilter('receiveEmailFail')
      this.$router.push({
        name: 'receiveEmailFail',
        query: {
          accountType: this.accountType
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.recieve-error-btn{
  font-size: 12px;
  color: @font-color2;
  cursor: pointer;
}
</style>
