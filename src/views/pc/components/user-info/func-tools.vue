<template>
  <v-card class="func-tools" :class="calcShow ? '' : 'disabled'">
    <template v-for="item in toolList">
      <div class="func-tools-tool" :key="item.id" :class="item.special ? 's' : ''" @click="onClickFunc(item)">{{item.text}}</div>
    </template>
  </v-card>
</template>
<script>
import { dialogMixin } from '@/mixins'
export default {
  components: {
  },
  mixins: [dialogMixin],
  props: {
    toolList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      blMoneyShow: false
    }
  },
  methods: {
    onClickFunc(item) {
      this.$router.push({
        name: item.to
      })
      this.calcShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.func-tools{
  position: absolute;
  width: 160px !important;
  max-width: none !important;
  top: calc(100% + 4px);
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
  z-index: 159;
  overflow: hidden;
  transition: opacity linear .3s;
  &.disabled{
    height: 0;
    opacity: 0;
    padding: 0;
  }
  &-tool{
    font-size: 14px;
    line-height: 18px;
    color: @font-color1;
    margin-bottom: 15px;
    cursor: pointer;
    &.s{
      color: @primary;
      margin-top: 30px;
    }
    &:last-child{
      margin-bottom: 0;
    }
  }
}
</style>
