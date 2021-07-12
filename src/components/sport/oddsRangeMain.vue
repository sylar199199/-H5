<template>
  <v-card light class="odds-range rounded-0">
    <v-card-title class="odds-range-top flex justify-space-between py-4 px-4 px-sm-8">
      <span class="odds-range-top-title text-sm-subtitle-1 text-subtitle-2 font-weight-black">{{$t('oddsRange.TITLE')}}</span>
      <v-btn class="odds-range-close" icon color="grey lighten-1" @click="closeRange">
        <v-icon small>mdi-close-circle</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider class="odds-range-divider"></v-divider>
    <v-card-text class="odds-range-card py-4 px-sm-8 px-4">
      <div class="odds-range-card-t d-flex justify-space-between">
        <p class="odds-range-card-t-tit text-sm-subtitle-2 text-caption font-weight-black">{{$t('oddsRange.ODDS-RANGE')}}</p>
        <strong class="odds-range-card-t-text primary--text text-sm-subtitle-2 text-caption font-weight-bold">{{range[0]}} - {{range[1] === 20.5 ? $t('oddsRange.MAX') : range[1]}}
        </strong>
      </div>
      <!--滑块-->
      <v-range-slider
          v-model="range"
          :max="max"
          :min="min"
          step="0.5"
          hide-details
          track-color="grey lighten-2"
          class="odds-range-card-slider align-center"
          @change="changeRange"
      >
      </v-range-slider>
      <div class="odds-range-card-range d-flex text-sm-subtitle-2 text-caption justify-space-between font-weight-bold">
        <span class="">1</span>
        <div class="">{{$t('oddsRange.MAX')}}</div>
      </div>
    </v-card-text>
    <v-row
        no-gutters
        class="odds-range-btns px-4 px-sm-6 pt-2 pb-4"
    >
      <v-col cols="6" sm="6">
        <v-card
            class="ma-2"
            elevation="0"
            tile
        >
          <v-btn class="odds-range-btns-btn text-capitalize"
                 color="primary"
                 block
                 outlined
                 @click="clearRange">
            {{$t('oddsRange.CLEAR')}}
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="6" sm="6">
        <v-card
            class="ma-2"
            elevation="0"
            tile
        >
          <v-btn class="odds-range-btns-btn text-capitalize"
                 block
                 elevation="0"
                 color="primary"
                 @click="applyRange">
            {{$t('oddsRange.APPLY')}}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'oddsRange',
  props: [
    'rangeState'
  ],
  data() {
    return {
      min: 1,
      max: 20.5,
      range: [1, 20.5],
    }
  },
  created() {
    if (this.$store.state.oddsRange.length === 1) {
      this.range = [this.$store.state.oddsRange[0], 20.5]
    }
    if (this.$store.state.oddsRange.length === 2) {
      this.range = [this.$store.state.oddsRange[0], this.$store.state.oddsRange[1]]
    }
  },
  computed: {
    ...mapGetters(['searchObj'])
  },
  watch: {
    searchObj: {
      deep: true,
      handler(newVal, oldVal) {
        const newSearchName = newVal.searchName || ''
        const oldSearchName = oldVal.searchName || ''
        if (newVal.sportsId !== oldVal.sportsId || newSearchName !== oldSearchName) {
          this.clearRange()
        }
      }
    }
  },
  methods: {
    closeRange() {
      this.$emit('closeRange', false)
    },
    changeRange(val) {
      if (val[0] > 20) {
        val[0] = 20
      }
    },
    // 清除选择的赔率范围
    clearRange() {
      this.$set(this.range, '0', this.min)
      this.$set(this.range, '1', this.max)
      this.$store.commit('SET_ODDSRANGE', [1])
      // 关闭弹窗
      this.$emit('closeRange', false)
    },
    // 使用选择的赔率范围
    applyRange() {
      console.log('this.range', this.range)
      let arr = [this.range[0], this.range[1]]
      // 第二个数为20.5
      if (this.range[1] > 20) {
        arr = [this.range[0]]
      }
      // 第一个数为20.5
      if (this.range[0] > 20) {
        arr = [20]
      }
      this.$store.commit('SET_ODDSRANGE', arr)
      // 关闭弹窗
      this.$emit('closeRange', false)
    }
  }
}
</script>

<style lang="less" scoped>
.v-slider--horizontal .v-slider__track-container{
  height: 6px;
}
.v-slider__thumb{
  width: 16px;
  height: 16px;
}
.v-slider__thumb:before{
  left: -10px;
  top: -10px;
}
</style>
