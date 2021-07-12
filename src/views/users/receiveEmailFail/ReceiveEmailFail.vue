<template>
  <div class="receive-email-fail d-flex flex-column">
    <i-lot-toolbar @goBack="$router.go(-1)" v-if="!blLoginDialogShow"></i-lot-toolbar>

    <LoginCommonTitle class="receive-email-fail-title" :title="`Can't Receive ${accountType === 1 ? 'Emails' : 'Verification Code'}?`" />

    <template v-if="accountType === 1">
      <div class="receive-email-fail-tips">
        <p>If your mailbox is working but you can’t receive our emails, we recommend you</p>
        <p>
          1.Ensure your email address is entered correctly and it is valid<br/>
          2.Check if the mail is mistakenly classified as a junk mail<br/>
          3.Click on resend, we’ll send this mail again 120s later
        </p>
      </div>
      <CommonDivider class="receive-email-fail-divider" text="Or" />
      <div class="receive-email-fail-tips">
        <p>You can enter your email used to register and other contacts, we’ll help deal with it asap.</p>
      </div>
    </template>
    <template v-else>
      <div class="receive-email-fail-tips">
        <p>My mobile phone is in normal use, why can't I receive OTP?</p>
        <p>If your mobile phone is working but you can’t receive OTP, we recommend you</p>
        <p>
          Ensure your mobile number is entered correctly and it’s not an empty number<br/>
          Ensure your mobile number entered is a Nigerian number (Mobile numbers outside Nigeria are not supported for the time being)<br/>
          Check if your mobile phone is out of service/powers off/no signal<br/>
          Ensure the message is not blocked as a junk message<br/>
          Click on resend, we’ll send this message again 120s later<br/>
        </p>
      </div>
      <CommonDivider class="receive-email-fail-divider" text="Or" />
      <div class="receive-email-fail-tips">
        <p>If you still fail to receive OTP, please try again later or restart your mobile phone and try again.</p>
      </div>
    </template>

    <div class="receive-email-fail-main">
      <template v-for="item in list">
        <div class="receive-email-fail-main-li" :key="item.id">
          <p class="receive-email-fail-main-li-tit">{{item.title}}:</p>
          <p class="receive-email-fail-main-li-input">
            <v-text-field
              class="phone-input-main"
              v-model.trim="form[item.props]"
              :placeholder="item.tips"
              required
              height="32"
            >
            </v-text-field>
          </p>
        </div>
      </template>
    </div>

    <LoadingBtn
      class="receive-email-fail-confirm"
      :disabled="!form.account && !form.contactway"
      text="Fix Now"
      @click="confirm"
    />
  </div>
</template>
<script>
import LoginCommonTitle from '@/components/user/login/LoginCommonTitle'
import CommonDivider from '@/components/common/commonDivider'
import LoadingBtn from '@/components/func/loading-btn'
import { mapGetters } from 'vuex'
import { loginRegisterDialogMixins } from '@/mixins'
export default {
  name: '',
  components: {
    LoginCommonTitle,
    CommonDivider,
    LoadingBtn
  },
  mixins: [loginRegisterDialogMixins],
  props: {},
  data() {
    return {
      form: {
        account: '',
        contactway: ''
      },
      list: []
    }
  },
  created() {
  },
  mounted() {
    this.$set(this.form, 'account', this.preRegisterInfo.playerAccount || '')
    if (this.accountType !== 1) {
      this.list = [
        {id: 1, title: 'Mobile for registration', tips: 'Mobile Number', props: 'account'},
        {id: 2, title: 'Other contacts', tips: 'Email Address', props: 'contactway'}
      ]
    } else {
      this.list = [
        {id: 1, title: 'Email address for registration', tips: 'Email Address', props: 'account'},
        {id: 2, title: 'Other contacts', tips: 'Mobile Number', props: 'contactway'}
      ]
    }
  },
  computed: {
    ...mapGetters(['preRegisterInfo']),
    accountType() {
      return Number(this.preRegisterInfo.accountType)
    }
  },
  methods: {
    async confirm(fn) {
      try {
        const res = await this.$api.feedback({
          message: 'Thank you for your feedback!',
          data: {
            account: this.form.account || ' ',
            contactway: this.form.contactway,
            msgType: 'verficode'
          }
        })
        if (!res || res.code !== 0) return
        if (this.blLoginDialogShow) {
          this.$emit('goBack')
        } else {
          this.$router.go(-1)
        }
      } finally {
        fn && fn()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.receive-email-fail{
  min-height: 100vh;
  margin: 0 37.5px;
  .v-toolbar{
    box-sizing: content-box;
    padding-right: 75px;
    margin: 0 -37.5px;
  }
  &-title{
    padding: 60px 0 30px;
  }
  &-tips{
    margin-bottom: 8px;
    p{
      font-size: 13px;
      color: @font-color2;
      line-height: 20px;
      margin-bottom: 12px;
      text-align: justify;
    }
  }
  &-divider{
    margin-bottom: 20px;
  }
  &-main{
    flex-grow: 1;
    margin-top: -5px;
    &-li{
      &-tit{
        font-size: 13px;
        color: @font-color1;
        line-height: 20px;
        margin-bottom: 0;
      }
      &-input{
        margin: 0 !important;
        /deep/ .v-input{
          margin: 0 !important;
          padding: 0 !important;
          input{
            &::placeholder{
              font-size: 14px;
              color: @font-color4;
            }
          }
        }
      }
    }
  }
  &-confirm{
    flex: 0 0 auto !important;
    margin: 20px 0 !important;
  }
}
</style>
