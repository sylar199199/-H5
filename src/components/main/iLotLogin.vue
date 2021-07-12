<template>
  <div class="login text-center pt-16 pl-10 pr-10">
    <h2 class="mt-8">Log In to ILOT</h2>
    <v-form
      ref="form"
      v-model="formIsValid"
      class="login-form"
      >
      <v-container class="mt-10">
        <v-row>
          <v-text-field
            v-model="form.playerAccount"
            placeholder="Phone Number Or Email"
            required
            outlined
            class="text-body-2"
            dense
            height="40"
            :rules="rules.playerAccount">
          </v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="form.password"
            placeholder="Password"
            required
            outlined
            dense
            height="40"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPass ? 'text' : 'password'"
            name="input-10-1"
            class="text-body-2"
            @click:append="showPass = !showPass"
            @keyup.enter.native="loginFunc"
            >
          </v-text-field>
        </v-row>
      </v-container>
      <v-btn
      :disabled="!formIsValid"
        color="#5DA400"
        class="mt-6 rounded-sm text-body-1 white--text text-capitalize"
        block
        large
        depressed
        @click="loginFunc">
        Log In
      </v-btn>
      <p class="warning-tip mt-4 d-flex justify-space-between">
        <span class="text-conption" @click="routerTo(1)" > Forgot Password? </span>
        <span class="text-conption font-weight-medium primary--text" @click="routerTo(2)" > Register </span>
      </p>
    </v-form>
  </div>
</template>

<script type="text/javascript">
  import md5 from 'js-md5'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
  name: 'login',
  data() {
    return {
      formIsValid: true,
      form: {
        codeUses: 0,
        password: '',
      },
      playerAccount: '',
      password: '',
      showPass: false,
      rules: {
        required: v => !!v || 'This field is required',
        playerAccount: [
          v => !!v || 'Phone Number / Email is required',
          this.$rules.limitaccountNew
        ]
      },
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    ...mapMutations(['SET_LOGININFO']),
    forgotEvent() {
      // window._czc.push(['_trackEvent', 'user', 'forgetpwd'])
      // this.dialogFowPwdFlag = true
      this.$router.push({name: 'retrievePassword'})
    },
    // 查询审核状态
    async agentApproval() {
      // const res = await this.$api.agentApproval({
      //   data: {
      //     processType: 'agent',
      //     playerAccount: this.form.playerAccount
      //   }
      // })
      // if (res.code !== 0) return
      // console.log(res.data)
      // if (res.data !== null && res.data !== '') {
      // }
    },
    async loginFunc() {
      // window._czc.push(['_trackEvent', 'user', 'login'])
      if (this.form.playerAccount === '' || this.form.playerAccount === undefined) {
        this.$common.showMsg(window.vm.$t('rules.PHONE-INPUT'), 'warning')
        return
      }
      if (this.form.password === '' || this.form.password === undefined) {
        this.$common.showMsg(window.vm.$t('rules.PASSWORD-MSG'), 'warning')
        return
      }
      let valid = this.$refs.form.validate()
      if (valid) {
        const res = await this.$api.getLogin({
          message: 'Login successful', // 登录成功
          data: {
            loginType: 0,
            password: md5(md5(this.form.password).toLocaleLowerCase()).toLocaleLowerCase(),
            playerAccount: this.form.playerAccount
          }
        })
        if (res.code !== 0) return

        this.agentApproval()
        this.form = {
          password: ''
        }
        this.pswType = 'text'
        this.close()

        this.$store.dispatch('loginSuccess', {token: res.data})
      }
    },
    routerTo(val) {
      this.$emit('routeTo', val)
    },
    close() {
      console.log('close')
      this.$emit('closeDialog', 'showLogin')
    },
  },
  computed: {
    ...mapGetters(['regObj'])
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.login {
  // h2 {
  //   display: block;
  //   margin-top: 12vh;
  //   text-align: center;
  //   font-size: 18px;
  // }
  // .login-form {
  //   width: 80%;
  //   margin: 5vh auto;
  .warning-tip {
    span {
      font-size: 14px;
    }
  }
}
</style>
