<template>
  <div class="bettingMenuDetail">
    <!--<div class="perItem">-->
      <!--<p class="title">1X2</p>-->
      <!--<div class="box">-->
        <!--<el-row class="boxTop">-->
          <!--<el-col :span="8">Team</el-col>-->
          <!--<el-col :span="8">Team</el-col>-->
          <!--<el-col :span="8">Team</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="8">-->
            <!--<span class="left">asdf</span>-->
            <!--<span class="right">1.22</span>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<span class="left">asdf</span>-->
            <!--<span class="right">1.22</span>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<span class="left">asdf</span>-->
            <!--<span class="right">1.22</span>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</div>-->
    <!--</div>-->
    <div class="perItem" v-for="(item, key) in dealDoneArr" :key="key">
      <p class="title">
        <i class="el-icon-arrow-down"
           @click="upDown(item)"
           v-if="item.showUp"
           style="padding: 0 5px 0 20px;cursor: pointer;"></i>
        <i class="el-icon-arrow-up"
           @click="upDown(item)"
           v-else
           style="padding: 0 5px 0 20px;cursor: pointer;"></i>
        {{item.name}}
      </p>
      <div class="box">
        <el-row class="boxTop" v-if="item.top1 || item.top2 || item.top3">
          <el-col :span="8">{{item.top1}}</el-col>
          <el-col :span="8">{{item.top2}}</el-col>
          <el-col :span="8">{{item.top3}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="item.span ? item.span : 8" v-for="(betItem, keybet) in item.odds" :key="keybet" v-if="!item.showUp || (item.showUp && ((!item.span && keybet < 3) || (item.span === 12 && keybet < 2)))">
            <el-tooltip :content="betItem.name" placement="right" effect="light">
              <span class="left">{{betItem.name}}</span>
            </el-tooltip>
            <span :class="[betItem.on ? 'on' : '', 'right']" @click="bet(betItem, item)">{{betItem.odds}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    components: {
    },
    data() {
      return {
        dealDoneArr: []
      }
    },
    computed: {
      newBetlist() {
        return this.$store.state.betList
      }
    },
    watch: {
      newBetlist(val) {
        this.dealData()
      }
    },
    props: {
      dataArr: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    mounted() {
      this.dealData()
    },
    methods: {
      ...mapMutations(['SET_BETTING']),
      dealData() {
        let arr = JSON.parse(JSON.stringify(this.dataArr))
        arr.forEach((val, i) => {
          val.odds.forEach((val1) => {
            val1.on = this.storeBetListOn(val.marketId, val1.id)
          })
        })
        this.dealDoneArr = arr
      },
      // vuex存储的投注信息，比对组件，有的值的需要高亮
      storeBetListOn(marketId, outcomeId) {
        let flag = false
        this.$store.state.betList.forEach((val, i) => {
          if (val.marketId === marketId && val.outcomeId === outcomeId) {
            flag = true
          }
        })
        return flag
      },
      bet(item, betItem) {
        console.log(item)
        console.log(betItem)
        item.on = !item.on
        let name = ''
        if (item.name === this.$route.query.name.split(' vs. ')[0]) {
          name = 'home'
        } else if (item.name === this.$route.query.name.split(' vs. ')[1]) {
          name = 'away'
        } else {
          name = item.name
        }
        let obj = {
          item: {
            matchId: this.$route.query.searchId,
            team: this.$route.query.name,
            marketId: betItem.marketId,
            marketName: betItem.name,
            name: name,
            odds: item.odds,
            team1: this.$route.query.name.split(' vs. ')[0],
            team2: this.$route.query.name.split(' vs. ')[1],
            outcomeId: item.id,
            checked: true
          },
          flag: item.on
        }
        this.SET_BETTING(obj)
      },
      upDown(item) {
        // console.log(item)
        if (item.span === 12 && item.odds.length < 3) { // 两列 少于两个 不切换下箭头
          item.showUp = true
        } else if (!item.span && item.odds.length < 4) { // 三列 少于两个 不切换下箭头
          item.showUp = true
        } else {
          item.showUp = !item.showUp
        }
      },
    },
  }
</script>

<style lang="less" scoped>
.bettingMenuDetail{
  background-color: #46495D;
  padding: 0 20px 20px;
  .perItem{
    .title{
      line-height: 40px;
      color: #fff;
      opacity: 0.5;
    }
    .box{
      background: #E5DDDB;
      color: rgba(48, 50, 66, 0.8);
      .el-col{
        height: 52px;
        line-height: 52px;
        border: 1px solid #ccc;
        padding: 0 20px;
        position: relative;
        .left{
          white-space: nowrap;
          display: inline-block;
          max-width: 58px;
          overflow: hidden;
        }
        .right{
          /*float: right;*/
          position: absolute;
          right: 5px;
          top: 0px;
          display: inline-block;
          width: 60px;
          height: 32px;
          -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          border-radius: 3px;
          background-color: rgba(64, 170, 73, 0.2);
          line-height: 32px;
          margin-top: 10px;
          text-align: center;
          cursor: pointer;
          font-weight: bold;
        }
        .right:hover{
          background-color: rgba(245, 114, 70, 1);
          color: #fff;
        }
        .on{
          background-color: rgba(245, 114, 70, 1);
          color: #fff;
        }
      }
      .boxTop{
        text-align: center;
        .el-col{
          border: 0px;
        }
      }

    }
  }
}
</style>
