<template>
  <div class="sports-search d-flex justify-end align-center">
    <input class="sports-search-input" maxlength="50" type="text" placeholder="Team" v-model="searchName" />
    <v-btn
      class="sports-search-btn font-weight-medium"
      width="48"
      height="36"
      color="primary"
      @click="search">
      <v-icon class="search-btn-icon" size="26">mdi-magnify</v-icon>
    </v-btn>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {},
  data() {
    return {
      searchName: ''
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['searchObj'])
  },
  watch: {
    'searchObj.searchName': {
      deep: true,
      handler(newVal) {
        if (!newVal) this.searchName = ''
      }
    }
  },
  methods: {
    search() {
      this.$store.commit('SET_SEARCHOBJ', {
        searchName: this.searchName,
        sportId: this.searchObj.sportId,
        init: true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sports-search{
  padding: 15px 10px 5px;
  background: #fff;
  &-input{
    width: 140px;
    height: 36px;
    outline: none;
    background: @bg-color;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 12px;
    border-radius: 4px 0 0 4px;
    &::placeholder{
      color: @font-color3;
    }
  }
  &-btn{
    box-shadow: none !important;
    border-radius: 0 4px 4px 0;
    .v-btn__content{
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
