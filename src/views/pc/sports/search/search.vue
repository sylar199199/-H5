<template>
  <div class="search">
    <v-row class="search-row">
      <v-col class="search-row-nav">
        <SportsNav class="sports-main-nav sports-main-module" modelValue="collection" @sportChange="goSearch" />
      </v-col>
      <v-col class="search-row-main">
        <!-- 赛事列表 -->
        <MatchList
          ref="btm"
          :dataArr="groupArr"
          :pushDataArr="pushDataArr"
          :preOrLive="preOrLive"
          :matchType="matchType"
          :sortTimeQuery="sortTimeQuery"
          type="3"
          @loadMore="loadMore"
          v-show="$route.query.type !== 'details'"/>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import SportsNav from '@/components/pc/sports/sportsNav'
import MatchList from '@/components/pc/sports/matchList'
import mixins from '@/views/sports/sports/mixins'
import { mapGetters } from 'vuex'
export default {
  name: 'pcSearch',
  components: {
    SportsNav,
    MatchList
  },
  mixins: [mixins],
  props: {},
  data() {
    return {
      isSearch: true
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['searchKey', 'searchState']),
  },
  watch: {
    searchState() {
      if (this.searchState) {
        this.goSearch()
      }
    }
  },
  methods: {
    async goSearch() {
      await this.search(this.searchKey)
      setTimeout(() => {
        this.$store.commit('SET_SEARCH_STATE', false)
      }, 300)
    }
  }
}
</script>

<style lang="less" scoped>
.search{
  padding-top: 144px;
  &-row{
    justify-content: space-between;
    padding-top: 20px;
    margin: 0 !important;
    > .col{
      flex: 0 0 auto;
      margin: 0;
      padding: 0;
    }
    &-nav{
      width: 243px;
      height: 305px;;
      box-sizing: border-box;
      /deep/ .sports-nav{
        height: 100%;
        padding: 20px 30px !important;
        background: #fff;
        &-menu{
          height: auto;
          &-main{
            padding: 0 !important;
            .v-slide-group__prev, .v-slide-group__next{
              display: none;
            }
            .v-slide-group__content{
              flex-direction: column;

            }
            &-single{
              margin: 0 !important;
              p{
                text-align: left !important;
                &.primary--text{
                  span{
                    color: @primary;
                  }
                }
              }
              &:after{
                display: none;
              }
            }
          }
        }
      }
    }
    &-main{
      width: 747px;
    }
  }
}
</style>
