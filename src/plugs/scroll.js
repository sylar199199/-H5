import InfiniteScroll from './InfiniteScroll'
import InfiniteScrollDisabled from './InfiniteScrollDisabled'
import InfiniteScrollDistance from './InfiniteScrollDistance'

export default {
  install(Vue, options) {
    const directives = {
      InfiniteScroll,
      InfiniteScrollDisabled,
      InfiniteScrollDistance
    }
    Object.keys(directives).forEach(key => {
      directives[key].$options = options
      Vue.directive(key, directives[key])
    })
  },
}
