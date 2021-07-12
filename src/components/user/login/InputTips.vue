<template>
  <div class="input-tips d-flex align-center" :class="{'hide': calcText.length <= 0}">
    <template v-for="item in len">
      <span :key="item" :class="{primary: item <= calcText.length, error: calcText[item - 1] === ' ' || (blCheck && !calcText[item - 1]) || (calcText[item - 1] && !(Number(calcText[item - 1]) >= 0))}">
      </span>
    </template>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    len: {
      default: 10
    },
    text: {
      default: ''
    },
    blCheck: {
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    calcText() {
      return this.text || ''
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.input-tips{
  position: absolute;
  left: 0;
  top: 50px;
  &.hide{
    opacity: 0;
  }
  span{
    width: 8px;
    height: 3px;
    background: @dividing-line-color;
    border-radius: 6px;
    margin-right: 2px;
  }
}
</style>
