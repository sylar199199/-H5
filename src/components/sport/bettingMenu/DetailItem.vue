<template>
  <!-- 显示的数据源 -->
  <!-- status为true  或者 index 前三条固定显示 -->
  <div class="perItem" v-if="source.status || index < 3">
    <div class="px-2 marketTitle ml-1 d-flex justify-left">
      <span v-if="source.odds.length > 3" @click="downClick(source)" style="margin-left: -7px;">
        <v-icon middle color="primary" v-if="source.showMore">mdi-menu-right</v-icon>
        <v-icon middle color="primary" v-else>mdi-menu-down</v-icon>
      </span>
      <div style="max-width: 80%;" class="text-truncate text-caption pt-1">
        <span class="font-weight-medium">{{source.name}}</span>
        <span class="font-weight-medium" v-if="source.name.indexOf('Total') !== -1">
          {{JSON.parse(source.specifiers).total}}
        </span>
        <span class="font-weight-medium" v-if="source.name.indexOf('Handicap ') === -1 && source.name.indexOf('Handicap') !== -1">
          {{JSON.parse(source.specifiers).hcp}}
        </span>
      </div>
      <v-tooltip top max-width="300">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              small
              v-bind="attrs"
              v-on="on"
              class="helpIcon pl-2"
          >
            mdi-help-circle-outline
          </v-icon>
        </template>
        <span>{{ showHelp(source) }}</span>
      </v-tooltip>
      <!--<v-icon middle>mdi-help-circle-outline</v-icon>-->
    </div>
    <template v-if="source.name==='Correct score' || source.name==='Winning margin (incl. overtime)'">
      <!--Correct score-->
      <div class="betBox px-2" v-if="source.name==='Correct score'">
        <v-row no-gutters md="3">
          <v-col :cols="4" class="pa-1">
            <div v-for="(oddItem, oddIndex) in scoreList(scoreLineArr1)" :key="oddIndex" class="my-2" v-if="!source.showMore ? oddIndex >= 0 : oddIndex < 1">
              <v-chip
                class="text-caption oddItem"
                :class="[['not_started', 'live'].indexOf($store.state.detailEventStatus) === -1 || !source.status || !oddItem.odds ? 'disable' : '']"
                label
                :color="oddsOnFlag(oddItem.sid) ? 'primary' : 'secondary'"
                :text-color="oddsOnFlag(oddItem.sid) ? 'white' : '#5BA600'"
                @click="bet(source, oddItem)"
              >
                <div class="d-flex justify-space-between oddItemIn">
                  <v-tooltip top :open-on-hover="true">
                    <template v-slot:activator="{ on, attrs }">
                      <div class="oddItemIn-name" v-bind="attrs" v-on="on">
                        <!--有带主客队名称的情况-->
                        <template v-if="oddItem.name.indexOf($route.query.team1) > -1 || oddItem.name.indexOf($route.query.team2) > -1">
                          <!--主客队名称都有的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team1) > -1 && oddItem.name.indexOf($route.query.team2) > -1">{{oddItem.name.replace(new RegExp($route.query.team1,'g'), 'home').replace(new RegExp($route.query.team2,'g'), 'away')}}</p>
                          <!--只有主队名称的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team1) > -1 && oddItem.name.indexOf($route.query.team2) === -1">{{oddItem.name.replace(new RegExp($route.query.team1,'g'), 'home')}}</p>
                          <!--只有客队名称的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team2) > -1 && oddItem.name.indexOf($route.query.team1) === -1">{{oddItem.name.replace(new RegExp($route.query.team2,'g'), 'away')}}</p>
                        </template>
                        <!--没有带主客队名称的情况-->
                        <template v-else>
                          <p class="text-truncate">{{oddItem.name}}</p>
                        </template>
                      </div>
                    </template>
                    <span>{{oddItem.name}}</span>
                  </v-tooltip>
                  <span v-if="['not_started', 'live'].indexOf($store.state.detailEventStatus) > -1 && source.status && oddItem.odds" class="detailOddPoint d-flex align-center justify-end">
                <em class="caption">{{oddItem.odds}}</em>
                <v-icon class="updown" small color="success" v-if="oddItem.this_last > 0">mdi-arrow-up-bold</v-icon>
                <v-icon class="updown" small color="error" v-if="oddItem.this_last < 0">mdi-arrow-down-bold</v-icon>
              </span>
                  <span v-else><v-icon small>mdi-lock</v-icon></span>
                </div>
              </v-chip>
            </div>
          </v-col>
          <v-col :cols="4" class="pa-1">
            <div v-for="(oddItem, oddIndex) in scoreList(scoreLineArr2)" :key="oddIndex" class="my-2" v-if="!source.showMore ? oddIndex >= 0 : oddIndex < 1">
              <v-chip
                class="text-caption oddItem"
                :class="[['not_started', 'live'].indexOf($store.state.detailEventStatus) === -1 || !source.status || !oddItem.odds ? 'disable' : '']"
                label
                :color="oddsOnFlag(oddItem.sid) ? 'primary' : 'secondary'"
                :text-color="oddsOnFlag(oddItem.sid) ? 'white' : '#5BA600'"
                @click="bet(source, oddItem)"
              >
                <div class="d-flex justify-space-between oddItemIn">
                  <v-tooltip top :open-on-hover="true">
                    <template v-slot:activator="{ on, attrs }">
                      <div class="oddItemIn-name" v-bind="attrs" v-on="on">
                        <!--有带主客队名称的情况-->
                        <template v-if="oddItem.name.indexOf($route.query.team1) > -1 || oddItem.name.indexOf($route.query.team2) > -1">
                          <!--主客队名称都有的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team1) > -1 && oddItem.name.indexOf($route.query.team2) > -1">{{oddItem.name.replace(new RegExp($route.query.team1,'g'), 'home').replace(new RegExp($route.query.team2,'g'), 'away')}}</p>
                          <!--只有主队名称的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team1) > -1 && oddItem.name.indexOf($route.query.team2) === -1">{{oddItem.name.replace(new RegExp($route.query.team1,'g'), 'home')}}</p>
                          <!--只有客队名称的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team2) > -1 && oddItem.name.indexOf($route.query.team1) === -1">{{oddItem.name.replace(new RegExp($route.query.team2,'g'), 'away')}}</p>
                        </template>
                        <!--没有带主客队名称的情况-->
                        <template v-else>
                          <p class="text-truncate">{{oddItem.name}}</p>
                        </template>
                      </div>
                    </template>
                    <span>{{oddItem.name}}</span>
                  </v-tooltip>
                  <span v-if="['not_started', 'live'].indexOf($store.state.detailEventStatus) > -1 && source.status && oddItem.odds" class="detailOddPoint d-flex align-center justify-end">
                <em class="caption">{{oddItem.odds}}</em>
                <v-icon class="updown" small color="success" v-if="oddItem.this_last > 0">mdi-arrow-up-bold</v-icon>
                <v-icon class="updown" small color="error" v-if="oddItem.this_last < 0">mdi-arrow-down-bold</v-icon>
              </span>
                  <span v-else><v-icon small>mdi-lock</v-icon></span>
                </div>
              </v-chip>
            </div>
          </v-col>
          <v-col :cols="4" class="pa-1">
            <div v-for="(oddItem, oddIndex) in scoreList(scoreLineArr3)" :key="oddIndex" class="my-2" v-if="!source.showMore ? oddIndex >= 0 : oddIndex < 1">
              <v-chip
                class="text-caption oddItem"
                :class="[['not_started', 'live'].indexOf($store.state.detailEventStatus) === -1 || !source.status || !oddItem.odds ? 'disable' : '']"
                label
                :color="oddsOnFlag(oddItem.sid) ? 'primary' : 'secondary'"
                :text-color="oddsOnFlag(oddItem.sid) ? 'white' : '#5BA600'"
                @click="bet(source, oddItem)"
              >
                <div class="d-flex justify-space-between oddItemIn">
                  <v-tooltip top :open-on-hover="true">
                    <template v-slot:activator="{ on, attrs }">
                      <div class="oddItemIn-name" v-bind="attrs" v-on="on">
                        <!--有带主客队名称的情况-->
                        <template v-if="oddItem.name.indexOf($route.query.team1) > -1 || oddItem.name.indexOf($route.query.team2) > -1">
                          <!--主客队名称都有的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team1) > -1 && oddItem.name.indexOf($route.query.team2) > -1">{{oddItem.name.replace(new RegExp($route.query.team1,'g'), 'home').replace(new RegExp($route.query.team2,'g'), 'away')}}</p>
                          <!--只有主队名称的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team1) > -1 && oddItem.name.indexOf($route.query.team2) === -1">{{oddItem.name.replace(new RegExp($route.query.team1,'g'), 'home')}}</p>
                          <!--只有客队名称的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team2) > -1 && oddItem.name.indexOf($route.query.team1) === -1">{{oddItem.name.replace(new RegExp($route.query.team2,'g'), 'away')}}</p>
                        </template>
                        <!--没有带主客队名称的情况-->
                        <template v-else>
                          <p class="text-truncate">{{oddItem.name}}</p>
                        </template>
                      </div>
                    </template>
                    <span>{{oddItem.name}}</span>
                  </v-tooltip>
                  <span v-if="['not_started', 'live'].indexOf($store.state.detailEventStatus) > -1 && source.status && oddItem.odds" class="detailOddPoint d-flex align-center justify-end">
                <em class="caption">{{oddItem.odds}}</em>
                <v-icon class="updown" small color="success" v-if="oddItem.this_last > 0">mdi-arrow-up-bold</v-icon>
                <v-icon class="updown" small color="error" v-if="oddItem.this_last < 0">mdi-arrow-down-bold</v-icon>
              </span>
                  <span v-else><v-icon small>mdi-lock</v-icon></span>
                </div>
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </div>
      <!--Winning margin (incl. overtime)-->
      <div class="betBox px-2" v-if="source.name==='Winning margin (incl. overtime)'">
        <v-row no-gutters md="3">
          <v-col :cols="6" class="pa-1">
            <div v-for="(oddItem, oddIndex) in scoreList(basketballLineArr1)" :key="oddIndex" class="my-2" v-if="!source.showMore ? oddIndex >= 0 : oddIndex < 1">
              <v-chip
                class="text-caption oddItem"
                :class="[['not_started', 'live'].indexOf($store.state.detailEventStatus) === -1 || !source.status || !oddItem.odds ? 'disable' : '']"
                label
                :color="oddsOnFlag(oddItem.sid) ? 'primary' : 'secondary'"
                :text-color="oddsOnFlag(oddItem.sid) ? 'white' : '#5BA600'"
                @click="bet(source, oddItem)"
              >
                <div class="d-flex justify-space-between oddItemIn">
                  <v-tooltip top :open-on-hover="true">
                    <template v-slot:activator="{ on, attrs }">
                      <div class="oddItemIn-name" v-bind="attrs" v-on="on">
                        <!--有带主客队名称的情况-->
                        <template v-if="oddItem.name.indexOf($route.query.team1) > -1 || oddItem.name.indexOf($route.query.team2) > -1">
                          <!--主客队名称都有的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team1) > -1 && oddItem.name.indexOf($route.query.team2) > -1">{{oddItem.name.replace(new RegExp($route.query.team1,'g'), 'home').replace(new RegExp($route.query.team2,'g'), 'away')}}</p>
                          <!--只有主队名称的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team1) > -1 && oddItem.name.indexOf($route.query.team2) === -1">{{oddItem.name.replace(new RegExp($route.query.team1,'g'), 'home')}}</p>
                          <!--只有客队名称的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team2) > -1 && oddItem.name.indexOf($route.query.team1) === -1">{{oddItem.name.replace(new RegExp($route.query.team2,'g'), 'away')}}</p>
                        </template>
                        <!--没有带主客队名称的情况-->
                        <template v-else>
                          <p class="text-truncate">{{oddItem.name}}</p>
                        </template>
                      </div>
                    </template>
                    <span>{{oddItem.name}}</span>
                  </v-tooltip>
                  <span v-if="['not_started', 'live'].indexOf($store.state.detailEventStatus) > -1 && source.status && oddItem.odds" class="detailOddPoint d-flex align-center justify-end">
                <em class="caption">{{oddItem.odds}}</em>
                <v-icon class="updown" small color="success" v-if="oddItem.this_last > 0">mdi-arrow-up-bold</v-icon>
                <v-icon class="updown" small color="error" v-if="oddItem.this_last < 0">mdi-arrow-down-bold</v-icon>
              </span>
                  <span v-else><v-icon small>mdi-lock</v-icon></span>
                </div>
              </v-chip>
            </div>
          </v-col>
          <v-col :cols="6" class="pa-1">
            <div v-for="(oddItem, oddIndex) in scoreList(basketballLineArr2)" :key="oddIndex" class="my-2" v-if="!source.showMore ? oddIndex >= 0 : oddIndex < 1">
              <v-chip
                class="text-caption oddItem"
                :class="[['not_started', 'live'].indexOf($store.state.detailEventStatus) === -1 || !source.status || !oddItem.odds ? 'disable' : '']"
                label
                :color="oddsOnFlag(oddItem.sid) ? 'primary' : 'secondary'"
                :text-color="oddsOnFlag(oddItem.sid) ? 'white' : '#5BA600'"
                @click="bet(source, oddItem)"
              >
                <div class="d-flex justify-space-between oddItemIn">
                  <v-tooltip top :open-on-hover="true">
                    <template v-slot:activator="{ on, attrs }">
                      <div class="oddItemIn-name" v-bind="attrs" v-on="on">
                        <!--有带主客队名称的情况-->
                        <template v-if="oddItem.name.indexOf($route.query.team1) > -1 || oddItem.name.indexOf($route.query.team2) > -1">
                          <!--主客队名称都有的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team1) > -1 && oddItem.name.indexOf($route.query.team2) > -1">{{oddItem.name.replace(new RegExp($route.query.team1,'g'), 'home').replace(new RegExp($route.query.team2,'g'), 'away')}}</p>
                          <!--只有主队名称的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team1) > -1 && oddItem.name.indexOf($route.query.team2) === -1">{{oddItem.name.replace(new RegExp($route.query.team1,'g'), 'home')}}</p>
                          <!--只有客队名称的情况-->
                          <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team2) > -1 && oddItem.name.indexOf($route.query.team1) === -1">{{oddItem.name.replace(new RegExp($route.query.team2,'g'), 'away')}}</p>
                        </template>
                        <!--没有带主客队名称的情况-->
                        <template v-else>
                          <p class="text-truncate">{{oddItem.name}}</p>
                        </template>
                      </div>
                    </template>
                    <span>{{oddItem.name}}</span>
                  </v-tooltip>
                  <span v-if="['not_started', 'live'].indexOf($store.state.detailEventStatus) > -1 && source.status && oddItem.odds" class="detailOddPoint d-flex align-center justify-end">
                <em class="caption">{{oddItem.odds}}</em>
                <v-icon class="updown" small color="success" v-if="oddItem.this_last > 0">mdi-arrow-up-bold</v-icon>
                <v-icon class="updown" small color="error" v-if="oddItem.this_last < 0">mdi-arrow-down-bold</v-icon>
              </span>
                  <span v-else><v-icon small>mdi-lock</v-icon></span>
                </div>
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </div>
    </template>
    <div class="betBox px-2" v-else>
      <v-row no-gutters md="3">
        <v-col :cols="source.odds.length === 2 ? 6 : 4" class="pa-1" :key="oddIndex" v-for="(oddItem, oddIndex) in source.odds" v-if="!source.showMore ? oddIndex >= 0 : oddIndex < 3">
          <v-chip
              class="text-caption oddItem"
              :class="[['not_started', 'live'].indexOf($store.state.detailEventStatus) === -1 || !source.status || !oddItem.odds ? 'disable' : '']"
              label
              :color="oddsOnFlag(oddItem.sid) ? 'primary' : 'secondary'"
              :text-color="oddsOnFlag(oddItem.sid) ? 'white' : '#5BA600'"
              @click="bet(source, oddItem)"
          >
            <div class="d-flex justify-space-between oddItemIn">
              <v-tooltip top :open-on-hover="true">
                <template v-slot:activator="{ on, attrs }">
                  <div class="oddItemIn-name" v-bind="attrs" v-on="on">
                    <!--有带主客队名称的情况-->
                    <template v-if="oddItem.name.indexOf($route.query.team1) > -1 || oddItem.name.indexOf($route.query.team2) > -1">
                      <!--主客队名称都有的情况-->
                      <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team1) > -1 && oddItem.name.indexOf($route.query.team2) > -1">{{oddItem.name.replace(new RegExp($route.query.team1,'g'), 'home').replace(new RegExp($route.query.team2,'g'), 'away')}}</p>
                      <!--只有主队名称的情况-->
                      <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team1) > -1 && oddItem.name.indexOf($route.query.team2) === -1">{{oddItem.name.replace(new RegExp($route.query.team1,'g'), 'home')}}</p>
                      <!--只有客队名称的情况-->
                      <p class="text-truncate" v-if="oddItem.name.indexOf($route.query.team2) > -1 && oddItem.name.indexOf($route.query.team1) === -1">{{oddItem.name.replace(new RegExp($route.query.team2,'g'), 'away')}}</p>
                    </template>
                    <!--没有带主客队名称的情况-->
                    <template v-else>
                      <p class="text-truncate">{{oddItem.name}}</p>
                    </template>
                  </div>
                </template>
                <span>{{oddItem.name}}</span>
              </v-tooltip>
              <span v-if="['not_started', 'live'].indexOf($store.state.detailEventStatus) > -1 && source.status && oddItem.odds" class="detailOddPoint d-flex align-center justify-end">
                <em class="caption">{{oddItem.odds}}</em>
                <v-icon class="updown" small color="success" v-if="oddItem.this_last > 0">mdi-arrow-up-bold</v-icon>
                <v-icon class="updown" small color="error" v-if="oddItem.this_last < 0">mdi-arrow-down-bold</v-icon>
              </span>
              <span v-else><v-icon small>mdi-lock</v-icon></span>
            </div>
          </v-chip>
        </v-col>
      </v-row>
    </div>
    <v-divider class="my-2" style="opacity: 0.5"></v-divider>
  </div>
</template>

<script>
  import jsonData from '@/assets/json/help.json'
  import { mapMutations } from 'vuex'
  export default {
    name: 'item-component',
    data() {
      return {
        scoreLineArr1: ['1:0', '2:0', '2:1', '3:0', '3:1', '3:2', '4:0', '4:1', '4:2', '4:3', '5:0', '5:1', '5:2', '5:3', '5:4', '6:0', '6:1', '6:2', '6:3', '6:4', '6:5'],
        scoreLineArr2: ['0:0', '1:1', '2:2', '3:3', '4:4', '5:5', '6:6', 'other'],
        scoreLineArr3: ['0:1', '0:2', '1:2', '0:3', '1:3', '2:3', '0:4', '1:4', '2:4', '3:4', '0:5', '1:5', '2:5', '3:5', '4:5', '0:6', '1:6', '2:6', '3:6', '4:6', '5:6'],
        basketballLineArr1: ['Home by 1-5', 'Home by 6+', 'Home by 6-10', 'Home by by 11+', 'Home by 11-15', 'Home by 16-20', 'Home by 26+', 'other'],
        basketballLineArr2: ['Away by 1-5', 'Away by 6+', 'Away by 6-10', 'Away by by 11+', 'Away by 11-15', 'Away by 16-20', 'Away by 26+']
      }
    },
    props: {
      // sportId
      sportId: {
        type: String,
        default: ''
      },
      index: {
        // index of current item
        type: Number,
      },
      source: {
        // here is: {id: '1', name: 'abc'}
        type: Object,
        default() {
          return {}
        },
      },
    },
    computed: {
      showHelp() {
        return function(item) {
          let obj = jsonData.find((v) => {
            if (item.marketId) {
              return v.sportId === this.sportId && v.marketId === item.marketId
            }
          })
          if (obj) {
            return obj.help
          } else {
            return ''
          }

        }
      },
      scoreList() {
        return function(list) {
          let newarr = []
          list.forEach((val) => {
            let str = val.indexOf('Home') > -1 ? val.replace(new RegExp('Home', 'g'), this.$route.query.team1) : val
            str = str.indexOf('Away') > -1 ? val.replace(new RegExp('Away', 'g'), this.$route.query.team2) : str
            let arr = this.source.odds.filter(item => item.name === str)
            if (arr.length > 0) {
              newarr.push(arr[0])
            }
          })
          return newarr
        }
      }
    },
    mounted() {
    },
    methods: {
      ...mapMutations(['SET_BETTING', 'SET_SIDFLAG']),
      // index 标识 同类的第几条   比如 total 第几条
      bet(marketItem, addsItem) {
        if (['not_started', 'live'].indexOf(this.$store.state.detailEventStatus) === -1 || !marketItem.status || !addsItem.odds) return
        let obj = {
          item: {
            id: marketItem.id,
            matchId: this.$route.query.searchId,
            marketId: marketItem.marketId,
            marketName: marketItem.name,
            name: addsItem.name,
            odds: addsItem.odds,
            team1: this.$route.query.team1,
            team2: this.$route.query.team2,
            sid: addsItem.sid,
            outcomeId: addsItem.id,
            checked: true
          },
          flag: !this.oddsOnFlag(addsItem.sid)
        }
        this.SET_BETTING(obj)
        console.log(this.$store.state.betList)
      },
      downClick() {
        this.$set(this.source, 'showMore', !this.source.showMore)
        console.log(this.source)
      },
      oddsOnFlag(sid) {
        let findOddArr = this.$store.state.betList.filter(item => item.sid === sid)
        if (findOddArr.length > 0) {
          return true
        } else {
          return false
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .perItem{
    .marketTitle{
      height: 28px;
      line-height: 28px;
    }
    .betBox{
      .v-chip{
        height: auto;
        min-height: 32px;
      }
      /deep/ .v-chip__content{
        width: 100%;
      }
      .oddItem{
        width: 100%;
        v-chip__content{
          width: 100%;
        }
        &.disable{
          background: @bg-color;
          background-color: @dividing-line-color !important;
          i{
            color: @font-color4;
          }
        }
        .oddItemIn{
          width: 100%;
          height: 100%;
          line-height: 20px;
          &-name{
            width: auto !important;
            flex: 0 1 auto;
            word-break: break-all;
            overflow-x: hidden;
            white-space: normal;
            padding-right: 5px !important;
            p{
              line-height: 20px;
              margin-bottom: 0;
            }
          }
          .detailOddPoint{
            width: auto;
            flex-shrink: 0;
          }
          .updown{
            -moz-animation: cssAnimation 0s ease-in 6s forwards;
            /* Firefox */
            -webkit-animation: cssAnimation 0s ease-in 6s forwards;
            /* Safari and Chrome */
            -o-animation: cssAnimation 0s ease-in 6s forwards;
            /* Opera */
            animation: cssAnimation 0s ease-in 6s forwards;
            -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
          }
        }
      }
      .detailOddPoint{
        width: 25px;
        position: relative;
        em{
          font-style: normal;
        }
      }
    }
    .helpIcon{
      margin-top: -2px;
    }
  }
  @keyframes cssAnimation {
    to {
      width:0;
      height:0;
      overflow:hidden;
    }
  }
  @-webkit-keyframes cssAnimation {
    to {
      width:0;
      height:0;
      visibility:hidden;
    }
  }
</style>
