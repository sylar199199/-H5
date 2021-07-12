<template>
  <div class="message-num">
    <template v-if="module === 'top'">
      <v-badge :content="msgNum" bordered overlap :class="msgNum > 0 ? '' : 'hide'">
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </template>
    <template v-else-if="msgNum > 0">
      <span class="ml-2 pl-2 pr-2 rounded-pill primary white--text messages">{{msgNum}}</span>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    module: {
      default: ''
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['isLogin', 'msgNum'])
  },
  watch: {
    'isLogin': {
      immediate: true,
      handler() {
        if (this.isLogin) {
          this.$store.dispatch('getMsgNum')
        }
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.message-num{
  /deep/ .hide .v-badge__badge{
    display: none;
  }
  /deep/ .v-badge__badge{
    height: 14px;
    line-height: 14px;
    padding: 0 2px !important;
  }
}
</style>
