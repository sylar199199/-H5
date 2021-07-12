<template>
  <div class="withdraw">
    <Withdraw type="2" />
  </div>
</template>
<script>
import Withdraw from '@/views/users/withdraw/withdraw'
export default {
  name: 'pcWithdraw',
  components: {
    Withdraw
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
.withdraw{
  background: #fff;
  /deep/ .recharge{
    &-form{
      padding-bottom: 50px !important;
      &-single{
        display: flex;
        &.first{
          margin-bottom: 30px;
        }
        &-l{
          width: 140px;
          height: 50px;
          font-size: 14px;
          color: @font-color1;
          line-height: 50px;
          text-align: right;
          margin: 0 20px 0 0 !important;
          >p{
            width: 100%;
            font-size: 14px;
            color: @font-color1;
            line-height: 50px;
            text-align: right;
          }
        }
        &-r{
          flex-grow: 1;
          flex-direction: column;
          position: relative;
          margin: 0 !important;
          &-add{
            cursor: pointer;
            input{
              color: @font-color1 !important;
            }
          }
          .v-input__slot{
            height: 50px;
            min-height: auto;
          }
          &.bank-select{
            .back-list-content{
              position: absolute;
              z-index: 99;
              width: 100%;
              height: 0;
              max-height: 60vh;
              left: 0;
              top: 52px;
              background: #FFFFFF;
              box-shadow: 0 0 4px 0 #999999;
              border-radius: 4px;
              opacity: 0;
              transition: all linear .3s;
              &.active{
                height: 200px;
                max-height: 600px;
                opacity: 1;
              }
              .v-toolbar{
                display: none;
              }
              .v-list{
                height: calc(100% - 84px);
                overflow-x: hidden;
                overflow-y: auto;
              }
              &-add{
                margin-bottom: 0 !important;
              }
            }
          }
        }
      }
      &-tips{
        margin-left: 160px;
      }
      &-btn{
        width: 160px;
        min-width: auto !important;
        height: 50px;
        margin: 0 160px !important;
        .v-btn__content{
          font-size: 18px;
        }
      }
    }
  }
}
</style>
