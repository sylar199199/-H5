<template>
  <div>
    <v-row class="navigation" style="background: white;box-shadow:2px 2px 5px #000;">
      <v-col v-for="(menu,index) in items" :key="index" @click="onClick(index)"
             class="d-flex pa-0 ma-0 flex-column justify-center align-center">
        <div class="align-start justify-center d-flex">
          <div :style="{position: 'relative'}" class="pa-0 ma-0">
            <v-icon :class="currentIndex===index ? 'primary--text':'text--disabled'" icon-size="24px" class="pa-0">{{ menu.icon }}</v-icon>
            <div v-if="index == 3 && cartCount > 0" :class="[cartCount.length>1 ? 'rounded-rectangle':'circle']" class="pa-0 ma-0"
                 :style="{position: 'absolute',right: marginRight + 'px',top: 0}">
              <span class="ma-0 font-weight-regular"
                    :style="{color:'#ffffff',fontSize: 9+'px'}">{{ cartCount }}</span>
            </div>
          </div>
        </div>
        <div :class="currentIndex===index ? 'primary--text':'text--disabled'" class="d-flex pa-0 mb-0 h1 justify-center text font-weight-bold mb-1">
          {{ menu.text }}</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'iLotBottomNavigation',
  props: {
    cartCount: {
      type: String,
      default: '12',
    },
  },
  data() {
    return {
      isActive: false,
      items: [
        {
          icon: 'mdi-home-outline',
          text: 'Home',
        },
        {
          icon: 'mdi-gamepad-variant-outline',
          text: 'Lottery',
        },
        {
          icon: 'mdi-soccer ',
          text: 'Sports',
        },
        {
          icon: 'mdi-cart-outline ',
          text: 'Betslip',
        },
        {
          icon: 'mdi-account-outline ',
          text: 'Me',
        },
      ],
      currentIndex: 0,
    }
  },
  methods: {
    onClick(index) {
      console.log(index)
      this.eventBus.$emit('closeLMT')
      this.isActive = !this.isActive
      this.$emit('itemClick')
      // 跳转到home
      if (index === 0) {
        this.$router.push({name: 'home'})
      }
      // 跳转到lotto
      if (index === 1) {
        this.$router.push({name: 'lotto'})
      }
      // 跳转到sport
      if (index === 2) {
        this.$router.push({name: 'sports'})
      }
      // 跳转到购物车
      if (index === 3) {
        this.$router.push({name: 'betSlip'})
      }
      // 个人中心
      if (index === 4) {
        if (window.isApp) {
          if (window.App.isLogin) {
            this.$router.push({name: 'account'})
          } else {
            this.$router.push({name: 'login'})
          }
          return
        }
        if (this.$store.state.isLogin) {
          this.$router.push({name: 'account'})
        } else {
          this.$router.push({name: 'login'})
          return
        }
      }
      this.currentIndex = index
    },
    getWidth(txt, font) {
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      ctx.font = font
      return ctx.measureText(txt).width
    },
    setCurrentIndex() {
      this.currentIndex = this.$route.meta.navIndex ? this.$route.meta.navIndex : 0
    }
  },
  watch: {
    '$route': {
      handler(newVal, oldVal) {
        this.setCurrentIndex()
      }
    },
    deep: true
  },
  beforeMount() {
    this.setCurrentIndex()
  },
  computed: {
    selectColor: function () {
      return this.$vuetify.theme.themes.light.primary
    },
    marginRight: function () {
      var right = this.getWidth(this.cartCount, 20) / 2
      console.log('marginRight')
      console.log(right)
      return -right
    },
  },
}
</script>

<style scoped>
.navigation {
  justify-content: center;
  min-height: 49px;
  align-items: center;
}

.text {
  line-height: 11px;
  font-size: 11px;
  text-align: start;
}

.circle {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  text-align: center;
  background-color: #F85100;
  border-style: solid;
  border-color: #F85100;
  border-width: 0;
  line-height: 9px;
}

.rounded-rectangle{
  border-width: 0px 3px 0px 3px;
  line-height: 9px;
  height: 13px;
  border-style: solid;
  border-radius: 15px;
  background-color: #F85100;
  border-color: #F85100;
}


</style>
