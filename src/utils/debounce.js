export function debounce(fn, delay = 300) {
  let timer
  return function () {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        fn.call(this, ...arguments, resolve, reject)
      }, delay)
    })
  }
}

export function throttle(fn, delay = 300) {
  let timer
  let flag = true
  return function () {
    return new Promise((resolve, reject) => {
      if (flag) {
        fn.call(this, ...arguments, resolve, reject)
        flag = false
      }
      if (timer) return null
      timer = setTimeout(() => {
        timer = null
        flag = true
      }, delay)
    })
  }
}

export function sDebounce(fn, delay = 300) {
  let timer
  return function (obj, bl) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      if (bl) {
        fn.call(this, ...arguments, resolve, reject)
      } else {
        timer = setTimeout(() => {
          timer = null
          fn.call(this, ...arguments, resolve, reject)
        }, delay)
      }
    })
  }
}
