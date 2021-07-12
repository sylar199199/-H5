<template>
  <div class="affiliates-users-num">Add users <span class="font-weight-medium">{{ num }}</span></div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'affiliates',
  components: {
  },
  props: {},
  data() {
    return {
      num: 0
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['agentInfo'])
  },
  watch: {
    agentInfo: {
      deep: true,
      immediate: true,
      handler() {
        if (this.agentInfo.agentToken) {
          this.getAffiliatesUsersNum()
        }
      }
    }
  },
  methods: {
    async getAffiliatesUsersNum() {
      const res = await this.$api.playerCount({
        token: this.agentInfo.agentToken,
        data: {
        }
      })
      if (res.code !== 0) return
      this.num = res.data || 0
    }
  }
}
</script>

<style lang="less" scoped>
.affiliates-users-num{
  font-size: 15px;
  span{
    color: @primary;
  }
}
</style>
