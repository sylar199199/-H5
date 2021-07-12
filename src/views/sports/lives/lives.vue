<template>
  <div
    class="sports-lives"
    v-infinite-scroll="loadMore"
    v-infinite-scroll-disabled="loading"
    v-infinite-scroll-distance="10"
  >
    <v-divider
      class=""
    ></v-divider>
    <!--banner-->
    <!--<homeBanner></homeBanner>-->
    <!--sport导航-->
    <sportNavMenu navType="live" @initLives="sportChange" v-if="isInit"></sportNavMenu>
    <!--赛事列表-->
    <BettingMenu :dataArr="groupArr" :matchType="'live'" :pushDataArr="pushDataArr" :preOrLive="'live'"></BettingMenu>
    <!--no more-->
    <p class="py-2 accent text-center text--secondary text-body-2" v-if="!sortTimeQuery">No more~</p>
  </div>
</template>

<script>
  // import homeBanner from '@/components/main/homeBanner'
  import sportNavMenu from '@/components/sport/sportNavMenu'
  import BettingMenu from '@/components/sport/bettingMenu/BettingMenu'
  import Vue from 'vue'
  import scroll from '@/plugs/scroll'
  Vue.use(scroll)
  export default {
    name: 'lives',
    components: {
      // homeBanner,
      sportNavMenu,
      BettingMenu
    },
    props: {
      modelValue: {
        default: ''
      }
    },
    data() {
      return {
        sortTimeQuery: true,
        isInit: false,
        newMatchTime: '',
        plcTime: '',
        matchIds: [], // 监听的比赛id数组
        loading: false,
        count: 0,
        groupArr: [],
        pushDataArr: []
      }
    },
    created() {
    },
    mounted() {
    },
    activated() {
      if (this.groupArr.length) {
        this.initSocket()
      }
    },
    deactivated() {
      this.stopListen()
    },
    beforeDestroy() {
      this.stopListen()
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal) {
          if (newVal === 'live') {
            this.isInit = true
          }
        }
      }
    },
    methods: {
      // 赛事类型切换
      sportChange() {
        this.eventBus.$emit('closeLMT')
        this.count = 0
        this.matchIds = []
        this.queryMatch()
      },
      // 暂停监听
      stopListen() {
        // 断开连接
        this.$socketio.off('sport_pls_topic_v2', 'lives')
        // 断开连接
        this.$socketio.off('sport_new_live_match_topic_v2')
      },
      plsAccetp(data) {
        let _this = this
        console.log('lives推送的数据')
        let dataObj = JSON.parse(data)
        // 避免重复触发
        if (_this.plcTime === dataObj.time) {
          return
        } else {
          _this.plcTime = dataObj.time
        }
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
      // 在用
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
          console.log('接收到新数据')
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
          _this.simpleinitSocketio()
        })
      },
      // 在用
      simpleinitSocketio() {
        // this.matchIds = []
        this.groupArr.forEach((val1) => {
          val1.matchList.forEach((val2) => {
            this.matchIds.push(val2.matchId)
          })
        })
        if (this.matchIds.length === 0) return
        let obj = {
          groups: this.matchIds.join(','),
          userToken: ''
        }
        // 发送消息给服务端订阅主题可用于初始化数据
        this.$socketio.emit('sport_pls_topic_v2', JSON.stringify(obj), (data) => {
          // console.log(JSON.parse(data))
          // 接收服务端消息
          this.plsAccetp(data)
        }, 'lives')
      },
      loadMore() {
        if (this.loading) return
        this.loading = true
        this.count++
        this.queryMatch()
      },
      async queryMatch() {
        if (this.$store.state.searchObj.sportId === '' || this.$store.state.searchObj.sportId === undefined) return
        const res = await this.$api.queryMatch({
          data: {
            playNum: 2,
            eventStatus: 'Live',
            sportId: this.$store.state.searchObj.sportId ? this.$store.state.searchObj.sportId : '',
            pageSize: 20,
            pageNum: this.count
          }
        })
        this.loading = false
        if (res.code !== 0) return
        this.$store.commit('SET_GLOBALFLAG', true)
        if (this.count > 0) {
          this.groupArr.push(...res.data)
        } else {
          this.groupArr = res.data
          this.matchIds = []
        }
        if (res.data.length === 0) {
          this.sortTimeQuery = false
        }
        this.initSocket()
      },
      initSocket() {
        this.simpleinitSocketio()
        this.simpleinitSocketioNewmatch()
      }
    }
  }
</script>

<style lang="less" scoped>
.sports-lives{
  height: 100%;
  overflow-y: auto;
}
</style>
