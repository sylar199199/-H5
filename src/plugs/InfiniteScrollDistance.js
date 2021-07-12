export default {
  bind(el, binding) {
    el.setAttribute('data-infiniteScrollDistance', binding.value)
  },
  update(el, binding) {
    el.setAttribute('data-infiniteScrollDistance', binding.value)
  },
}
