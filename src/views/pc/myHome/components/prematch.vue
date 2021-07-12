<template>
  <div class="prematch">
    <SportsTopIcon />

    <SportsNav class="prematch-nav" modelValue="prematch" @sportChange="sportChange" />

    <!-- 推荐国家选择 -->
    <SportsRecommended @recommendedChange="recommendedChange" ref="sportsRecommend" />

    <!--赛事列表-->
    <MatchList
      ref="btm"
      :dataArr="groupArr"
      :pushDataArr="pushDataArr"
      :preOrLive="'not_started'"
      @loadMore="loadMore"
      type="2" />
  </div>
</template>
<script>
import SportsTopIcon from '@/components/pc/sports/sportsTopIcon'
import SportsNav from '@/components/pc/sports/sportsNav'
import SportsRecommended from '@/components/pc/sports/sportsRecommended'
import MatchList from '@/components/pc/sports/matchList'
import mixins from '@/views/sports/sports/mixins'
export default {
  name: '',
  components: {
    SportsTopIcon,
    SportsNav,
    SportsRecommended,
    MatchList
  },
  mixins: [mixins],
  props: {},
  data() {
    return {
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
.prematch{
  background: #fff;
  &-nav{
    margin-top: -16px;
  }
}
</style>
