<template>
  <div>
    <i-lot-toolbar @goBack="goBackSet"></i-lot-toolbar>
    <v-card class="gift-list pt-0 grey lighten-3" elevation="0">
      <div
        color=""
        flat
        dense
        class="white px-4 pb-2 d-flex justify-space-between flex-fill"
        style="width: 100%"
      >
        <v-tabs
          v-model="tab"
          align-with-title
          left
          class="pl-0 pr-0"
        >
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab
            v-for="(item, index) in tabList"
            :key="index"
            class="ml-0 pl-1 pr-1 text-sm-subtitle-1 text-subtitle-2 text-capitalize font-weight-medium"
            active-class="font-weight-bold"
          >
            <p class="mb-n3">{{ item.label }}</p>
          </v-tab>
        </v-tabs>
        <!--优惠券筛选-->
        <v-menu offset-y class="align-self-end">
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex align-center mt-3" v-bind="attrs" v-on="on">
              <span>{{selectType}}</span>
              <v-icon>mdi-menu-down</v-icon>
            </div>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in options"
              :key="index"
              @click="changeType(item)"
            >
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
       <!-- <v-spacer></v-spacer>-->
        <!--<v-select
          v-model="selectType"
          :items="options"
          item-text="label"
          item-value="value"
          return-object
          dense
          hide-details
          class="type-select mt-2 text-right"
          style="max-width: 30%"
          @change="changeType"
        ></v-select>-->
      </div>
      <v-tabs-items v-model="tab" class="tab-content-box pt-4 pl-4 pr-4 grey lighten-4">
        <v-tab-item
          v-for="n in tabList"
          :key="n.name"
        >
          <div v-if="n.list.length">
            <v-card flat v-for="(item, index) in n.list" :key="index" class="mb-4" @click="linkCoupon(item)">
              <div class="d-flex flex-no-wrap justify-start b-card">
                <div class="d-flex flex-wrap align-center primary white--text"  :class="[n.name === 'coupons' ? ' primary': 'delicate']">
                  <v-card-actions class="d-flex flex-wrap align-center text-face-value pl-4 pr-4">
                    <p class="text-h5 font-weight-medium mb-1"><span class="text-body-2">{{item.currency === 'NGN' ? '₦': item.currency}}</span> {{parseInt(item.faceValue)}}</p>
                    <!-- <p class="text-Subtitle-2 font-weight-medium mb-0">{{item.currency}}</p> -->
                  </v-card-actions>
                </div>
                <div :class="[item.showRemark ? '': '']">
                  <v-card-title
                    class="text-subtitle-2 font-weight-bold text--primary"
                    v-text="item.couponName"
                  ></v-card-title>
                  <v-card-subtitle class="text-caption text-sm-subtitle-2 text-caption pt-1 pb-2 text--disabled">
                    <!-- Valid until: -->
                    {{item.expireBeginTime}} - {{item.expireEndTime}}
                  </v-card-subtitle>
                  <v-card-text class="text-body-2 pb-2 grey--text text--darken-2" @click.stop="toggleRemark(item)">Details <v-icon :class="[item.showRemark? 'show-remark': '']">mdi-menu-down</v-icon> </v-card-text>
                </div>
                <!-- <div>
                  <v-card-actions>
                    <v-radio
                      v-model="item.isRadio"
                      class="mt-2"
                    ></v-radio>
                  </v-card-actions>
                </div> -->
              </div>
              <!--展开的详情-->
              <v-expand-transition style="width: 100%">
                <div v-html="replaceTxt(item.remark)" style="white-space: pre-wrap;" v-if="item.showRemark" class="pa-2 pl-4 text-caption remark-content">
                  <!--{{item.remark}}-->
                </div>
              </v-expand-transition>
            </v-card>
            <!-- <v-row class="mt-4 ml-0 mr-0">
              <v-btn
                color="primary"
                class="rounded-sm white--text  mb-16 text-capitalize"
                block
                large
                @click="confirm"
              >
                Confirm
              </v-btn>
            </v-row> -->
          </div>
          <div class="no-more" v-else>
            <p class="mt-16 mb-16 text-center">No data available</p>
          </div>
        </v-tab-item>
        <div class="pb-16" height="100px"></div>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'giftList',
    data() {
      return {
        items: ['Valid', 'Invalid'],
        giftData: [],
        validShow: true,
        expiredShow: true,
        options: [{
          value: 3,
          label: 'All'
        }, {
          value: 1,
          label: 'Sport'
        }, {
          value: 0,
          label: 'Lottery'
        }],
        tab: null,
        selectType: 'All',
        tabList: []
      }
    },
    components: {
    },
    created() {
      this.getGiftList(3)
    },
    mounted() {
    },
    methods: {
      // 搜索
      currentSel(selVal) {
        console.log(selVal)
        if (selVal === 1) {
        } else if (selVal === 0) {
        }
        this.getGiftList(selVal)
      },
      // 替换文字
      replaceTxt(txt) {
        let reg = new RegExp('↵', 'g')
        txt = txt.replace(reg, '<br' + '/>')
        console.log(txt)
        return txt
      },
      // 获取优惠券列表
      async getGiftList(data) {
        console.log(data)
        let typeData = {}
        this.tabList = []
        if (data === 3) {
        } else {
          typeData = {
            gameType: data
          }
        }
        const res = await this.$api.giftList({
          data: typeData
        })
        if (res.code !== 0) return
        this.giftData = res.data
        if (this.giftData.coupons !== undefined && this.giftData.coupons.length > 0) {
          this.giftData.coupons.forEach(val => {
            val.expireEndTime = this.$moment(val.expireEndTime).format('DD/MM/YYYY')
            val.expireBeginTime = this.$moment(val.expireBeginTime).format('DD/MM/YYYY')
            val.isRadio = false
            val.showRemark = false
          })
        }
        console.log(this.giftData.coupons)
        this.tabList.push({
          name: 'coupons',
          list: this.giftData.coupons,
          label: 'Valid' + '(' + this.giftData.coupons.length + ')'
        })
        if (this.giftData.expireCoupons !== undefined && this.giftData.expireCoupons.length > 0) {
          this.giftData.expireCoupons.forEach(val => {
            val.expireEndTime = this.$moment(val.expireEndTime).format('DD/MM/YYYY')
            val.expireBeginTime = this.$moment(val.expireBeginTime).format('DD/MM/YYYY')
            val.showRemark = false
          })
        }
        this.tabList.push({
          name: 'expireCoupons',
          list: this.giftData.expireCoupons,
          label: 'Invalid' + '(' + this.giftData.expireCoupons.length + ')'
        })
        console.log(this.tabList)
      },
      toggleRemark(item) {
        this.$forceUpdate()
        let state = !item.showRemark
        this.$set(item, 'showRemark', state)
      },
      changeType(val) {
        console.log(val)
        this.selectType = val.label
        this.getGiftList(val.value)
      },
      confirm() {
        console.log(1)
      },
      goBackSet() {
        this.$router.go(-1)
      },
      linkCoupon(item) {
        if (item.url) {
          // window.location.href = item.url
          window.open(item.url, '_blank')
        }
      }
    },
  }
</script>

<style lang="less" scoped>
.tab-content {
  background: #EAEBEC;
}
.b-card {
  position: relative;
  overflow: hidden;
  > div{
    &:first-child{
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      > div{
        padding: 0 !important;
      }
    }
  }
   &:before {
    position: absolute;
    left: 0;
    z-index: 1;
    display: block;
    content: '';
    width: 5px;
    height: 100%;
    background-image: -webkit-radial-gradient(circle, #e0e0e0, #e0e0e0 3px, transparent 0px, transparent 4px, transparent 22px, transparent);
    background-image: -moz-radial-gradient(circle, #e0e0e0, #e0e0e0 3px, transparent 0px, transparent 4px, transparent 22px, transparent);
    background-image: radial-gradient(circle, #e0e0e0, #e0e0e0 3px, transparent 0px, transparent 5px, transparent 22px, transparent);
    background-size: 10px 10px;
    background-repeat: repeat;
    transform: rotate(180deg);
  }
}
.text-face-value {
  position: relative;

  &>span {
    display: inline-block;
    vertical-align: bottom;
  }
}
.show-remark {
  transform: rotate(180deg);
}
.tab-content-box {
  // height: calc(100vh);
}
.type-select {
  /deep/ .v-input__slot {
    &::before, &::after {
      display: none;
    }
  }
}
.remark-content {
  border-top: 1px solid #EAEBEC;
}
.no-more{
  justify-content: center !important;
}
/deep/.theme--light.v-tabs .v-tab--active:hover::before, .theme--light.v-tabs .v-tab--active::before{
  opacity: 0;
}
</style>
