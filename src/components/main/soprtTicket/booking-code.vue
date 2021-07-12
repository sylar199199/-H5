<template>
  <div class="booking-code d-flex align-center">
    <span class="booking-code-tit text-sm-subtitle-2 text-caption text--secondary">Booking Code:</span>
    <strong class="booking-code-code text-sm-subtitle-1 text-subtitle-2 ml-3 font-weight-bold">{{ticketData.bookingCode}}</strong>
    <input type="" :value="ticketData.bookingCode" id="bookingCodeInput">
    <v-btn
        class="booking-code-btn copy-btn ml-3"
        icon
        color=""
        @click="copy(ticketData.bookingCode)"
    >
      <v-icon small color="black">mdi-content-copy</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    ticketData: {
      type: Object,
      default() {
        return {}
      }
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
    // 复制bookingCode
    copy(value) {
      var copycode = document.getElementById('bookingCodeInput')
      copycode.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      document.activeElement.blur()
      let msg = this.$t('betSuccess.COPY-MSG')
      this.$common.setMsg(msg, 'success')
    }
  }
}
</script>

<style lang="less" scoped>
.booking-code{
  &-code, &-btn{
    color: @primary;
  }
  &-btn{
    margin-left: 0 !important;
    i{
      color: @primary !important;
    }
  }
}
#bookingCodeInput{
  position: absolute;
  left: 0;
  opacity: 0;
}
</style>
