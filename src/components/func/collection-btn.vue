<template>
  <div class="collection-btn">
    <v-icon small color="primary" v-if="Number(matchObj.isLike) === 1" @click="collectionClick(false)">mdi-star</v-icon>
    <v-icon class="collection-btn-no" small v-else @click="collectionClick(true)">mdi-star-outline</v-icon>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { throttle } from '@/utils'

export default {
  name: '',
  components: {},
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['isLogin']),
    matchObj: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    // 收藏按钮事件  flag- true表示添加收藏 false表示为收藏取消收藏
    collectionClick: throttle(async function (flag) {
      if (window.isApp && !window.App.isLogin) {
        // this.$common.setMsg('Please login!', 'warning')
        this.$router.push({name: 'login'})
        return
      }
      if (!this.isLogin) {
        // this.$common.setMsg('Please login!', 'warning')
        this.$router.push({name: 'login'})
        return
      }
      this.$set(this.matchObj, 'isLike', this.matchObj.isLike === 1 ? 0 : 1)
      await this.$api[flag ? 'like' : 'unLike']({
        data: {
          matchId: this.matchObj.matchId
        }
      })
      // 点击收藏 按钮时候发送事件给赛前列表，改变赛前列表当前存储的数据 收藏状态
      this.eventBus.$emit('collectionChange', this.matchObj)
    }, 1000),
  }
}
</script>

<style lang="less" scoped>
.collection-btn{
  display: inline-block;
  &-no{
    &:before, &:after{
      color: @font-color3;
    }
  }
}
</style>
