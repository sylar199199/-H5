<template>
  <div>
    <i-lot-toolbar @goBack="goBackSet"></i-lot-toolbar>
    <v-container fluid class="gameBetHistory"
      style="height: calc(100vh - 148px); overflow-y: auto;"
      v-infinite-scroll="loadMore"
      v-infinite-scroll-disabled="loading"
      v-infinite-scroll-distance="10">
      <v-row dense class="pa-2">
        <v-col
          v-for="(card, index) in historyData"
          :key="index"
          cols="12"
          class="mb-2"
        >
          <v-card light @click="linkGame(card)">
            <v-img
              :src="card.logo"
              class="white--text align-end"
              height="24vh"
            >
            <v-card-title class="card-text pb-1 pt-1">
              <p class="mb-0 text-subtitle-2 font-weight-medium title">{{card.gameName}}</p>
            </v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue'
  import scroll from '@/plugs/scroll'
  import { mapGetters } from 'vuex'
  Vue.use(scroll)
  export default {
    name: 'gameBetHistory',
    data() {
      return {
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          total: ''
        },
        historyData: [],
        loading: false
      }
    },
    components: {
    },
    computed: {
      ...mapGetters(['loginInfo']),
    },
    created() {
      this.dataList()
    },
    mounted() {
    },
    methods: {
      async dataList() {
        const res = await this.$api.gameBetList({
          // message: '查询成功',
          data: {
            pageInfo: {
              pageNum: this.pageInfo.pageNum,
              pageSize: this.pageInfo.pageSize
            },
            userId: this.loginInfo.uid
          }
        })
        if (res.code !== 0) return

        this.historyData = this.historyData.concat(res.data.list)
        this.pageInfo.total = res.data.total
        console.log(res)
        this.loading = false
      },
      loadMore() {
        if (this.loading) return
        this.loading = true
        this.pageInfo.pageNum++
        console.log('load', this.pageInfo.pageNum)
        this.dataList()
      },
      // 点击游戏
      async clickGame(val) {
        const res = await this.$api.clickGame({
          data: {
            gameId: val.id
          }
        })
        if (res.code !== 0) return
        console.log(res)
      },
      linkGame(item) {
        console.log(item)
        this.clickGame(item)
        if (!item.content) {
          this.$router.push({name: 'login'})
          // this.$common.showMsg('Please login first！', 'error')
          return false
        } else {
          window.open(`${item.url}?content=${item.content}&lang=EN`)
        }
      },
      goBackSet() {
        this.$router.go(-1)
      }
    },
  }
</script>

<style lang="less" scoped>

.card-text {
  position: relative;
  &:after {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
  &>p {
    position: relative;
    z-index: 1;
  }
}
</style>
