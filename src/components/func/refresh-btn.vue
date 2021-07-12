<template>
  <div class="refresh" :class="isLoading ? 'loading' : ''" @click="refresh">
    <v-icon size="18">mdi-autorenew</v-icon>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      isLoading: false
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async refresh() {
      if (this.isLoading) return
      this.isLoading = true
      try {
        await this.$store.dispatch('getLoginInfo', true)
      } finally {
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes rotate{
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
.refresh{
  cursor: pointer;
  &.loading{
    transition: all linear 0.5s;
    animation: rotate 1s linear infinite;
  }
}
</style>
