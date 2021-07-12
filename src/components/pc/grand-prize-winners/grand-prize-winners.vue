<template>
  <div class="winners">
    <div class="winners-tit font-weight-medium">Grand Prize Winners</div>
    <div class="winners-continer">
      <div class="winners-continer-main d-flex flex-column" :class="isScroll ? 'active' : ''">
        <template v-for="(item, index) in list">
          <GrandPrizeWinnersSingle :style="{order: index < nowActive ? index + calcLen : index}" class="winners-continer-main-single" :winnerInfo="item" :key="item.id" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import GrandPrizeWinnersSingle from './grand-prize-winners-single'
export default {
  components: {
    GrandPrizeWinnersSingle
  },
  props: {},
  data() {
    return {
      list: [],
      nowActive: 0,
      isScroll: false
    }
  },
  created() {
  },
  mounted() {
    this.getWinners()
  },
  computed: {
    calcLen() {
      return this.list.length
    }
  },
  watch: {
    isScroll() {
      if (!this.isScroll) {
        this.beginScroll()
      } else {
        setTimeout(() => {
          this.nowActive++
          if (this.nowActive > this.calcLen - 1) this.nowActive = 0
          this.isScroll = false
        }, 2000)
      }
    }
  },
  methods: {
    beginScroll() {
      setTimeout(() => {
        this.isScroll = true
      }, 3000)
    },
    async getWinners() {
      const res = await this.$api.winMessage({
        data: {
        }
      })
      if (res.code !== 0) return
      this.list = res.data || []
      if (this.calcLen > 5) {
        this.beginScroll()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.winners{
  background: #fff;
  padding-bottom: 20PX;
  &-tit{
    font-size: 16px;
    color: @font-color1;
    padding: 20px 10px;
    line-height: 1;
  }
  &-continer{
    height: 350px;
    overflow: hidden;
    &-main{
      &.active{
        transform: translateY(-72px);
        transition: all linear 1.5s;
      }
      &-single{
        margin-bottom: 10px !important;
        &:last-child{
          border: none;
        }
      }
    }
  }
}
</style>
