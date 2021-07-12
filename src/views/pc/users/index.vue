<template>
  <div class="users">
    <v-row class="users-container" justify="space-between" align="start">
      <v-col class="users-l">
        <AccountTools />
      </v-col>
      <v-col class="users-r">
        <CommonRouterView v-if="isLogin" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import AccountTools from './components/account-tools'
import { eventBus, debounce } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: '',
  components: {
    AccountTools
  },
  props: {},
  data() {
    return {
      isInit: false
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.toOther(from.path === '/')
    })
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  watch: {
    $route() {
      this.toOther(true)
    }
  },
  methods: {
    toOther: debounce(function (bl) {
      if (!this.isLogin) {
        if (bl) {
          this.$router.replace({
            name: 'pcSports'
          })
        }
        setTimeout(() => {
          eventBus.emit('loginShow', 'login')
        }, 500)
      }
    }, 2000)
  }
}
</script>

<style lang="less" scoped>
.users{
  margin-top: 10px;
  &-container{
    margin: 0 !important;
    >.col{
      flex: 0 0 auto;
      padding: 0 !important;
    }
  }
  &-l{
    width: 243px;
    background: #fff;
  }
  &-r{
    width: 747px;
    background: #fff;
  }
  /deep/ .v-toolbar{
    background-color: #fff !important;
    box-shadow: none !important;
    .v-toolbar__content{
      padding: 0 10px 0 5px !important;
    }
    i, .v-toolbar__title{
      color: @font-color1;
    }
    .v-toolbar__title{
      font-size: 16px;
      color: @font-color1;
      margin-left: -10px;
    }
    .secondary--text{
      display: none;
    }
  }
  /deep/ input{
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
}
</style>
