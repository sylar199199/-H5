<template>
  <div style="height: 100%;overflow-y: auto;"  v-infinite-scroll="loadMore"
       v-infinite-scroll-disabled="loading"
       v-infinite-scroll-distance="10">
    <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
    <div class="searchBox d-flex justify-center py-sm-4 py-2 px-sm-4 px-2">
      <div class="searchBoxIn rounded accent">
        <v-text-field
            v-model="searchName"
            class="text--disabled"
            placeholder="Search"
            oninput="if(value.length>50)value=value.slice(0,50)"
            height="40px">
          <v-icon middle slot="prepend" class="mt-1 pl-3 text--disabled" @click="queryMatch">mdi-magnify</v-icon>
        </v-text-field>
      </div>
    </div>
    <v-divider class="grey lighten-4"></v-divider>
    <!--赛事类别-->
    <sportsMenu :normalMenu="true" :firstSportId="sportId" @sportsChange="sportsChange"></sportsMenu>
    <!--赛事列表-->
    <BettingMenu :dataArr="groupArr" :matchType="'live'"></BettingMenu>
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
        searchName: '',
        sportId: '',
        loading: false,
        count: 0,
        groupArr: []
      }
    },
    created() {
    },
    mounted() {
      this.sportId = this.$store.state.searchObj.sportId ? this.$store.state.searchObj.sportId : ''
    },
    methods: {
      // 游戏类切换
      sportsChange(sportId) {
        this.sportId = sportId
        this.queryMatch()
      },
      loadMore() {
        if (this.loading) return
        this.loading = true
        this.count++
        this.queryMatch()
      },
      // 没有flag 为第一次
      async queryMatch(flag) {
        if (!flag) {
          this.count = 0
        }
        if (this.searchName === '') return
        const res = await this.$api.queryMatchByTeamName({
          data: {
            teamName: this.searchName,
            sportId: this.sportId,
            pageSize: 20,
            pageNum: this.count
          }
        })
        this.loading = false
        if (res.code !== 0) return
        if (this.count > 0) {
          this.groupArr.push(...res.data)
        } else {
          this.groupArr = res.data
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .searchBox{
    width: 100%;
    // border-bottom: 8px solid #EAEBEC;
    .searchBoxIn{
      width: 100%;
      height: 40px;
      /deep/.v-input__slot:before{
        display: none;
      }
      /deep/.v-input__slot:after{
        display: none;
      }
      .v-text-field{
        margin-top: 0;
        padding-top: 0;
      }
    }
  }
</style>
