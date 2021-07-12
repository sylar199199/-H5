<template>
  <div class="on-sale" >
    <template v-for="(item, index) in lotteriesList">
      <OnSaleSingle :key="item.key + '_' + index" :index="index" :saleInfo="item" :type="type" v-on="$listeners" />
    </template>
    <v-card class="mb-2" style="padding-bottom: 48px" flat v-if="type === '1'">
      <ILotHotNews module-name="Lottery" style="padding-left: 16px; padding-top: 10px;padding-right: 16px" />
    </v-card>
  </div>
</template>

<script type="text/javascript">
import ILotHotNews from '@/components/common/iLotHotNews/ILotHotNews'
import OnSaleSingle from './onSaleSingle'
export default {
  name: 'onSale',
  components: {
    ILotHotNews,
    OnSaleSingle
  },
  props: {
    lotteriesList: {
      type: Array
    },
    type: {
      type: String,
      default: '1' // 1: 移动端； 2：pc端
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    loadOver() {
      this.$emit('loadOver')
    }
  }
}
</script>

<style lang="less" scoped>
.shared-img {
  height: 20vw;
}
  .avatar-border{
    border:2px solid @disable-color;
  }
</style>
