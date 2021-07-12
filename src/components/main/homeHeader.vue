
<template>
  <v-app-bar app color="primary">
    <v-container class="primary pa-0">
      <v-app-bar class="header-bar" color="primary" flat dark v-if="$route.name === 'sports'">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-app-bar-title class="pa-0">iLOT</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="window.isApp?!(window.App.isLogin):!this.$store.state.isLogin" class="ma-2 text-capitalize" outlined @click="$router.push({name: 'register'})">{{$t('navList.SINGUP')}}</v-btn>
        <v-btn v-if="window.isApp?!(window.App.isLogin):!this.$store.state.isLogin" class="ma-2 primary--text text-capitalize" depressed light @click="$router.push({name: 'login'})">{{$t('navList.LOGIN')}}</v-btn>
        <v-btn icon v-if="window.isApp?(window.App.isLogin):this.$store.state.isLogin" @click="$router.push({name: 'message'})">
          <v-badge
            color="red"
            :content="msgTotalNum"
            offset-x="10"
            offset-y="10"
            value="msgTotalNum"
          >
            <v-icon class="text-xl-h4">mdi-bell</v-icon>
          </v-badge>
        </v-btn>
        <v-btn icon v-if="this.$store.state.isLogin" @click="$router.push({name: 'account'})">
          <v-icon class="text-xl-h4">mdi-account</v-icon>
        </v-btn>
        <!--切换主题-->
        <v-menu open-on-hover top offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="text-capitalize"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              {{$t('navList.TOGGLE-THEME')}}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="toggleTheme('dark')">
              <v-list-item-title>{{$t('themeColor.DARK')}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="toggleTheme('green')">
              <v-list-item-title>{{$t('themeColor.GREEN')}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="toggleTheme('blue')">
              <v-list-item-title>{{$t('themeColor.BLUE')}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="toggleTheme('orange')">
              <v-list-item-title>{{$t('themeColor.ORANGE')}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-app-bar class="header-bar" color="primary" flat dark v-else>
        <v-btn icon  @click="goBack">
          <v-icon class="text-h4">mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title class="pl-0">{{toolbarName}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon  v-if="$route.name !== 'account'"  @click="$router.push({path: './home'})">
          <v-icon class="text-xl-h4">mdi-home-outline</v-icon>
        </v-btn>
        <v-btn
          color="secondary"
          plain
          raised
          v-if="$route.name === 'account'"
          @click="logOut({routeName: 'hone'})"
        >Log out</v-btn>
        <v-btn
          color="white"
          text
          class="white--text"
          v-if="editProfile"
          @click="editFinish"
        >Finish</v-btn>
      </v-app-bar>
    </v-container>
  </v-app-bar>
</template>

<script>
import { logOutMixins } from '@/mixins'
import {mapGetters, mapMutations} from 'vuex'
export default {
  components: {},
  mixins: [logOutMixins],
  data() {
    return {
      links: [
        {
          label: this.$t('navList.HOME'),
          url: '/'
        },
        {
          label: this.$t('navList.LOGIN'),
          url: '/login'
        },
        {
          label: this.$t('navList.SINGUP'),
          url: '/signup'
        },
      ],
      items: [
        {
          id: 1,
          type: 'zh',
          title: this.$t('MESSAGE-ZH')
        },
        {
          id: 2,
          type: 'en',
          title: this.$t('MESSAGE-EN')
        },
        {
          id: 3,
          type: 'ko',
          title: this.$t('MESSAGE-KO')
        },
      ],
      msgTotalNum: 0,
      toolbarName: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'loginInfo', 'triggerBalance', 'editProfile']),
    listenIndex () {
      return this.$store.state.homeIndex
    }
  },
  watch: {
    '$route': {
      handler(newVal, oldVal) {
        this.getMsgNum()
      }
    },
    deep: true
  },
  created() {
    this.toolbarName = this.$route.meta && this.$route.meta.title
  },
  mounted() {
    this.getMsgNum()
    this.eventBus.$on('toolbarName', data => {
      if (data) {
        this.toolbarName = `Edit ${data}`
      } else {
        this.toolbarName = this.$route.meta && this.$route.meta.title
      }
    })
  },
  methods: {
    ...mapMutations(['EDIT_PROFILE']),
    // 切换主题颜色
    toggleTheme(name) {
      console.log('切换颜色')
      console.log(this.$vuetify)
      if (name === 'dark') {
        this.$vuetify.theme.dark = false
        this.$vuetify.theme.themes.light.primary = '#34495E'
      } else if (name === 'green') {
        this.$vuetify.theme.dark = false
        this.$vuetify.theme.themes.light = {
          primary: '#5da400',
          secondary: '#EEF6E5',
          // accent: '#5da400',
        }
      } else if (name === 'blue') {
        this.$vuetify.theme.dark = false
        this.$vuetify.theme.themes.light = {
          primary: '#409eff',
          secondary: '#ECF5FF',
          // accent: '#5da400',
        }
      } else if (name === 'orange') {
        this.$vuetify.theme.dark = false
        this.$vuetify.theme.themes.light = {
          primary: '#ff5722',
          secondary: '#FFEEE8',
          // accent: '#5da400',
        }
      }
      console.log(this.$vuetify.theme)
    },
    // 切换语言
    changeType(type) {
      this.$store.commit('editLanges', type)
      this.$i18n.locale = this.$store.state.langeType
    },
    // 获取未读消息数量
    async getMsgNum(val) {
      let LoginStatus = this.isLogin
      if (window.isApp) {
        LoginStatus = window.App.isLogin
      }
      if (LoginStatus) {
        const res = await this.$api.msgNum({
          data: {
            userAccount: this.loginInfo.playerAccount
          }
        })
        if (res.code !== 0) return
        this.msgTotalNum = res.data
      }
    },
    editFinish() {
      this.eventBus.$emit('editFinish', true)
    },
    goBack() {
      // this.$emit('goBack')
      if (this.editProfile) {
        this.EDIT_PROFILE(false)
        this.eventBus.$emit('editFinish', false)
        this.toolbarName = this.$route.meta && this.$route.meta.title
      } else {
        this.$router.go(-1)
      }
    }
  },
}
</script>

<style lang="less" scoped>
.header-bar {
  /deep/ .v-toolbar__content {
    padding: 0
  }
}
</style>
