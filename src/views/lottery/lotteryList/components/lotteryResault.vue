<template>
  <div class="flex-fill" style="height: 100%">
    <v-skeleton-loader
      v-if="showLoad"
      type="table-heading, list-item-two-line"
    ></v-skeleton-loader>
    <v-list v-else class="pa-0 ma-0 transparent">
      <v-list-item-group color="white">
        <v-list-item v-for="(item, x) in historiesList" :key="x" class="d-block px-0 py-sm-4 pt-sm-2 pt-2" @click="linkResult(item)">
          <v-card elevation="0" color="mx-sm-4 mx-2 py-0" v-if="item.GameID===id905 || item.GameID===id3D || item.GameID===idFootball">
            <!--顶部期号、时间-->
            <div class="d-flex fullscreen justify-space-between align-center mb-sm-4 pb-2 px-sm-4 px-2" >
              <div class="d-flex align-center">
                <strong class="text-subtitle-1 text-sm-h6 font-weight-bold">
                  {{item.GameID===idFootball?'Football 14':item.GameID===id905?'5/90':item.GameName}}
                </strong>
                <span class="ml-sm-4 ml-2 text-sm-subtitle-1 text-caption font-weight-medium text--disabled">NO. {{item.LastDrawIssue}}</span>
              </div>
              <div class=" d-flex align-center">
                <span class="text-sm-body-2 text-caption black--text d-none d-sm-flex mr-1">{{item.week}}</span>
                <span class="text-sm-body-2 text-caption black--text">{{item.LastDrawTime}}</span>
                <!--<v-icon class="pl-sm-2 pl-1 text-sm-h6 text-body-1 black&#45;&#45;text">mdi-calendar-clock</v-icon>-->
              </div>
            </div>
            <!--开奖号码-->
            <v-card
              class="ma-0"
              elevation="0"
            >
              <div class="d-flex text-center flex-column">
                <!--第一排的号码-->
                <div class="d-flex align-center justify-center flex-wrap">
                  <div v-for="(num, index) in item.Numbers" :key="index" class="d-flex flex-column align-center mb-sm-4 mb-2" :class="item.GameID===id3D?'mx-2':'mx-0'">
                    <!--Football14-->
                    <v-chip
                      v-if="item.GameID===idFootball"
                      class="mr-sm-1 mr-1 mt-2 px-sm-2 px-1 text-sm-subtitle-1 text-subtitle-2 font-weight-medium"
                      label
                      color="primary"
                    >
                      {{num==='1'?num:num==='2'?'X':num==='4'? '2':'*'}}
                    </v-chip>
                    <!--3d/5/90-->
                    <v-avatar
                      v-else-if="item.GameID===id905&&index<5 || item.GameID===id3D"
                      :size="mobileSize"
                      class="num-border primary text-center align-center"
                      :class="[item.GameID===id3D?'mx-sm-4,mx-2':'mx-1']"
                    >
                      <span class="white--text font-weight-medium text-subtitle-1 text-sm-h6 ">{{num>=10?num:item.GameType==='11'?'0'+num:num}}</span>
                    </v-avatar>
                    <!--3d的描述-->
                    <span class="mt-2 text-sm-subtitle-2 text-caption text--disabled" v-if="item.GameType==='10'&&num>=0 && index<3">{{index===0?'1st Digit':index===1?'2nd Digit':'3rd Digit'}}</span>
                  </div>
                </div>
                <!--描述及第二排号码-->
                <p v-if="item.GameID===id905" class="mb-sm-4 mb-3 text-sm-body-2 text-caption text--disabled">Winning numbers</p>
                <div class="d-flex align-center justify-center">
                  <div v-if="item.GameID===id905" v-for="(num, index) in item.Numbers" :key="index" class="d-flex flex-column mb-2 mb-sm-4">
                    <v-avatar
                      v-if="index>4&&num>0"
                      :size="mobileSize"
                      class="num-border primary text-center align-center"
                      :class="[item.GameID===id3D?'mx-sm-4,mx-2':'mx-1']"
                    >
                      <span class="white--text font-weight-medium text-subtitle-1 text-sm-h6 ">{{num>=10?num:item.GameType==='11'?'0'+num:num}}</span>
                    </v-avatar>
                  </div>
                </div>
                <p v-if="item.GameID===id905" class="text-sm-body-2 mb-2 text-caption text--disabled">Machine numbers</p>
              </div>
            </v-card>
          </v-card>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script type="text/javascript">
import { runingIP } from '@/api/baseConfig'
import {mapGetters} from 'vuex'
import linkResultMixins from '../mixins/linkResultMixins'
export default {
  name: 'lotteryResult',
  props: {
  },
  mixins: [linkResultMixins],
  data() {
    return {
      historiesList: [],
      gameIdArr: [
        {
          name: '3D',
          id: process.env.VUE_APP_3D_ID
        },
        {
          name: '90/5',
          id: process.env.VUE_APP_905_ID
        },
        {
          name: 'football13',
          id: process.env.VUE_APP_FOOTBALL_ID
        },
      ],
      id905: process.env.VUE_APP_905_ID, // 5/90id
      id3D: process.env.VUE_APP_3D_ID, // 3D
      idFootball: process.env.VUE_APP_FOOTBALL_ID,
      showLoad: false,
    }
  },
  components: {
  },
  computed: {
    ...mapGetters(['isLogin']),
    mobileSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 30
        case 'sm': return 40
        // case 'md': return 500
        // case 'lg': return 600
        // case 'xl': return 800
        default : return 60
      }
    }
  },
  created() {
  },
  mounted() {
    this.showLoad = true
    this.getLotteryResult()
  },
  methods: {
    // 获取开奖公告
    async getLotteryResult () {
      let Format01 = {}
      let Format02 = []
      this.gameIdArr.forEach(val => {
        let obj = {
          GameID: val.id,
          Issue: '-1'
        }
        Format02.push(obj)
      })
      const res = await this.$api.getLotteryResult({
        data: {Format01, Format02}
      })
      this.showLoad = false
      if (res.RetCode !== '0') {
        this.$common.setMsg(res.ERR_MSG, 'error')
        return
      }
      this.setShowData(res.Format02)
    },
    // 设置显示数据
    setShowData(data) {
      data.forEach(val => {
        val.LastDrawTime = this.$moment(val.LastDrawTime).format('DD/MM/YYYY')
        let weekNum = this.$moment(val.LastDrawTime).day()
        val.week = weekNum === 1 ? 'Monday' : weekNum === 2 ? 'Tuesday' : weekNum === 3 ? 'Wednesday' : weekNum === 4 ? 'Thursday' : weekNum === 5 ? 'Friday' : weekNum === 6 ? 'Saturday' : weekNum === 7 ? 'Sunday' : ''
        val.Numbers = val.Numbers.split('|')
        val.Numbers.pop()
      })
      this.historiesList = data
    }
  }
}
</script>

<style lang="less" scoped>

.draw-Number {
  span {
    width: 8vw;
    height: 8vw;
  }
  &.number-lott {
    span {
      border-radius: 50%;
    }
  }
  &.number-sport {}
}
</style>
