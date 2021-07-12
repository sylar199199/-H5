<template>
  <div class="recharge-success">
    <RechargeSuccess type="2" />
  </div>
</template>
<script>
import RechargeSuccess from '@/views/users/recharge/rechargeSuccess'
export default {
  name: 'pcRecharge',
  components: {
    RechargeSuccess
  },
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
  methods: {
  }
}
</script>

<style lang="less" scoped>
.recharge-success{
  background: #fff;

}
</style>
