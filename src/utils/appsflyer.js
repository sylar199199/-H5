export async function APEvent (eventType, eventName, eventValue) {
  let obj = {eventType: eventType, eventName: eventName}
  // 有第三个传值的参数的情况
  if (eventValue) {
    obj.eventValue = {'af_revenue': eventValue}
  }
  window.AF('pba', 'event', obj)
}
