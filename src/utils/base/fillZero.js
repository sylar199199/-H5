export const fillZero = (str, len = 2) => {
  str = '' + str
  if (str.length < len) {
    str = new Array(len - str.length).fill('0').join('') + str
  }
  return str
}
