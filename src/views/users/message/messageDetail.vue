<template>
  <div class="msg-detail" ref="msgDetail">
    <i-lot-toolbar @goBack="goBackSet"></i-lot-toolbar>
    <div class="pa-4">
      <div class="msg-detail-tit font-weight-medium">
        {{msgDetailInfo.messageName}}
      </div>
      <v-list-item-subtitle
        class="text-caption  grey--text text-lighten-2"
        v-text="msgDetailInfo.createDate">
      </v-list-item-subtitle>
      <p class="text-justify  mt-2" v-html="msgDetailInfo.content" style="word-wrap:break-word;" >
        <!--{{msgDetailInfo.content}}-->
      </p>
    </div>
  </div>
</template>

<script type="text/javascript">
import storage from '@/utils/storage'
export default {
  name: 'messageDetail',
  props: {
    // msgContent: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  data() {
    return {
      msgDetailInfo: {}
    }
  },
  components: {},
  created() {},
  mounted() {
    this.$refs.msgDetail.scrollTop = 0
    this.getMsg()
  },
  methods: {
    getMsg() {
     this.msgDetailInfo = storage.session.get('msgDetailInfo')
    },
    goBackSet () {
      this.$router.go(-1)
    }
  },
  beforeDestroy() {
    storage.session.remove('msgDetailInfo')
  },
}
</script>

<style lang="less" scoped>
.msg-detail {
  position: absolute;
  // top: 112px;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  background: #fff;
  @media screen and (min-width: 1024px) {
    top: 64px;
  }
  &-tit{
    width: 100%;
    overflow: hidden;
    word-break: break-word;
  }
}
</style>
