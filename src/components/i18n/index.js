import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh' // 引入vue-i18n
import en from './en' // 引入vue-i18n
import ko from './ko' // 引入vue-i18n

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'en',
  // locale: 'zh',
  messages: {
    // 'en': i18n_genlot_en,
    // 'zh': i18n_genlot_zh
    'zh': {
      ...zh
    },
    'en': {
      ...en
    },
    'ko': {
      ...ko
    }
  }
})

export default i18n
