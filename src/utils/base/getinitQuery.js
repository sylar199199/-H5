export const getinitQuery = (href) => {
  const initQuery = {}
  href = href || window.location.href
  let search = ''
  try {
    search = href.split('?')[1].split('#')[0]
  } catch (err) {}
  if (!search) return
  const searchList = search.split('&')
  for (let i = 0; i < searchList.length; i++) {
    if (!searchList[i]) return
    const arr = searchList[i].split('=')
    if (arr[0]) initQuery[arr[0]] = arr[1] || ''
  }
  return initQuery
}
