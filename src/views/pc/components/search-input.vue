<template>
  <div class="search-input" :class="calcShow ? 'active' : ''">
    <div class="search-input-main">
      <v-text-field
        v-model="calcSearchName"
        placeholder="Search"
        height="65"
        oninput="if(value.length>50)value=value.slice(0,50)"
        outlined
        clearable
        @keydown.enter="goSearch()"
      >
        <v-icon slot="prepend" class="mt-1 pl-3" @click.stop.prevent="goSearch">mdi-magnify</v-icon>
      </v-text-field>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['blShowSearchInput', 'searchKey']),
    isSearchPage() {
      return this.$route.name === 'pcSearch'
    },
    calcShow() {
      return this.isSearchPage || this.blShowSearchInput
    },
    calcSearchName: {
      get() {
        return this.searchKey
      },
      set(val) {
        this.$store.commit('SET_SEARCH_KEY', val)
      }
    }
  },
  methods: {
    goSearch() {
      if (!this.isSearchPage) {
        this.$router.push({
          name: 'pcSearch',
          params: {
            searchKey: this.calcSearchName
          }
        })
      } else {
        this.$store.commit('SET_SEARCH_STATE', true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-input{
  position: absolute;
  width: 100%;
  min-width: @pc-width;
  height: 0;
  left: 0;
  bottom: 0;
  background: #fff;
  box-sizing: border-box;
  transform: translateY(100%);
  overflow: hidden;
  transition: all linear .3s;
  &.active{
    padding-top: 40px;
    height: 144px;
  }
  &-main{
    width: 580px;
    height: 65px;
    margin: 0 auto;
    box-shadow: 0 0 8px 0 #C3C3C3;
    border-radius: 4px;
    /deep/ fieldset{
      display: none;
    }
    /deep/ .v-input__prepend-outer{
      margin-top: 9px;
      padding-top: 9px;
      button{
        padding-left: 0 !important;
        margin-left: 12px !important;
      }
    }
  }
  .v-input__slot:before{
    display: none;
  }
  .v-input__slot:after{
    display: none;
  }
  .v-text-field{
    margin-top: 0;
    padding-top: 0;
  }
}
</style>
