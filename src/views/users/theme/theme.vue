<template>
  <div class="myTheme">
    <i-lot-toolbar class="fixed-bar" @goBack="$router.go(-1)"></i-lot-toolbar>
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
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
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
          accent: '#EAEBEC',
        }
      } else if (name === 'blue') {
        this.$vuetify.theme.dark = false
        this.$vuetify.theme.themes.light = {
          primary: '#409eff',
          secondary: '#ECF5FF',
          accent: '#EAEBEC',
        }
      } else if (name === 'orange') {
        this.$vuetify.theme.dark = false
        this.$vuetify.theme.themes.light = {
          primary: '#ff5722',
          secondary: '#FFEEE8',
          accent: '#EAEBEC',
        }
      }
      console.log(this.$vuetify.theme)
    },
  }
}
</script>


<style lang="less" scoped>
</style>
