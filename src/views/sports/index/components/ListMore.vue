<template>
  <div class="listMore">
    <div class="perLine">
      <el-row>
        <el-col :span="spanNum" v-for="(item, key) in mainObj.list" :key="key">
          <span
                  :class="{'on': item.id === mainObj.onID}"
                  v-if="mainObj.more ? (key < perLineNum) : true"
                  @click="itemclick(item)">
            {{item.name}}
            <i v-if="item.num">({{item.num}})</i>
          </span>
        </el-col>
      </el-row>
      <!--<span-->
          <!--:class="{'on': item.id === mainObj.onID}"-->
          <!--v-for="(item, key) in mainObj.list"-->
          <!--v-if="mainObj.more ? (key < 3) : true"-->
          <!--:key="key"-->
          <!--@click="itemclick(item)">-->
        <!--{{item.name}}-->
        <!--<i v-if="item.num">({{item.num}})</i>-->
      <!--</span>-->
      <span v-if="mainObj.more" @click="mainObj.more=false">more<i class="el-icon-d-arrow-right"></i></span>
      <span v-else @click="mainObj.more=true"><i class="el-icon-d-arrow-left"></i>show less</span>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        mainObj: {},
        perLineNum: 3
      }
    },
    props: {
      dataObj: {
        type: Object,
        default: function () {
          return {}
        }
      },
      // 默认分三列，  对应值  两行-12   三行-8   四行-6
      spanNum: {
        type: Number,
        default: 8
      }
    },
    mounted() {
      this.mainObj = this.dataObj
      this.perLineNum = 24 / this.spanNum
    },
    methods: {
      itemclick(item) {
        this.mainObj.onID = item.id
        this.$emit('listMoreEven', item.id)
      }
    }
  }
</script>

<style lang="less" scoped>
.listMore{
  .perLine{
    word-wrap: break-word;
    word-break: keep-all;
    width: 100%;
    margin-bottom: 10px;
    font-size: 14px;
    padding-left: 20px;
    span{
      margin-right: 40px;
      color: #ffffff;
      opacity: 0.5;
      cursor: pointer;
      line-height: 22px;
      i{
        font-style: normal;
      }
    }
    span:hover{
      opacity: 1;
    }
    span.on{
      opacity: 1;
      font-weight: bold;
    }
  }
}
</style>
