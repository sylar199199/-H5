<template>
  <div class="betting-menu-recommend">
    <div class="box3Out d-flex justify-start" v-if="['1x2', 'Total', 'Winner (incl. overtime)', 'Total (incl. overtime)', 'Winner', 'Total games'].indexOf(dealDoneArr[0].marketRecommend[betType]) > -1">
      <div class="box3In d-flex justify-space-between" v-if="dealDoneArr[0].marketRecommend[betType] === '1x2'">
        <span>1</span>
        <span>X</span>
        <span>2</span>
      </div>
      <div class="box3In d-flex justify-space-between" v-if="dealDoneArr[0].marketRecommend[betType] === 'Total'">
        <span>Goal</span>
        <span>Over</span>
        <span>Under</span>
      </div>
      <!-- 篮球 网球-->
      <div class="box3In d-flex justify-space-between" v-if="['Winner (incl. overtime)', 'Winner'].includes(dealDoneArr[0].marketRecommend[betType])">
        <span style="width: 50%;max-width: none">1</span>
        <span style="width: 50%;max-width: none">2</span>
      </div>
      <div class="box3In d-flex justify-space-between" v-if="dealDoneArr[0].marketRecommend[betType] === 'Total (incl. overtime)'">
        <span>Points</span>
        <span>Over</span>
        <span>Under</span>
      </div>
      <!-- 网球-->
      <div class="box3In d-flex justify-space-between" v-if="['Total games', 'Game handicap'].includes(dealDoneArr[0].marketRecommend[betType])">
        <span>Games</span>
        <span>Over</span>
        <span>Under</span>
      </div>
    </div>
    <div class="box3Out d-flex justify-start" v-else>
      <div class="box3In d-flex justify-center">
        <span class="text-truncate" style="max-width: 100%;">{{dealDoneArr[0].marketRecommend[betType]}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    props: {
      dealDoneArr: {
        type: Array,
        default() {
          return []
        }
      },
      betType: {
        default: ''
      }
    },
    data() {
      return {
      }
    },
    watch: {
    }
  }
</script>

<style lang="less" scoped>
.betting-menu-recommend{
  width: 55%;
  .box3Out{
    width: 100% !important;
    .box3In{
      width: 100%;
      max-width: 240px;
      .box3Middle{
        width: 100%;
      }
      span{
        display: block;
        width: 100%;
        max-width: 60px;
        text-align: center;
      }
      .oddPoint{
        display: flex;
        justify-content: center;
        width: 100%;
        line-height: 30px;
        max-width: 60px;
        margin: 0px 1px 0 1px;
        height: 30px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        position: relative;
        .updown{
          position: absolute;
          top: 7px;
          right: 1px;
        }
      }
    }
  }
}
</style>
