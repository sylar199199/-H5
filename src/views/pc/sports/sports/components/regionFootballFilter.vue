<template>
  <div class="region-filter">
    <div class="region-filter-tit d-flex justify-space-between align-center">
      <span class="font-weight-medium">Region/Football</span>
      <span class="font-weight-medium">{{total}}</span>
    </div>
    <v-treeview
      v-model="selectCompetition"
      :open="initiallyOpen"
      :items="recommendCountry"
      item-key="id"
      item-text="name"
      item-children="list"
      selectable
      open-on-click
      :load-children="getCompetitionList"
      @input="selectRegion"
    >
    </v-treeview>

    <div class="region-filter-subtit font-weight-medium">A-Z</div>
    <v-treeview
      v-model="selectCompetition2"
      :items="countryFootballList"
      item-key="id"
      item-text="name"
      item-children="list"
      selectable
      open-on-click
      :load-children="getCompetitionList"
      @input="selectRegion"
    >
    </v-treeview>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  props: {},
  data() {
    return {
      recommendCountry: [], // 推荐国家/球赛列表
      countryFootballList: [], // 国家/球赛列表
      selectCompetition: [], // 选中球赛
      selectCompetition2: [], // 选中球赛
      initiallyOpen: [], // 初始打开的球赛
      notChangeTimer: null,
      total: 0,
      random: 0
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['searchObj'])
  },
  watch: {
    searchObj: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal.sportId && (!oldVal || oldVal.sportId !== newVal.sportId)) {
          this.getRecommendedCountryList(newVal.sportId)
        } else if (newVal.defaultInfo) {
          this.getDefaultSelect()
        }
        if (!newVal.codeTourIds || !newVal.codeTourIds.length) {
          this.initSelect()
        }
      }
    }
  },
  methods: {
    async getRecommendedCountryList(sportId) {
      this.total = 0
      this.recommendCountry = []
      this.countryFootballList = []
      this.initSelect()
      const res = await this.$api.getCountry({
        data: {
          sportId
        }
      })
      if (res.code !== 0) return
      let list = res.data || []
      this.handleCountryList(list)
    },
    handleCountryList(list) {
      list.map((item, index) => {
        this.total += item.matchCount
        const info = {
          id: `${item.countryCode}_${index}_${this.random}`,
          name: item.countryName + ` (${item.matchCount})`,
          countryName: item.countryName,
          list: [],
          ...item
        }
        if (Number(item.recommendCountry) === 1) {
          this.recommendCountry.push(info)
        } else {
          this.countryFootballList.push(info)
        }
      })
      this.getDefaultSelect()
    },
    async getCompetitionList(countryInfo) {
      const res = await this.$api.getTournamentInfo({
        data: {
          countryName: countryInfo.countryName,
          sportId: this.searchObj.sportId
        }
      })
      if (res.code !== 0) return
      const list = res.data || []
      list.map(item => {
        countryInfo.list.push({
          ...item,
          id: countryInfo.countryCode + '#' + item.tournamentId,
          name: item.name + ` (${item.matchCount})`
        })
      })
    },
    selectRegion(val) {
      if (!this.notChangeTimer) this.$emit('recommendedChange', [...this.selectCompetition, ...this.selectCompetition2], true)
    },
    async getDefaultSelect() {
      this.initiallyOpen = []
      if (this.searchObj.defaultInfo && this.searchObj.defaultInfo.countryName && (this.recommendCountry.length || this.countryFootballList.length)) {
        try {
          const defaultCountry = this.searchObj.defaultInfo.countryName
          const defaultTournamentId = this.searchObj.defaultInfo.codeTourIds
          let slectKey = 'selectCompetition'
          let selectCountry = this.getSelectCountry(this.recommendCountry, defaultCountry)
          if (!selectCountry) {
            selectCountry = this.getSelectCountry(this.countryFootballList, defaultCountry)
            if (selectCountry) slectKey = 'selectCompetition2'
          }
          if (!selectCountry) return
          if (!selectCountry.list.length) {
            await this.getCompetitionList(selectCountry)
          }
          this.initiallyOpen = [selectCountry.id] // 增加初始化选中列表
          for (let i = 0; i < selectCountry.list.length; i++) {
            if (defaultTournamentId === selectCountry.list[i].tournamentId) {
              this[slectKey] = [selectCountry.list[i].id]
              this.selectRegion()
              break
            }
          }
        } finally {
          this.$store.commit('SET_SEARCHOBJ', {defaultInfo: null})
        }
      }
    },
    getSelectCountry(list, name) {
      let selectCountry = null
      for (let i = 0; i < list.length; i++) {
        if (list[i].countryName === name) {
          selectCountry = list[i]
          break
        }
      }
      return selectCountry
    },
    initSelect() {
      let random
      do {
        random = Math.floor(Math.random() * 100)
      } while (random === this.random)
      this.random = random
      this.selectCompetition = []
      this.selectCompetition2 = []
      this.notChangeTimer && clearTimeout(this.notChangeTimer)
      this.notChangeTimer = setTimeout(() => {
        this.notChangeTimer = null
      }, 300)
    }
  }
}
</script>

<style lang="less" scoped>
.region-filter{
  min-height: 112px;
  background: #fff;
  padding-bottom: 60px;
  &-tit{
    padding: 20px 10px 15px !important;
    span{
      font-size: 16px !important;
      color: @font-color1;
    }
  }
  &-subtit{
    font-size: 18px;
    color: @font-color1;
    padding: 10px 10px 12px;
  }

  /deep/ .v-treeview{
    &-node{
      //height: 30px;
      &.v-treeview-node--selected{
        .v-treeview-node__label{
          color: @primary !important;
        }
      }
      >.v-treeview-node__root{
        min-height: 30px;
        .v-treeview-node__toggle{
          color: @primary;
        }
        >.v-treeview-node__checkbox{
          display: none;
        }
        .v-treeview-node__label{
          font-size: 14px;
          line-height: 22px;
          color: @font-color1;
        }
      }
      .v-treeview-node__children{
        .v-treeview-node__root{
          .v-treeview-node__level{
            display: none;
          }
        }
        .v-treeview-node__checkbox{
          display: block !important;
          margin-left: 25px;
          color: #979797;
          &.accent--text{
            color: @primary !important;
          }
        }
      }
    }
  }
}
</style>
