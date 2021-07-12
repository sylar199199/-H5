import ajax from '@/utils/ajax.js'
// import { uploadURL, sysBaseURL } from '@/api/baseConfig'
// const linshi = 'http://10.13.1.82:8401'
// 用户接口
export default {
  // getLogin: (options = {}) => ajax.post('/user/api/userReig/login', options),
  getLogin: (options = {}) => ajax.post('/user/un/login', options),
  // 获取短信/邮件验证码
  mobileNumber: (options = {}) => ajax.post('/user/un/getVerificationCode', options),
  // 校验验证码是否正确
  checkVerificationCode: (options = {}) => ajax.post('/user/un/checkVerificationCode', options),
  // 用户预注册
  preregister: (options = {}) => ajax.post('/user/un/preregister', options),
  // 注册码注册（邮箱内链接点击）
  authregister: (options = {}) => ajax.post('/user/un/authregister', options),
  // 用户注册
  register: (options = {}) => ajax.post('/user/un/register', options),
  // 查询用户信息
  queryPlayer: (options = {}) => ajax.post('/user/api/queryPlayer', options),
  // 退出登录
  logout: (options = {}) => ajax.post('/user/api/logout', options),
  // 修改登录密码
  updatePwd: (options = {}) => ajax.post('/user/api/updatePwd', options),
  // 用户找回密码
  retrievePwd: (options = {}) => ajax.post('/user/un/retrievePwd', options),
  // 完善用户信息
  userUpdate: (options = {}) => ajax.post('/user/api/update', options),
  // 玩家安全访问策略
  queryPasswordReg: (options = {}) => ajax.post('/user/un/queryPasswordReg', options),

  // 获取区域信息
  queryRegion: (options = {}) => ajax.post('/user/un/queryRegion', options),
  // 获取消息总数
  msgNum: (options = {}) => ajax.post('/notice/api/count', {
    ...options,
    closeLoading: true
  }),
  // 获取消息列表
  msgList: (options = {}) => ajax.post('/notice/api/list', options),
  // 修改消息状态
  unpdateState: (options = {}) => ajax.post('/notice/api/updateStatus', options),
  // socketio d
  socketio: (options = {}) => ajax.ws('', options),
  // 解绑账户
  rebindAccount: (options = {}) => ajax.post('/user/un/rebindAccount', options),
  // 验证账户是否存在
  checkPlayerAccount: (options = {}) => ajax.post('/user/un/checkPlayerAccount', options),
  // 便捷充值金额
  queryFundsParams: (options = {}) => ajax.post('/funds/api/queryFundsParams', options),
  // 用户反馈
  feedback: (options = {}) => ajax.post('/notice/un/feedback', options),
  // 三方登录
  loginThrid: (options = {}) => ajax.post('/user/un/third/login', options),
  // 分界线
  // 注册
  // register: (options = {}) => ajax.post('/user/api/userReig/register', options),
  // 号码验证
  // Mobileverification: (options = {}) => ajax.post('/user/api/userReig/Mobileverification', options),
  // 用户手机号码验证
  // mobileNumber: (options = {}) => ajax.post('/user/api/userReig/mobileNumber', options),
  // 退出登录
  // logout: (options = {}) => ajax.post('/user/api/userlogin/logout', options),
  // 设置密码
  // updatePassword: (options = {}) => ajax.post('/user/api/userReig/updatePassword', options),
  // 修改密码
  // changePassword: (options = {}) => ajax.post('/user/api/userlogin/updateapplyPassword', options)
}
