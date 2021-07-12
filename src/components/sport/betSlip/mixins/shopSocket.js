import {mapGetters, mapMutations} from 'vuex'
import { debounce } from '@/utils'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['betList', 'isLogin']),
  },
  watch: {
    'betList': {
      handler: debounce(function (newValue, oldValue) {
        if (newValue.length > 0) {
          if (oldValue !== undefined && newValue.length !== oldValue.length) {
            this.simpleinitSocketio(newValue)
          }
        } else {
          this.$socketio.off('sport_shopping_cart_topic_v2')
        }
      }),
      immediate: true,
      deep: true
    }
  },
  mounted() {
    if (this.betList.length > 0) {
      this.simpleinitSocketio()
    }
  },
  methods: {
    ...mapMutations(['SET_BETTING', 'SET_CARDATA']),
    // 购物车推送
    simpleinitSocketio(data) {
      let _this = this
      let arr = []
      data.forEach((val) => {
        arr.push(val.sid)
      })
      if (arr.length === 0) return
      let obj = {
        removeGroups: 'all',
        groups: arr.join(','),
        userToken: ''
      }
      console.log(obj)
      // 发送消息给服务端订阅主题可用于初始化数据
      _this.$socketio.emit('sport_shopping_cart_topic_v2', obj, (data) => {
        // 购物车推送推送的数据
        let arr = JSON.parse(data)
        this.changeOdd(arr.data)
      })
    },
    // 修改赔率
    changeOdd(oddsData) {
      // debugger
      let dataArr = this.betList
      dataArr.forEach((val) => {
        // odds是否相等
        if (val.sid !== oddsData.oddsId) return
        // 赛事不可投或盘口不可投
        if (!oddsData.marketStatus || (oddsData.matchStatus !== 'live' && oddsData.matchStatus !== 'not_started') || parseInt(oddsData.oddsStatus) === 0) {
          val.money = 0
          val.odds = 0
          val.checked = false
          val.dropShow = false
          val.status = false
          val.potentialWin = 0
          return
        }
        // 赔率不存在或为0
        if (oddsData.odds === null || oddsData.odds === undefined || oddsData.odds === 0) {
          val.money = 0
          val.odds = 0
          val.checked = false
          val.dropShow = false
          val.status = false
          val.potentialWin = 0
          return
        }
        if (val.odds > oddsData.odds) {
          val.style = 'down'
          if (val.checked) {
            this.oddsChangeBet = false
          }
        } else if (val.odds < oddsData.odds) {
          val.style = 'up'
          if (val.checked) {
            this.oddsChangeBet = false
          }
        }
        // let time = this.$moment(new Date().getTime()).format('HH:mm:ss.SSSSSS')
        val.odds = oddsData.odds
        val.potentialWin = val.odds * val.money
        val.status = true
      })
      console.log(dataArr)
      this.SET_CARDATA(dataArr)
    },
  }
}
