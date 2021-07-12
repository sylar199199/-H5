<template>
  <div class="message-detail">
    <MessageDetail />
  </div>
</template>
<script>
import MessageDetail from '@/views/users/message/messageDetail'
export default {
  components: {
    MessageDetail
  },
  props: {},
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.message-detail{
  position: relative;
  /deep/ .msg-detail{
    position: relative;
    top: 0;
  }
}
</style>
