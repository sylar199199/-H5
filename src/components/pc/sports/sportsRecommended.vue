<template>
  <div class="sports-recommended" :class="{'none': !recommendedCountryList.length}">
    <v-slide-group
      class="sports-recommended-main"
      show-arrows
      outlined
    >
      <v-slide-item
        class="sports-recommended-main-single"
        :class="selectRecommend === item.tournamentId ? 'active' : ''"
        v-for="item in recommendedCountryList"
        :key="item.tournamentId"
      >
        <v-card class="sports-recommended-main-single-main d-flex justify-center align-center" @click="changeSelectCountry(item)">
          <v-card-text class="font-weight-medium">{{ item.name }}</v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  data() {
    return {
      recommendedCountryList: [
      ],
      selectRecommend: ''
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['searchObj', 'sportsSearchInfo'])
  },
  watch: {
    searchObj: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal.sportId && (!oldVal || oldVal.sportId !== newVal.sportId)) {
          this.getRecommendedCountryList(newVal.sportId)
        }
        if (!newVal.tournamentId || !newVal.tournamentId.length) {
          this.initSelect()
        }
      }
    }
  },
  methods: {
    initSelect() {
      this.selectRecommend = ''
    },
    async getRecommendedCountryList(sportId) {
      this.initSelect()
      const res = await this.$api.getTournamentRecommend({
        data: {
          sportId
        }
      })
      if (res.code !== 0) return
      this.recommendedCountryList = res.data || []
    },
    changeSelectCountry(countryInfo) {
      this.selectRecommend = countryInfo.tournamentId === this.selectRecommend ? this.initSelect() : countryInfo.tournamentId
      this.$emit('recommendedChange', this.selectRecommend ? [this.selectRecommend] : [])
    }
  }
}
</script>

<style lang="less" scoped>
.sports-recommended{
  padding: 10px 0;
  background: @bg-color;
  &.none{
    margin-bottom: 0 !important;
  }
  &-main{
    height: 100%;
    box-sizing: border-box;
    &-single{
      width: 160px;
      height: 70px;
      border-radius: 1px;
      box-sizing: border-box;
      border: 1px solid #E5E5E5;
      background: #fff;
      margin-right: 10px;
      &-main{
        box-shadow: none !important;
        .v-card__text{
          font-size: 16px;
          color: @font-color1;
          text-align: center;
          line-height: 20px;
        }
        &:last-child{
          margin-right: 0;
        }
      }
      &.active{
        border: 2px solid @primary;
      }
    }
  }
  /deep/ .v-slide-group{
    .v-slide-group__prev, .v-slide-group__next{
      position: absolute;
      width: 23px;
      min-width: auto;
      height: 35px;
      line-height: 35px;
      background: rgba(0, 0, 0, .2);
      box-sizing: border-box;
      top: 24px;
      z-index: 9;
      pointer-events: auto;
      .v-icon__svg{
        color: #fff;
      }
    }
    .v-slide-group__prev{
      padding-right: 3px;
      left: 0;
      border-radius: 0 35px 35px 0;
    }
    .v-slide-group__next{
      padding-left: 3px;
      right: 0;
      border-radius: 35px 0 0 35px;
    }
  }
}
</style>
