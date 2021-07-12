export default {
  bind(el, binding) {
    el.setAttribute('data-infiniteScrollDisabled', binding.value)
  },
  update(el, binding) {
    el.setAttribute('data-infiniteScrollDisabled', binding.value)
  },
}
