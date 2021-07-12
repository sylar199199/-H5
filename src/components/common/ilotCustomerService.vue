<template>
  <div>
    <v-btn
      fixed
      color="primary"
      class="white--text mb-15 mr-n4 px-2"
      min-width="44"
      large
      right
      @click="linkServe"
      bottom>
      <v-icon large>mdi-face-agent</v-icon>
      <span v-if="hideTxt" class="ml-1 text-caption text-capitalize">Online Service</span>
    </v-btn>
  </div>
</template>

<script>
  import serverMixins from '../../views/users/account/mixins/serverMixins'
import { mapGetters } from 'vuex'
  export default {
    name: 'ilotCustomerService',
    props: ['scrollTop'],
    mixins: [serverMixins],
    data() {
      return {
        hideTxt: true
      }
    },
  computed: {
    ...mapGetters(['isLogin', 'loginInfo']),
  },
    watch: {
      'scrollTop': {
        handler(newValue, oldValue) {
          this.hideTxt = false
          this.delayed()
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      // timer用于储存定时器
      delayed() {
        // 检测定时器
        if (this.timer) {
          // 如果有定时器,则清除
          clearTimeout(this.timer)
          this.timer = null
        }
        // 设置定时器和事件
        this.timer = setTimeout(() => {
          this.hideTxt = true
        }, 2000)
      },
    }
  }
</script>

<style scoped>

</style>
