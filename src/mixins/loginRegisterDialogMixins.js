import { mapGetters } from 'vuex'
export const loginRegisterDialogMixins = {
  props: {
    type: {
      type: String,
      default: '1' // 1: 移动端； 2：pc端
    }
  },
  computed: {
    ...mapGetters(['blLoginDialogShow'])
  },
  methods: {
    async loginDialogFilter(name, query = {}) {
      return new Promise(resolve => {
        if (this.blLoginDialogShow) {
          this.$emit('changeComponent', name, query)
          return
        }
        resolve()
      })
    }
  }
}
