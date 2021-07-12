<template>
  <div class="betting-menu-ratio">
    <!--total情况下的 第一个元素为total分数 第二三元素为 盘口-->
    <template v-if="calcInfo.total">
      <template v-if="calcInfo.list.length > 0">
        <div class="box3In">
          <div class="box3Middle d-flex justify-space-between">
            <v-menu offset-y style="z-index: 201;">
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="oddPoint text-caption"
                    :class="{'widther': calcShowInfo.odds.length < 2}"
                    label
                    :color="false ? 'primary' : 'secondary'"
                    :text-color="false ? 'white' : 'primary'"
                >
                  {{calcShowInfo.specifiers ? calcShowInfo.specifiers.split(':"')[1].split('"')[0] : ''}}
                  <!--{{calcShowInfo.odds ? calcShowInfo.odds[0].name.split('over ')[1] : ''}}-->
                  <v-icon small color="success" class="chevron-down">mdi-chevron-down</v-icon>
                </v-chip>
              </template>
              <v-list>
                <v-list-item
                    v-for="(totalItem, totalIndex) in calcArr"
                    :key="totalIndex"
                >
                  <v-list-item-title @click="$emit('totalSClick', matchItem, totalIndex)">
                    {{totalItem.specifiers ? totalItem.specifiers.split(':"')[1].split('"')[0] : ''}}
                    <!--{{ totalItem.odds ? totalItem.odds[0].name.split('over ')[1] : '' }}-->
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-chip
              v-for="(oddsItem, oddsIndex) in calcShowInfo.odds"
              class="oddPoint text-caption"
              :class="{
                'disable': !oddsItem.odds || oddsItem.active === 0 || !calcShowInfo.status || !$store.state.globalFlag,
                'widther': calcShowInfo.odds.length < 2
              }"
              label
              :color="oddsItem.on ? 'primary' : 'secondary'"
              :text-color="oddsItem.on ? 'white' : 'primary'"
              @click="$emit('bet', matchItem, calcShowInfo, oddsItem)"
              :key="oddsIndex"
              v-if="oddsIndex < 2"
            >
              <span v-if="!oddsItem.odds || oddsItem.active === 0 || !calcShowInfo.status || !$store.state.globalFlag">
                <v-icon small>mdi-lock</v-icon>
              </span>
              <span v-else>
                {{oddsItem.odds}}
                <v-icon
                  class="updown"
                  :key="oddsItem.odds"
                  small
                  :color="oddsItem.this_last > 0 ? 'success' : 'error'"
                  v-if="Number(oddsItem.this_last)">
                {{oddsItem.this_last > 0 ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'}}
                </v-icon>
              </span>
            </v-chip>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="box3In">
          <div class="box3Middle d-flex justify-space-between">
            <v-chip
              v-for="item in 3"
              class="oddPoint text-caption disable"
              :key="item"
            >
              <span><v-icon small>mdi-lock</v-icon></span>
            </v-chip>
          </div>
        </div>
      </template>
    </template>
    <!--非total情况下的  第一二三元素为 盘口-->
    <template v-else>
      <template v-if="calcInfo.list.length > 0">
        <div class="box3In">
          <div class="box3Middle d-flex justify-space-between">
            <template v-for="(oddsItem, oddsIndex) in calcShowInfo.odds">
              <v-chip
                  class="oddPoint text-caption"
                  :class="{
                    'disable': !oddsItem.odds || oddsItem.active === 0 || !calcShowInfo.status || !$store.state.globalFlag,
                    'accent': oddsItem.empty,
                    'widther': calcShowInfo.odds.length < 3
                  }"
                  label
                  :color="oddsItem.on ? 'primary' : 'secondary'"
                  :text-color="oddsItem.on ? 'white' : 'primary'"
                  @click="$emit('bet', matchItem, calcShowInfo, oddsItem)"
                  :key="oddsIndex"
                  v-if="!oddsItem.empty"
              >
                <span v-if="!oddsItem.odds || oddsItem.active === 0 || !calcShowInfo.status || !$store.state.globalFlag">
                  <v-icon small>mdi-lock</v-icon>
                </span>
                  <span v-else>
                  {{oddsItem.odds}}
                  <v-icon
                    class="updown"
                    :key="oddsItem.odds"
                    small
                    :color="oddsItem.this_last > 0 ? 'success' : 'error'"
                    v-if="Number(oddsItem.this_last)">
                    {{oddsItem.this_last > 0 ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'}}
                  </v-icon>
                </span>
              </v-chip>
            </template>
          </div>
        </div>
      </template>
      <div class="box3In" v-else-if="type === '2' || (type === '1' && calcInfo.list.length === 0)">
        <div class="box3Middle d-flex justify-space-between">
          <v-chip
            v-for="n in calcLen"
            class="oddPoint text-caption disable"
            :class="{'widther': calcLen <= 2}"
            :key="n"
          >
            <span><v-icon small>mdi-lock</v-icon></span>
          </v-chip>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    type: {
      type: String,
      default: '1' // 1: 移动端； 2：pc端
    },
    dealDoneArr: {
      type: Array,
      default: function () {
        return []
      }
    },
    matchItem: {
      type: Object,
      default: function () {
        return {}
      }
    },
    betType: {
      default: '0'
    }
  },
  data() {
    return {
    }
  },
  beforeDestroy() {
  },
  computed: {
    ...mapGetters(['oddsRange']),
    calcBetType() {
      return this.dealDoneArr[0].marketRecommend[this.betType]
    },
    calcTotal() {
      return ['total', 'game handicap', 'total (incl. overtime)', 'total games'].includes(this.calcBetType.toLowerCase())
    },
    // 根据当前玩法类型过滤markets
    calcArr() {
      return this.matchItem.markets.filter(item => {
        return item.name === this.calcBetType && item.status
      })
    },
    calcTotalIndex() {
      return this.totalIndex()
    },
    calcInfo() {
      let info = {}
      if (this.calcTotal) {
        info.total = true
      }
      const arr = [...this.calcArr]
      info.list = arr.filter(item => {
        if (!item.odds) return false
        if (this.matchType === 'live') return true
        let findArr = item.odds.filter((item) => {
          if (this.oddsRange.length === 1 && item.odds >= this.oddsRange[0]) {
            return true
          }
          if (this.oddsRange.length === 2 && item.odds >= this.oddsRange[0] && item.odds <= this.oddsRange[1]) {
            return true
          }
        })
        return findArr.length > 0
      })
      if (info.total) {
        info.list = info.list.filter((item, index) => {
          return (this.matchItem.totalSelectIndex !== undefined ? this.matchItem.totalSelectIndex : this.calcTotalIndex) === index
        })
      }
      return info
    },
    calcShowInfo() {
      return this.calcInfo.list[0] || {}
    },
    calcLen() {
      const type = this.dealDoneArr[0].marketRecommend[this.betType]
      if (['1x2', 'Total', 'Total (incl. overtime)', 'Total games'].indexOf(type) > -1) {
        return 3
      } else if (['Winner (incl. overtime)', 'Winner'].indexOf(type) > -1) {
        return 2
      } else {
        return 1
      }
    }
  },
  methods: {
    // total分数段下拉 index定值
    totalIndex() {
      let len = 0
      this.calcArr.forEach(val => {
        if (!val.odds) return
        for (let j = 0; j < val.odds.length; j++) {
          const val2 = val.odds[j]
          if (this.oddsRange.length === 1 && val2.odds >= this.oddsRange[0]) {
            len++
            break
          }
          if (this.oddsRange.length === 2 && val2.odds >= this.oddsRange[0] && val2.odds <= this.oddsRange[1]) {
            len++
            break
          }
        }
      })
      len = Math.floor((len - 1) / 2)
      return len > 0 ? len : 0
    }
  }
}
</script>

<style lang="less" scoped>
.betting-menu-ratio{
  width: 100%;
  .box3In{
    width: 100%;
    max-width: 240px;
    .box3Middle{
      width: 100%;
    }
    span{
      display: block;
      width: 100%;
      /*max-width: 60px;*/
      /*text-align: center;*/
    }
    .oddPoint{
      display: flex;
      justify-content: center;
      width: 100%;
      line-height: 30px;
      /*max-width: 60px;*/
      margin: 0px 1px 0 1px;
      height: 30px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      position: relative;
      .chevron-down{
        position: absolute;
        top: 6px;
        right: 2px;
      }
      .updown{
        position: absolute;
        top: 7px;
        right: 1px;
        -moz-animation: cssAnimation 0s ease-in 6s forwards;
        /* Firefox */
        -webkit-animation: cssAnimation 0s ease-in 6s forwards;
        /* Safari and Chrome */
        -o-animation: cssAnimation 0s ease-in 6s forwards;
        /* Opera */
        animation: cssAnimation 0s ease-in 6s forwards;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
      }
      &.disable{
        background: @bg-color;
        background-color: @dividing-line-color !important;
        i{
          color: @font-color4;
        }
      }
    }
  }
}
@keyframes cssAnimation {
  to {
    width:0;
    height:0;
    overflow:hidden;
  }
}
@-webkit-keyframes cssAnimation {
  to {
    width:0;
    height:0;
    visibility:hidden;
  }
}
</style>
