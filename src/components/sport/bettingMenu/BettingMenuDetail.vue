<template>
  <div class="bettingMenuDetail" ref="detailBox">
    <div>
      <DetailItem
        v-for="(item, index) in dataArr"
        :source="item"
        :key="index"
        :index="index"
        :sportId="sportId"
      />
    </div>
  </div>
</template>

<script>
  import DetailItem from './DetailItem'
  export default {
    components: {
      // 'virtual-list': virtualList,
      'DetailItem': DetailItem
    },
    data() {
      return {
        showOdds: {
          '1x2': true,
          'total': true
        }
      }
    },
    computed: {

    },
    watch: {
    },
    props: {
      dataArr: {
        type: Array,
        default: function () {
          return []
        }
      },
      sportId: {
        type: String,
        default: ''
      }
    },
    mounted() {
      console.log(this.dataArr)
    }
  }
</script>

<style lang="less" scoped>
.bettingMenuDetail{
  height: 100%;
}
</style>
