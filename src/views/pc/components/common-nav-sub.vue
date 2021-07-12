<template>
  <v-list class="common-nav-sub" :class="{'home': calcIsHome}">
    <v-list-item-group
      color="primary"
      ref="subNav"
    >
      <v-list-item
          v-for="item in subNavList"
          :key="item.text"
          height="30"
          @click="linkPage(item)"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
import quickAccessMixins from '@/components/common/ilotHomeQuickAccess/mixins/quickAccessMixins'
export default {
  name: '',
  components: {},
  props: {
  },
  mixins: [quickAccessMixins],
  data() {
    return {
      subNavList: [
        {
          name: '2 Hours Football',
          text: '2 Hours Football',
          to: 'pcSports',
          query: {
            searchType: 1
          }
        },
        {
          name: 'Today’s football',
          text: 'Today’s football',
          to: 'pcSports',
          query: {
            searchType: 2
          }
        },
        {
          name: '3D',
          text: '3D'
        },
        {
          name: '90Select5',
          text: '5/90'
        },
        {
          name: 'Football 14',
          text: 'Football 14'
        },
        {
          name: 'World Cup Qualification',
          text: 'World Cup Qualification',
          to: 'pcSports',
          query: {
            searchType: 3
          }
        },
        {
          name: 'NBAs',
          text: 'NBA',
          to: 'pcSports',
          query: {
            searchType: 4
          }
        }
      ]
    }
  },
  computed: {
    calcIsHome() {
      return this.$route.name === 'pcHome'
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.common-nav-sub{
  position: absolute;
  width: 100%;
  left: 0;
  height: 230px;
  top: 100%;
  transition: all linear .3s;
  overflow: hidden;
  background: rgba(0, 0, 0, .5) !important;
  &.home{
    height: 260px;
  }
  .v-list-item{
    height: 30px !important;
    min-height: 0 !important;
    padding: 0 20px;
    .v-list-item__title{
      font-size: 14px;
      color: #fff;
    }
    &:hover{
      background: #fff;
      .v-list-item__title{
        color: @primary;
      }
    }
  }
}
</style>
