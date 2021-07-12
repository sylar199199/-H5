<template>
  <div class="odd-detail-content flex-fill flex-column">
    <div class="odd-detail-content-t">
      <!--玩法-->
      <p class="d-flex justify-space-between align-center pt-2 font-weight-black ma-0">
        <span class="text-body-2 font-weight-bold">{{item.PlayTypeName}}</span>
        <v-icon v-if="ticketData.Stat>1" :color="item.result?'primary':'error'">{{item.result?'mdi-check':'mdi-close'}}</v-icon>
      </p>
      <!--选择的号码-->
      <!--5/90的号码-->
      <div class="odd-detail-content-t-90 mb-sm-n2 mb-n1 d-flex align-center flex-wrap" v-if="ticketData.GameID===id905">
        <div v-for="(num, n) in item.numArr" :key="n">
          <span class="mr-sm-4 mr-2" v-if="num.toString().indexOf('-') !== -1">-</span>
          <v-avatar class="my-sm-4 my-2 mr-sm-4 mr-2" :color="ticketData.Stat==='2'?'grey lighten-3':'primary'" :size="mobileSize">
            <span class="headline text-sm-subtitle-1 text-subtitle-2 font-weight-bold" :class="ticketData.Stat==='2'?'grey--text':'white--text'">{{Math.abs(num)>9? Math.abs(num) :ticketData.GameID===id905?'0'+Math.abs(num):Math.abs(num)}}</span>
          </v-avatar>
        </div>
      </div>
      <!--3d的号码-->
      <div class="odd-detail-content-t-3d" v-else>
        <div class="d-flex align-center" v-for="(numitem, n) in item.threeNum" v-if="numitem.numArr1.length>0" :key="n">
          <span :style="{'min-width': (mobileSize<=26?'60px':'70px')}" class="text-sm-subtitle-2 text-caption grey--text mr-2">{{n===0?'1st Digit':n===1?'2nd Digit':'3rd Digit'}}</span>
          <div class="d-flex align-center flex-wrap">
            <v-avatar class="my-sm-2 my-1 mr-sm-4 mr-2" v-for="(num, x) in numitem.numArr1" :key="x" :color="ticketData.Stat==='2'?'grey lighten-3':'primary'" :size="mobileSize">
              <span class="headline text-sm-subtitle-1 text-subtitle-2 font-weight-bold" :class="ticketData.Stat==='2'?'grey--text':'white--text'">{{Math.abs(num)}}</span>
            </v-avatar>
          </div>
        </div>
      </div>
    </div>
    <ul class="odd-detail-content-b d-flex flex-column pa-0 text-sm-subtitle-1 text-subtitle-2">
      <li class="mt-sm-2 mt-1 d-flex justify-space-between align-center">
        <span class="text-sm-body-2 text-caption text--secondary">Lines :</span>
        <strong class="font-weight-bold text-sm-body-2 text-caption">{{item.BetCount}}</strong>
      </li>
      <li class="mt-sm-2 mt-1 d-flex justify-space-between align-center">
        <span class="text-sm-body-2 text-caption text--secondary">Total Stake :</span>
        <strong class="font-weight-bold text-sm-body-2 text-caption">{{$t('NGN-SYMBOL')}} {{parseFloat(item.BetWagerMoney/100).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")}}</strong>
      </li>
      <li class="mt-sm-2 mt-1 d-flex justify-space-between align-center">
        <span class="text-sm-body-2 text-caption text--secondary">Return :</span>
        <strong class="font-weight-bold text-sm-body-2 text-caption">{{ticketData.Stat==='1'?'Unsettled':$t('NGN-SYMBOL')+parseFloat(item.retenMoney).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")}}</strong>
      </li>
      <li v-if="false" class="d-flex align-center font-weight-bold justify-end primary--text">
        Check Bet Details
        <v-btn icon color="primary" @click="showDetail(item)">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'anotherDetail',
    props: [
      'item',
      'ticketData'
    ],
    data() {
      return {
        id905: process.env.VUE_APP_905_ID, // 5/90id
        id3D: process.env.VUE_APP_3D_ID, // 3D
        idFootball: process.env.VUE_APP_FOOTBALL_ID
      }
    },
    computed: {
      mobileSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 26
          case 'sm': return 36
          // case 'md': return 500
          // case 'lg': return 600
          // case 'xl': return 800
          default : return 42
        }
      }
    },
  }
</script>

<style scoped>

</style>
