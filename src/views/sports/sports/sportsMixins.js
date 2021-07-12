export default {
  data() {
    return {
      tabNav: [
        {
          type: '1',
          name: 'Pre-Match',
          text: 'prematch'
        },
        {
          type: '2',
          name: 'Live',
          text: 'live'
        }
      ],
      modelValue: 'prematch'
    }
  },
  avtivated() {
    if (this.$route.params.tab) this.modelValue = this.$route.params.tab
  },
  methods: {
    checkItem(item) {
      if (this.modelValue === item.text) return
      this.modelValue = item.text
    }
  },
}
