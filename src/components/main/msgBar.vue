<template>
  <v-snackbar
    app
    top
    width="100%"
    :color="colorName"
    v-model="snackbar"
  >
    {{ msgData.msg }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color=""
        text
        v-bind="attrs"
        @click="closeMsg"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'msgBar',
    data() {
      return {
        snackbar: false,
        colorName: 'warning'
      }
    },
    computed: {
      ...mapGetters(['msgData'])
    },
    watch: {
      snackbar: {
        handler(newValue, oldValue) {
          if (newValue) return
          let obj = {
            msg: '',
            msgType: '',
            status: newValue,
            num: Math.random(),
          }
          this.SET_MSG(obj)
        }
      },
      'msgData.status': {
        immediate: true,
        deep: true,
        handler() {
          if (this.msgData.status) {
            this.snackbar = this.msgData.status
            if (this.msgData.msgType !== '') {
              this.colorName = this.msgData.msgType
            }
          }
        }
      }
    },
    methods: {
      ...mapMutations(['SET_MSG']),
      closeMsg() {
        this.snackbar = false
      }
    }
  }
</script>

<style scoped>

</style>
