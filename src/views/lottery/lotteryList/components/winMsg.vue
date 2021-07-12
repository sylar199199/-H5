<template>
  <v-chip class="mb-2 py-2 pl-2 pr-4 white--text bg-opacity" :class="index?'opacity':''" color="grey darken-4">
    <!--{{'xxxx'+winnerInfo.id}}-->
    {{winnerInfo.userAccount!==null?winnerInfo.userAccount:'xxxx'}}
    <em class="win">{{$t('NGN-SYMBOL')}}{{(winnerInfo.winAmount>0?winnerInfo.winAmount:'10,050.80')}}</em>
    <em class="type">({{winnerInfo.gameName}})</em>
  </v-chip>
</template>

<script>
  export default {
    name: 'winMsg',
    props: {
      winnerInfo: {
        type: Object,
        default() {
          return {}
        }
      },
      index: {
        type: Boolean
      }
    },
    created() {
      console.log(this.winnerInfo)
    },
  }
</script>

<style scoped>
  .bg-opacity{
    opacity: 0.3;
  }
  .opacity{
    /*opacity: 0.1;
    transition: all linear 1.5s;*/
  }
</style>
