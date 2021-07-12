<template>
  <LoadingBtn
    class="load-more rounded-sm"
    text="MORE"
    @click="loadMore"
  />
</template>
<script>
import LoadingBtn from '@/components/func/loading-btn'
export default {
  components: {
    LoadingBtn
  },
  props: {
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    async loadMore(fn) {
      if (this.isLoading) return
      await this.$emit('loadMore')
      fn && fn()
    }
  }
}
</script>

<style lang="less" scoped>
.load-more{
  width: calc(100% - 20px) !important;
  min-width: auto !important;
  height: 40px;
  text-align: center;
  background-color: @bg-color !important;
  margin: 20px 10px 0;
  cursor: pointer;
  &.primary.v-btn{
    background-color: @bg-color !important;
  }
  /deep/ .v-btn__content{
    font-size: 14px !important;
    color: @font-color1 !important;
    font-weight: 500 !important;
  }
}
</style>
