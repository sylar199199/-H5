<template>
  <div class="gift-select-popup" :class="calcShow ? '' : 'deactive'" v-click-outside="hideDialog">
    <couponsList />
  </div>
</template>
<script>
import couponsList from '@/components/sport/betSlip/couponsList'
import { dialogMixin } from '@/mixins'
import { mapGetters } from 'vuex'
export default {
  components: {
    couponsList
  },
  mixins: [dialogMixin],
  props: {},
  data() {
    return {
    }
  },
  created() {
    this.$store.commit('COUPON_LIST', false)
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['couponList']),
    calcShow: {
      get() {
        return this.couponList
      },
      set() {
        this.$store.commit('COUPON_LIST', false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.gift-select-popup{
  position: absolute;
  width: 388px;
  left: 356px;
  top: 0;
  z-index: 1;
  transition: all linear .3s;
  transform: translateY(-100% + 10px);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .3) !important;
  background: #fff;
  &.deactive{
    transform: translateY(100%);
    box-shadow: none !important;
  }
  /deep/ .container{
    > .v-card {
      height: calc(70vh - 200px) !important;
      max-height: none !important;
      .coupon-list{
        height: auto !important;
      }
    }
    > .v-btn{
      display: none;
    }
    > .text-h6{
      height: 55px;
      font-size: 16px;
      line-height: 55px;
      padding: 0 14px !important;
      border-bottom: 1px solid @dividing-line-color;
      margin-bottom: 0 !important;
    }
    > p{
      height: 55px;
      font-size: 16px;
      line-height: 55px;
      padding: 0 14px !important;
      margin-bottom: 0 !important;
    }
  }
}
</style>
