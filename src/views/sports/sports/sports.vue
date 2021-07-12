<template>
  <div class="mySports">
    <ilotTabs class="mySports-tabs" :tabNav="tabNav" :perWidth="32" @checkItem="checkItem" :searchFlag="true" ></ilotTabs>
    <div class="pre_live">
      <Prematch v-if="modelValue === 'prematch'" />
      <Lives :modelValue="modelValue" v-if="modelValue === 'live'" />
    </div>
  </div>
</template>

<script>
  import ilotTabs from '@/components/common/IlotTabs/IlotTabs'
  import Prematch from './sportsCopy'
  import Lives from '../lives/lives'
  import sportsMixins from './sportsMixins'
  export default {
    name: 'sports',
    components: {
      Prematch,
      Lives,
      ilotTabs
    },
    mixins: [sportsMixins],
    data() {
      return {
      }
    },
    methods: {
      checkItem(item) {
        this.eventBus.$emit('closeLMT')
        if (this.modelValue === item.text) return
        this.modelValue = item.text
      }
    },
    created() {
    }
  }
</script>

<style lang="less" scoped>
.mySports{
  height: 100%;
  &-tabs{
    /deep/ .v-tab{
      white-space: nowrap;
    }
  }
  .btnBox{
    height: 48px;
    line-height: 48px;
  }
  .pre_live{
    height: calc(100% - 48px);
  }
}
</style>
