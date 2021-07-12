<template>
  <div class="advertisement">
    <IlotActivityOperation activityType="lottery" />
  </div>
</template>

<script>
import IlotActivityOperation from '@/components/common/ilotActivityOperation'
export default {
  components: {
    IlotActivityOperation
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
.advertisement{
  height: 230px;
  background: #fff;
  /deep/ .v-card{
    height: 100% !important;
    > .v-image{
      height: 100% !important;
      .v-image__image{
        background-size: 100% 100% !important;
      }
    }
  }
}
</style>
