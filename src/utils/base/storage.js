const StorageKeys = {
  token: 'token', // 用户token
  userInfo: 'userInfo', // 用户信息
  isLogin: 'isLogin' // 登陆态
}

class Storage {
  constructor(storage) {
    this.storage = storage
    this.cache = {}
    // this.init()
  }

  // init () {
    // const cacheStr = this.storage.getItem(StorageKeys[cacheName])
    // try {
    //   this.cache = JSON.parse(cacheStr) || {}
    // } catch (e) {
    //   this.cache = {}
    // }
  // }

  getRealKey(key) {
    return StorageKeys[key] || key
  }

  get(key) {
    key = this.getRealKey(key)
    if (!this.cache[key]) {
      let val = this.storage.getItem(key)
      try {
        val = JSON.parse(val)
      } catch (err) {}
      this.cache[key] = val
    }
    return this.cache[key] || null
  }

  set(key, val) {
    key = this.getRealKey(key)
    let newVal = val
    if (typeof val !== 'string') {
      try {
        newVal = JSON.stringify(val)
      } catch (err) {}
    } else {
      try {
        val = JSON.parse(val)
      } catch (err) {}
    }
    this.cache[key] = val
    this.storage.setItem(key, newVal)
  }

  remove(key) {
    this.set(key, null)
  }

  clear() {
    this.cache = {}
    for (let key in StorageKeys) {
      this.remove(StorageKeys[key])
    }
  }
}

// localStorage
export const localCache = new Storage(window.localStorage)
// sessionStorage
export const sessionCache = new Storage(window.sessionStorage)
