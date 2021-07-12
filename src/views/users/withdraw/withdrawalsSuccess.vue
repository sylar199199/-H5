<template>
  <div>
    <i-lot-toolbar @goBack="goBackSet"></i-lot-toolbar>
    <div class="widthdraw-success pa-8 text-center">
      <!-- <img :src="./withdraw" alt=""> -->
      <GlSvgIcon iconClass="withdrawSuccess" class="icon mt-16" />
      <h6 class="mt-4 text-h6 font-weight-medium">Withdrawals Success！</h6>
      <p class="text-caption text-center grey--text text--darken-2">Withdrawals via bank transfer take up to 24 hours after authorisation and are only actioned during banking hours.</p>
      <v-btn
        color="#5DA400"
        class="rounded-sm white--text mt-16 text-capitalize"
        block
        large
        @click="confirm">
        Confirm
      </v-btn>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'withdrawSuccess',
  data() {
    return {}
  },
  components: {
  },
  created() {
    console.log(11)
  },
  mounted() {},
  methods: {
    confirm() {
      this.$router.push({
        name: 'account'
      })
    },
    goBackSet() {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="less" scoped>
.icon {
  font-size: 5rem;
}
</style>
