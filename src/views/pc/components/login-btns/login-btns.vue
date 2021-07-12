<template>
  <v-row class="login-btns" :class="{'on-nav': module === 'nav'}">
    <v-col cols="auto" class="cols-3 col">
      <v-btn class="login-btns-btn login text-capitalize font-weight-medium" outlined color="#fff" @click="showDialog('login')">Log In</v-btn>
    </v-col>
    <v-col cols="auto" md="auto" class="cols-4 col">
      <v-btn class="login-btns-btn register text-capitalize font-weight-medium" color="primary" @click="showDialog('register')">Register</v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { eventBus } from '@/utils'
import { eventTracking, eventKey } from '@/utils/fireBase'
import {mapGetters} from 'vuex'
export default {
  components: {
  },
  props: {
    module: {
      default: ''
    }
  },
  data() {
    return {
      blShowLoginDialog: false
    }
  },
  computed: {
    ...mapGetters(['platformName']),
  },
  methods: {
    showDialog(name) {
      if (name === 'register') {
        let obj = {
          clickFrom: this.platformName
        }
         // 事件埋点 (事件名称、事件后缀、事件参数)
        eventTracking(eventKey.KEY_HOME_REGISTER, '', obj)
      }
      eventBus.emit('loginShow', name)
    }
  }
}
</script>

<style lang="less" scoped>
.login-btns{
  flex-shrink: 0;
  margin-left: 1px;
  &.on-nav{
    .login-btns-btn{
      width: 80px;
      &.login{
        border: none;
        margin-left: 0;
      }
    }
  }
  &  + .row{
    margin: 0 0 0 30px;
  }
  .col{
    padding: 0;
  }
  &-btn{
    width: 105px;
    height: 40px !important;
    border-radius: 4px;
    box-shadow: none;
    &.login{
      min-width: auto;
      border-color: @primary;
      margin-left: 20px;
      /deep/ .v-btn__content{
        color: @primary;
      }
    }
    &.register{
      margin-left: 10px !important;
    }
    /deep/ .v-btn__content{
      font-size: 16px;
      letter-spacing: 0;
      font-weight: 500 !important;
      //color: #000;
    }
  }
}
</style>
