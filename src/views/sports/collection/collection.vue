<template>
  <div style="height: 100%;overflow-y: auto;"  v-infinite-scroll="loadMore"
       v-infinite-scroll-disabled="loading"
       v-infinite-scroll-distance="10">
    <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    <!--赛事类别-->
    <sportsMenu :normalMenu="true" :firstSportId="sportId" @sportsChange="sportsChange"></sportsMenu>
    <!--赛事列表-->
    <BettingMenu :dataArr="groupArr" :matchType="'live'" :pushDataArr="pushDataArr"></BettingMenu>
  </div>
</template>

<script>
  import BettingMenu from '@/components/sport/bettingMenu/BettingMenu'
  import sportsMenu from '@/components/sport/sportsMenu'
  import Vue from 'vue'
  import scroll from '@/plugs/scroll'
  Vue.use(scroll)
  export default {
    name: 'lives',
    components: {
      BettingMenu,
      sportsMenu
    },
    data() {
      return {
        plcTime: '',
        matchIds: [], // 监听的比赛id数组
        pushDataArr: [],
        sportId: '',
        loading: false,
        count: 0,
        groupArr: []
      }
    },
    created() {
      this.sportId = this.$store.state.searchObj.sportId || ''
    },
    mounted() {
      // this.queryMatch()
    },
    methods: {
      // 游戏类切换
      sportsChange(sportId) {
        this.count = 0
        this.sportId = sportId
        this.queryMatch()
      },
      loadMore() {
        if (this.loading) return
        this.loading = true
        this.count++
        this.queryMatch()
      },
      // 在用
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
          groups: this.matchIds.join(','),
          userToken: ''
        }
        // 发送消息给服务端订阅主题可用于初始化数据
        _this.$socketio.emit('sport_pls_topic_v2', JSON.stringify(obj), (data) => {
          // 接收服务端消息
          _this.plsAccetp(data)
        }, 'collection')
      },
      plsAccetp(data) {
        let dataObj = JSON.parse(data)
        // 避免重复触发
        if (this.plcTime === dataObj.time) {
          return
        } else {
          this.plcTime = dataObj.time
        }
        this.pushDataArr = dataObj.data
      },
      async queryMatch() {
        const res = await this.$api.likeList({
          data: {
            orderByType: '1',
            sportId: this.sportId,
            pageSize: 20,
            pageNum: this.count
          }
        })
        console.log(res)
        this.loading = false
        if (res.code !== 0) return
        if (this.count > 0) {
          this.groupArr.push(...res.data)
        } else {
          this.groupArr = res.data
        }
        if (this.groupArr && this.groupArr.length > 0) {
          this.initSocketio()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
