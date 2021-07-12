<template>
  <div class="count-down">
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    value: {
      default: 0,
      isInit: false
    },
    cutKey: {
      default: ''
    }
  },
  data() {
    return {
      beginNum: null,
      startTime: null,
      countDownTimer: null
    }
  },
  created() {
  },
  activated() {
    this.beginCountDown()
  },
  deactivated() {
    this.clearTimer()
  },
  beforeDestory() {
    this.clearTimer()
  },
  computed: {
    calcNum: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    cutKey: {
      immediate: true,
      handler() {
        this.beginCountDown(true)
      }
    }
  },
  methods: {
    beginCountDown(bl) {
      if (this.calcNum <= 0) return
      if (bl) {
        this.beginNum = this.calcNum
        this.startTime = this.getNowTime()
      }
      this.clearTimer()
      this.countDownTimer = setInterval(() => {
        if (this.calcNum <= 1) {
          this.clearTimer()
          this.$emit('cutOff')
        }
        this.calcNum = this.beginNum - (this.getNowTime() - this.startTime)
      }, 1000)
    },
    getNowTime() {
      return Math.floor(new Date().getTime() / 1000)
    },
    clearTimer() {
      if (!this.countDownTimer) return
      this.countDownTimer && clearInterval(this.countDownTimer)
      this.countDownTimer = null
    }
  }
}
</script>

<style lang="less" scoped>
.count-down{
  width: 0;
  height: 0;
  display: none;
}
</style>
