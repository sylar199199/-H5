<template>
  <v-sheet
    elevation="0"
    class="pb-sm-2 pb-0 mx-auto menu-list"
    color="grey lighten-4"
  >
    <v-slide-group
      center-active
      show-arrows
      class="white"
      v-model="model"
    >
      <v-slide-item
        v-for="item in sportsList"
        :key="item.id"
        v-slot="{ active, toggle }"
        @change="selectSport(item)"
      >
        <v-card
          color="transparent"
          class="ml-2 my-2"
          elevation="0"
          @click="toggle"
          active-class="primary--text text-capitalize"
        >
          <v-btn
            depressed
            small
            color="primary"
            class="text-sm-body-2 text-caption text-capitalize"
            v-if="onSportId === item.sportId"
            active-class="text-capitalize"
          >
            {{item.name}}
          </v-btn>
          <v-btn
            small
            text
            v-else
            class="sportName text-sm-body-2 text-caption text-capitalize"
          >
            {{item.name}}
          </v-btn>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
  export default {
    name: 'sportsMenu',
    props: {
      firstSportId: {
        type: String,
        default: ''
      },
      // 请求所有赛事的菜单包括 赛前 赛中
      normalMenu: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        sportsList: [],
        model: 0,
        onSportId: ''
      }
    },
    watch: {
      firstSportId(newValue, oldValue) {
        this.onSportId = newValue
      },
      deep: true
    },
    computed: {
    },
    created() {
      this.sportBeting()
    },
    methods: {
      // 获取prematch的sports菜单
      async sportBeting() {
        let apiStr = this.normalMenu ? 'normalMenu' : 'sportMenu'
        const res = await this.$api[apiStr]({
        })
        if (res.code !== 0) return
        this.sportsList = res.data
        if (this.sportsList.length) {
          this.selectSport(this.onSportId ? {sportId: this.onSportId} : this.sportsList[0])
        }
      },
      // 点击sport列表
      selectSport(val) {
        this.onSportId = val.sportId
        this.$emit('sportsChange', this.onSportId)
      },
    }
  }
</script>

<style lang="less" scoped>
  .menu-list{
  }
.sportName{
  // line-height: 28px;
}
  /deep/.v-card--link:focus:before{
    background-color: transparent;
    opacity: 0 !important;
  }
</style>
