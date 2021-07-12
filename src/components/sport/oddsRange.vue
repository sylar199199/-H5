<template>
  <v-overlay
    :z-index="zIndex"
    :value="overlay"
    absolute
    class="overlay-position align-start"
  >
    <v-container class="pa-0 align-self-start" style="width: 100%">
      <OddsRangeMain v-on="$listeners" />
    </v-container>
  </v-overlay>
</template>

<script>
import OddsRangeMain from '../sport/oddsRangeMain'
export default {
  name: 'oddsRange',
  components: {
    OddsRangeMain
  },
  props: [
    'rangeState'
  ],
  data() {
    return {
      zIndex: 12,
      overlay: false
    }
  },
  created() {
    if (this.rangeState) {
      this.overlay = true
    }
  }
}
</script>

<style lang="less" scoped>
.overlay-position{
  /deep/.v-overlay__content{
    position: absolute;
    top: 0;
    width: 100%;
  }
  .v-slider--horizontal .v-slider__track-container{
    height: 6px;
  }
  .v-slider__thumb{
    width: 16px;
    height: 16px;
  }
  .v-slider__thumb:before{
    left: -10px;
    top: -10px;
  }
  /*.v-slider--horizontal{*/
  /*  margin: 0;*/
  /*}*/
}
</style>
