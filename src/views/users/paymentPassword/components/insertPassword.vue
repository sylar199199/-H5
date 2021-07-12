<template>
  <div class="insert-password text-center" v-if="changePanel">
    <h2 class="mt-16" v-if="info.title">{{info.title}}</h2>
    <p class="text-caption grey--text darken-1">{{info.sub}}</p>
    <v-row  id="oldPass" class="password-item mt-12 ml-auto mr-auto d-flex justify-center mb-6" style="width: 80%;">
      <v-col
        v-for="(item, index) in 6"
        :key="index"
        class="pa-2"
        >
        <v-text-field
          outlined
          height="20px"
          type="password"
          dense
          autocomplete="new-password"
          class="pa-0 shortInput"
          maxlength="1"
          v-model="pwdList[item]"
          @input="changeInput"
          @click="changePwd"
          @keyup="keyUp($event)"
          @keydown="oldPwdList = pwdList.length"
          :ref="'passItem'+(index+1)"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'insertPassword',
  props: {
    changePanel: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object
    },
  },
  data() {
    return {
      pwdList: [],
      oldPwdList: [],
      ipt: '',
      isDelete: false,
    }
  },
  components: {
  },
  created() {
  },
  mounted() {
    this.ipt = document.querySelectorAll('#oldPass .shortInput')
  },
  methods: {
    changeInput() {
      let index = this.pwdList.length
      let val = this.pwdList[index - 1]
      if (!/[0-9]/.test(val)) {
        this.pwdList.pop()
        return
      }
      if (!val) {
        this.pwdList.pop()
        index--
        if (index > 0) this.$refs['passItem' + (index - 1)][0].focus()
      } else {
        if (index <= 6) this.$refs['passItem' + (index)][0].focus()
      }
      console.log(this.pwdList, index)
    },
    changePwd() {
      let index = this.pwdList.length
      index === 6 && index--
      console.log(this.pwdList, index)
      this.$refs['passItem' + index] && this.$refs['passItem' + index][0].focus()
    },
    keyUp(ev) {
      let index = this.pwdList.length
      if (!index) return
      if (ev.keyCode === 8) {
        this.isDelete = true
        if (this.oldPwdList === this.pwdList.length) {
          if (index === this.pwdList.length) {
            this.pwdList.pop()
          }
          index--
        } else {
          index > 0 && index--
        }
        this.$refs['passItem' + index] && this.$refs['passItem' + index][0].focus()
        if (index === 0) {
          this.isDelete = false
        }
      } else if (!this.isDelete && index === this.pwdList.length && /^\d$/.test(ev.key)) {
        this.isDelete = false
        this.pwdList.pop()
        this.pwdList.push(ev.key)
        this.$refs['passItem' + this.pwdList.length] && this.$refs['passItem' + this.pwdList.length][0].focus()
      } else if (!/^\d$/.test(ev.key)) {
        this.$set(this.pwdList, index, '')
        this.$nextTick(() => {
          this.pwdList.pop()
        })
      }
      let setPass = this.pwdList.join('')
      if (setPass.length === 6) {
        this.$emit('insertBack', setPass)
      }
    }
  },
}
</script>

<style lang="less" scoped>
.shortInput {
  /deep/ input {
    text-align: center !important;
  }
}
</style>
