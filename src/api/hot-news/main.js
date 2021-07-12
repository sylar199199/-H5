import ajax from '@/utils/ajax.js'

export default {
    /* 获取所有热门消息模块 */
    getHotNewsModule: (options = {}) => ajax.post('notice/un/modulePage', options),
    /* 获取所有热门栏目 */
    getHotNewsProgram: (options = {}) => ajax.post('notice/un/programPage', options),
    /* 获取热门资讯详情 */
    getHotNewsInfo: (options = {}) => ajax.post('notice/un/info', options),
    /* 获取热门资讯列表 */
    getHotNewsList: (options = {}) => ajax.post('notice/un/infoPage', options),
    /* 获取图片走文档管理服务 */
    getPictureById: (options = {}) => ajax.get('ms/api/v1/filePlatform/fileServiceApi/get', options),



}
