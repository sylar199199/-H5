<template>
  <div style="height: 100%">
    <i-lot-toolbar @goBack="goBackSet"></i-lot-toolbar>
    <div class="transactions"
          style="height:calc(100vh - 60px); overflow-y: auto;"
          v-infinite-scroll="loadMore"
          v-infinite-scroll-disabled="loading"
          v-infinite-scroll-distance="10"
    >
      <v-simple-table>
      <template v-slot:default>
        <thead dense class="transactions-t pt-0 pb-0 ml-n2 mr-n2"  v-if="historyData.length">
          <tr dense>
            <th class="grey lighten-4 text-left">
              Date
            </th>
            <th class="grey lighten-4 text-center">
              Type
            </th>
            <th class="grey lighten-4 text-right">
              Amount(NGN)
            </th>
          </tr>
        </thead>
        <tbody class="transactions-list" v-if="historyData.length">
            <tr
              v-for="item in historyData"
              :key="item.transNo"
              class="list-item-table"
            >
              <td class="list-item-table-l text-left pl-4 pr-0">
                <p  class="mb-0 text-sm-subtitle-2 text-caption">
                  {{ item.createTime }}
                  </p>
                </td>
              <td class="list-item-table-c font-weight-medium pr-0 pl-0 text-center">
                <p class="mb-0 text-sm-subtitle-2 text-caption">
                  {{ item.transName }}
                </p></td>
              <td class="text-right pl-0 pt-0 pb-0">
                  <p class="mb-0 text-sm-subtitle-2 text-caption font-weight-bold primary--text" v-if="item.direct=== 0">+{{item.paidAmount}}</p>
                  <p class="mb-0 text-sm-subtitle-2 text-caption font-weight-bold red--text" v-else>-{{item.paidAmount}}</p>
              </td>
            </tr>
        </tbody>
        <p class="mt-16 text-center" style="width:100%" v-else>No Data!</p>
      </template>
    </v-simple-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import scroll from '@/plugs/scroll'
import { mapGetters } from 'vuex'
Vue.use(scroll)
export default {
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 20,
        total: ''
      },
      historyData: [],
      loading: false,
      blLoadAll: false
    }
  },
  components: {
  },
  created() {},
  mounted() {
    this.dataList()
  },
  computed: {
    ...mapGetters(['agentInfo'])
  },
  methods: {
    async dataList() {
      const isAgent = this.$route.name === 'pcAffiliates' // 代理人页面
      let obj = {
        data: {
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          param: {}
        }
      }
      if (isAgent) obj.token = this.agentInfo.agentToken
      const res = await this.$api[isAgent ? 'reportCommission' : 'transaction'](obj)
      if (res.code !== 0) return
      let nowList = res.data.list || []
      nowList.forEach((val, i) => {
        val.createTime = this.$moment(val.createTime).format('DD/MM/YYYY HH:mm')
        // val.paidAmount = parseFloat(val.paidAmount).toFixed(2)
        // val.balance = parseFloat(val.balance).toFixed(2)
        if (val.transType === 1) {
          val.typeName = 'deposit'
        } else if (val.transType === 2) {
          val.typeName = 'withdraw'
        } else if (val.transType === 3) {
          val.typeName = 'withhold'
        } else if (val.transType === 4) {
          val.typeName = 'drawback'
        } else if (val.transType === 5) {
          val.typeName = 'cash a prize'
        } else if (val.transType === 6) {
          val.typeName = 'error'
        }
      })
      this.historyData = this.historyData.concat(nowList)
      if (nowList.length < this.pageInfo.pageSize) {
        this.blLoadAll = true
      }
      this.loading = false
    },
    loadMore() {
      if (this.loading) return
      this.loading = true
      this.pageInfo.pageNum++
      this.dataList()
    },
    goBackSet() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  .income-color{
    color: #FF5D27;
  }
  .expend-color{
    color: #40AA49;
  }
  .list-item-table {
    /deep/ td {
      border-bottom: 0 !important;
      p {
        border-bottom: 1px solid #F5F5F5;
        line-height: 4em;
      }
    }
  }
  .transactions-t{
    th{
      height: 32px !important;
    }
  }
</style>
