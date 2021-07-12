<template>
  <div v-if="loadStaus" class="d-flex align-center justify-center py-10">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
  export default {
    name: 'loadBlock',
    props: {
      loadStaus: {
        type: Boolean,
        default: false // false: 隐藏； true：显示
      }
    },
  }
</script>

<style scoped>

</style>
