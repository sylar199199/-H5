<template>
  <div style="height: 100%;overflow-y: auto;"  v-infinite-scroll="loadMore"
       v-infinite-scroll-disabled="loading"
       v-infinite-scroll-distance="10">
    <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    <!--赛事列表-->
    <BettingMenu ref="btm" :dataArr="groupArr" :pushDataArr="pushDataArr" :preOrLive="'not_started'"></BettingMenu>
  </div>
</template>

<script>
  import BettingMenu from '@/components/sport/bettingMenu/BettingMenu'
  import Vue from 'vue'
  import scroll from '@/plugs/scroll'
  Vue.use(scroll)
  export default {
    name: 'list',
    components: {
      BettingMenu
    },
    computed: {
    },
    watch: {
      // changeData(newValue, oldValue) {
      //   console.log(newValue)
      //   console.log(oldValue)
      // },
      deep: true
    },
    data() {
      return {
        eventStatus: 'NotStarted',
        tournamentId: '',
        sportId: '',
        timeValue: '',
        countryCode: '',
        count: 0,
        groupArr: [],
        pushDataArr: [],
        loading: false,
        matchIds: [], // 监听的比赛id数组
        sortTimeQuery: true
      }
    },
    beforeDestroy() {
      this.stopListen()
    },
    methods: {
      // 暂停监听
      stopListen() {
        // 发送消息给服务端订阅主题可用于初始化数据
        this.$socketio.off('sport_pls_topic_v2', 'sports')
        this.matchIds = []
      },
      plsAccetp(data) {
        let _this = this
        console.log('prematch推送的数据')
        let dataObj = JSON.parse(data)
        // 避免重复触发
        if (_this.plcTime === dataObj.time) {
          return
        } else {
          _this.plcTime = dataObj.time
        }
        console.log(dataObj.data)
        this.pushDataArr = dataObj.data
        // let localtime = new Date().getTime()
        // window.ilotSocket.sport_pls_topic.count = window.ilotSocket.sport_pls_topic.count + 1
        // let minu = localtime - dataObj.time
        // if (minu > 3000) {
        //   window.ilotSocket.sport_pls_topic.over3 = window.ilotSocket.sport_pls_topic.over3 + 1
        // } else if (minu > 2000) {
        //   window.ilotSocket.sport_pls_topic.over2 = window.ilotSocket.sport_pls_topic.over2 + 1
        //   window.ilotSocket.sport_pls_topic.over3 = window.ilotSocket.sport_pls_topic.over3 + 1
        // } else if (minu > 1000) {
        //   window.ilotSocket.sport_pls_topic.over1 = window.ilotSocket.sport_pls_topic.over1 + 1
        //   window.ilotSocket.sport_pls_topic.over2 = window.ilotSocket.sport_pls_topic.over2 + 1
        //   window.ilotSocket.sport_pls_topic.over3 = window.ilotSocket.sport_pls_topic.over3 + 1
        // }
        // _this.$refs.btm.plsDataChange(dataObj.data)
      },
      loadMore () {
        console.log(!this.sortTimeQuery)
        if (this.loading) return
        if (!this.sortTimeQuery) return // 数据为空  1分钟内不要加载
        this.loading = true
        this.count++
        this.queryMatch()
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
          removeGroups: 'all',
          groups: _this.matchIds.join(','),
          userToken: ''
        }
        // 发送消息给服务端订阅主题可用于初始化数据
        _this.$socketio.emit('sport_pls_topic_v2', obj, (data) => {
          // 接收服务端消息
          _this.plsAccetp(data)
        }, 'sports')
      },
      // 赛事列表(PreMatch/Live)
      async queryMatch() {
        console.log(this.$store.state.searchObj)
        const res = await this.$api.queryMatch({
          data: {
            countryCode: this.countryCode,
            eventStatus: this.eventStatus,
            hours: this.timeValue,
            sportId: this.sportId,
            tournamentId: this.tournamentId,
            pageSize: 10,
            pageNum: this.count,
            orderByType: 'scheduledTime'
          }
        })
        console.log(res)
        this.loading = false
        if (res.code !== 0) return
        this.$store.commit('SET_GLOBALFLAG', true)
        if (this.count > 0) {
          this.groupArr.push(...res.data)
        } else {
          this.groupArr = res.data
        }
        console.log(this.groupArr)
        if (res.data.length === 0) {
          this.sortTimeQuery = false
        }
        this.initSocketio()
      }
    },
    created() {
    },
    beforeMount() {
      console.log(this.$route.params)
      let params = this.$route.params
      this.eventStatus = params.slot === 'lives' ? 'Live' : 'NotStarted'
      this.sportId = params.category !== 'null' ? params.category : ''
      this.tournamentId = params.tournament !== 'null' ? params.tournament : ''
      this.countryCode = params.country !== 'null' ? params.country : ''
      this.timeValue = params.time !== 'null' ? params.time : ''
    },
    mounted() {
      this.queryMatch()
    }
  }
</script>

<style scoped lang="less">
.mySports{
  height: 100%;
  .btnBox{
    height: 48px;
    line-height: 48px;
  }
  .pre_live{
    height: calc(100% - 48px);
  }
}
</style>
