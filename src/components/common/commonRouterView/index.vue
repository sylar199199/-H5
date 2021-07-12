<template>
  <div class="c-router-view">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.c-router-view{
  height: 100%;
}
</style>
