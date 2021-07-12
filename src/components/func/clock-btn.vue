<template>
  <div class="clock-btn">
    <v-icon middle class="clock-btn-btn ml-4" @click="toHistory" :small="smallFlag">mdi-clock-outline</v-icon>
  </div>
</template>
<script>
// import { runingIP } from '@/api/baseConfig'
export default {
  name: '',
  components: {},
  props: {
    matchObj: {
      type: Object,
      default() {
        return {}
      }
    },
    smallFlag: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  methods: {
    // 跳转到赛事历史
    toHistory() {
      let href = window.location.href
      href = href.replace(this.$route.path, '/headtohead')
      href = href.split('?')[0]
      window.open(`${href}?matchId=${this.matchObj.matchId || this.matchObj.MatchID}`, 'name', 'height=500, width=800, toolbar=no, menubar=no, scrollbars=no, resizable=yes, location=no, status=no')
    }
  }
}
</script>

<style lang="less" scoped>
.clock-btn{
  display: inline-block;
  &-btn{
    &:before, &:after{
      color: @font-color3;
    }
  }
}
</style>
