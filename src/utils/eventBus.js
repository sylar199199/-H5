class EventBus {
  constructor() {
    this.eventsCache = {}
  }

  on(event, listener, prepend) {
    if (this.eventsCache[event]) {
      if (prepend) {
        this.eventsCache[event].unshift(listener)
      } else {
        this.eventsCache[event].push(listener)
      }
    } else {
      this.eventsCache[event] = [listener]
    }
  }

  remove(event, listener) {
    if (Array.isArray(this.eventsCache[event])) {
      if (!listener) {
        delete this.eventsCache[event]
      } else {
        this.eventsCache[event] = this.eventsCache[event].filter(e => e !== listener && e.origin !== listener)
      }
    }
  }

  once(event, listener) {
    const only = (...args) => {
      listener.apply(this, args)
      this.remove(event, listener)
    }
    only.origin = listener
    this.addListener(event, only)
  }

  emit(event, ...args) {
    if (Array.isArray(this.eventsCache[event])) {
      this.eventsCache[event].forEach(fn => {
        fn.apply(this, args)
      })
    }
  }
}

export const eventBus = new EventBus()
