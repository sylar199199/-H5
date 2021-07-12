<template>
  <div class="message"
    style="height: 100%; overflow-y: auto;"
    v-infinite-scroll="loadMore"
    v-infinite-scroll-disabled="loading"
    v-infinite-scroll-distance="10">
    <!-- <toolbar :title="'Messages'" @goBack="goBackSet"></toolbar> -->
    <i-lot-toolbar @goBack="goBackSet"></i-lot-toolbar>
    <div class="message-content"  >
      <v-list two-line class="pt-0">
        <v-list-item-group
        >
          <template v-for="(subItem, index) in listData" >
            <div class="message-content-single" :key="index">
              <p class="message-content-single-time grey lighten-3 px-4 py-2 d-flex justify-space-between mb-0 pt-1 pb-1 text-subtitle-2 text--secondary">{{subItem.sendDate}}</p>
              <div v-for="(item, n) in subItem.subList" :key="n">
                <v-list-item
                  dot
                  class="pl-8"
                  @click="showDetail(item)">
                  <template>
                    <v-list-item-content class="message-content-single-content">
                      <i class="point primary" :class="item.readStatus === '1' ? 'isReaded': 'noReaded'" ></i>
                      <v-list-item-title>
                        <span  class="text-body-1 d-inline-block text-truncate" style="width: 70vw">{{item.messageName}}</span>
                        <span class="float-right text-caption grey--text text-lighten-2">{{item.createTime}}
                        </span>
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-caption pr-12 content-p" v-html="item.content"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>
                <v-divider
                  v-if="n < subItem.subList.length - 1"
                  :key="n"
                  class="ml-4 mr-4 grey lighten-3"
                ></v-divider>
              </div>
            </div>
          </template>
        </v-list-item-group>
      </v-list>
      <!-- <div v-if="isShow">
        <messageDetail :msgContent="msgDetailInfo"></messageDetail>
      </div> -->
    </div>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import scroll from '@/plugs/scroll'
import {mapGetters} from 'vuex'
import storage from '@/utils/storage'
// import toolbar from '@/components/common/toolbar'
// import messageDetail from './messageDetail'

Vue.use(scroll)
export default {
  name: 'message',
  data() {
    return {
      listData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      msgDetailInfo: {},
      isShow: false,
      loading: false,
      allData: [],
    }
  },
  components: {
    // toolbar,
    // messageDetail
  },
  computed: {
    ...mapGetters(['loginInfo', 'msgNum']),
  },
  created() {
    this.getMsgList()
    console.log(this.loginInfo)
  },
  mounted() {},
  methods: {
    // 获取消息列表
    async getMsgList() {
      const res = await this.$api.msgList({
        data: {
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          userAccount: this.loginInfo.playerAccount
        }
      })
      if (res.code !== 0) return
      console.log(res.data)
      if (res.data !== null) {
        let newArr = []
        let startTime = ''
        let startNum = 0
        if (parseInt(this.pageInfo.pageNum) === 1) {
          this.allData = res.data.list
        } else {
          res.data.list.forEach(val => {
            this.allData.push(val)
          })
        }
        this.allData.forEach((item, i) => {
          // let index = -1
          item.createTime = item.createDate && this.$moment(item.createDate).format('HH:mm:ss')
          item.sendDate = item.createDate && this.$moment(item.createDate).format('DD/MM/YYYY')
          if (i > 0) {
            if (item.sendDate === startTime) {
              newArr[startNum].subList.push(item)
            } else {
              startTime = item.sendDate
              startNum++
              let obj = {
                sendDate: startTime,
                subList: []
              }
              obj.subList.push(item)
              newArr.push(obj)
            }
          } else {
            startTime = item.sendDate
            let obj = {
              sendDate: startTime,
              subList: []
            }
            obj.subList.push(item)
            newArr.push(obj)
          }
          // let isExists = newArr.some((newItem, j) => {
          //   if (item.createtime === newItem.createtime) {
          //     index = j
          //     return true
          //   }
          // })
          // if (!isExists) {
          //   newArr.push({
          //     createDate: item.createDate,
          //     subList: [item]
          //   })
          // } else {
          //   newArr[index].subList.push(item)
          // }
        })
        // console.log(newArr)
        this.listData = newArr
        // if (parseInt(this.pageInfo.pageNum) === 1) {
        //   this.listData = newArr
        // } else {
        //   for (let i in newArr) {
        //     console.log(newArr[i].createDate, this.listData[this.listData.length - 1].createDate)
        //     if (newArr[i].createDate === this.listData[this.listData.length - 1].createDate) {
        //       this.listData[this.listData.length - 1].subList = this.listData[this.listData.length - 1].subList.concat(newArr[i].subList)
        //     } else {
        //       this.listData.push(newArr[i])
        //     }
        //   }
        // }
        this.pageInfo.total = res.data.total
      }
      this.loading = false
      console.log(this.listData)
    },
    loadMore() {
      if (this.loading) return
      this.loading = true
      this.pageInfo.pageNum++
      console.log('load')
      this.getMsgList()
    },
    showDetail(item) { // 隐藏详情
      this.msgDetailInfo = item
      // this.isShow = true
      storage.session.set('msgDetailInfo', this.msgDetailInfo)
      this.$router.push({
        name: 'messageDetail',
      })
      if (parseInt(this.msgDetailInfo.readStatus) === 0) {
        this.updateState(item)
      }
    },
    // 更改阅读状态
    async updateState(val) {
      const res = await this.$api.unpdateState({
        data: {
          messageId: val.id,
          userAccount: this.loginInfo.playerAccount
        }
      })
      if (res.code !== 0) return
      console.log('已阅读')
      console.log(this.msgNum)
      let num = this.msgNum - 1
      this.$store.commit('SET_MSG_NUM', num)
      this.listData.forEach(value => {
        value.subList.forEach(item => {
          if (item.id === val.id) {
            item.readStatus = 1
            this.$set(item, 'readStatus', '1')
          }
        })
      })
      console.log(res.data)
    },
    goBackSet () {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="less" scoped>
.message-content {
  position: relative;
}
.point {
  display: block;
  position: absolute;
  content: '';
  width: 8px;
  height: 8px;
  background: green;
  left: 1em;
  border-radius: 1em;
  &.isReaded {
    opacity: 0;
  }
  &.noReaded {
    opacity: 1;
  }
}
  .content-p{
    /deep/p{
      margin-bottom: 0;
    }
  }
</style>
