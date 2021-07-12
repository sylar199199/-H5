export const modelStringMixins = {
  props: {
    value: {
      default: ''
    }
  },
  computed: {
    calcValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
