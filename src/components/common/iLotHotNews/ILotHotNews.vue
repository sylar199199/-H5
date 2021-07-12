<template>
  <div style="background-color: white;width: 100%;" v-if="newsList.length !== 0">
    <div class="font-weight-bold" style="font-size: 15px;">Hot News</div>
    <v-list class="pa-0" style="width: 100%">
      <div v-for="(newsItem, index) in newsList" :key="index" @click="jumpToDetail(newsItem.id,newsItem)"
           style="width: 100%;">
        <div style="display: flex;flex-wrap: wrap" :style="{'padding-top': (index === 0 ? 8 : 14) + 'px'}">
          <div style="flex:1;display: flex;flex-direction: column">
            <div class="mr-6 pa-0 news-content flex: 1 font-weight-medium">
                <span v-if="newsItem.topStatus === 1"
                      class="news-tag font-weight-regular">Top</span>{{ newsItem.title }}
            </div>
            <v-spacer/>
            <div class="news-time">{{ getFormatTime(newsItem.createDate)}}</div>
          </div>
          <div style="width: 15px"></div>
            <img :src="newsItem.titleFileUrl" width="95px" height="60px" style="border-radius: 4px">
        </div>
        <div v-if="index != newsList.length -1" class="news-line pa-0"></div>
      </div>
    </v-list>
    <v-btn v-if="true" @click="loadMore()" class="load-more font-weight-medium">MORE</v-btn>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { eventTracking, eventKey } from '@/utils/fireBase'
export default {
  name: 'iLotHotNews',
  props: [
    'moduleName',
  ],
  data() {
    return {
      newsList: [],
      hotNewsModules: [],
      pageNum: 0,
      curHotNewsModule: Object,
    }
  },
  computed: {
    ...mapGetters(['platformName']),
  },
  created() {
    this.getHotNewsModule()
  },
  methods: {
    async getHotNewsProgram() {
      for (let i = 0; i < this.hotNewsModules.length; i++) {
        var hotNewsModule = this.hotNewsModules[i]
        // 匹配对应的模块
        if (hotNewsModule.moduleName === this.moduleName) {
          // 获取模块对应的栏目
          this.curHotNewsModule = hotNewsModule
          this.pageNum = 1
          let res = await this.$api.getHotNewsList({
            data: {
              moduleId: hotNewsModule.id,
              // programId: program.id,
              channel: 1,
              pageNum: this.pageNum,
              pageSize: '10'
            }
          })
          if (res.data != null && res.code === 0) {
            this.newsList = res.data.list
          }
        }
      }
    },
    async getHotNewsModule() {
      let data = {}
      const res = await this.$api.getHotNewsModule(data)
      if (res.code !== 0) return
      this.hotNewsModules = res.data
      await this.getHotNewsProgram()
    },
    jumpToDetail(id, item) {
      console.log(this.moduleName)
      console.log(item)
      let obj = {
        clickOn: item.title
      }
      // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_HOT_NEWS, this.moduleName + '_' + item.title, obj)
      this.$router.push({
        name: 'hot-news-detail', query: {hotNewsId: id, isWeb: false}
      })
    },
    async loadMore() {
      if (this.curHotNewsModule.id !== undefined) {
        let pageNum = this.pageNum + 1
        let res = await this.$api.getHotNewsList({
          data: {
            moduleId: this.curHotNewsModule.id,
            channel: 1,
            pageNum: pageNum,
            pageSize: '10'
          }
        })
        if (res.data != null && res.code === 0 && res.data.list.length > 0) {
          let newsList = []
          newsList = newsList.concat(this.newsList, res.data.list)
          this.newsList = newsList
          this.pageNum = pageNum
        }
        this.$emit('loadOver')
      } else {
        this.$emit('loadOver')
      }
    },
    getFormatTime(time) {
      return this.$moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="less" scoped>

.news-content {
  line-height: 16px;
  font-size: 13px;
  color: #000000;
  margin-bottom: 15px;
  word-break: keep-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-right: 9px;
  -webkit-line-clamp: 2;
  overflow: hidden;

  &:hover {
    color: @primary !important;
  }
}

.news-time {
  line-height: 12px;
  font-size: 10px;
  color: #000000;
  opacity: 0.38;
  margin-right: 9px;
  &:hover {
    color: @primary !important;
  }
}

.news-tag {
  line-height: 15.5px;
  background-color: #000000;
  opacity: 0.26;
  border-radius: 2px;
  width: auto;
  font-size: 8px;
  color: white;
  flex: 0;
  padding-left: 4px;
  padding-right: 4px;
  margin-right: 10px;
  text-align: center;
  display: inline-block;
}

.news-line {
  background-color: #353A46;
  opacity: 0.1;
  height: 1px;
  margin-top: 14px;
}

.load-more {
  opacity: 0.87;
  color: #000000;
  height: 40px;
  margin-top: 30px;
  font-size: 14px;
  text-align: center;
  width: 100%;
  background-color: #F3F4F6;
  box-shadow: none !important;
}
</style>

