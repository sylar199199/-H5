<template>
  <div class="sports">
    <Banner height="200" class="sports-module" moduleCode="guess" />

    <FeaturedMatch class="sports-module" :iTypeNames="iTypeNames" />

    <SportsMain />
  </div>
</template>
<script>
import Banner from '@/views/pc/components/banner'
import FeaturedMatch from '@/views/pc/components/feature-match'
import SportsMain from './components/sportsMain'
export default {
  name: 'pcSports',
  components: {
    Banner,
    FeaturedMatch,
    SportsMain
  },
  props: {},
  data() {
    return {
      iTypeNames: [ // 热门赛事类型
        {
          name: '1X2',
          type: 'prematch',
          matchType: '1X2'
        },
        {
          name: 'O/U',
          type: 'prematch',
          matchType: 'total'
        },
        {
          name: 'DC',
          type: 'prematch',
          matchType: 'DC'
        },
      ]
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
.sports{
  &-module{
    margin-bottom: 10px;
  }
}
</style>
