<template>
  <div class="common-divider">
    <v-divider></v-divider>
    <span class="common-divider-text" v-if="text">{{ text }}</span>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      default: ''
    }
  },
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
.common-divider{
  padding: 9px 0;
  position: relative;
  &-text{
    position: absolute;
    width: auto;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 12px;
    line-height: 13px;
    padding: 0 8px;
    background: #fff;
  }
}
</style>
