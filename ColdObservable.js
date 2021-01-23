// example of a Cold Observable
// waits untill someone subscribe
// in the other hand a Hot Observable should be like event streams 
class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe
  }
  subscribe(observer) {
    this._subscribe(observer)
  }

  static timeout(time) {
    return new Observable(function subscribe(observer) {
      const handle = setTimeout(function() {
        observer.next()
        observer.complete()
      }, time)

      return {
        unsubscribe() {
          clearTimeout(handle)
        }
      }
    })
  }
}

const obj = Observable.timeout(500)
obj.subscribe({
  next() {
    console.log('next')
  },
  complete() {
    console.log('complete')
  }
})