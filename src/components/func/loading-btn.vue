<template>
  <v-btn
    :loading="blShowLoading"
    :disabled="disabled || blShowLoading"
    :width="width"
    :height="height"
    color="primary"
    class="loading-btn rounded-sm white--text text-capitalize"
    block
    large
    depressed
    @click.prevent.stop="btnClcik">
    {{ text }}
  </v-btn>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    text: {
      type: String,
      default: ''
    },
    disabled: {
      default: false
    },
    width: {
      default: ''
    },
    height: {
      default: ''
    }
  },
  data() {
    return {
      blShowLoading: false
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    btnClcik() {
      this.blShowLoading = true
      this.$emit('click', () => {
        setTimeout(() => {
          this.blShowLoading = false
        }, 500)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.loading-btn{
  /deep/ .v-btn__content{
    letter-spacing: 0;
    font-size: 15px;
    font-weight: 500;
  }
}
</style>
