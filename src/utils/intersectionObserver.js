import 'intersection-observer'

// 可以把节流的时间调大一点，默认是100ms
IntersectionObserver.prototype['THROTTLE_TIMEOUT'] = 300

export class Observer {
  constructor(config, fn) {
    this.io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 这段逻辑，是每一个商品进入视窗时都会触发的
        if (entry.isIntersecting) {
        }
        fn && fn(entry.isIntersecting)
      })
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
      ...config
    })
  }

  observe(el) {
    this.io.observe(el)
  }
}
