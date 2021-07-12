<template>
  <div class="lottery-list" style="height: 100%;">
    <v-toolbar
      color="white"
      flat
      dense
      width="100%"
      class="pl-0 pr-0 pb-0 text-center fixed-bar"
    >
      <v-tabs
        v-model="tab"
        center-active
        class="pl-0 pr-0"
        fixed-tabs
      >
        <v-tab
          v-for="item in tabNav"
          :key="item.type"
          class="text-body-1 text-capitalize font-weight-bold"
          @change="checkItem(item)"
          style="width:42vw"
        >
          {{ item.name }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tab" class="pb-sm-4 pb-2 grey lighten-4" height="100vh" style="min-height: 100%; margin-bottom: -48px">
      <v-tab-item class="mt-sm-4 mt-2 " min-height="100vh" style="height: 100%">
        <on-sale :lotteriesList="lotteriesList" :sharedTopicList="sharedTopicList" class="px-sm-4 px-2" @loadNewData="loadNewData" @toBuyBack="toBuy" @toSharedBack="toShared"></on-sale>
      </v-tab-item>
      <v-tab-item class="mt-0 mt-sm-4">
        <lotteryResult :historiesList="historiesList"></lotteryResult>
      </v-tab-item>
    </v-tabs-items>
    <!--中奖滚动公告-->
    <div class="win-ad-list ml-4 mb-2">
      <div class="winners-continer-main d-flex flex-column" :class="isScroll ? 'active' : ''">
        <template v-for="(item, index) in winList">
          <winMsg v-if="item.gameType===0" :style="{order: index < nowActive ? index + calcLen : index}" :winnerInfo="item" :index="nowActive === index" :key="item.id"></winMsg>
        </template>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import scroll from '@/plugs/scroll'
import lotteryResult from './components/lotteryResault'
import OnSale from './components/onSale.vue'
import winMsg from './components/winMsg'
import mixins from './mixins'
Vue.use(scroll)
export default {
  name: 'lotteryList',
  components: {
    lotteryResult,
    OnSale,
    winMsg
  },
  props: {
  },
  mixins: [mixins],
  data() {
    return {
      tabNav: [
        {type: '1', name: 'On Sale'},
        {type: '2', name: 'Lottery Results'}
      ],
      historiesList: [],
      tab: '1',
      active: '1',
      pageSize: 10,
      pageNum: 1,
      winList: [],
      scrollTimer: null,
      nowActive: 0,
      isScroll: false,
    }
  },
  created() {
    for (let i = 0; i < 10; i++) {
      this.winList.push({id: i + 1})
    }
  },
  mounted() {
    this.winMessage()
  },
  activated() {

  },
  deactivated() {
    this.clearTimer()
  },
  beforeDestory() {
    this.clearTimer()
  },
  watch: {
    isScroll() {
      if (!this.isScroll) {
        this.beginScroll()
      } else {
        this.scrollTimer = setTimeout(() => {
          this.nowActive++
          if (this.nowActive > this.winList.length - 1) this.nowActive = 0
          this.isScroll = false
        }, 2000)
      }
    }
  },
  computed: {
    calcLen() {
      return this.winList.length
    }
  },
  methods: {
    // 滚动条触发事件
    scrollEvent(e) {
      // console.log(e)
      if (e.srcElement.scrollTop + e.srcElement.clientHeight === e.srcElement.scrollHeight) {
        console.log('嘿嘿我在底部触发了')
        this.pageNum += 1
        this.gameList()
      }
    },
    checkItem(item) {
      if (item.type === '1' && this.gameListData.length > 0) {
        // this.getGameInfo(this.gameListData)
      }
      this.active = item.type
    },
    // 获取中奖排名
    async winMessage() {
      const res = await this.$api.winMessage({})
      if (res.code !== 0) return
      if (res.data && res.data.length > 0) {
        this.beginScroll()
        this.winList = res.data
      }
    },
    beginScroll() {
      this.scrollTimer = setTimeout(() => {
        this.isScroll = true
      }, 3000)
    },
    clearTimer() {
      this.scrollTimer && clearTimeout(this.scrollTimer)
    }
  }
}
</script>

<style lang="less" scoped>
.fixed-bar {
  position: sticky;
  top: 0;
  z-index: 99;
}
.shared-img {
  width: 100%;
  height: 20vw;
}
  .win-ad-list{
    position: fixed;
    bottom: 0;
    height: 20%;
    overflow: hidden;
    .active{
      transform: translateY(-40px);
      transition: all linear 1.5s;
    }
  }
/deep/.theme--light.v-tabs .v-tab--active:hover::before, .theme--light.v-tabs .v-tab--active::before{
  opacity: 0;
}
</style>
