<template>
  <div class="back-list-content" :class="calcShow ? 'active' : ''" v-click-outside="hideDialog">
    <v-toolbar
        dense
        flat>
      <v-toolbar-title class="font-weight-bold text-body-2">Please select a Account Number</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon
          width="16"
          height="16"
          class="mr-0 text-h6 grey--text text--lighten-1"
          @click="calcShow = false">
        mdi-close-circle
      </v-icon>
    </v-toolbar>
    <v-divider color="#EAEBEC"></v-divider>
    <v-list flat class="back-list-content-list pt-0 list">
      <v-list-item-group
          color="primary"
          v-if="accountList.length"
      >
        <div
            v-for="(item, index) in accountList"
            :key="index"
        >
          <v-list-item
              @change="changeBank(item)">
            <v-list-item-content>
              <v-list-item-title class="text-body-2 font-weight-medium" v-text="item.bankName"></v-list-item-title>
              <v-list-item-subtitle class="text-body-2 font-weight-medium" v-text="item.cardCode"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="ml-0" v-if="selectBank.cardCode == item.cardCode">
              <v-btn icon>
                <v-icon class="mr-n4 primary--text darken-1 text-subtitle-1">mdi-radiobox-marked</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0" v-else>
              <v-btn icon>
                <v-icon class="mr-n4 grey--text darken-1 text-subtitle-1">mdi-radiobox-blank</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider class="ml-4 mr-4" color="#EAEBEC"></v-divider>
        </div>
      </v-list-item-group>
      <p v-else class="mt-16 text-center">No Card</p>
    </v-list>
    <v-row class="mt-4 ml-4 mr-4">
      <AddCardBtn />
    </v-row>
  </div>
</template>
<script type="text/javascript">
import AddCardBtn from '@/views/users/bankAccount/components/add-card-btn'
import { dialogMixin } from '@/mixins'
export default {
  name: 'withdraw',
  components: {
    AddCardBtn
  },
  mixins: [dialogMixin],
  props: {
    accountList: {
      type: Array,
      default() {
        return []
      }
    },
    selectBank: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  mounted() {},
  methods: {
    changeBank(val) {
      if (val) {
        this.$emit('changeBank', val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.back-list-content {
  position: absolute;
  max-height: 60%;
  bottom: 0;;
  background: #fff;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  .list {
    height: 70%;
    overflow-y: scroll;
  }
}
</style>
