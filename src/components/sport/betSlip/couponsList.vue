<template>
  <v-container class="pa-0" id="couponList">
    <v-btn
      class="v-size--default"
      icon
      small
      rounded
      text
      color=""
      @click="closeList"
    >
      <v-icon large>
        mdi-chevron-down
      </v-icon>
    </v-btn>
    <div class="text-left px-sm-8 px-4 mb-sm-7 mb-2 text-h6">
      {{$t('coupons.TITLE')}}
    </div>
    <p class="text-left px-sm-8 px-4 text--secondary">{{$t('coupons.AVAILABLE-COUPON')}} ( {{availableCoupon.length}} )</p>
    <!--优惠券列表-->
    <v-card
      class="grey lighten-3 rounded-0 overflow-y-auto"
      elevation="0"
      :max-height="maxHeight"
    >
      <v-list class="grey lighten-3 pa-0 coupon-list">
        <v-radio-group v-model="couponId" hide-details>
          <v-list-item
            v-for="(item, i) in availableCoupon"
            :key="i"
            :value="item"
            class="mx-4 pa-0 flex-column flex-lg-row coupon-height"
            active-class="deep-purple--text text--accent-4"
          >
            <template v-slot:default="{ active }">
              <div class="coupon-detail mb-5">
                <div class="d-flex primary align-center overflow-hidden">
                  <!--侧边圆圈-->
                  <div class="fl-circle d-flex flex-column">
                    <v-icon v-for="x in 6" :key="x" color="grey lighten-3" class="mt-n1">mdi-chat</v-icon>
                  </div>
                  <!--优惠券面值-->
                  <div class="px-4 px-sm-6 white--text">
                    <strong class="text-h4">{{parseInt(item.faceValue)}}</strong>
                    {{item.currency}}
                  </div>
                  <!--优惠券名称、时间、描述-->
                  <v-list-item-content class="white px-4 px-sm-7 text-left">
                    <p class="text-subtitle-2 font-weight-bold text-truncate mb-1 pr-4">{{item.couponName}}</p>
                    <p class="text-body-2 text-truncate mb-1">{{$t('coupons.VALID')}}: {{item.expireBeginTime}} - {{item.expireEndTime}}</p>
                    <p class="text-body-2 text-truncate text--disabled mb-0">
                      <span>{{$t('coupons.DISCOUNT-GIFT')}}</span>
                      <v-btn icon color="grey lighten-1" @click="showRemark(i)">
                        <v-icon large>mdi-menu-down</v-icon>
                      </v-btn>
                    </p>
                  </v-list-item-content>
                  <!--优惠券按钮-->
                  <v-radio
                    class="select-btn-style mr-0"
                    :value="item.couponHid"
                    color="primary"
                    @click="selectItem(item)"
                  ></v-radio>
                </div>
                <v-divider v-if="showDetail===i"></v-divider>
                <p v-if="showDetail===i" class="white text-left pa-4 text-body-2 mb-0 text--secondary remark-style">{{item.remark}}</p>
              </div>
            </template>
          </v-list-item>
        </v-radio-group>
      </v-list>
    </v-card>
    <!--确认按钮-->
    <div class="px-4 py-4">
      <v-btn class="text-capitalize align-center"
             block
             elevation="0"
             x-large
             color="primary"
             @click="selectedCoupon">
        {{$t('coupons.CONFIRM')}}
      </v-btn>
    </div>
  </v-container>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'couponsList',
    data() {
      return {
        couponId: '',
        selectedData: {},
        showDetail: '',
        oldIndex: '',
        maxHeight: 400,
      }
    },
    computed: {
      ...mapGetters(['betCoupon', 'availableCoupon']),
    },
    created() {
    },
    mounted() {
      this.setHeight()
    },
    watch: {
      betCoupon: {
        immediate: true,
        deep: true,
        handler() {
          if (this.betCoupon && this.betCoupon.couponId) {
            this.couponId = this.betCoupon.couponId
            this.selectedData = this.betCoupon
          }
        }
      }
    },
    methods: {
      ...mapMutations(['SET_COUPON', 'COUPON_LIST']),
      // 设置赔率列表的高度
      setHeight() {
        let height = document.getElementById('couponList').clientHeight
        let height1 = (window.innerHeight > 0) ? window.innerHeight : screen.height
        let min = (height1 > height) ? height - 200 : height1 * 0.9 - 200
        this.maxHeight = min
      },
      // 关闭sport优惠券列表
      closeList() {
        this.COUPON_LIST(false)
        this.$emit('closeCoupons', false,)
      },
      // 确认所选优惠券
      selectedCoupon() {
        // 保存选择的优惠券数据
        this.SET_COUPON(this.selectedData)
        // 关闭sport优惠券
        this.closeList()
      },
      // 选择优惠券
      selectItem(item) {
        // 如果当前选择的优惠券是已选择的则清空优惠券数据
        console.log(item)
        if (this.selectedData.couponId === item.couponHid) {
          this.couponId = ''
          this.selectedData = {
            status: false, // 不使用优惠券
            couponId: '',
            coupon: 0,
            couponCode: '',
          }
        } else {
          this.couponId = item.couponHid
          this.selectedData = {
            status: true, // 使用优惠券
            couponId: item.couponHid,
            coupon: item.faceValue,
            couponCode: item.couponCode,
          }
          console.log(this.selectedData)
        }
        console.log(item)
      },
      // 显示使用描述
      showRemark(val) {
        this.oldIndex = this.showDetail
        if (this.oldIndex === val) {
          this.showDetail = ''
        } else {
          this.showDetail = val
        }
        this.oldIndex = this.showDetail
      }
    }
  }
</script>

<style lang="less" scoped>
.coupon-detail{
  position: relative;
  .fl-circle{
    position: absolute;
    left: -18px;
  }
  .select-btn-style{
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
  .coupon-height{
    min-height: auto;
  }
  .remark-style{
    width: 100%;
  }
  .coupon-list{
    height: calc(70vh - 180px);
    .v-list-item:after{
      content: none;
      min-height: 0 !important;
    }
  }
</style>
