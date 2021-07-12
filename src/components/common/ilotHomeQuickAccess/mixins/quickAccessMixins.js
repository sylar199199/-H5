import {mapGetters, mapMutations} from 'vuex'
import { eventTracking, eventKey } from '@/utils/fireBase'
export default {
  data() {
    return {
      list: [
        // {
        //   name: 'worldCup',
        //   url: 'https://www.baidu.com/',
        //   img: require('@/assets/img/homeQuickAccess/worldCup.png'),
        // },
        {
          name: 'europe',
          url: 'https://www.baidu.com/',
          img: require('@/assets/img/homeQuickAccess/euro.png'),
        },
        {
          name: '3D',
          url: 'https://www.baidu.com/',
          img: require('@/assets/img/homeQuickAccess/3d.png'),
        },
        {
          name: '90Select5',
          url: 'https://www.baidu.com/',
          img: require('@/assets/img/homeQuickAccess/90select5.png'),
        },
        {
          name: 'football14',
          url: 'https://www.baidu.com/',
          img: require('@/assets/img/homeQuickAccess/football.png'),
        },
      ]
    }
  },
  created() {
    if (this.contentData.url3 === '' || this.contentData.url6 === '') {
      this.gameList()
    }
  },
  computed: {
    ...mapGetters(['contentData', 'platformName', 'isLogin'])
  },
  methods: {
    ...mapMutations(['SET_CONTENT']),
    // 获取游戏列表里面的参数
    async gameList(flag) {
      const res = await this.$api.gameList({
        data: {
          terType: 4,
          gameType: 0,
          type: 'gameList',
          pageNum: 1,
          pageSize: 10
        }
      })
      if (res.code !== 0) return
      console.log(res.data)
      // this.lotteriesList = res.data.list
      res.data.list.forEach(val => {
        let obj = {
          type: '',
          val: ''
        }
        if (parseInt(val.id) === parseInt(process.env.VUE_APP_FOOTBALL_ID)) {
          obj = {
            type: 'gameId13',
            val: val.content,
            url: val.url
          }
        } else if (parseInt(val.id) === parseInt(process.env.VUE_APP_3D_ID)) {
          obj = {
            type: 'gameId3',
            val: val.content,
            url: val.url
          }
        } else if (parseInt(val.id) === parseInt(process.env.VUE_APP_905_ID)) {
          obj = {
            type: 'gameId6',
            val: val.content,
            url: val.url
          }
        }
        this.SET_CONTENT(obj)
      })
    },
    linkPage(item, index) {
      // let url = item.url
      let obj = {
        clickOn: item.name
      }
       // 事件埋点 (事件名称、事件后缀、事件参数)
      eventTracking(eventKey.KEY_HOME_ACCESS, item.name, obj)

      if (item.name === 'football14') {
        // this.$router.push('/sport/list/null/sr:sport:1/null/null/null')
        this.openUrl(13)
      } else if (item.name === 'Football 14') {
        if (!this.isLogin) {
          this.$router.push('/login')
          return
        }
        this.openUrl(13)
      } else if (item.name === '3D') {
        if (!this.isLogin) {
          this.$router.push('/login')
          return
        }
        this.openUrl(3)
      } else if (item.name === '90Select5') {
        if (!this.isLogin) {
          this.$router.push('/login')
          return
        }
        this.openUrl(6)
      } else if (item.name === 'worldCup' || item.name === 'NBA' || item.name === 'europe') {
        let path = '/sport/list/null/sr:sport:1/sr:tournament:14/null/null'
        if (item.name === 'NBA') {
          path = ''
        } else if (item.name === 'europe') {
          path = '/sport/list/null/sr:sport:1/sr:tournament:1/null/null'
        }
        this.$router.push(path)
      } else {
        this.$router.push({
          name: item.to,
          query: {
            ...(item.query || {})
          },
          params: {
            ...(item.params || {})
          }
        })
      }
    },
    openUrl(n) {
      if (this.contentData[`url${n}`] !== '') {
        let url = this.contentData[`url${n}`]
        if (this.contentData[`content${n}`] !== '') {
          url = this.contentData[`url${n}`] + '?content=' + this.contentData[`content${n}`]
        }
        this.$router.push({name: 'iframe', query: {url}})
        // window.location.href = url
        // window.open(url, '_blank')
        // window.location.href = url
      } else {
        this.$common.setMsg('In development', 'error')
      }
    }
  }
}
