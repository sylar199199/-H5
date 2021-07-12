<template>
  <div class="message">
    <Message ref="message" />

    <LoadMore @loadMore="loadMore"/>
  </div>
</template>
<script>
import Message from '@/views/users/message/message'
import LoadMore from '@/components/pc/load-more'
export default {
  components: {
    Message,
    LoadMore
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
    loadMore() {
      this.$refs.message.loadMore()
    }
  }
}
</script>

<style lang="less" scoped>
.message{
  padding: 20px 10px;
  /deep/ .v-toolbar{
    display: none;
  }
  /deep/ .message{
    padding: 0;
    &-content{
      &-single{
        &-time{
          height: 36px;
          line-height: 36px;
          box-sizing: border-box;
          padding: 0 28px !important;
          font-size: 16px;
          color: @font-color2;
        }
        .v-list{
          &-item{
            padding: 0 0 0 24px !important;
          }
        }
        .v-divider{
          margin-left: 24px !important;
          margin-right: 0 !important;
        }
        &-content{
          padding: 20px 0;
          >i{
            width: 12px;
            height: 12px;
            border-radius: 12px;
            left: 0;
          }
          .v-list-item__title{
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }
          .v-list-item__subtitle{
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }
  }
}
</style>
