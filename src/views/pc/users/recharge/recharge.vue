<template>
  <div class="recharge">
    <i-lot-toolbar @goBack="goBackSet"></i-lot-toolbar>
    <Recharge type="2" />
  </div>
</template>
<script>
import Recharge from '@/views/users/recharge/recharge'
export default {
  name: 'pcRecharge',
  components: {
    Recharge
  },
  props: {
  },
  data() {
    return {
      blGoBack: false
    }
  },
  created() {
  },
  mounted() {
  },
  activated() {
    this.blGoBack = false
  },
  beforeRouteLeave(to, from, next) {
    if (this.blGoBack && to.name !== 'pcEditProfile') {
      next({
        name: 'pcEditProfile'
      })
    } else {
      next()
    }
  },
  methods: {
    goBackSet() {
      this.blGoBack = true
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.recharge{
  background: #fff;
  /deep/ .recharge{
    padding: 0 20px 40px 0 !important;
    &-model{
      display: flex;
      padding: 20px 20px 20px 0 !important;
      &.phone{
        padding-bottom: 0 !important;
        .v-text-field__details{
          display: none;
        }
      }
      &-l{
        flex-shrink: 0;
        width: 190px;
        font-size: 14px;
        line-height: 42px;
        text-align: right;
        white-space: nowrap;
        margin: 0 30px 0 0 !important;
      }
      &-r{
        flex-grow: 1;
        &.money{
          >span{
            width: calc(33.33% - 13px);
            height: 42px;
            margin: 10px 0 !important;
            &:last-child{
              color: rgba(93, 164, 0, .54) !important;
            }
            .v-chip__content span{
              font-weight: bold;
            }
          }
        }
        &.selector{
          >div{
            height: auto !important;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          }
          hr{
            display: none;
          }
          .payment-selector-single{
            width: calc(50% - 6px);
            height: 42px;
            min-height: auto;
            flex: 0 0 auto;
            background: @bg-color;
            box-sizing: border-box;
            padding: 0 10px !important;
            margin-bottom: 12px;
            border-radius: 4px;
            transition: all linear .3s;
            border: 1px solid @bg-color;
            &:before{
              opacity: 0;
            }
            i{
              color: @font-color4 !important;
            }
            .v-list-item__title{
              font-size: 14px;
              color: @font-color1;
            }
            &.v-item--active{
              background: none;
              border: 1px solid @primary;
              i{
                color: @primary !important;
              }
            }
          }
        }
      }
    }
    .phone-tips{
      margin: 10px 0 20px 220px;
    }
    &-btn{
      width: 160px;
      min-width: auto !important;
      height: 50px;
      margin: 0 220px !important;
      .v-btn__content{
        font-size: 18px;
      }
    }
  }
}
</style>
