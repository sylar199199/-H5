<template>
  <div>
    <i-lot-toolbar @goBack="goBackSet"></i-lot-toolbar>
    <div class="bank-account pl-4 pr-4">
      <v-row dense class="pa-2">
        <v-col class="bank-account-add" v-if="type === '2'">
          <AddCardBtn />
        </v-col>
        <v-col
          v-for="(card, index) in cardList"
          :key="index"
          cols="12"
          class="mb-2"
        >
          <v-card
            class="d-flex justify-space-between"
            :class="{'red-bg': index%7===0, 'bg2': index%7===1, 'bg3': index%7===2, 'bg4': index%7===3, 'bg5': index%7===4, 'bg6': index%7===5, 'bg7': index%7===6 }"
            elevation="0"
            width="100%"
            >
            <!-- <v-img
              :src="card.logo"
              class="white--text align-end"
              height="20vh"
            >  </v-img>-->
            <div class="flex-grow-1 flex-shrink-1">
              <v-card-subtitle class="white--text text-body-2">
                {{card.bankName}}
              </v-card-subtitle>
              <v-card-title
                width="100%"
                class="card-text pt-1 justify-center  text-center text-h6 font-weight-medium white--text">
                {{card.hideCardCode}}
              </v-card-title>
            </div>
            <v-card-actions
              class="flex-grow-0 flex-shrink-0 align-start"
              @click="deleteCard(card)"
            >
              <v-icon
                width="14"
                height="14"
                class="text-body-1 white--text"
                @click="showBankList=false">
                  mdi-close-circle
              </v-icon>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="bank-account-add mt-4 ml-2 mr-2" v-if="type === '1'">
        <AddCardBtn />
      </v-row>

      <v-dialog
        ref="dialog"
        v-model="modal"
        persistent
        width="80vw"
      >
        <v-card>
          <v-card-title class="headline d-flex justify-center">
            Delete bank card
          </v-card-title>
          <v-card-text class="mt-4 text-center">
            <div class="tip-icon">
              <GlSvgIcon iconClass="deleteCard" class="delete-icon"/>
            </div>
            <p class="text-caption">Are you sure you want to delete the bank card</p>
            <p class="text-h6 font-weight-bold primary--text">{{cardInfo.hideCardCode}}</p>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              color="green darken-1"
              text
              @click="modal = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="determine"
            >
              Determine
            </v-btn>
          </v-card-actions>
          </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
import AddCardBtn from './components/add-card-btn'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'bankAccount',
    components: {
      AddCardBtn
    },
    props: {
      type: {
        type: String,
        default: '1' // 1: 移动端； 2：pc端
      }
    },
    data() {
      return {
        cardList: [],
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          total: ''
        },
        showPop: false,
        deletePop: false,
        showWaring: false,
        modal: false,
        cardInfo: {}
      }
    },
    computed: {
      ...mapGetters(['isLogin', 'loginInfo']),
    },
    created() {
      this.bankAccount()
    },
    mounted() {

    },
    methods: {
      ...mapMutations(['SET_LOGININFO']),

      // 银行账户列表
      async bankAccount() {
        const res = await this.$api.bankAccountList({
          // message: '查询成功',
        })
        if (res.code !== 0) return
        console.log(res)
        this.cardList = res.data
        this.cardList.forEach(item => {
          let str = item.cardCode
          let num = str.substring(str.length - 4)
          let lengthNum = str.length - 4
          let codeNum = ''
          for (var i = 0; i < lengthNum; i++) {
            if (i === 4 || i / 4 === 1) {
              codeNum += ' *'
            } else if (i === lengthNum - 1) {
              codeNum += '* '
            } else {
              codeNum += '*'
            }
          }
          codeNum += num
          item.hideCardCode = codeNum
          console.log(num)
        })
        console.log(res.data)
      },
      // 删除银行卡
      deleteCard(item) {
        console.log(item)
        this.cardInfo = item
        this.modal = true
      },
      async determine() {
        const res = await this.$api.delAccountBank({
          message: 'Successfully deleted!',
          data: {
            bank: this.cardInfo.bank,
            cardCode: this.cardInfo.cardCode,
          }
        })
        if (res.code !== 0) return
        this.bankAccount()
        this.modal = false
      },
      goBackSet() {
        console.log(12)
        this.$router.go(-1)
      }
    },
  }
</script>

<style lang="less" scoped>
  .bank-account {
    background: #fff;
  }
  .red-bg{
    background-image: linear-gradient(90deg, #F46A67 0%, #E13D3D 100%);
  }
  .bg2{
    background-image:linear-gradient(90deg, #f7af6e 0%, #e79850 100%);
  }
  .bg3{
    background-image: linear-gradient(90deg, #1481BE 0%, #0642A8 100%);
  }
  .bg4{
    background-image: linear-gradient(90deg, #09C581 0%, #009B7C 100%);
  }
  .bg5{
    background-image: linear-gradient(90deg, #9588e6 0%, #6f5bef 100%);
  }
  .bg6{
    background-image: linear-gradient(90deg, #ef6e43 0%, #f15521 100%);
  }
  .bg7{
    background-image: linear-gradient(90deg, #6687f1 0%, #426ae8 100%);
  }
  .delete-icon {
    width: 15vw;
    height: 15vw;
  }
</style>
