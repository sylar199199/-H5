<template>
  <div class="bottom-nav">
    <v-row class="bottom-nav-t" justify="space-between">
      <v-col class="bottom-nav-t-col bottom-nav-t-f" cols="auto">
        <CommonLogo class="bottom-nav-t-f-1" />
        <div class="bottom-nav-t-f-2 bottom-nav-t-content">Lucky9ja Lotto Limited  <br>Plot 2, Block 1 Federal Staff Housing Estate, 4th Avenue, Setraco, Gwarimpa, Abuja.</div>
        <div class="bottom-nav-t-f-3">
          <v-img width="30" height="30" src="~@/assets/img/views/pc/icon_18.png"></v-img>
        </div>
        <div class="bottom-nav-t-f-4 bottom-nav-t-content">Players must be 18 or older to register or play at iLOT. Please note that gambles may have negative effects if not made with temperance.</div>
      </v-col>
      <v-col class="bottom-nav-t-col bottom-nav-t-s" cols="auto">
        <template v-for="items in navList">
          <CommonBottomNavList :listInfo="items" :key="items.id" />
        </template>
      </v-col>
      <v-col class="bottom-nav-t-col bottom-nav-t-l" cols="auto">
        <CommonBottomNavList class="bottom-nav-t-col-concat" :listInfo="concatInfo" />
        <div class="bottom-nav-t-l-tit">Download App</div>
        <AppDownEwm class="bottom-nav-t-l-ewm" />
      </v-col>
    </v-row>
    <footer class="bottom-nav-b">© 2021 ilot. All rights reserved</footer>
  </div>
</template>
<script>
import CommonLogo from '@/components/pc/common-logo'
import CommonBottomNavList from './common-bottom-nav-list'
import AppDownEwm from '@/components/pc/app-down-ewm'
export default {
  components: {
    CommonLogo,
    CommonBottomNavList,
    AppDownEwm
  },
  props: {},
  data() {
    return {
      navList: [
        {
          id: 1,
          title: 'About',
          list: [
            {id: 1, text: 'About us', to: 'aboutUs'},
            {id: 2, text: 'Terms & Conditions', to: 'termsConditions'},
            {id: 3, text: 'Privacy Policy', to: 'privacySecurity'},
            {id: 4, text: 'Result', to: 'result'},
          ]
        },
        {
          id: 2,
          title: 'How to Play',
          list: [
            {id: 1, text: 'FAQ', to: 'FAQs'}
          ]
        }
      ],
      concatInfo: {
        title: 'Contact us',
        list: [
          {id: 1, text: 'Telephone：+234 8067717591', to: ''},
          {id: 2, text: 'E-mail：service@ilot.ng', to: ''}
        ]
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.bottom-nav{
  background: #fff;
  &-t{
    width: @pc-width;
    margin: 0 auto;
    border-bottom: 1PX solid @border-color;
    padding: 30px 0;
    &-tit{
      padding: 0;
      font-size: 16px;
      color: @font-color1;
    }
    &-content{
      font-size: 14px;
      color: @font-color2;
      line-height: 20px;
      margin-bottom: 18px;
    }
    &-col{
      padding: 0;
      &-concat{
        /deep/ .common-bottom-nav-list-item{
          cursor: auto !important;
        }
      }
    }
    &-f{
      width: 400px;
      &-1{
        margin-bottom: 20px;
      }
      &-2{
        margin-bottom: 40px;
      }
      &-3{
        width: 30px;
        height: 30px;
        margin-bottom: 7px;
      }
    }
    &-l{
      &-tit{
        font-size: 16px;
        color: @font-color1;
        font-weight: 500;
        line-height: 26px;
        padding-top: 16px;
        margin-bottom: 14px;
      }
      &-ewm{
      }
    }
  }
  &-b{
    height: 54px;
    font-size: 16px;
    color: @font-color2;
    text-align: center;
    line-height: 54px;
  }
}
</style>
