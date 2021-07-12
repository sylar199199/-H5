<template>
  <div>
    <Banner height="200" moduleCode="news" />

    <div class="hot-news mt-5" v-if="!programs.isEmpty">
      <v-row class="hot-news-top" >
        <v-col :cols="'12'">
            <v-tabs
                v-model="program"
                class="hot-news-top-tab pt-0 pb-0 ma-0"
                slider-size="3"
                height="55px">
              <v-tab
                  v-for="(programItem, programIndex) in programs"
                  :key="programIndex"
                  class="hot-news-top-tab-single text-capitalize news-tab font-weight-bold"
                  active-class="active"
                  :href="`#tab-${programIndex}`"
                  @change="changeProgram(programIndex, programItem)">
                {{ programItem.programName }}
              </v-tab>
            </v-tabs>
        </v-col>
      </v-row>

      <v-divider class="hot-news-divider"></v-divider>

      <v-tabs-items v-model="program" class="hot-news-list pb-10 lighten-4" height="100vh">
        <v-tab-item
          class="hot-news-list-single d-flex justify-space-between"
          v-for="(newsModule, moduleIndex) in newsModules"
          :key="moduleIndex"
          :value="`tab-${moduleIndex}`"
        >
          <template v-if="newsModule.newsList.length > 0 && program === `tab-${moduleIndex}`">
            <div
              class="hot-news-list-single-single d-flex justify-space-between"
              v-for="item in newsModule.newsList"
              :key="item.id"
            >
              <div class="flex-row d-flex" @click="jumpToDetail( item.id, item.programId)">
                <div class="hot-news-list-single-single-l">
                  <div class="hot-news-list-single-content mr-10 pa-0 news-title font-weight-medium" :style="{'-webkit-line-clamp':'2'}">
                    {{ item.title }}
                  </div>
                  <v-spacer></v-spacer>
                  <div class="news-content" v-html="item.content"></div>
                  <v-spacer></v-spacer>
                  <div class="news-time">{{ item.createDate | timeFormat('YYYY-MM-DD HH:mm:ss') }}</div>
                </div>
                <div class="hot-news-list-single-single-r news-image">
                  <img :src="item.titleFileUrl" width="160px" height="120px"
                       style="border-radius: 4px">
                </div>
              </div>
            </div>
            <v-btn @click="loadMore()" class="load-more font-weight-medium">MORE</v-btn>
          </template>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import Banner from '@/views/pc/components/banner'
export default {
  name: 'pcNews',
  components: { Banner },
  props: [
    'moduleName',
  ],
  data() {
    return {
      program: null,
      tabIndex: 0,
      programs: [],
      newsModules: [
        {
          pageNum: 0,
          newsList: [],
        }
      ],
      isLoading: false,
      programId: '',
      channel: ''
    }
  },
  created() {
    if (window.$isPc) {
      this.channel = 2
    } else {
      this.channel = 1
    }
    this.programId = this.$route.query.programId !== undefined ? this.$route.query.programId : ''
    this.getProgramList()
  },
  methods: {
    async getHotNewsListByModule() {
      if (this.programs.length === 0) return
      // 获取模块对应的栏目
      let tabIndex = this.tabIndex
      let res = await this.$api.getHotNewsList({
        data: {
          programId: this.programId,
          channel: this.channel,
          pageNum: '1',
          pageSize: '10'
        },
      })

      if (res.data != null && res.code === 0) {
        this.$set(this.newsModules[tabIndex], 'newsList', res.data.list || [])
        this.newsModules[tabIndex].pageNum = 1
      }
    },
    async getProgramList() {
      // 获取模块对应的栏目
      let res = await this.$api.getHotNewsProgram({
      })
      this.newsModules = []
      if (res.data != null && res.code === 0) {
        if (res.data.length > 0) {
          this.programs = [].concat(res.data, this.programs)

          for (let i = 0; i < this.programs.length; i++) {
            this.newsModules.push({
              newsList: [],
              pageNum: 1
            })
            if (this.programs[i].id.toString() === this.programId.toString()) {
              this.tabIndex = i
            }
          }
        }
        this.programId = this.programs[this.tabIndex].id
        this.program = 'tab-' + this.tabIndex.toString()
      } else {
        // console.log(res.msg)
      }
      await this.getHotNewsListByModule()
    },
    async getHotNewsModule() {
      let data = {}
      const res = await this.$api.getHotNewsModule({
        data: data,
      })
      if (res.code !== 0) return
      let hotNewsModules = res.data
      // 拼接所有的tab
      this.modules = [...hotNewsModules]
      if (this.$route.name === 'pcNews') {
        this.modules.unshift({
          moduleName: 'All',
          id: '',
          newsList: []
        })
      }
      this.tabIndex = this.$route.query.tabIndex
      if (this.tabIndex === undefined) {
        this.tabIndex = 0
        this.program = null
      } else {
        this.program = 'tab-' + this.tabIndex.toString()
      }
      await this.getProgramList()
    },
    jumpToDetail(id, programId) {
      var programName = ''
      this.programs.forEach((program, index) => {
        if (program.id === programId) {
          programName = program.programName
        }
      })
      let routeData = this.$router.resolve({
        name: 'hotNewsDetail',
        query: {hotNewsId: id, isWeb: true, isDetail: true, typeName: programName, programId: programId}
      })
      window.open(routeData.href, '_blank')
    },
    changeProgram(index, program) {
      this.tabIndex = index
      this.programId = program.id
      if (this.newsModules[index].newsList.length === 0) {
        this.getHotNewsListByModule()
      }
    },
    async loadMore() {
      let pageNum = this.newsModules[this.tabIndex].pageNum + 1
      let res = await this.$api.getHotNewsList({
        data: {
          programId: this.programs[this.tabIndex].id,
          channel: 2,
          pageNum: pageNum,
          pageSize: '10'
        }
      })
      if (res.data != null && res.code === 0 && res.data.list.length > 0) {
        let newsList = []
        newsList = newsList.concat(this.newsModules[this.tabIndex].newsList, res.data.list)
        this.newsModules[this.tabIndex].newsList = newsList
        this.newsModules[this.tabIndex].pageNum = pageNum
        // alert(this.newsModules[this.tabIndex].newsList.length)
      }
      this.isLoading = false
      this.$emit('loadOver')
    },
  }
}
</script>

<style scoped lang="less">
.hot-news{
  background-color: white;
  padding: 0 20px;
  &-list{
    &-single{
      flex-wrap: wrap;
      &-single{
        width: calc(50% - 30px);
        flex: 0 0 auto !important;
        justify-content: space-between;
        > div{
          width: 100%;
          overflow: hidden;
        }
        &-l{
          flex-grow: 1;
          overflow: hidden;
        }
        &-r{
          width: 160px;
          flex: 0 0 auto !important;
        }
      }
    }
  }
}
.news-tab {
  font-size: 16px;
  line-height: 16px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: bold;
  color: @font-color1 !important;

  &:hover {
    color: @primary !important;
  }
}

.news-content {
  line-height: 16px;
  font-size: 12px;
  color: #000000;
  margin-top: 12px;
  margin-bottom: 20px;
  height: 32px;
  opacity: 0.87;
  word-break: keep-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-right: 9px;
  -webkit-line-clamp: 2;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    color: @primary !important;
  }
  /deep/ * {
    font-size: 12px !important;
    color: @font-color1 !important;
    line-height: 16px !important;
    &:hover {
      color: @primary !important;
    }
  }
}
.news-title {
  margin-top: 40px;
  line-height: 24px;
  font-size: 16px;
  color: #000000;
  opacity: 0.87;
  word-break: keep-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-right: 9px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    color: @primary !important;
  }
}

.news-time {
  line-height: 12px;
  font-size: 12px;
  color: #000000;
  opacity: 0.38;
  margin-right: 9px;
  cursor: pointer;
  &:hover {
    color: @primary !important;
  }
}

.news-image {
  padding-top: 40px;
}

.news-line {
  background-color: #353A46;
  opacity: 0.1;
  margin-left: 16px;
  margin-right: 16px;
  height: 1px;
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

.active {
  color: @primary !important;
}

</style>
