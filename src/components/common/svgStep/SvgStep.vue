<template>
  <div class="svg-step">
    <div v-html="svgData"></div>
  </div>
</template>

<script>
  export default {
    name: 'svgStep',
    props: {
      svgData: {
        type: String,
        default: ''
      }
    }
  }

</script>
