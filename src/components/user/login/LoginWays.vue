<template>
  <v-tabs
    class="login-ways mb-sm-2 mb-1"
    height="40px"
    show-arrows
    v-model="calcValue"
  >
    <v-tab active-class="font-weight-bold" class="text-capitalize">Mobile</v-tab>
    <v-tab active-class="font-weight-bold" class="text-capitalize" style="order: -1;">Email</v-tab>
  </v-tabs>
</template>
<script>
import { modelStringMixins } from '@/mixins'
export default {
  name: '',
  mixins: [modelStringMixins],
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
  }
}
</script>

<style lang="less" scoped>
.login-ways{
  flex: 0 0 auto;
  padding-bottom: constant(safe-area-inset-bottom);
  /deep/ .v-slide-group__content{
    justify-content: center;
    .v-tab{
      min-width: auto !important;
      font-size: 16px !important;
      padding: 0 5px !important;
      margin: 0 32px !important;
      color: @font-color2 !important;
      &::before{
        opacity: 0 !important;
      }
      &.v-tab--active{
        color: @primary !important;
      }
    }
  }
}
</style>
