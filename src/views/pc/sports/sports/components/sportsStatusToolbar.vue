<template>
  <ilotTabs
    class="sports-status-toolbar"
    v-bind="$attrs"
    :tabNav="tabNav"
    @checkItem="checkItem"
    ref="ilotTabs"
  />
</template>
<script>
import ilotTabs from '@/components/common/IlotTabs/IlotTabs'
import { eventBus } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  components: {
    ilotTabs
  },
  props: {
    tabNav: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      defaultTab: '1'
    }
  },
  created() {
    if (this.$route.query.type === 'details') {
      const matchType = this.$route.query.matchType
      for (let j = 0; j < this.tabNav.length; j++) {
        if (this.tabNav[j].text === matchType) {
          this.$refs.ilotTabs.tab = j
          if (j !== 0) {
            this.checkItem(this.tabNav[j])
          }
          break
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.type === 'details') {
      const matchType = this.$route.query.matchType
      for (let j = 0; j < this.tabNav.length; j++) {
        if (this.tabNav[j].text === matchType) {
          this.$refs.ilotTabs.tab = j
          if (j !== 0) {
            this.checkItem(this.tabNav[j])
          }
          break
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  watch: {
    '$route.query.searchType': {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (!newVal) return
        let obj = {}
        switch (Number(newVal)) {
          case 1:
            obj = {
              sportId: 'sr:sport:1',
              timeValue: 2
            }
            break
          case 2:
            obj = {
              sportId: 'sr:sport:1',
              timeValue: 24
            }
            break
          case 3: // 世界杯
            obj = {
              sportId: 'sr:sport:1',
              codeTourIds: ['International#sr:tournament:308'],
              tournamentId: [],
              searchName: '',
              defaultInfo: {
                countryName: 'International',
                codeTourIds: 'sr:tournament:308'
              }
            }
            break
          case 4: // NBA
            obj = {
              sportId: 'sr:sport:2',
              codeTourIds: ['USA#sr:tournament:132'],
              tournamentId: [],
              searchName: '',
              defaultInfo: {
                countryName: 'USA',
                codeTourIds: 'sr:tournament:132'
              }
            }
            break
        }
        this.$store.commit('SET_SEARCHOBJ', {...obj, blSearch: true, init: true})
        this.$router.replace({
          name: this.$route.name
        })
        if (this.$refs.ilotTabs) this.$refs.ilotTabs.tab = 0
        this.checkItem(this.tabNav[0])
      }
    }
  },
  methods: {
    checkItem(item) {
      if (!this.isLogin && item.text === 'collection') {
        eventBus.emit('loginShow', 'login')
        this.$nextTick(() => {
          this.$refs.ilotTabs.tab = this.defaultTab - 1
        })
        return
      }
      this.defaultTab = item.type
      this.$emit('checkItem', item)
    }
  }
}
</script>

<style lang="less" scoped>
.sports-status-toolbar{
  background: none !important;
  /deep/ .v-toolbar__content{
    .v-slide-group__content{
      justify-content: flex-start;
      .v-tab{
        width: auto !important;
        min-width: 160px;
        font-size: 18px !important;
        color: @font-color1;
        font-weight: 600;
        border-radius: 3px 3px 0 0;
        background: #E4E4E4;
        margin: 0 10px 0 0 !important;
        padding: 0 !important;
        &.v-tab--active{
          background: #fff;
        }
        i{
          margin-right: 10px;
        }
      }
    }
    .v-tabs-slider-wrapper{
      display: none;
    }
  }
}
</style>
