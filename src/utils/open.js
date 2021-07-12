
/**
 * @desc 对于后端返回字节流的导出
 * @remark 注意：需要添加responseType: 'blob'，否则下载文件不成功
*/
window.scOpen = function(resBlob, fileName, target = '', fileType = '.xls') {
  var blob = new Blob([resBlob], {
    type: 'application/vnd.ms-excel;charset=utf-8',
  })
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // 兼容IE
    window.navigator.msSaveOrOpenBlob(blob, fileName + fileType)
  } else {
    var url = window.URL.createObjectURL(blob)
    var a = document.createElement('a')
    a.href = url
    a.target = target
    a.style.display = 'none'
    a.setAttribute('download', fileName + fileType)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a) // 下载完成移除元素
    window.URL.revokeObjectURL(url) // 释放掉blob对象
  }
}
