<template>
  <v-list flat dense min-height="40" class="payment-selector pt-0">
    <v-list-item-group
        color="primary"
        style="height:35vh; overflow-y:auto"
    >
      <template v-for="(item, index) in companys">
        <v-list-item :key="'companys' + index" class="payment-selector-single pl-0 pr-0" :ripple="false" @click="$emit('changeSelect', item)">
          <template v-slot:default="{ active }">
            <v-list-item-content>
              <v-list-item-title class="text-sm-subtitle-2 text-caption" v-text="item.payTypeName"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon
                  v-if="!active"
                  small
                  color="grey lighten-2"
              >
                mdi-radiobox-blank
              </v-icon>
              <v-icon
                  v-else
                  small
                  color="primary lighten-1"
              >
                mdi-radiobox-marked
              </v-icon>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider
            v-if="index < companys.length - 1"
            :key="index"
            class="grey lighten-3"
        ></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    companys: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

</style>
