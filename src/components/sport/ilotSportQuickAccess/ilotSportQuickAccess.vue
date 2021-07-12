<template>
  <div :class="[iMarign,iPadding]" class="mr-0">
    <v-card class="overflow-x-auto pr-sm-4 pr-2" elevation="0">
      <div class="d-flex flex-nowrap">
        <v-slide-item
          v-for="(item, n) in sportAccessData"
          :key="n"
          width="26%"
        >
          <v-card
            elevation="0"
            class="ml-sm-4 pa-sm-4 ml-sm-4 ml-2 pa-2 overflow-hidden fullscreen flex-fill"
            :class="[{'light-blue lighten-1': n%4 === 0},{'teal lighten-1':n%4 ===1},{'orange lighten-2':n%4 ===2},{'green darken-1':n%4 ===3}]"
            :max-width="mobileSize"
            :min-width="mobileSize"
            @click="linkPage(item)"
          >
            <!--名称-->
            <v-card-text
              class="white--text pa-0 align-center d-flex fill-height"
              width="70%"
            >
              <div class="font-weight-bold text-sm-subtitle-2 text-caption hide-name text-capitalize">{{item.name}}</div>
              <!--<v-icon
                large
                color="white"
                class="icon-bg"
              >
                {{'mdi-' + item.icon}}
              </v-icon>-->
            </v-card-text>
          </v-card>
        </v-slide-item>
        <!--推荐的联赛列表-->
        <v-slide-item
          v-for="(item, x) in recommendedList"
          :key="x+'a'"
          width="26%"
          v-if="false"
        >
          <v-card
            elevation="0"
            class="ml-sm-4 pa-sm-4 ml-2 pa-2 overflow-hidden fullscreen flex-fill"
            :class="[{'light-blue lighten-1': x%4 === 3},{'teal lighten-1':x%4 ===0},{'orange lighten-2':x%4 ===1},{'green darken-1':x%4 ===2}]"
            :max-width="mobileSize"
            min-width="100"
            @click="linkPage(item)"
          >
            <!--名称-->
            <v-card-text
              class="white--text pa-0 align-center d-flex fill-height"
              width="70%"
            >
              <div class="font-weight-bold text-sm-subtitle-2 text-caption hide-name">{{item.name}}</div>
              <!--<v-icon
                large
                color="white"
                class="icon-bg"
              >
                {{'mdi-trophy'}}
              </v-icon>-->
            </v-card-text>
          </v-card>
        </v-slide-item>
        <div class="last-match" > 1</div>
      </div>
    </v-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { eventTracking, eventKey } from '@/utils/fireBase'
  export default {
    name: 'ilotSportQuickAccess',
    props: {
      sportAccessData: {
        type: Array,
        default: function () {
          return [
            {
              id: '1',
              name: '2 Hours Football',
              url: 'https://www.baidu.com/',
              icon: 'soccer',
            },
            {
              id: '2',
              name: 'Today’s Football',
              url: 'https://www.baidu.com/',
              icon: 'calendar-check',
            },
            // {
            //   id: '3',
            //   name: 'World Cup Qualification',
            //   url: 'https://www.baidu.com/',
            //   icon: 'trophy',
            // },
            {
              id: '3',
              name: 'EURO 2020',
              url: 'https://www.baidu.com/',
              icon: 'trophy',
            },
            {
              id: '4',
              name: 'NBA',
              url: 'https://www.baidu.com/',
              icon: 'trophy-award',
            },
          ]
        }
      },
      iMarign: {
        type: Array,
        default: function () {
          return ['my-sm-4', 'my-2']
        }
      },
      iPadding: {
        type: Array,
        default: function () {
          return ['pa-0']
        }
      }
    },
    data() {
      return {
        recommendedList: []
      }
    },
    computed: {
      ...mapGetters(['platformName']),
      mobileSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 100
          case 'sm': return 140
          // case 'md': return 500
          // case 'lg': return 600
          // case 'xl': return 800
          default : return 200
        }
      }
    },
    created() {
      this.getRecommendedCountryList()
    },
    methods: {
      // 获取推荐联赛
      async getRecommendedCountryList() {
        const res = await this.$api.getTournamentRecommend({
          data: {
            sportId: 'sr:sport:1'
          }
        })
        if (res.code !== 0) return
        console.log(res.data)
        this.recommendedList = res.data || []
      },
      // 跳转到列表页面
      linkPage(item) {
        console.log(item)
        // let url = item.url
        let obj = {
          clickOn: item.name
        }
         // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_SPORTS_ACCESS, item.name, obj)
        // window._czc.push(['_trackEvent', this.platformName + '-sportstop', 'part' + item.id])
        if (item.id === '1') {
          this.$router.push('/sport/list/null/sr:sport:1/null/null/2')
        } else if (item.id === '2') {
          this.$router.push('/sport/list/null/sr:sport:1/null/null/24')
        } else if (item.id === '3') {
          // this.$router.push('/sport/list/null/sr:sport:1/sr:tournament:14/null/null')
          this.$router.push('/sport/list/null/sr:sport:1/sr:tournament:1/null/null')
        } else if (item.id === '4') {
          this.$router.push('/sport/list/null/sr:sport:2/sr:tournament:132/null/null')
          // this.$router.push('/sport/list/null/sr:sport:1/sr:tournament:17/null/null')
        }
        if (item.tournamentId) {
          this.$router.push('/sport/list/null/sr:sport:1/' + item.tournamentId + '/null/null')
        }
        // window.location.href = url
      }
    }
  }
</script>

<style lang="less" scoped>
.icon-bg{
  position: absolute;
  opacity: 0.5;
  right: -10px;
  font-size: 4rem !important;
}
.last-match{
  width: 16px;
  height: 10px;
  font-size: 12px;
  line-height: 30px;
  color: transparent;
}
.hide-name{
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
