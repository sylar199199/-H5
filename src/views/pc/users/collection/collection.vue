<template>
  <div class="collection">
    <SportsNav modelValue="collection" @sportChange="sportChange" />

    <!--赛事列表-->
    <MatchList
      ref="btm"
      :dataArr="groupArr"
      :pushDataArr="pushDataArr"
      :preOrLive="'not_started'"
      :sortTimeQuery="false"
      type="2" />
  </div>
</template>
<script>
import SportsNav from '@/components/pc/sports/sportsNav'
import MatchList from '@/components/pc/sports/matchList'
import mixins from '@/views/sports/sports/mixins'
export default {
  name: '',
  components: {
    SportsNav,
    MatchList
  },
  mixins: [mixins],
  data() {
    return {
      modelValue: 'collection'
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
.collection{
  /deep/ .betting-menu-group-list-single-info-time-collection{
    display: inline-block !important;
  }
}
</style>
