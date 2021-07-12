<template>
  <div>
    <div v-if="isPc">
      <div v-if="promotionList.length !== 0" style="margin-top: 30px;position: relative">
        <div v-for="(value,index) in rowCount" :key="index" class="flex-row" style="display: flex"
             :style="{'margin-top': (index>0?20:0) + 'px'}">
          <div class="card" @click="jump(promotionList[index*2],index*2)">
            <div>
              <v-img :src="promotionList[index*2].promotionUrl" height="158px" width="490px" :aspect-ratio="490/158"
                     class="card-bg" :style="{'opacity' : unActive.includes(index*2) ? 0.4: 1}"/>
              <div class="card-des">
                <div class="pa-0 ma-0" style="flex: 1;flex-direction: column;display: flex">
                  <div class="card-des-title font-weight-bold" :style="{'opacity' : unActive.includes(index*2) ? 0.54: 1}">{{ promotionList[index * 2].title }}</div>
                  <div class="card-des-sub-title" :style="{'opacity' : unActive.includes(index*2) ? 0.26: 0.54}">{{ promotionList[index * 2].subTitle }}</div>
                </div>
                <div class="pa-0 ma-0" style="flex-direction: row;display: flex" :style="{'opacity' : unActive.includes(index*2) ? 0.38: 1}">
                  <span class="card-des-go">Go</span>
                  <div class="card-des-circle">
                    <v-icon color="#ffffff" size="18px">mdi-arrow-right</v-icon>
                  </div>
                </div>
              </div>
            </div>
            <div :class="[unActive.includes(index*2) ? 'card-un-active-tag': 'card-active-tag']">
              {{ unActive.includes(index * 2) ? 'Closed' : 'Running' }}
            </div>
          </div>
          <div style="width: 20px"></div>
          <div class="card" v-if="promotionList.length> 2*index+1" @click="jump(promotionList[index*2+1],index*2 + 1)">
            <div>
              <v-img :src="promotionList[index*2 + 1].promotionUrl" class="card-bg" :style="{'opacity' : unActive.includes(index*2+1) ? 0.4: 1}"/>
              <div class="card-des">
                <div class="pa-0 ma-0" style="flex: 1;flex-direction: column;display: flex">
                  <div class="card-des-title font-weight-bold" :style="{'opacity' : unActive.includes(index*2+1) ? 0.54: 1}">{{ promotionList[index * 2 + 1].title }}</div>
                  <div class="card-des-sub-title" :style="{'opacity' : unActive.includes(index*2+1) ? 0.26: 0.54}">{{ promotionList[index * 2 + 1].subTitle }}</div>
                </div>
                <div class="pa-0 ma-0" style="flex-direction: row;display: flex" :style="{'opacity' : unActive.includes(index*2+1) ? 0.38: 1}">
                  <span class="card-des-go">Go</span>
                  <div class="card-des-circle">
                    <v-icon color="#ffffff" size="18px">mdi-arrow-right</v-icon>
                  </div>
                </div>
              </div>
            </div>
            <div :class="[unActive.includes(index*2+1) ? 'card-un-active-tag': 'card-active-tag']">
              {{ unActive.includes(index * 2 + 1) ? 'Closed' : 'Running' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <i-lot-toolbar @goBack="$router.go(-1)"></i-lot-toolbar>
      <div v-if="promotionList.length !== 0"
           style="padding: 10px 8px;background-color: #F3F4F6">
        <div v-for="(promotion,index) in promotionList" :key="index"
             :style="{'margin-top': (index>0?10:0) + 'px'}" class="h5-card">
          <div :class="[unActive.includes(index*2) ? 'card-un-active-tag': 'card-active-tag']" >
            {{ unActive.includes(index * 2) ? 'Closed' : 'Running' }}
          </div>
          <div class="card-app" @click="jump(promotion, index*2)"
                  :style="{'opacity' : unActive.includes(index*2) ? 0.4: 1}">
            <div>
              <v-img :src="promotion.promotionUrl" class="card-bg-app"/>
              <div class="card-des-app px-sm-4 px-2" style="display: flex;">
                <div class="pa-0 ma-0" style="flex: 1;flex-direction: column;display: flex">
                  <div class="card-des-title-app text-sm-h6 text-subtitle-2 font-weight-bold" :style="{'opacity' : unActive.includes(index*2) ? 0.54: 1}">{{ promotion.title }}</div>
                  <div class="card-des-sub-title-app" :style="{'opacity' : unActive.includes(index*2) ? 0.26: 0.54}">{{ promotion.subTitle }}</div>
                </div>
                <div class="pa-0 ma-0" style="flex-direction: row;display: flex" :style="{'opacity' : unActive.includes(index*2) ? 0.38: 1}">
                  <span class="card-des-go text-h6 text-sm-h5">Go</span>
                  <div class="card-des-circle">
                    <v-icon color="#ffffff" size="18px">mdi-arrow-right</v-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { eventTracking, eventKey } from '@/utils/fireBase'
  import {mapGetters} from 'vuex'
export default {
  name: 'promotion',
  data() {
    return {
      isPc: false,
      promotionList: [
        {
          promotionUrl: require('@/assets/img/promotion/europe.jpg'),
          title: 'Crazy Football Guess',
          subTitle: 'Win ₦10,000,000 freely every day',
          jumpUrl: 'http://tab.xqband.cn/baidu.html',
          name: 'europe'
        },
        {
          promotionUrl: require('@/assets/img/promotion/register.png'),
          title: 'Register to Get Welcome Gifts',
          subTitle: 'Win up to ₦590,000 as free bet gift',
          jumpUrl: 'http://tab.xqband.cn/baidu.html',
          name: 'registerGift'
        },
        {
          promotionUrl: require('@/assets/img/promotion/invitation.png'),
          title: 'Refer A Friend',
          subTitle: 'Get commissions of up to 30%',
          jumpUrl: 'http://tab.xqband.cn/baidu.html',
          name: 'invitationGift'
        },
        {
          promotionUrl: require('@/assets/img/promotion/download.png'),
          title: 'Free Download',
          subTitle: 'To get ₦130 gifts',
          jumpUrl: 'http://tab.xqband.cn/baidu.html',
          name: 'downloadGift'
        }
      ],
      unActive: []
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['platformName']),
    rowCount: function () {
      return parseInt(((this.promotionList.length + 1) / 2).toString())
    },

  },
  methods: {
    jump(item, index) {
      console.log(item)
      let obj = {
        clickOn: item.name
      }
       // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_PROMOTION_BANNER, item.name, obj)
      console.log(index)
      console.log(this.unActive.includes(index))
      if (this.unActive.includes(index)) return
      if (item.name === 'europe') {
        let url = process.env.VUE_APP_EUROPE_URI
        console.log(url)
        window.location.href = url
      } else {
        this.$router.push({name: item.name})
      }
      // window.open(this.promotionList[index].jumpUrl)
    },
  },
  mounted() {
    this.isPc = this.$isPc
  }
}
</script>

<style scoped lang="less">
  .h5-card{
    position: relative;
  }
.card {
  height: 251px;
  width: 490px;

  &-app {
    background-color: white;
    height: 175px;
    width: auto;
    border-radius: 10px 10px 10px 10px;
  }

  &-bg {
    margin-bottom: 0;
    margin-top: 0;
    height: 158px;
    width: 490px;
    border-radius: 10px 10px 0px 0px;

    &-app {
      width: 100%;
      height: 110px;
      border-radius: 10px 10px 0px 0px;
    }
  }

  &-des {
    background-color: white;
    height: 93px;
    display: flex;
    padding: 0 20px;
    flex-direction: row;
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    &-app {
      height: 65px;
      flex-direction: row;
      align-items: center;
      display: flex;
      padding: 0 20px;
    }

    &-title {
      font-size: 20px;
      color: #000000;
      line-height: 20px;

      &-app {
        font-size: 18px;
      }
    }

    &-sub-title {
      margin-top: 14px;
      font-size: 14px;
      line-height: 12px;
      color: #000000;

      &-app {
        font-size: 11px;
      }
    }

    &-go {
      width: auto;
      height: auto;
      color: @primary;
      font-size: 24px;
      line-height: 24px;

    }

    &-circle {
      width: 24px;
      height: 24px;
      border-radius: 12px;
      margin-left: 10px;
      background-color: @primary;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &-active-tag {
    display: flex;
    text-align: center;
    font-size: 16px;
    line-height: 16px;
    color: white;
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    width: 92px;
    height: 36px;
    background: #5DA400;
    justify-content: center;
    align-items: center;
    border-radius: 0px 10px 0px 10px;
  }

  &-un-active-tag {
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
    font-size: 16px;
    line-height: 16px;
    color: white;
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    width: 92px;
    height: 36px;
    background: #989898;
    border-radius: 0px 10px 0px 10px;
  }
}

/deep/ .v-card > *:last-child:not(.v-btn):not(.v-chip) {
  border-bottom-left-radius: 10px;
}
</style>
