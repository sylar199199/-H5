<template>
  <div>
    <i-lot-toolbar @goBack="$router.go(-1)" :changTitle="title"></i-lot-toolbar>
    <v-list class="ma-0 pa-0">
      <div class="sub-title ml-4 mt-4 mb-2">{{subTitle}}</div>
      <div class="detail-txt ml-4 mr-4 mb-4" v-html="content"></div>
    </v-list>

  </div>
</template>

<script>
import {helpData} from '@/views/pc/help/helpDate'

export default {
  name: 'help',
  data() {
    return {
      title: 'About',
      subTitle: '',
    }
  },
  mounted() {
    this.subTitle = this.$route.query.name
    this.title = this.$route.query.groupName
    // alert(this.title)
  },
  components: {},
  methods: {

  },
  created() {
    this.allTxt = {}
    helpData.data.forEach(val => {
      this.allTxt[val.name] = val.txt
    })
    this.$router.meta((to, from, next) => {
      next()
    })
  },
  computed: {
    content() {
      if (this.subTitle === 'About Us') {
        return this.allTxt['aboutUs_h5']
      }
      if (this.subTitle === 'How To Register') {
        return this.allTxt['register_h5']
      }
      if (this.subTitle === 'How To Login') {
        return this.allTxt['login_h5']
      }
      if (this.subTitle === 'How To Change Your Password') {
        return this.allTxt['change_pw_h5']
      }
      if (this.subTitle === 'How To Deposit') {
        return this.allTxt['deposit_h5']
      }
      if (this.subTitle === 'How To Withdraw') {
        return this.allTxt['withdraw_h5']
      }
      if (this.subTitle === 'Sport Betting') {
        return this.allTxt['sportBetting']
      }
      if (this.subTitle === 'Lottery') {
        return this.allTxt['lottery']
      }
      if (this.subTitle === 'Terms & Conditions') {
        return this.allTxt['termsConditions']
      }
      if (this.subTitle === 'Privacy & Security') {
        return this.allTxt['privacyPolicy']
      }
      if (this.subTitle === 'Online Agent') {
        return this.allTxt['agent']
      }
      if (this.subTitle === 'FAQs') {
        return this.allTxt['faq']
      }
      return ''
    }
  }
}
</script>

<style scoped>
.detail-txt {
  max-width: 800px;
  margin-top: auto;
}

.sub-title {
  font-size: 24px;
  color: #000000;
  opacity: 0.87;
  font-weight: 500;
}
</style>
