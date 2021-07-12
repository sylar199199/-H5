<template>
  <v-card class="protocol overflow-x-hidden" elevation="0" >
    <!--<v-btn
      icon
      class="btn-close grey"
    >
      <v-icon color="white&#45;&#45;text" class="text-h4" @click="closePanel">mdi-close</v-icon>
    </v-btn>-->
    <div class="term-conditions pt-0">
      <!--<h2 class="mt-0 pt-4">Term & Conditions</h2>-->
      <div v-html="content" class="mt-0"></div>
    </div>
  </v-card>
</template>

<script type="text/javascript">
import {helpData} from '@/views/pc/help/helpDate'
export default {
  name: 'registrationProtocol',
  data() {
    return {
      content: ''
    }
  },
  components: {},
  created() {
    const data = helpData.data
    for (let i = 0; i < data.length; i++) {
      const val = data[i]
      if (val.name === 'termsConditions') {
        this.content = val.txt
        break
      }
    }
  },
  mounted() {},
  methods: {
    closePanel() {
      this.$emit('closePanel')
    }
  }
}
</script>

<style lang="less" scoped>
/*.protocol {*/
/*  position:absolute;*/
/*  top: 0;*/
/*  left: 0;*/
/*  z-index: 2;*/
/*}*/
/*.btn-close {*/
/*  position: fixed;*/
/*  top: 15vw;*/
/*  right: 5vw;*/
/*  z-index: 99;*/
/*}*/termsConditions
.term-conditions{
  margin: 20px;
  background-color: #fff;
  p{
    line-height: 20px;
    margin-top: 15px;
    text-indent: 20px;
  }
  ol{
    padding: 0 20px 0 40px;
    list-style-type: disc;
    li{
      margin-top: 10px;
      line-height: 20px;
      list-style-type: disc;
    }
  }
  ul{
    padding: 0 20px 0 40px;
    list-style-type: decimal;
    li{
      margin-top: 10px;
      line-height: 20px;
      list-style-type: decimal;
    }
  }
  h3, h4 {
    margin-top: 15px;
  }
  h5{
    margin-top: 10px;
  }
}
</style>
