<template>
  <div class="footer">
    <div class="divider"/>
    <div align="center" v-on:click="topClick">
      <GlSvgIcon iconClass="toTop" class="topIcon"/>
      <p class="topText font-weight-medium">Top</p>
    </div>
    <GlSvgIcon iconClass="iLot-green" class="iLot"/>
    <p class="iLotLicense">{{ licenseText }}</p>
    <v-divider style="margin-left: 15px;margin-right: 15px;"></v-divider>
    <v-row class="pa-0 mb-0" style="margin-top: 15px;margin-left: 16px">
      <v-col class="flex-row pa-0">
        <span class="groupText mt-0 mb-0 font-weight-bold">
          {{ about.groupName }}
        </span>
        <div v-for="(item,index) in about.items" :key="index" class="pa-0">
          <span class="itemText font-weight-regular"
                @click="$router.push({name: about.groupName,query: {groupIndex: 1,itemIndex: index + 1,subTitle: item}})">
            {{ item }}
          </span>
        </div>
      </v-col>

      <v-col class="flex-row pa-0">
        <span class="groupText font-weight-bold">
          {{ faqs.groupName }}
        </span>
        <div v-for="(item,index) in faqs.items" :key="index" class="pa-0">
          <span class="itemText font-weight-regular" @click="$router.push({name: faqs.groupName,query: {
            groupIndex: 2,itemIndex: index + 1,subTitle: item
          }})">
            {{ item }}
          </span>
        </div>
      </v-col>
    </v-row>
    <v-row class="pa-0" style="margin-top: 15px;margin-left: 16px;margin-bottom: 15px">
      <v-col class="leftRow pa-0">
        <span class="groupText font-weight-bold">
          {{ howTo.groupName }}
        </span>
        <div v-for="(item,index) in howTo.items" :key="index" class="pa-0">
          <span class="itemText font-weight-regular" @click="$router.push({
          name: howTo.groupName,
          query: {
            groupIndex: 3,
            itemIndex: index + 1,
            subTitle: item
          }
          })">
            {{ item }}
          </span>
        </div>
      </v-col>
      <v-col class="rightRow pa-0">
        <span class="groupText mt-0 mb-0 font-weight-bold">
          {{ other.groupName }}
        </span>
        <div v-for="(item,index) in other.items" :key="index" class="pa-0">
          <span class="itemText font-weight-regular"
                 @click="$router.push({name: other.groupName,query: {groupIndex: 4,itemIndex: index + 1,subTitle: item}})">
            {{ item }}
          </span>
        </div>
      </v-col>
    </v-row>
    <v-divider style="margin-left: 15px;margin-right: 15px"></v-divider>
    <div class="pa-0 d-flex" style="margin-left: 15px;margin-top: 15px;margin-right: 16px;">
      <v-avatar size="26px" color="#5BA600" style=" margin-right: 10px">
        <div style="font-size: 12px;color: #F0F0F0;font-style: italic;" class="font-weight-bold">18+</div>
      </v-avatar>
      <div class="protocol flex-column mr-4">{{ protocol }}</div>
      <v-col>
        <div class="call font-weight-bold pa-0 justify-center" style="text-align: center">{{ call }}</div>
        <div class="onLine font-weight-bold pa-0 " style="text-align: center" @click="linkServe">{{ online }}</div>
      </v-col>
    </div>
    <v-divider style="margin-left: 15px;margin-right: 15px;margin-top: 13px"></v-divider>
    <div align="center">
      <GlSvgIcon iconClass="iLot-green" class="smallILot "/>
      <p class="copyRight mb-7">{{ copyRight }}</p>
    </div>
  </div>

</template>

<script type="text/javascript">
import serverMixins from './mixins/serverMixins'
import { mapGetters } from 'vuex'
export default {
  name: 'accountFooter',
  mixins: [serverMixins],
  data() {
    return {
      licenseText: 'Lucky9ja Lotto Limited Plot 2, Block 1 Federal Staff Housing Estate, 4th Avenue, Setraco, Gwarimpa, Abuja.',
      about: {
        groupName: 'About',
        items: [
          'About Us',
          'Tutorials',
          'Terms & Conditions',
        ],
      },
      faqs: {
        groupName: 'FAQS',
        items: [
          'How To Register',
          'How To Login',
          'How To Change Your Password',
          'How To Deposit',
          'How To Withdraw',
        ],
      },
      howTo: {
        groupName: 'How to Play',
        items: [
          'Sport Betting',
          'Lottery',
          'Casino',
          'Virtual',
        ],
      },
      other: {
        groupName: 'Other',
        items: [
          'Responsible Gaming',
          'Protection of minors',
          'Practice Restraint',
          'Privacy Security',
          'Anti Money Laundering',
          'Promotions',
        ],
      },
      protocol: 'Players must be 18 or older to register or play at iLOT. Please note that gambles may have negative effects if not made with temperance.',
      call: 'Call:+234 8067717591',
      online: 'Online Help/live Chat',
      copyRight: '© 2021 ilot. All rights reserved',
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'loginInfo']),
  },
  methods: {
    topClick() {
      this.$emit('topClick')
    },
  },
}
</script>!

<style lang="less" scoped>
.footer {
  .divider {
    background: #F0F0F0;
    height: 22px;
  }

  .topIcon {
    alignment: center;
    height: 9px;
    width: 28px;
    opacity: 0.26;
    margin-top: 10px;
    padding-bottom: 0px;
  }

  .topText {
    align-content: center;
    color: #000000;
    opacity: 0.54;
    font-size: 12px;
    margin-bottom: 0px;
    padding-top: 0px;
  }

  .iLot {
    alignment: left;
    margin-top: 34px;
    margin-left: 16px;
    height: 20px;
    width: 45px;
  }

  .smallILot {
    alignment: center;
    margin-bottom: 6px;
    margin-top: 15px;
    height: 16px;
    width: 35px;
  }

  .iLotLicense {
    margin: 10px 15px 15px;
    font-size: 12px;
    color: #000000;
    opacity: 0.54;
    font-weight: 400;
  }

  .itemText {
    font-size: 12px;
    line-height: 12px;
    color: #000000;
    opacity: 0.54;
    margin-top: 10px;
  }

  .groupText {
    font-size: 13px;
    line-height: 13px;
    color: #000000;
    opacity: 0.87;
  }

  .leftRow {
    flex: 1;
  }

  .rightRow {
    flex: 1;
  }

  .row {
    margin: 30px;
  }

  .protocol {
    font-size: 10px;
    color: #000000;
    opacity: 0.54;
    overflow: auto;
    font-weight: 400;
  }

  .call {
    line-height: 28px;
    text-align: center;
    background: #5BA600;
    font-size: 13px;
    color: #FFFFFF;
    width: 150px;
    height: 28px;
    border-radius: 2px;
  }

  .onLine {
    border: 1px solid #5BA600;
    border-radius: 2px;
    width: 150px;
    height: 28px;
    font-size: 13px;
    line-height: 28px;
    color: #5BA600;
    text-align: center;
    margin-top: 10px;
  }

  .copyRight {
    font-size: 8px;
    color: #000000;
    opacity: 0.54;
    font-weight: 600;
  }

}

</style>
