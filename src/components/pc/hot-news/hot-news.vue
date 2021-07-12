<template>
  <div class="hot-news mt-5" style="background-color: white;padding-right: 20px;padding-left: 20px">
    <v-row class="hot-news-top" justify="space-between" align="center">
      <v-col v-if="type === '2'">
        <v-img width="100" height="29" src="~@/assets/img/components/pc/hot-news/icon_hot_news.png"></v-img>
      </v-col>
      <v-col :cols="type === '2' ? 'auto' : '12'">
        <v-tabs
            class="hot-news-top-tab special pt-0 pb-0 ma-0"
            slider-size="3"
            height="55px">
          <v-tab
            class="hot-news-top-tab-single text-capitalize news-tab font-weight-medium"
            active-class="active"
            @change="changeProgram(0)">
            All
            <v-icon>mdi-chevron-right</v-icon>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-divider class="hot-news-divider"></v-divider>

    <v-tabs-items v-model="model" class="hot-news-list">
      <v-tab-item
        class="hot-news-list-single"
        value="tab-0"
      >
        <v-list class="hot-news-list-single-list  pa-0 d-flex justify-space-between" v-if="showNews.length > 0">
          <template v-for="(item, index) in showNews">
            <div
              class="hot-news-list-single-list-content mr-10 pa-0 news-title font-weight-medium"
              :title="item.title"
              :style="{'-webkit-line-clamp': '1'}"
              :key="index"
              @click="jumpToDetail(item.id, item.programId)"
            >
              {{ item.title }}
            </div>
          </template>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'hot-news',
  props: [
    'moduleName',
    'type', // default: 移动端； 2：pc端
  ],
  data() {
    return {
      model: 'tab-0',
      programs: [],
      nowModule: {},
      showNews: []
    }
  },
  mounted() {
    this.getHotNewsModule()
  },
  methods: {
    async getHotNewsModule() {
      let data = {}
      const res = await this.$api.getHotNewsModule({
        data: data,
      })
      if (res.code !== 0) return
      let hotNewsModules = res.data || []
      // 拼接所有的tab
      for (let i = 0; i < hotNewsModules.length; i++) {
        if (hotNewsModules[i].moduleName.toLowerCase() === this.moduleName.toLowerCase()) {
          this.nowModule = hotNewsModules[i]
          break
        }
      }
      if (this.nowModule.id) {
        this.getProgramList()
      }
    },
    async getProgramList() {
      // 获取模块对应的栏目
      let res = await this.$api.getHotNewsProgram({
        data: {
          moduleId: this.nowModule.id
        }
      })
      if (res && res.code === 0) {
        const programs = res.data || []
        this.programs = programs
        if (programs[0] && programs[0].id) {
          this.getHotNewsListByModule(programs[0].id)
        }
      }
    },
    async getHotNewsListByModule(id) {
      // 获取模块对应的栏目
      let res = await this.$api.getHotNewsList({
        data: {
          programId: id,
          channel: 2,
          pageNum: 1,
          pageSize: 6
        },
      })
      if (res && res.code === 0) {
        this.showNews = res.data.list || []
      }
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
    changeProgram(index, module) {
      this.$router.push({name: 'pcNews'})
    }
  }
}
</script>

<style lang="less" scoped>

</style>

