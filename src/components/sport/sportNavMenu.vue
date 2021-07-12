<template>
  <v-sheet
    elevation="0"
    class="sports-nav-menu mx-auto"
    color="grey lighten-4"
  >
    <v-slide-group
      center-active
      show-arrows
      class="sports-nav-menu-main white"
    >
      <v-slide-item
        class="sports-nav-menu-main-single"
        v-for="(item, index) in calcSportsList"
        :key="item.id"
      >
        <v-card
          color="transparent"
          class="pa-2 mx-2"
          elevation="0"
          @click="selectSport(item,index)"
          :class="model === item.sportId ? 'primary--text active' : ''"
        >
          <template v-if="type !== '2'">
            <!--prematch的样式-->
            <div class="d-flex justify-center" v-if="navType==='prematch'">
              <GlSvgIcon :class="model===item.sportId?'primary--text':'grey--text lighten-3'" :iconClass="item.name ? item.name.toLowerCase().replace(' ','') : ''" class="text-sm-h5 text-h6"/>
            </div>
            <!--live的样式-->
            <div class="d-flex justify-center" v-else-if="navType==='live'">
              <v-badge
                  :content="item.matchCount"
                  offset-y="15"
                  offset-x="5"
                  bordered
                  overlap
                  :color="model===item.sportId?'primary':'grey lighten-1'"
              >
                <GlSvgIcon :class="model===item.sportId?'primary--text':'grey--text lighten-3'" :iconClass="item.sportName.toLowerCase().replace(' ','')" class="text-sm-h5 text-h6"/>
              </v-badge>
            </div>
          </template>
          <!--prematch的样式-->
          <p :class="model===item.sportId?'primary--text':'grey--text lighten-3'" class="ma-0 text-center text-sm-subtitle-2 text-caption font-weight-regular">
            <span v-if="navType==='prematch'">{{ item.name }}</span>
            <span v-else>{{ item.sportName }}</span>
          </p>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'sportNavMenu',
    props: {
      navType: {
        type: String,
        default: 'prematch'
      },
      type: {
        type: String,
        default: '1' // default: 移动端； 2：pc端
      }
    },
    data() {
      return {
        sportsInfo: {},
        model: ''
      }
    },
    created() {
    },
    activated() {
      if (this.navType === 'live') {
        this.livesNavSocketio()
      }
    },
    deactivated() {
      this.stopLivesNavSocketio(this.navType)
    },
    beforeDestory() {
      this.stopLivesNavSocketio(this.navType)
    },
    computed: {
      ...mapGetters(['searchObj']),
      calcSportsList() {
        return this.sportsInfo[this.navType] || []
      }
    },
    watch: {
      navType: {
        immediate: true,
        handler(newVal, oldVal) {
          if (!this.searchObj.blSearch) {
            this.$store.commit('SET_SEARCHOBJ', null)
          } else {
            this.$store.commit('SET_SEARCHOBJ', {blSearch: false})
          }
          this.stopLivesNavSocketio(oldVal)
          this.model = 0
          this.getSportList()
          this.$emit('initPrematch')
          this.$emit('initLives')
        }
      },
      calcSportsList: {
        deep: true,
        handler(newVal, oldVal) {
          this.setModel()
        }
      },
      'searchObj.sportId': {
        handler(newVal, oldVal) {
          if (newVal !== oldVal && newVal) {
            this.setModel()
          }
        }
      }
    },
    methods: {
      // 获取sport列表
      getSportList() {
        if (this.calcSportsList.length) {
          if (this.navType === 'live') {
            this.livesNavSocketio()
          }
          return
        }
        if (this.navType === 'prematch') {
          this.sportBeting(this.navType)
        } else if (this.navType === 'live') {
          this.getLives(this.navType)
        } else {
          this.getCollectionSports(this.navType)
        }
      },
      // 获取prematch的sports菜单
      async sportBeting(navType) {
        const res = await this.$api.sportMenu({
          // message: '查询成功',
        })
        this.setSportsList(navType, res)
      },
      // 获取live的sports菜单
      async getLives(navType) {
        const res = await this.$api.livesMenu({
          // message: '查询成功',
        })
        this.setSportsList(navType, res)
        this.livesNavSocketio()
      },
      // 点击sport列表
      selectSport(val, index) {
        if (this.model === val.sportId) return
        this.model = val.sportId
        let obj = {
          sportId: val.sportId,
          sportName: val.name,
        }
        if (this.navType === 'live') {
          obj.sportName = val.sportName
        }
        this.$store.commit('SET_SEARCHOBJ', {...obj, init: true})
        this.$emit('initPrematch')
        this.$emit('initLives')
      },
      // 推送
      livesNavSocketio() {
        let _this = this
        let obj = {
          removeGroups: 'all',
          groups: 'liveSports',
          userToken: ''
        }
        // 发送消息给服务端订阅主题可用于初始化数据
        _this.$socketio.emit('sport_query_live_topic_v2', JSON.stringify(obj), (data) => {
          // console.log('侧边菜单栏推送')
          let arr = JSON.parse(data)
          this.setSportsList('live', arr, true)
        })
      },
      stopLivesNavSocketio(navType) {
        // 停止lives sports推送
        if (navType === 'live') {
          this.$socketio.off('sport_query_live_topic_v2')
        }
      },
      async getCollectionSports(navType) {
        const res = await this.$api.normalMenu({
          // message: '查询成功',
        })
        this.setSportsList(navType, res)
      },
      setSportsList(navType, res, bl) {
        if (res.code !== 0 && !bl) return
        this.$set(this.sportsInfo, navType, res.data || [])
      },
      setModel() {
        if (!this.calcSportsList || !this.calcSportsList.length) return
        let hasSame = false
        if (this.searchObj && this.searchObj.sportId !== '') {
          this.calcSportsList.forEach((val, index) => {
            if (this.searchObj.sportId === val.sportId) {
              hasSame = true
              this.model = val.sportId
            }
          })
        }
        if (!hasSame) {
          let obj = {
            sportId: this.calcSportsList[0].sportId,
            sportName: this.calcSportsList[0].name,
          }
          this.$store.commit('SET_SEARCHOBJ', {...obj, init: true})
          this.$emit('initPrematch')
          this.$emit('initLives')
          this.model = this.calcSportsList[0].sportId
        }
      }
    }
  }
</script>

<style lang="less" scoped>
/deep/.v-badge__badge{
  width: auto;
  height: auto;
  min-width: auto;
  padding: 2px 5px;
}
</style>
