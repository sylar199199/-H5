<template>
  <div class="search-btn" v-ripple @click.prevent="changeSearchState">
    <v-icon class="search-btn-icon" size="26">mdi-magnify</v-icon>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {},
  data() {
    return {
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapGetters(['blShowSearchInput'])
  },
  methods: {
    init() {
      if (this.blShowSearchInput) this.$store.commit('SET_BL_SHOW_SEARCH_INPUT', false)
    },
    changeSearchState() {
      if (this.$route.name !== 'pcSearch') {
        this.$store.commit('SET_BL_SHOW_SEARCH_INPUT', !this.blShowSearchInput)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-btn{
  padding: 5px;
  cursor: pointer;
}
</style>
