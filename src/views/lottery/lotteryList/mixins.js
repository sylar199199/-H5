import { mapGetters } from 'vuex'
import { eventBus } from '@/utils'

export default {
  data() {
    return {
      lotteriesList: [],
      sharedTopicList: [],
      onSaleLoadMoreCount: 0,
      gameListData: [],
      idFootball: process.env.VUE_APP_FOOTBALL_ID,
      blLoading: false
    }
  },
  mounted() {
    this.gameList()
  },
  computed: {
    ...mapGetters(['timeDif'])
  },
  methods: {
    toBuy(item) {
      window.open(item.gameUrl)
    },
    toShared(val) {
      window.open(val)
    },
    loadOver() {
      if (this.tab === 0) {
        this.onSaleLoading = false
      } else {
      }
    },
    // async sharedTopic() {
    //   const res = await this.$api.sharedTopic({})
    //   if (res.code !== 0) return
    //   this.sharedTopicList = res.data
    // },
    // 获取游戏列表
    async gameList(flag) {
      const res = await this.$api.gameList({
        data: {
          terType: 4,
          gameType: 0,
          type: 'gameList',
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      })
      if (res.code !== 0) return
      this.gameListData = res.data.list
      this.getGameInfo(res.data.list)
      if (flag) {
        console.log(flag)
        res.data.list.forEach(val => {
          if (flag === val.id) {
            let url = val.url + '?content=' + val.content
            if (this.$store.state.platformName === 'PC') {
              this.$router.push({name: 'pcIframe', query: {url}})
            } else {
              this.$router.push({name: 'iframe', query: {url}})
            }
          }
        })
      }
    },
    // 获取游戏详情
    async getGameInfo(listData) {
      let Format01 = {}
      let Format02 = []
      listData.forEach(item => {
        let obj = {
          GameID: item.id + '',
        }
        if (item.id === this.idFootball) {
          obj.PlayType = '1001'
        }
        Format02.push(obj)
      })
      const res = await this.$api.getGameInfo({
        data: {Format01, Format02}
      })
      if (res.RetCode !== '0') return
      if (this.timeDif) {
        this.handleData(res, listData)
      } else {
        eventBus.on('timeDifChange', () => {
          this.handleData(res, listData)
        })
      }
    },
    handleData(res, listData) {
      let newData = []
      res.Format02.forEach(val => {
        listData.forEach(val1 => {
          if (val1.id === parseInt(val.GameID)) {
            let obj = val1
            obj.detail = val
            obj.random = Math.floor(Math.random() * 100)
            let end = this.$moment(this.$common.toMyLocalTime(val.EndSaleTime, true)).valueOf()
            let start = parseInt(new Date().getTime())
            let saleTime = this.$moment(this.$common.toMyLocalTime(val.StartSaleTime)).valueOf()
            // obj.key = val.Issue + ‘
            obj.time = Math.floor((end - start) / 1000)
            obj.startSale = Math.floor((start - saleTime) / 1000)
            obj.key = val.Issue
            if (obj.startSale < 0) {
              obj.key = obj.key + '_' + Math.abs(obj.startSale)
            }
            newData.push(obj)
          }
        })
      })
      this.lotteriesList = newData
      this.$forceUpdate()
    },
    // 获取新的游戏详情
    async loadNewData(type, fn) {
      if (type === 'lottery') {
        if (this.blLoading) {
          eventBus.once('getGameInfo', () => {
            fn && fn()
          })
          return
        }
        this.blLoading = true
        try {
          await this.getGameInfo(this.gameListData)
        } finally {
          this.blLoading = false
          eventBus.emit('getGameInfo')
          fn && fn()
        }
      } else {
        this.gameList(type)
      }
    }
  }
}
