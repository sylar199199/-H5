import store from '../store'

export const eventKey = {
  KEY_HOME_PAGE_VIEW: 'home_page_view',
  KEY_HOT_NEWS: 'hot_news',
  KEY_MID_BANNER: 'mid_banner',
  KEY_HOME_ACCESS: 'home_access',
  KEY_HOME_FULL_SCREEN: 'home_full_screen',
  KEY_HOME_QUICK_LOTTERY: 'home_quick_lottery',
  KEY_HOME_BANNER: 'home_banner',
  KEY_SPORTS_SELECT: 'sports_select',
  KEY_FEATURED_MATCH: 'featured_match',
  KEY_SPORTS_ACCESS: 'sports_access',
  KEY_PAGE_DOWNLOAD: 'page_download',
  KEY_LOTTERY_GAME: 'lottery_game',
  KEY_FREE_DOWNLOAD: 'free_download',
  KEY_HOME_REGISTER: 'home_register',
  KEY_PROMOTION_BANNER: 'promotion_banner',
  KEY_ME_LIST: 'me_list',
  KEY_ADD_BANK_CARDT: 'add_bank_card',
  KEY_LOGIN_REGISTER: 'login_register',
  KEY_SET_PAYMENT_PWD: 'set_payment_pwd',
  KEY_PAY_WAY: 'pay_way',
}


export async function eventTracking (eventName, eventSuffix, EventParams) {
  // 基于FireBase埋点事件
  let channel = store.getters.channel || 'ilot'
  let platformName = store.getters.platformName
  const analytics = window.firebase.analytics()
  eventName += '_' + platformName + '_' + channel
  if (eventSuffix) {
    eventName += '_' + eventSuffix
  }
  analytics.logEvent(eventName, EventParams) // 调用

  // window.firebase.analytics().logEvent(eventName, EventParams)
  // window.gtag('event', eventName, EventParams)
  // console.log(eventName)
  // console.log(EventParams)
}
