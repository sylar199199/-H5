<template>
  <div class="appLMT">
    <Headtohead :matchId="matchId" :key="matchkey" style="width: 100%;height: 100%;"></Headtohead>
  </div>
</template>

<script>
import Headtohead from '@/components/common/headtohead'
export default {
  components: {
    Headtohead
  },
  data() {
    return {
      matchId: '24230757',
      matchkey: 1
    }
  },
  async created() {},
  mounted() {
    console.log(this.$route.query.matchId.split(':')[2])
    this.matchId = this.$route.query.matchId.split(':')[2]
    this.matchkey++
  },
  watch: {
    $route (to, from) {
      this.matchId = this.$route.query.matchId.split(':')[2]
      this.matchkey++
    }
  },
  methods: {

  }
}
</script>


<style lang="less" scoped>
  .appLMT{
    width: 100%;
    height: 100%;
    max-width: 1100px;
  }
</style>
