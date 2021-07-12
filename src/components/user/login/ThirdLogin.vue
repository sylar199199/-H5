<template>
  <div class="other-types">
    <CommonDivider class="other-types-divider" text="Or" />

    <div class="other-types-ways">
      <FacebookLogin />
    </div>
  </div>
</template>
<script>
import CommonDivider from '@/components/common/commonDivider'
import FacebookLogin from './ThirdLogin/FacebookLogin'
export default {
  components: {
    CommonDivider,
    FacebookLogin
  },
  props: {},
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
.other-types{
  padding-bottom: 19px;
  &-divider{
    margin-bottom: 12px;
  }
}
</style>
