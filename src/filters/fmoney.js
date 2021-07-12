/*
 * @desc 金额转为千分符显示
 * @params s  金额
 * @params n  显示小数位数
 **/
export const fmoney = (s, n = 2) => {
  s = s || 0
  s = parseFloat((s + '').replace(/[^\d.-]/g, '""')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  if (n === 0) {
    return t.split('').reverse().join('')
  }
  return t.split('').reverse().join('') + '.' + r
}
