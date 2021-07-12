<template>
  <div class="affiliates">
    <AffiliatesTop />

    <v-divider class="affiliates-divider"></v-divider>

    <Affiliates type="2" />
  </div>
</template>
<script>
import AffiliatesTop from './components/affiliates-top'
import Affiliates from '@/views/users/affiliates/affiliates'
export default {
  name: 'pcAffiliates',
  components: {
    AffiliatesTop,
    Affiliates
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
.affiliates{
  &-divider{
    margin: 0 20px;
  }
  /deep/ .affiliates{
    padding: 0;
    &-bg{
      display: none;
    }
    &-card{
      height: 134px;
      box-shadow: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 10px solid @bg-color;
      padding: 0 20px;
      margin: 0;
      &-t{
        border-right: 1px solid @dividing-line-color;
        padding: 0 30px 0 10px;
        .affiliates-card-money{
          margin-bottom: 0;
        }
      }
      &-num{
        font-size: 14px;
        color: @font-color2;
        margin-bottom: 0;
        span{
          display: block;
          font-size: 30px;
          font-weight: bold !important;
          color: @font-color1;
          margin-top: 10px;
        }
      }
      &-btns{
        &-btn{
          width: 150px;
          margin-left: 20px;
        }
      }
    }
    &-link{
      padding: 0 20px;
      &-tit{
        padding: 20px 0;
        border-bottom: 1px solid @bg-color;
        margin-bottom: 30px;
      }
      &-li{
        &-content{
          height: 42px;
          margin-right: 20px;
          i{
            margin: 0 10px;
          }
          input{
            font-size: 14px;
            color: @font-color1;
          }
        }
        &-copy{
          width: 110px !important;
          height: 42px !important;
          margin-right: 17px;
          .v-btn__content{
            font-size: 16px;
          }
        }
      }
    }
    .transfer-dialog{
      &-card{
        &-main{
          &-tit{
            font-size: 20px;
            line-height: 28px;
          }
          &-content{
            font-size: 14px;
            line-height: 24px;
          }
        }
      }
    }
  }
}
</style>
