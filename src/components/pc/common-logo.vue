<template>
  <div class="common-logo" @click="toHome">
    <template v-if="top">
      <v-img width="91" height="40" src="~@/assets/img/components/pc/common-logo/logo_big.svg" style="color: #f00"></v-img>
    </template>
    <template v-else>
      <v-img width="75" height="33" src="~@/assets/img/components/pc/common-logo/logo.png"></v-img>
    </template>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    top: {
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    toHome() {
      if (this.$route.name !== 'pcHome') {
        this.$router.push({
          name: 'pcHome'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.common-logo{
  cursor: pointer;
}
</style>
