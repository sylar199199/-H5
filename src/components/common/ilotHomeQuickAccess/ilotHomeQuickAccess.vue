<template>
  <div :class="[iMarign,iPadding]" class="mr-0">
    <v-slide-group
      class=""
      center-active
      active-class="success"
    >
      <v-slide-item
        v-for="(item, n) in quickAccessData"
        :key="n"
        width="26%"
      >
        <v-card
          elevation="0"
          class="mr-sm-4 mr-2"
          :class="[{'light-blue lighten-1': n%4 === 0},{'teal lighten-1':n%4 ===1},{'orange lighten-2':n%4 ===2},{'green darken-1':n%4 ===3},iRounded]"
          max-width="180"
          width="26%"
          min-width="90"
          :aspect-ratio="18/11"
          @click="linkPage(item, n+1)"
        >
          <v-img :src="item.img" width="100%" :aspect-ratio="18/11" :class="iRounded"></v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>
<script>
  import quickAccessMixins from './mixins/quickAccessMixins'
  export default {
    name: 'ilotHomeQuickAccess',
    props: {
      accessData: {
        type: Array,
        default() {
          return []
        }
      },
      iMarign: {
        type: Array,
        default: function () {
          return ['ma-sm-4 ma-2']
        }
      },
      iPadding: {
        type: Array,
        default: function () {
          return ['pa-0']
        }
      },
      iRounded: {
        type: String,
        default: 'rounded'
      }
    },
    mixins: [quickAccessMixins],
    data() {
      return {
      }
    },
    computed: {
      quickAccessData() {
        return this.accessData.length ? this.accessData : this.list
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
