<template>
  <div class="change-password">
    <v-tabs class="change-password-tools" color="primary" v-model="tab">
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab
        class="text-capitalize"
        v-for="item in tabList"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items class="change-password-container" v-model="tab">
      <v-tab-item>
        <RetrievePassword title="Change Login Password" moduleType="7" />
      </v-tab-item>
      <v-tab-item>
        <PaymentPassword title="Change Payment Password" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import RetrievePassword from '@/views/users/retrievePassword/retrievePassword'
import PaymentPassword from '@/views/users/paymentPassword/paymentPassword'
export default {
  components: {
    RetrievePassword,
    PaymentPassword
  },
  props: {},
  data() {
    return {
      tabList: ['Login password', 'Payment password'],
      tab: null
    }
  },
  created() {
  },
  mounted() {
    if (this.$route.query.tab === 'payment') {
      this.tab = 1
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.change-password{
  padding-bottom: 50px;
  &-tools{
    height: 60px;
    padding: 0 20px;
    border-bottom: 1px solid @dividing-line-color;
    /deep/ .v-tab{
      margin-right: 88px;
      font-size: 16px;
      color: @font-color2;
      &.v-tab--active{
        color: @primary;
      }
    }
  }
  &-container{
    /deep/ .v-toolbar{
      display: none;
    }
    /deep/ .change-password{
      &-tit{
        font-size: 24px !important;
        font-weight: 500 !important;
      }
      &-subtit{
        font-size: 12px;
        color: @font-color3;
        margin-bottom: 40px;
      }
      &-form{
        margin: 0 164px;
        width: auto;
        &-input{
          .v-input__slot{
            height: 50px !important;
          }
        }
        .send-msg{
          line-height: 36px;
          cursor: pointer;
          color: @primary;
        }
        &-btn{
          height: 50px;
        }
      }
    }
  }
}
</style>
