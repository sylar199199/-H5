<template>
  <div class="ticket-details d-block" style="width: 100%">
    <div class="ticket-details-main d-block flex-column px-4 px-sm-8">
      <!--类型、时间、状态-->
      <div class="ticket-details-main-t d-flex align-center justify-space-between pt-sm-4 pt-2 mb-sm-3 mb-1">
        <!--投注单类型及数量-->
        <div class="text-sm-subtitle-1 text-subtitle-2">
          <strong v-if="item.type==='single'">Single </strong>
          <strong v-if="item.type==='multiple'">Multiple </strong>
          <strong v-if="item.type==='system'">Multiple </strong>
          X{{item.num}}
        </div>
        <!--创建时间-->
        <div class="text--secondary text-sm-subtitle-2 text-caption">{{item.createTime | timeFormat('DD/MM HH:mm')}}</div>
        <!--订单状态-->
        <div class="text-sm-subtitle-1 text-subtitle-2">
          <strong v-if="item.statusLogic==='cancelled'">Cancelled</strong>
          <strong v-else-if="!item.settled">Unsettled</strong>
          <strong class="text-subtitle-1 font-weight-bold" v-else-if="item.settled && !item.status">Lost</strong>
          <strong v-else-if="item.settled && item.status" class="d-flex align-content-end">
            <span class="primary--text text-sm-h6 text-subtitle-1 font-weight-bold pt-1">Win</span>
            <v-icon color="primary">mdi-crown</v-icon>
          </strong>
        </div>
      </div>
      <div class="ticket-details-main-c">
        <!--比赛列表-->
        <div class="ticket-details-main-c-l d-flex text-sm-subtitle-2 text-caption justify-space-between align-content-end pb-1">
          <div class="flex-column">
            <div v-for="(match, i) in item.allEvent" :key="`${match.id}_${i}`" v-if="i < 2">
              <p class="mb-sm-2 mb-0 text--secondary">{{match.homeName}} <span>VS</span> {{match.awayName}}
              </p>
            </div>
            <div v-if="item.allEvent.length > 2">
              <p class="mb-sm-2 mb-1">....</p>
            </div>
          </div>
          <div v-if="item.allEvent.length>2" class="align-self-end mb-sm-2 mb-1 font-weight-bold text-right text-no-wrap text-example">{{item.allEvent.length-2}} More</div>
        </div>
        <!--分割线-->
        <v-divider class="grey lighten-3"></v-divider>
        <div class="ticket-details-main-c-r pb-2 text-sm-subtitle-2 text-caption">
          <!--总金额-->
          <div class="d-flex justify-space-between mt-sm-2 mt-1">
            <span class="text--secondary">Total Stake:</span>
            <strong>{{item.senderCurrency}}{{parseFloat(item.stakeTotal).toFixed(2)}}</strong>
          </div>
          <!--奖金或预计奖金-->
          <div class="d-flex justify-space-between mt-sm-2 mt-1">
            <span class="text--secondary">{{item.settled?'Return:':'Max Return:'}}</span>
            <strong v-if="item.statusLogic==='cancelled'">{{item.senderCurrency+parseFloat(item.stakeTotal).toFixed(2)}}</strong>
            <strong v-else-if="!item.settled">{{item.senderCurrency+parseFloat(item.pwStakeMax).toFixed(2)}}</strong>
            <strong v-else>{{item.senderCurrency}}{{parseFloat(item.payoutAmountSrc).toFixed(2)}}</strong>
          </div>
          <!--Bonus-->
          <div class="d-flex justify-space-between mt-sm-2 mt-1" v-if="item.bonusTotal>0&&item.statusLogic!=='cancelled'">
            <span class="text--secondary">{{item.settled?'Bonus:':'Max Bonus:'}}</span>
            <strong>{{item.senderCurrency}}{{parseFloat(item.bonusTotal).toFixed(2)}}</strong>
          </div>
        </div>
      </div>

      <BookingCode :ticketData="item" v-if="type === '2'" />
    </div>
    <!--分割线-->
    <v-divider class="py-1 grey lighten-4"></v-divider>
  </div>
</template>

<script>
import BookingCode from './booking-code'
export default {
  name: 'ticketListDetail',
  components: {
    BookingCode
  },
  props: [
    'item',
    'type' // default: 移动端， 2: pc端
  ],
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
