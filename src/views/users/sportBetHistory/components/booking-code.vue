<template>
  <div class="booking-code d-flex align-center">
    <span class="text--secondary text-sm-subtitle-2 text-caption">Booking Code:</span>
    <strong class="ml-3 text-sm-subtitle-1 text-subtitle-2">{{ticketData.bookingCode}}</strong>
    <input type="" :value="ticketData.bookingCode" id="bookingCodeInput">
    <v-btn
      class="copy-btn ml-3"
      icon
      color=""
      @click.stop.prevent="copy(ticketData.bookingCode)"
    >
      <v-icon color="black">mdi-content-copy</v-icon>
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
#bookingCodeInput{
  position: absolute;
  left: 0;
  opacity: 0;
}
</style>
