<template>
  <div class="sports-top-icon">
    <v-img width="109" height="29" src="~@/assets/img/components/pc/sports/icon_sports.png"></v-img>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    sportChange(...arg) {
      this.$emit('sportChange', ...arg)
    }
  }
}
</script>

<style lang="less" scoped>
.sports-top-icon{
  padding: 13px 10px 12px;
}
</style>
