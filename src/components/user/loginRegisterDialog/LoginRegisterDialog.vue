<template>
  <div class="login-register-dialog">
    <v-dialog
      v-model="blShow"
      persistent
      :fullscreen="!calcIsPc"
      :transition="calcIsPc ? 'dialog-top-transition' : 'dialog-bottom-transition'"
      no-click-animation
      :width="calcIsPc ? '464' : '100vh'"
      :max-width="calcIsPc ? '80%' : '100vw'"
    >
      <template v-slot:default="dialog">
        <v-card class="login-register-dialog-card">
          <div class="login-register-dialog-card-toolbar">
            <div class="back login-register-dialog-card-toolbar-icon" @click="goBack" v-if="calcGoBackShow">
              <v-icon>mdi-chevron-left</v-icon>
            </div>
            <div class="close login-register-dialog-card-toolbar-icon" @click="blShow = false">
              <v-icon>mdi-close</v-icon>
            </div>
          </div>

          <component
            class="login-register-dialog-card-main"
            :class="{pc: calcIsPc}"
            :is="type === '1' ? 'LoginRegisterDialogMobile' : 'LoginRegisterDialogPc'"
            :componentName="componentName"
            :type="type"
            :phone="phone"
            :registerInfo="registerInfo"
            @changeComponent="changeComponent"
            @goBack="goBack"
            @hide="blShow = false"
            ref="dialogMain"
          >
          </component>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { eventBus } from '@/utils'
export default {
  components: {
    LoginRegisterDialogMobile: () => import('./LoginRegisterDialogMobile'),
    LoginRegisterDialogPc: () => import('./LoginRegisterDialogPc')
  },
  data() {
    return {
      type: window.$isPc ? '2' : '1',
      blShow: false,
      componentMap: {
        login: 'LoginDialog',
        register: 'RegisterDialog',
        registerCheck: 'RegisterCheck',
        registerSuccess: 'RegisterSuccess',
        forget: 'RetrievePasswordDialog',
        setPassword: 'SetPasswordDialog',
        resetPasswordSuccess: 'ResetPasswordSuccess',
        registerAgreement: 'RegisterAgreementDialog',
        receiveEmailFail: 'ReceiveEmailFail',
      },
      componentsList: [],
      componentName: '',
      phone: '',
      registerInfo: {}
    }
  },
  created() {
    this.listenShow()
  },
  computed: {
    ...mapGetters(['isLogin']),
    calcGoBackShow() {
      // return !this.calcHideBar
      return [this.componentMap.receiveEmailFail, this.componentMap.forget].indexOf(this.componentName) !== -1
    },
    calcHideBar() {
      return !this.componentsList.length
    },
    calcIsPc() {
      return this.type === '2'
    }
  },
  watch: {
    blShow: {
      immediate: true,
      handler() {
        this.$store.commit('SET_BL_LOGIN_DIALOG_SHOW', this.blShow)
        if (!this.blShow) this.componentName = ''
      }
    }
  },
  methods: {
    listenShow() {
      eventBus.on('loginShow', (name, phone) => {
        this.show(name, phone)
      })
      eventBus.on('loginHide', () => {
        this.blShow = false
      })
    },
    show(name, phone) {
      this.blShow = true
      this.componentName = this.componentMap[name] || this.componentMap['login']
      this.componentsList = []
      this.phone = phone || ''
    },
    changeComponent(name, query) {
      if (!this.componentMap[name]) {
        this.blShow = false
        return
      }
      if (name === 'registerAgreement' || name === 'setPassword') {
        this.registerInfo = query
      }
      if (name === 'login') {
        this.componentName = []
      } else {
        this.componentsList.push(this.componentName)
      }
      this.componentName = this.componentMap[name]
    },
    goBack() {
      if (this.componentsList.length > 0) {
        if (this.componentName === 'RegisterAgreementDialog') {
          setTimeout(() => {
            this.$refs.dialogMain.$refs.dialog.form = {...this.registerInfo}
          })
        }
        this.componentName = this.componentsList.pop()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-register-dialog{
  &-card{
    background-color: #fff;
    box-sizing: border-box;
    padding: 1px 0 60px;
    &-toolbar{
      height: 66px;
      position: relative;
      &-icon{
        position: absolute;
        top: 20px;
        padding: 5px;
        cursor: pointer;
        z-index: 102;
        &.back{
          left: 20px;
        }
        &.close{
          right: 20px;
        }
      }
    }
    &-main{
      margin-top: -66px !important;
    }
  }
}
</style>
