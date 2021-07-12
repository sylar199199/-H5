export const toFixed = (num, n = 2) => {
  num = Number(num) || 0
  return num.toFixed(n)
}
