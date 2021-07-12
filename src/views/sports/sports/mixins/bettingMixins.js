export default {
  data() {
    return {
      lmtFlag: false,
      matchInfo: {},
      matchId: '',
      eventStatus: ''
    }
  },
  mounted() {
    if (!this.$route.meta.keepAlive) {
      this.matchId = this.$route.query.searchId
      this.getMatchDetail()
    }
    // 取消详情页keepalive缓存
    this.lmtFlag = true
    this.matchId = this.$route.query.searchId
    if (this.matchInfo[this.matchId]) {
      this.simpleinitSocketio()
    } else {
      this.getMatchDetail()
    }
  },
  activated() {
  },
  deactivated() {
  },
  beforeDestroy() {
    this.$store.commit('SET_DETAILEVENTSTATUS', '')
    this.disconnect()
    this.lmtFlag = false
  },
  watch: {
    eventStatus: {
      immediate: true,
      handler() {
        this.$store.commit('SET_DETAILEVENTSTATUS', this.eventStatus)
      }
    }
  },
  computed: {
    matchObj() {
      return this.matchInfo[this.matchId] || {}
    },
    dataArr() {
      return (this.matchInfo[this.matchId] && this.matchInfo[this.matchId].markets) || []
    }
  },
  methods: {
    // 监听断开连接
    disconnect() {
      // 断开连接
      this.$socketio.off('sport_match_detail_topic_v2')
    },
    // 推送过来的数据进行处理
    makeNewOddsListMap(matchItem) {
      let newOddsMap = {
        marketIdArr: []
      }
      matchItem.markets.forEach((marketItem, i) => {
        let newmarket = this.dataArr.filter(item => marketItem.id === item.id)
        if (newmarket.length === 0) {
          // 操作补齐最后几个边框
          if (!marketItem.odds) return
          // 取消补齐 3倍数赔率
          // marketItem.showUp = marketItem.odds.length > 3
          // if (marketItem.odds.length !== 0 && marketItem.odds.length % 3 !== 0) {
          //   if (marketItem.odds.length % 3 === 1) {
          //     marketItem.odds.push({})
          //     marketItem.odds.push({})
          //   } else if (marketItem.odds.length % 3 === 2) {
          //     marketItem.odds.push({})
          //   }
          // }
          // console.log('live detail adding new market:' + marketItem.name + 'id' + marketItem.id)
          this.dataArr.push(marketItem)
        }
        if (marketItem.odds) {
          marketItem.odds.forEach((oddsItem, j) => {
            newOddsMap[oddsItem.sid] = {
              tournamentId: matchItem.tournamentId, // 联赛ID
              matchId: matchItem.matchId, // 赛事ID
              matchStatus: matchItem.eventStatus, // 赛事状态
              marketId: marketItem.marketId, // 盘口ID
              marketName: marketItem.name, // 盘口name
              marketStatus: marketItem.status, // 盘口状态
              oddsId: oddsItem.sid, // 赔率ID
              oddsActive: oddsItem.active, // 赔率状态
              odds: oddsItem.odds // 变化后赔率
            }
            newOddsMap.marketIdArr.push(marketItem.marketId)
          })
        }
      })
      return newOddsMap
    },
    // 监听赛事变化盘口数据推送
    simpleinitSocketio() {
      let obj = {
        groups: this.matchId,
        userToken: ''
      }
      // 发送消息给服务端订阅主题可用于初始化数据
      this.$socketio.emit('sport_match_detail_topic_v2', obj, (data) => {
        console.log('sports details 详情推送的数据')
        let dataObj = JSON.parse(data)
        this.eventStatus = dataObj.data.eventStatus
        let newOddsMap = this.makeNewOddsListMap(dataObj.data)
        this.dataArr.forEach((marketItem, i) => {
          if (newOddsMap.marketIdArr.indexOf(marketItem.marketId) > -1) {
            marketItem.odds.forEach((oddsItem, j) => {
              let newOddsObj = newOddsMap[oddsItem.sid]
              if (newOddsObj) {
                this.$set(marketItem, 'status', newOddsObj.marketStatus) // 设置market的状态
                // 设置odds变化前后的数值差
                let minus = newOddsObj.odds - oddsItem.odds
                this.$set(oddsItem, 'this_last', minus)
                // 设置新的odds
                this.$set(oddsItem, 'odds', newOddsObj.odds)
                // 设置market的status
                this.$set(oddsItem, 'active', newOddsObj.active)
              }
            })
          }
        })
      })
    },
    // 获取赛事详情
    async getMatchDetail() {
      const res = await this.$api.getMatchDetail({
        data: {
          id: this.matchId
        }
      })
      if (res.code === 0) {
        // 详情market 数据串场，赋值时候先清空
        this.$set(this.matchInfo, this.matchId, {})
        this.$set(this.matchInfo, this.matchId, res.data || {})
        this.eventStatus = res.data.eventStatus
        this.simpleinitSocketio()
      }
    }
  }
}
