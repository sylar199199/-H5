<template>
  <div class="time-filter">
    <div class="time-filter-tit font-weight-medium">Filter by start time</div>

    <v-slider
      class="time-filter-slider"
      v-model="nowSelect"
      :tick-labels="ticksLabels"
      min="0"
      max="2"
      step="1"
      ticks="always"
      tick-size="3"
      @change="selectTime"
    ></v-slider>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  props: {
    timeValue: {
      default: ''
    }
  },
  data() {
    return {
      blUsed: true, // 是否使用了链接参数（防止初始化异常）
      oldSelcet: 0,
      nowSelect: 2,
      ticksLabels: [
        '2 hours',
        '24 hours',
        'All'
      ],
      before: 2
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['searchObj'])
  },
  watch: {
    'searchObj.timeValue': {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        if (!newVal) {
          this.nowSelect = 2
        } else {
          this.nowSelect = Number(newVal) === 24 ? 1 : 0
        }
        this.changeNowSelect()
      }
    }
  },
  methods: {
    changeNowSelect() {
      this.selectTime(this.nowSelect)
    },
    // 选择时间
    selectTime(val) {
      if (val === this.before) return
      this.before = val
      let time = ''
      if (this.ticksLabels[val] !== 'All') {
        time = this.ticksLabels[val].split(' ')[0]
      }
      this.$emit('timefilter', time)
    }
  }
}
</script>

<style lang="less" scoped>
.time-filter{
  height: 112px;
  background: #fff;
  &-tit{
    padding: 20px 10px 15px !important;
    font-size: 16px !important;
    color: @font-color1;
  }
  /deep/ &-slider{
    padding: 0 7px;
    .v-slider__track-container{
      height: 4px;
      .v-slider__track-background{
        background-color: @font-color4 !important;
      }
    }
    .v-slider__tick{
      width: 10px !important;
      height: 10px !important;
      border-radius: 10px !important;
      box-sizing: border-box;
      border: 2px solid #979797;
      background: #FFFFFF;
      transform: translateX(-4px) translateY(-4px);
      &.v-slider__tick--filled{
        background:  @primary;
        border: none;
      }
      .v-slider__tick-label{
        font-size: 12px;
        color: @font-color2;
        padding-top: 10px;
      }
    }
    .v-slider__thumb{
      width: 10px;
      height: 10px;
    }
  }
}
</style>
