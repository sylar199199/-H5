import { debounce, throttle } from '@/utils'
import {mapGetters, mapMutations} from 'vuex'
export default {
  data() {
    return {
      plcTime: '',
      matchIds: [], // 监听的比赛id数组
      countryCode: '',
      timeValue: '',
      count: 0,
      pageSize: 20,
      loading: false,
      groupArr: [],
      pushDataArr: [],
      sortTimeQuery: true,
      blRecommend: false, // 是否顶部推荐赛事
      queryLeagues: [], // 联赛列表
      preOrLive: '',
      matchType: '',
      searchName: '',
      newMatchTime: '',
    }
  },
  mounted() {
    // 加上收藏的 收藏按钮监听， 页面有缓存的情况下 做监听
    this.eventBus.$on('collectionChange', (data) => {
      this.groupArr.forEach((val) => {
        val.matchList.forEach((val1) => {
          if (val1.matchId === data.matchId) {
            val1.isLike = data.isLike
          }
        })
      })
    })
  },
  activated() {
    if (this.groupArr.length) {
      this.initSocketio()
    }
  },
  deactivated() {
    this.stopListen()
  },
  beforeDestroy() {
    this.stopListen()
  },
  computed: {
    ...mapGetters(['sportsSearchInfo', 'searchObj'])
  },
  watch: {
    searchObj: {
      deep: true,
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.sortTimeQuery = true
          this.count = 0
          this.groupArr = []
          this.SET_SPORTLOAD(true)
          this.initData()
        }
      }
    }
  },
  methods: {
    ...mapMutations(['SET_SPORTLOAD']),
    initData: debounce(function () {
      if (this.searchObj.sportId) {
        this.beforeQueryMatch()
      } else {
        this.SET_SPORTLOAD(false)
      }
    }, 500),
    // 模块切换
    moduleChange() {
      this.timeValue = ''
    },
    // 赛事类型切换
    sportChange() {
      if (this.searchObj.sportId) {
        this.$store.commit('SET_SEARCHOBJ', {sportId: this.searchObj.sportId, init: true})
      }
    },
    // 暂停监听
    stopListen() {
      // 发送消息给服务端订阅主题可用于初始化数据
      this.$socketio.off('sport_pls_topic_v2', 'sports_v2')
      // 断开连接
      // this.$socketio.off('sport_new_live_match_topic_v2')
    },
    // 时间过滤
    timefilter(val) {
      this.$store.commit('SET_SEARCHOBJ', {searchName: '', timeValue: val})
    },
    // 国家过滤
    countryfilter(val) {
      this.$store.commit('SET_SEARCHOBJ', {searchName: '', countryCode: val})
    },
    // 联赛过滤
    recommendedChange(val, bl) {
      if (bl) {
        this.$store.commit('SET_SEARCHOBJ', {
          searchName: '',
          tournamentId: [],
          codeTourIds: val
        })
      } else {
        this.$store.commit('SET_SEARCHOBJ', {
          searchName: '',
          tournamentId: val,
          codeTourIds: []
        })
      }
    },
    async search(searchName) {
      this.$store.commit('SET_SEARCHOBJ', {
        searchName: searchName,
        sportId: this.searchObj.sportId,
        init: true
      })
    },
    loadMore: throttle(function () {
      if (this.loading) return
      if (!this.sortTimeQuery) return // 数据为空  1分钟内不要加载
      this.SET_SPORTLOAD(true)
      this.loading = true
      this.count++
      this.beforeQueryMatch(true)
    }, 1000),
    async beforeQueryMatch(isLoadMore = false) {
      this.stopListen()
      if (!this.searchObj.sportId) return
      if (!isLoadMore) this.back && this.back()
      if (this.searchObj.searchName) {
        await this.searchList({...this.searchObj, modelValue: this.modelValue})
      } else {
        await this.queryMatch({...this.searchObj, modelValue: this.modelValue})
      }
      setTimeout(() => {
        this.SET_SPORTLOAD(false)
      }, 200)
    },
    plsAccetp(data) {
      let _this = this
      let dataObj = JSON.parse(data)
      // 避免重复触发
      if (_this.plcTime === dataObj.time) {
        return
      } else {
        _this.plcTime = dataObj.time
      }
      this.pushDataArr = dataObj.data
    },
    // live新加比赛监听
    simpleinitSocketioNewmatch() {
      let _this = this
      let str = 'newLive#' + (this.$store.state.searchObj.sportId ? this.$store.state.searchObj.sportId : '')
      let obj = {
        groups: str,
        userToken: ''
      }
      // 发送消息给服务端订阅主题可用于初始化数据
      _this.$socketio.emit('sport_new_live_match_topic_v2', JSON.stringify(obj), (data) => {
        // 接收服务端消息
        let dataObj = JSON.parse(data)
        if (_this.newMatchTime === dataObj.time) {
          return
        } else {
          _this.newMatchTime = dataObj.time
        }
        // let localtime = new Date().getTime()
        // window.ilotSocket.sport_new_live_match_topic.count = window.ilotSocket.sport_new_live_match_topic.count + 1
        // let minu = localtime - dataObj.time
        // if (minu > 3000) {
        //   window.ilotSocket.sport_new_live_match_topic.over3 = window.ilotSocket.sport_new_live_match_topic.over3 + 1
        // } else if (minu > 2000) {
        //   window.ilotSocket.sport_new_live_match_topic.over2 = window.ilotSocket.sport_new_live_match_topic.over2 + 1
        //   window.ilotSocket.sport_new_live_match_topic.over3 = window.ilotSocket.sport_new_live_match_topic.over3 + 1
        // } else if (minu > 1000) {
        //   window.ilotSocket.sport_new_live_match_topic.over1 = window.ilotSocket.sport_new_live_match_topic.over1 + 1
        //   window.ilotSocket.sport_new_live_match_topic.over2 = window.ilotSocket.sport_new_live_match_topic.over2 + 1
        //   window.ilotSocket.sport_new_live_match_topic.over3 = window.ilotSocket.sport_new_live_match_topic.over3 + 1
        // }
        let arr = dataObj.data
        // 判断是否有 这场比赛就不用添加
        let have = false
        _this.groupArr.forEach((val1) => {
          val1.matchList.forEach((val2) => {
            if (val2.matchId === arr[0].matchList[0].matchId) {
              have = true
            }
          })
        })
        if (have) return
        // 不属于本sports类型
        if (arr[0].matchList[0].sportId !== this.$store.state.searchObj.sportId) return
        // this.matchkey++
        arr[0].matchKey = JSON.stringify(arr[0].matchId)
        let haveGroup = false
        // 假如有存在的联赛组 插入到联赛组内
        _this.groupArr.forEach((valG) => {
          if (valG.tournamentName === arr[0].tournamentName) {
            valG.matchList.unshift(arr[0].matchList[0])
            haveGroup = true
          }
        })
        // 没有存在联赛组，插入联赛组到最前面
        if (!haveGroup) {
          _this.groupArr.unshift(arr[0])
        }
        // this.groupArr.push(arr[0])
        _this.initSocketio()
      })
    },
    // 数据推送
    initSocketio() {
      let _this = this
      _this.groupArr.forEach((val1) => {
        val1.matchList.forEach((val2) => {
          _this.matchIds.push(val2.matchId)
        })
      })
      if (_this.matchIds.length === 0) return
      let obj = {
        groups: _this.matchIds.join(','),
        userToken: ''
      }
      console.log(_this.groupArr)
      // 发送消息给服务端订阅主题可用于初始化数据
      _this.$socketio.emit('sport_pls_topic_v2', obj, function (data) {
        // 接收服务端消息
        _this.plsAccetp(data)
      }, 'sports_v2')
    },
    // 赛事列表(PreMatch/Live)
    async queryMatch(defaultSearchObj) {
      if (this.modelValue === 'collection') {
        this.preOrLive = ''
        this.matchType = 'live'
        this.getLikeList(defaultSearchObj)
        return
      }
      const data = {
        countryCode: this.searchObj.countryCode,
        eventStatus: 'NotStarted',
        hours: this.searchObj.timeValue,
        sportId: this.searchObj.sportId,
        pageSize: this.pageSize,
        pageNum: this.count,
        orderByType: 'scheduledTime'
      }
      if (this.searchObj.tournamentId && this.searchObj.tournamentId.length) {
        data.tournamentId = this.searchObj.tournamentId.join(',')
      } else if (this.searchObj.codeTourIds && this.searchObj.codeTourIds.length) {
        data.codeTourIds = this.searchObj.codeTourIds.join(',')
      }
      switch (this.modelValue) {
        case 'prematch':
          this.preOrLive = 'not_started'
          this.matchType = 'prematch'
          data.eventStatus = 'NotStarted'
          break
        case 'live':
          this.preOrLive = 'live'
          this.matchType = 'live'
          data.eventStatus = 'Live'
          break
      }
      const res = await this.$api.queryMatch({
        data: data
      })
      this.loading = false
      if (res.code !== 0) return
      this.$store.commit('SET_GLOBALFLAG', true)
      this.handleData(res, defaultSearchObj)
      this.initSocketio()
      if (this.matchType === 'live') {
        this.simpleinitSocketioNewmatch()
      } else {
        // this.$socketio.off('sport_new_live_match_topic_v2')
      }
    },
    // 收藏列表
    async getLikeList(defaultSearchObj) {
      const res = await this.$api.likeList({
        data: {
          orderByType: '1',
          sportId: this.searchObj.sportId,
          pageSize: this.pageSize,
          pageNum: this.count
        }
      })
      this.loading = false
      if (res.code !== 0) return
      this.handleData(res, defaultSearchObj)
      this.initSocketio()
    },
    // 搜索
    async searchList(defaultSearchObj) {
      let modelValue = ''
      switch (this.modelValue) {
        case 'prematch':
          modelValue = 'NotStarted'
          break
        case 'live':
          modelValue = 'Live'
          break
      }
      const res = await this.$api.queryMatchByTeamName({
        data: {
          teamName: this.searchObj.searchName,
          sportId: this.searchObj.sportId,
          pageSize: this.pageSize,
          pageNum: this.count,
          eventStatus: modelValue
        }
      })
      this.loading = false
      if (res.code !== 0) return
      this.handleData(res, defaultSearchObj)
    },
    handleData(res, defaultSearchObj) {
      if (JSON.stringify(defaultSearchObj) !== JSON.stringify({...this.searchObj, modelValue: this.modelValue})) return
      const data = res.data || []
      if (this.count > 0) {
        this.groupArr.push(...data)
      } else {
        this.groupArr = data
      }
      if (data.length === 0) {
        this.sortTimeQuery = false
      }
    }
  }
}

