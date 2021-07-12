class EventSocket {
  constructor() {
    this.callBackfn = null
    this.isOnListen = false
  }

  set listen(val) {
    this.isOnListen = val
  }

  get fn() {
    return this.callBackfn
  }

  set fn(fn) {
    this.callBackfn = fn
  }

  callBack(data) {
    if (!this.isOnListen) return
    this.callBackfn && this.callBackfn(data)
  }
}

export { EventSocket }
