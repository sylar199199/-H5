import ajax from '@/utils/ajax.js'

export default {
    /* 获取app跟新信息 */
    getUpgradeInfo: (options = {}) => ajax.post('notice/un/upgradeInfo', options),
    /* 获取app下载地址 */
    getFileById: (options = {}) => ajax.get('ms/api/v1/filePlatform/fileServiceApi/get', options),



}
