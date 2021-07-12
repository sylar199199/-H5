<template>
  <ul class="common-bottom-nav-list">
    <li class="common-bottom-nav-list-tit font-weight-medium">{{listInfo.title}}</li>
    <li class="common-bottom-nav-list-item" v-for="item in listInfo.list" :key="item.id" @click="checkDetails(item)">
      {{ item.text }}
    </li>
  </ul>
</template>
<script>
export default {
  components: {
  },
  props: {
    listInfo: {
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
    checkDetails(item) {
      if (item.to) {
        this.$router[this.$route.name === 'pcHelp' ? 'replace' : 'push']({
          name: 'pcHelp',
          query: {
            article: item.to
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.common-bottom-nav-list{
  margin-bottom: 16px;
  padding: 0;
  &-tit{
    font-size: 16px;
    color: @font-color1;
    line-height: 26px;
    margin-bottom: 3px;
  }
  &-item{
    font-size: 14px;
    color: @font-color2;
    line-height: 20px;
    padding: 10px 0;
    cursor: pointer;
  }
}
</style>
