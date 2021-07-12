<template>
  <div class="ilot-match pt-2">
    <div class="ilot-match-main d-flex d-flex justify-space-between">
      <div class="ilot-match-main-no font-weight-medium">{{itemObj.MatchSN}}</div>
      <div class="ilot-match-main-l">
        <p>{{ $moment(itemObj.ScheduleTime).format('DD/MM HH:mm') }}</p>
        <p>ID：{{itemObj.MatchID.split(':')[2]}}</p>
      </div>
      <div class="ilot-match-main-c">
        <div>
          <p class="text-truncate mb-0 text-body-2 font-weight-bold">
            {{itemObj.HomeTeam}}
          </p>
          <p class="text-truncate mb-0 text-body-2 font-weight-bold">
            {{itemObj.AwayTeam}}
          </p>
        </div>
      </div>
      <div class="ilot-match-main-r right d-flex justify-space-between pt-1" :key="mykey">
        <ClockBtn class="ilot-match-main-r-clock" :matchObj="itemObj" />
        <template v-for="(item, index) in calcList">
          <v-chip
            class="oddPoint text-caption px-0"
            label
            :color="calOn(index) ? 'primary' : 'secondary'"
            :text-color="calOn(index) ? 'white' : 'primary'"
            @click="betClick(itemObj, index)"
            :key="index"
            v-if="lastTime > 0"
          >
            <div class=" d-flex justify-space-between" style="width: 100%;">
              <span class="pl-1" v-if="index===0">1</span>
              <span class="pl-1" v-if="index===1">X</span>
              <span class="pl-1" v-if="index===2">2</span>
              <span class="pr-1">{{item}}</span>
            </div>
          </v-chip>
          <v-chip :key="index" class="oddPoint text-caption px-0 lock" disabled v-else>
            <v-icon small>mdi-lock</v-icon>
          </v-chip>
        </template>
      </div>
    </div>
    <v-divider class="mt-4"></v-divider>
  </div>
</template>

<script>
import ClockBtn from '@/components/func/clock-btn'
import { mapGetters } from 'vuex'
window.Array.prototype.remove = function(val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}
export default {
  name: 'ilot-match',
  components: {
    ClockBtn
  },
  data() {
    return {
      mykey: 1
    }
  },
  props: {
    // 是否显示右边搜索按钮
    itemObj: {
      type: Object,
      default() {
        return {}
      }
    },
    num: {
      default: 1
    },
    lastTime: {
      default: 0
    }
  },
  computed: {
    ...mapGetters(['betArr', 'gameIssueData']),
    // 计算是否选中
    calcList() {
      return [this.itemObj.HomeOdds, this.itemObj.DrawOdds, this.itemObj.AwayOdds]
    }
  },
  beforeCreate() {

  },
  created() {
  },
  mounted() {},
  methods: {
    betClick(itemObj, index) {
      let arr = this.betArr
      if (!arr[itemObj.MatchSN * 1 - 1]) {
        arr[itemObj.MatchSN * 1 - 1] = [index]
      } else if (arr[itemObj.MatchSN * 1 - 1] && arr[itemObj.MatchSN * 1 - 1].includes(index)) {
        arr[itemObj.MatchSN * 1 - 1].remove(index)
      } else if (arr[itemObj.MatchSN * 1 - 1] && !arr[itemObj.MatchSN * 1 - 1].includes(index)) {
        arr[itemObj.MatchSN * 1 - 1].push(index)
      }
      this.$store.commit('SET_BETARR', arr)
      this.mykey++
      this.$emit('ballClick')
    },
    calOn(index) {
      let flag = false
      const ind = this.itemObj.MatchSN * 1 - 1
      if (this.betArr[ind]) {
        flag = this.betArr[ind].includes(index)
      }
      return flag
    }
  }
}
</script>

<style lang="less" scoped>
.ilot-match{
  &-main{
    width: 100%;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    > div{
      flex-shrink: 0;
    }
    &-no{
      font-size: 22px;
      width: 40px;
      text-align: center;
    }
    &-l{
      width: 115px;
      box-sizing: border-box;
      padding-left: 10px;
      >p{
        text-align: left;
        margin-bottom: 0;
        font-size: 14px !important;
        color: @font-color3 !important;
        &:first-child{
          color: @font-color1 !important;
          margin-bottom: 10px;
        }
      }
    }
    &-c{
      flex-grow: 1;
      padding-left: 10px;
      > div{
        width: 180px;
        > p{
          width: 100%;
          font-size: 14px;
          color: @font-color1 !important;
          font-weight: normal !important;
          line-height: 24px !important;
        }
      }
    }
    &-r{
      align-items: center;
      &-clock{
        width: 48px;
        background: none !important;
        text-align: center;
        /deep/ button{
          margin: 0 !important;
        }
      }
      .oddPoint{
        width: 100px;
        height: 38px;
        margin-left: 5px;
        &.lock{
          border-radius: 4px !important;
          /deep/ .v-chip__content{
            justify-content: center;
            background: @dividing-line-color !important;
            i{
              font-size: 16px !important;
            }
          }
        }
        /deep/ .v-chip__content{
          width: 100%;
          padding: 0 12px;
          >div{
            justify-content: space-between;
            align-items: center;
            span{
              font-size: 14px;
              &:nth-child(1){
                font-size: 20px !important;
              }
              &:first-child{
                font-weight: 500 !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
