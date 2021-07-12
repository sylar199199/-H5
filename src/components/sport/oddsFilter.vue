<template>
  <div style="overflow: hidden">
    <v-row
      align="center"
      class="px-sm-8 px-5 my-0 pb-sm-2 pb-0"
    >
      <v-col
        class="mr-auto pa-0 mt-2 d-flex"
        md="6"
        sm="8"
      >
        <!--选择时间-->
        <div class="select-width mr-sm-4 mr-2">
          <v-select
            :items="timeList"
            :label="$t('oddsRange.TIME')"
            item-text="timeName"
            item-value="timeValue"
            flat
            hide-details
            :height="mobileSize"
            full-width
            return-object
            outlined
            dense
            solo
            class="text-caption"
            @change="selectTime"
          ></v-select>
        </div>
        <!--选择国家-->
        <div class="select-width mr-sm-4 mr-2">
          <v-select
            :items="regionList"
            :label="$t('oddsRange.REGION')"
            placeholder="Region"
            item-text="countryName"
            item-value="countryCode"
            flat
            hide-details
            return-object
            dense
            :height="mobileSize"
            outlined
            solo
            class="text-caption"
            @change="selectRegion"
          ></v-select>
        </div>
      </v-col>
      <v-col
        cols="auto"
        class="pa-0"
      >
        <v-btn class="rounded" width="30" min-width="30" height="30" tile outlined color="grey" @click="selectRange">
          <v-icon small>mdi-tune-variant</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!--<v-divider></v-divider>-->
    <!--赔率过滤器-->
    <oddsRange v-if="rangeState" :rangeState="rangeState" @closeRange="closeRange"></oddsRange>
  </div>
</template>

<script>
  import oddsRange from '@/components/sport/oddsRange'
  import {mapGetters} from 'vuex'
  import { eventTracking, eventKey } from '@/utils/fireBase'
  export default {
    name: 'oddsFilter',
    components: {
      oddsRange,
    },
    data() {
      return {
        timeList: [],
        regionList: [],
        rangeState: false, // 赔率范围
      }
    },
    computed: {
      ...mapGetters(['searchObj', 'platformName']),
      mobileSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 16
          case 'sm': return 24
          // case 'md': return 500
          // case 'lg': return 600
          // case 'xl': return 800
          default : return 32
        }
      },
    },
    watch: {
      'searchObj': {
        handler(newValue, oldValue) {
          console.log(newValue)
          this.getCountry(newValue)
        },
        immediate: true,
        deep: true
      }
    },
    created() {
      console.log(this.searchObj)
      this.getSportTimeFilter()
    },
    mounted() {
      this.getCountry(this.searchObj)
    },
    methods: {
      // 国家列表(Region)
      async getCountry(val) {
        console.log(val.sportId)
        if (this.searchObj.sportId === undefined || this.searchObj.sportId === '') return
        const res = await this.$api.getCountry({
          data: {
            sportId: val.sportId
          }
        })
        console.log(res)
        if (res.code === 0) {
          // console.log(res.data)
          this.regionList = res.data
          this.regionList.unshift({
            countryCode: '',
            countryName: 'All'
          })
        }
      },
      // 筛选时间列表(Time)
      async getSportTimeFilter() {
        const res = await this.$api.getSportTimeFilter({
        })
        if (res.code !== 0) return
        console.log(res.data)
        this.timeList = res.data
        // this.timeObj = res.data[0]
      },
      // 选择时间
      selectTime(val) {
        let fireObj = {
          time: val
        }
         // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_SPORTS_SELECT, val, fireObj)
        console.log(val)
        this.$emit('timefilter', val.timeValue)
      },
      // 选择国家
      selectRegion(val) {
        let fireObj = {
          region: val
        }
         // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_SPORTS_SELECT, val, fireObj)
        // window._czc.push(['_trackEvent', this.platformName + '-sports', 'sportSelect', 'region'])
        if (val) {
          this.$emit('countryfilter', val.countryCode)
        } else {
          this.$emit('countryfilter', '')
        }
      },
      // 选择赔率范围
      selectRange() {
        let fireObj = {
          clickOn: 'odds'
        }
         // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_SPORTS_SELECT, 'odds', fireObj)
        this.rangeState = true
      },
      // 关闭赔率范围
      closeRange() {
        // window._czc.push(['_trackEvent', this.platformName + '-sports', 'sportSelect', 'odds'])
        this.rangeState = false
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/.select-width{
  max-width: 100px;
  min-height: 16px !important;
    .v-text-field--filled.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot, .v-text-field--filled.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot, .v-text-field--filled.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot, .v-text-field--full-width.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot, .v-text-field--full-width.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot, .v-text-field--full-width.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot, .v-text-field--outlined.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot, .v-text-field--outlined.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot, .v-text-field--outlined.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot{
      min-height: 30px;
    }
    .v-label{
      font-size: 12px;
    }
    .v-text-field--full-width.v-input--dense.v-text-field--single-line .v-label{
      top: 6px;
    }
}

</style>
