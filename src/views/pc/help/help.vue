<template>
  <div class="help">
    <div class="help-menu">
      <v-list class="pa-0 ma-1">
        <v-item v-for="(menu, groupIndex) in menus" :key="groupIndex">
          <div>
            <div class="help-menu-group" :class="[groupIndex === groupSelectPos ? 'active': '']" @click="openGroup(groupIndex)">
              <span style="flex: 1;display: block;flex-wrap: wrap" class="font-weight-bold">{{menu.groupName}}</span>
              <div v-if="menu.items.length > 0">
                <v-icon :color="groupIndex === groupSelectPos ? 'primary':'font-color1'" size="18px">{{ menu.isOpen ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
              </div>
            </div>
            <div v-if="menu.isOpen && menu.items.length > 0">
              <div class="help-menu-item" v-for="(item,index) in menu.items" :key="index" :class="[item.isSelect ? 'active': '']"
                   @click="showItemDetail(groupSelectPos,groupIndex,index)" v-html="item.itemTitle">
              </div>

            </div>
          </div>
        </v-item>
      </v-list>
    </div>
    <div class="help-detail">
      <div style="position: relative">
        <div class="help-detail-title">{{ calcTitle }}</div>
        <div class="help-detail-cube"></div>
      </div>
      <p v-html="content"></p>
    </div>
  </div>
</template>

<script>
import {helpData} from '../help/helpDate'
export default {
  name: 'help',
  created() {
    this.menus[this.groupSelectPos].isOpen = true
    if (this.itemSelectPos !== -1 && this.menus[this.groupSelectPos].items.length > this.itemSelectPos) {
      this.menus[this.groupSelectPos].items[this.itemSelectPos].isSelect = true
    }
    this.allTxt = {}
    helpData.data.forEach(val => {
      this.allTxt[val.name] = val.txt
    })
  },
  data() {
    return {
      groupSelectPos: 0,
      itemSelectPos: -1,
      allTxt: {},
      menus: [
        {
          groupName: 'About Us',
          isOpen: false,
          name: 'aboutUs',
          items: []
        },
        {
          groupName: 'How To Play',
          isOpen: false,
          items: [
            {
              itemTitle: 'How To Register',
              isSelect: false,
              name: 'howToRegister'
            },
            {
              itemTitle: 'How To Login',
              isSelect: false,
              name: 'howToLogin'
            },
            {
              itemTitle: 'How To Change Your Password',
              isSelect: false,
              name: 'howToChangeYourPassword'
            },
            {
              itemTitle: 'How To Deposit',
              isSelect: false,
              name: 'howToDeposit'
            },
            {
              itemTitle: 'How To Withdraw',
              isSelect: false,
              name: 'howToWithdraw'
            },
          ],
        },
        {
          groupName: 'Tutorials',
          isOpen: false,
          items: [
            {
              itemTitle: 'Sport Betting',
              isSelect: false
            },
            {
              itemTitle: 'Lottery',
              isSelect: false
            }
          ],
        },
        {
          groupName: 'Terms & Conditions',
          isOpen: false,
          name: 'termsConditions',
          items: [
          ],
        },
        {
          groupName: 'Privacy & Security',
          isOpen: false,
          name: 'privacySecurity',
          items: [
          ],
        },
        {
          groupName: 'Online Agent',
          isOpen: false,
          items: [
          ],
        },
        {
          groupName: 'FAQs',
          isOpen: false,
          name: 'FAQs',
          items: [
          ],
        },
      ],
    }
  },
  mounted() {
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.initPage()
      }
    }
  },
  computed: {
    content() {
      if (this.groupSelectPos === 0) {
        return this.allTxt['aboutUs']
      }
      if (this.groupSelectPos === 1 && this.itemSelectPos === 0) {
        return this.allTxt['register']
      }
      if (this.groupSelectPos === 1 && this.itemSelectPos === 1) {
        return this.allTxt['login']
      }
      if (this.groupSelectPos === 1 && this.itemSelectPos === 2) {
        return this.allTxt['changePwd']
      }
      if (this.groupSelectPos === 1 && this.itemSelectPos === 3) {
        return this.allTxt['deposit']
      }
      if (this.groupSelectPos === 1 && this.itemSelectPos === 4) {
        return this.allTxt['withdraw']
      }
      if (this.groupSelectPos === 2 && this.itemSelectPos === 0) {
        return this.allTxt['sportBetting']
      }
      if (this.groupSelectPos === 2 && this.itemSelectPos === 1) {
        return this.allTxt['lottery']
      }
      if (this.groupSelectPos === 2 && this.itemSelectPos === 2) {
        return this.allTxt['casino']
      }
      if (this.groupSelectPos === 2 && this.itemSelectPos === 3) {
        return this.allTxt['virtual']
      }
      if (this.groupSelectPos === 3) {
        return this.allTxt['termsConditions']
      }
      if (this.groupSelectPos === 4) {
        return this.allTxt['privacy']
      }
      if (this.groupSelectPos === 5) {
        return this.allTxt['agent']
      }
      if (this.groupSelectPos === 6) {
        return this.allTxt['faq']
      }
      return ''
    },
    calcTitle() {
      if (this.menus[this.groupSelectPos].items && this.menus[this.groupSelectPos].items.length) {
        return this.menus[this.groupSelectPos].items[this.itemSelectPos >= 0 ? this.itemSelectPos : 0].itemTitle
      } else {
        return this.menus[this.groupSelectPos].groupName
      }
    }
  },
  methods: {
    initPage() {
      if (this.$route.query.article) {
        for (let i = 0; i < this.menus.length; i++) {
          if (this.menus[i].items && this.menus[i].items.length > 0) {
            for (let j = 0; j < this.menus[i].items.length; j++) {
              if (this.menus[i].items[j].name === this.$route.query.article) {
                this.groupSelectPos = i
                this.itemSelectPos = j
                this.$set(this.menus[i], 'isOpen', true)
                return
              }
            }
          } else {
            if (this.menus[i].name === this.$route.query.article) {
              this.groupSelectPos = i
              return
            }
          }
        }
      }
    },
    openGroup(index) {
      this.menus[index].isOpen = !this.menus[index].isOpen
      if (this.menus[index].items.length === 0) {
        if (this.groupSelectPos !== index) {
          if (this.itemSelectPos !== -1) {
            if (this.menus[this.groupSelectPos].items.length > this.itemSelectPos) {
              this.menus[this.groupSelectPos].items[this.itemSelectPos].isSelect = false
            }
          } else {
            this.menus[this.groupSelectPos].isOpen = false
          }
        }
        this.groupSelectPos = index
      }
    },
    showItemDetail(oldGroupIndex, groupIndex, index) {
      // 选中当前点击项

      this.menus[groupIndex].items[index].isSelect = true
      if (groupIndex !== this.groupSelectPos) {
        if (this.itemSelectPos !== -1 && this.menus[this.groupSelectPos].items.length > this.itemSelectPos) {
          this.menus[this.groupSelectPos].items[this.itemSelectPos].isSelect = false
        }
      } else {
        if (this.menus[groupIndex].items.length > this.itemSelectPos) {
          this.menus[groupIndex].items[this.itemSelectPos].isSelect = false
        }
      }
      this.itemSelectPos = index
      this.groupSelectPos = groupIndex
    },
  }
}
</script>

<style scoped lang="less">
.help {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  &-menu {
    width: 243px;
    padding: 16px 0;
    background-color: white;
    > .v-list{
      margin: 0 !important;
    }
    &-group {
      height: 42px;
      color: @font-color1;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 2px 10px 2px 14px;
      cursor: pointer;
      &:hover {
        color: @primary !important;
      }
      &.active {
        color: @primary ;
      }
    }
    &-item {
      padding-left: 27px;
      height: 42px;
      display: flex;
      align-items: center;
      color: @font-color1;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: @primary !important;
      }
      &.active {
        color: #fff !important;
        background: @primary;
      }
    }
  }
  &-detail {
    width: 747px;
    background-color: white;
    margin-left: 10px;
    padding: 30px;
    &-title {
      margin-bottom: 24px;
      font-weight: bold;
      font-size: 22px;
      color: #000000;
      line-height: 30px;
      margin-left: 10px;
    }
    &-cube {
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: @primary;
      opacity: 0.3;
      height: 20px;
      width: 20px;
    }
  }
}
.infoBox2 {
  z-index: 46;
  position: absolute;
  left: 30px;
  top: 744px;
  width: 686px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  font-family: Roboto-Regular;
  line-height: 24px;
  text-align: left;
}
///deep/ ul, li {
//    list-style: decimal !important;
//}

</style>
