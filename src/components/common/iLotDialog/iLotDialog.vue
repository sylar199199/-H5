<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-btn
        icon
        class="btn-close"
      >
        <v-icon color="grey--text" class="text-h4" @click="closeAllDialog">mdi-close</v-icon>
      </v-btn>
      <!-- 登录 -->
      <i-lot-login v-if="showLogin" @routeTo="routeToSet" @closeDialog="closeDialog"></i-lot-login>
      <!-- 注册 -->
      <i-lot-register v-if="showRegister" @closeDialog="closeDialog"></i-lot-register>
    </v-card>
  </v-dialog>
</template>

<script>
  import iLotLogin from '@/components/main/iLotLogin'
  import iLotRegister from '@/components/main/iLotRegister'
  export default {
    name: 'iLotDialog',
    data() {
      return {
        dialog: false,
        showLogin: false,
        showRegister: false
      }
    },
    components: {
      iLotLogin,
      iLotRegister
    },
    created() {
    },
    methods: {
      routeToSet(val) {
        console.log(val)
        if (val === 1) {
          // {name: 'retrievePassword', query: {type: 2}}
          return
        }
        if (val === 2) {
          this.showLogin = false
          this.showRegister = true
        }
      },
      closeDialog(val) {
        if (val) {
          this[val] = false
        } else {
          this.dialog = false
        }
      },
      closeAllDialog() {
        this.showLogin = false
        this.showRegister = false
        this.dialog = false
      },
    }
  }
</script>
<style lang="less" scoped>
.btn-close {
  position: absolute;
  top: 8vw;
  right: 5vw;
  z-index: 9;
}
</style>
