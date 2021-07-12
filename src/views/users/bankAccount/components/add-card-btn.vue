<template>
  <v-btn
      color="primary"
      class="rounded-sm white--text text-subtitle-1  text-capitalize  mb-16 font-weight-bold"
      block
      outlined
      large
      style="border-style: dashed"
      @click="addBank"
  >
    <v-icon left>
      mdi-plus-circle-outline
    </v-icon>
    Add Bank Card
  </v-btn>
</template>
<script>
import { mapGetters } from 'vuex'
import { eventTracking, eventKey } from '@/utils/fireBase'
export default {
  name: '',
  components: {},
  props: {
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['loginInfo', 'platformName'])
  },
  methods: {
    async addBank() {
      let fireObj = {
        clickOn: 'Add'
      }
       // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_ADD_BANK_CARDT, '', fireObj)
      let routeName = ''
      let query = {}
      if (this.loginInfo.first === undefined || this.loginInfo.first) {
        await this.$store.dispatch('getLoginInfo', true)
      }
      if (this.loginInfo.first) {
        query = {
          tab: 'payment',
          model: 'set'
        }
        if (this.$isPc) {
          routeName = 'pcChangePassword'
        } else {
          routeName = 'paymentPassword'
        }
      } else {
        routeName = 'addBankCard'
        // if (this.loginInfo.bvn !== '') {
        //   routeName = 'addBankCard'
        // } else { // 跳转到修改用户信息页面
        //   routeName = 'editProfile'
        // }
      }
      this.$router.push({
        name: routeName,
        query: {
          ...query
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
