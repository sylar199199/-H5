<template>
  <div class="free-down">
    <div class="free-down-title font-weight-medium">Free Download</div>

    <AppDownEwm class="free-down-ewm" />

    <div class="free-down-tips">You can also download<br/>the iLot App via QR Code</div>
  </div>
</template>
<script>
import AppDownEwm from './app-down-ewm'
export default {
  name: '',
  components: {
    AppDownEwm
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
.free-down{
  height: 220px;
  background: #fff;
  box-sizing: border-box;
  padding: 22px 10px 0;
  &-title{
    font-size: 16px;
    margin-bottom: 12px;
  }
  &-ewm{
    margin: 0 auto 4px;
  }
  &-tips{
    font-size: 14px;
    color: @font-color3;
    line-height: 18px;
    text-align: center;
  }
}
</style>
