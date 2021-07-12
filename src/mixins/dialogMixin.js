export const dialogMixin = {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      blInitShow: false
    }
  },
  computed: {
    calcShow: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    calcShow() {
      if (this.calcShow) {
        this.blInitShow = true
        setTimeout(() => {
          this.blInitShow = false
        }, 500)
      }
    }
  },
  methods: {
    hideDialog() {
      if (!this.blInitShow && this.calcShow) {
        this.calcShow = false
      }
    }
  }
}
