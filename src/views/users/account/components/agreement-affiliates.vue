<template>
  <div class="term-conditions">
    <div class="term-conditions-toolbar">
      <div class="term-conditions-toolbar-icon back" @click="$emit('back')">
        <v-icon>mdi-chevron-left</v-icon>
      </div>
      <div class="term-conditions-toolbar-icon close" @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </div>
    </div>

    <div class="term-conditions-main">
      <h2>Term & Conditions</h2>
      <div v-html="content" class="mt-0"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
import {helpData} from '@/views/pc/help/helpDate'

export default {
  name: 'registrationProtocol',
  data() {
    return {
      allTxt: {}
    }
  },
  components: {},
  created() {
    this.allTxt = {}
    helpData.data.forEach(val => {
      this.allTxt[val.name] = val.txt
    })
  },
  mounted() {},
  methods: {},
  computed: {
    content() {
      return this.allTxt['termsConditions']
    }
  }
}
</script>

<style lang="less" scoped>
.term-conditions{
  padding: 0 0 20px;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &-toolbar{
    width: 100%;
    height: 66px;
    position: relative;
    flex-shrink: 0;
    &-icon{
      position: absolute;
      top: 20px;
      padding: 5px;
      cursor: pointer;
      z-index: 102;
      &.back{
        left: 20px;
      }
      &.close{
        right: 20px;
      }
    }
  }
  &-main{
    width: 100%;
    flex-grow: 1;
    box-sizing: border-box;
    padding: 0 20px;
    overflow-x: hidden;
    overflow-y: auto;
  }
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
