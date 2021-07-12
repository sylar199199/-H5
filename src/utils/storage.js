const getStore = (type) => {
  const store = type === 'session' ? sessionStorage : localStorage
  return {
    set(key, data) {
      const _data = typeof data === 'object' ? JSON.stringify(data) : data
      store.setItem(key, _data)
    },
    get(key) {
      const data = store.getItem(key)
      let result
      if (typeof data === 'string' && data !== 'undefined' && data !== 'null') {
        try {
          result = JSON.parse(data)
        } catch (err) {
          result = data
        }
        return result
      }
      return false
    },
    remove(key) {
      if (typeof key === 'string') {
        store.removeItem(key)
      } else if (typeof key === 'object') {
        if (key.excludes) {
          for (const i in store) {
            if (key.excludes.indexOf(i) < 0) {
              store.removeItem(i)
            }
          }
        }
        if (key.includes) {
          for (const i in store) {
            if (key.excludes.indexOf(i) >= 0) {
              store.removeItem(i)
            }
          }
        }
      }
    },
    clear() {
      store.clear()
    },
  }
}

export default {
  ...getStore('local'), // export localStorge
  session: getStore('session'), // export sessionStorge
}
