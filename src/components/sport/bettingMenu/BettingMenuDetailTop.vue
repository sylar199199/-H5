<template>
  <div class="betting-menu-detail-top" ref="detailBox">
    <div class="betting-menu-detail-top-top">
      {{matchObj.sportName}} | {{matchObj.tournamentName}} | <span>{{matchObj.homeName}} vs {{matchObj.awayName}}</span>
    </div>

    <div class="betting-menu-detail-top-back">
      <span @click="backClick"><v-icon size="30">mdi-chevron-left</v-icon>Detail</span>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    props: {
      matchObj: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
      }
    },
    methods: {
      backClick() {
        this.eventBus.$emit('closeLMT')
        this.$emit('back')
      }
    }
  }
</script>

<style lang="less" scoped>
.betting-menu-detail-top{
  &-top{
    padding: 10px 0 20px;
    font-size: 16px;
    color: @font-color1;
    background: @bg-color;
    span{
      color: @font-color3;
    }
  }
  &-back{
    height: 55px;
    font-size: 16px;
    line-height: 55px;
    border-bottom: 1px solid @dividing-line-color;
    >span{
      cursor: pointer;
    }
  }
}
</style>
