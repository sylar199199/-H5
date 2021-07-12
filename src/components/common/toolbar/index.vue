<template>
  <v-toolbar dense dark  color="primary" class="fixed-bar">
    <v-btn icon  @click="goBackEvent">
      <v-icon class="text-h4">mdi-chevron-left</v-icon>
    </v-btn>
    <v-toolbar-title class="pl-0">{{title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <v-btn icon  @click="$router.push({path: './home'})">
      <v-icon class="text-xl-h4">mdi-home-outline</v-icon>
    </v-btn> -->
    <v-btn
      text
      class="text-capitalize white--text"
      color="white"
      v-if="editProfile"
      @click="editFinish"
    >Finish</v-btn>
    <v-btn
      color="secondary"
      plain
      raised
      v-if="$route.name === 'account'"
      @click="logOut({routeName: 'hone'})"
    >Log out</v-btn>
  </v-toolbar>
</template>

<script type="text/javascript">
import { logOutMixins } from '@/mixins'
import {mapGetters} from 'vuex'
export default {
  name: 'toolbar',
  mixins: [logOutMixins],
  props: {
    changTitle: {
      type: String
    }
  },
  data() {
    return {
      title: ''
    }
  },
  components: {},
  computed: {
    ...mapGetters(['isLogin', 'editProfile']),
  },
  created() {
    if (this.changTitle && this.changTitle.length > 0) {
      this.title = this.changTitle
    } else {
      this.title = this.$route.meta && this.$route.meta.title
    }
    console.log(this.editProfile)
  },
  mounted() {},
  methods: {
    goBackEvent() {
      this.eventBus.$emit('closeLMT')
      this.$emit('goBack')
    },
    editFinish() {
      this.eventBus.$emit('editFinish', true)
    },
  },
  watch: {
    changTitle() {
      this.title = this.changTitle
    }
  }
}
</script>

<style lang="less" scoped>
.fixed-bar {
  height: 48px !important;
  max-height: 48px !important;
  position: sticky;
  top: 0;
  z-index: 99;
  /deep/ .v-toolbar__title{
    overflow: visible;
  }
}
</style>
