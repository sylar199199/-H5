export default {
  bind(el, binding) {
    let target = el
    if (el.getAttribute('data-scrollTarget')) {
      target = el.querySelector(el.getAttribute('data-scrollTarget'))
    }
    target.addEventListener('scroll', e => {
      let flag = true
      if (el.getAttribute('data-infiniteScrollDisabled')) {
        flag = false
      }
      const busy = flag
      const distance = el.getAttribute('data-infiniteScrollDistance')
        ? Number.parseInt(el.getAttribute('data-infiniteScrollDistance'), 10)
        : 100
      if (!busy && e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < distance) {
        el.setAttribute('data-infiniteScrollDisabled', true)
        binding.value(e)
      }
    })
  }
}
