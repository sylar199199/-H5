<template>
  <h2 class="common-title font-weight-medium">
    {{ title }}
  </h2>
</template>
<script>
export default {
  props: {
    title: {
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
.common-title{
  font-size: 18px;
  color: @font-color1;
  text-align: center;
  line-height: 24px;
  padding: 84px 0 50px;
}
</style>
