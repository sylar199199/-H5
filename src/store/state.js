import { localCache } from '@/utils'
const state = {
  timeZone: '1', // 时区信息
  timeDifWithoutNet: 0, // 时区时差 不包了网络延迟
  timeDif: 0, // 时区时差 包了网络延迟
  // 存储 sportId 联赛id 用于页面搜索的数据
  regObj: {
    mobilLimit: '', // 手机号码规则
    passwordConfig: '', // 密码规则
    valifyConfig: '', // 验证码规则
    withDrwaPwdConfig: '' // 资金密码规则
  },
  isFull: false,
  // 用户已登录数据
  loginInfo: {},
  agentInfo: {}, // 代理人token
  routerTags: [], // 路由标签列表
  fsMode: { index: 1, className: 'fs-b' }, // 网页字体大小 0=>小 1=>中 2=>大
  menuShowFlag: false, // 菜单隐藏
  device: 'desktop', // PC端 手机端
  menuOpen: false, // 菜单打开
  rechargeList: [],
  menuData: null, // 菜单数据
  entryList: [], // 面板数据
  accountShow: false, // 账户弹窗显示
  livsNav: false, // lives对应的侧边栏状态
  menuActive: null, // 侧边菜单
  livesActive: null, // lives侧边栏三级
  isLogin: localCache.get('isLogin'), // 是否登录
  homeIndex: '0', // 头部菜单
  triggerBalance: 1, // 触发请求余额，用随机数监听触发
  editProfile: false,
  // *************新内容***************
  // 切换api版本 true 为v1  false 为v2
  apiv: true,
  // 国际化
  langeType: 'zh',
  // 存储 sportId 联赛id 用于页面搜索的数据
  searchObj: {
    sportId: '',
    sportName: '',
  },
  // 投注信息
  betList: [],
  // 赛前赔率范围过滤
  oddsRange: [1],
  systemMoney: [], // system投注的金额
  multipleMoney: 50, // multiple投注金额
  couponList: false, // 是否显示优惠券列表
  betCoupon: { // 优惠券数据
    status: true, // 是否使用优惠券
    couponId: '',
    coupon: 0,
    couponCode: '',
  },
  availableCoupon: [], // 可用优惠券
  betTypeNum: 0, // 投注类型
  // 推送的全局状态
  globalFlag: true,
  // 详情的赛事状态
  detailEventStatus: '',
  // 消息弹窗
  msgData: {
    msg: '', // 提示框信息
    msgType: 'error', // 提示框类型 error、warning、info、success
    status: false, // 提示框状态
    num: 1, // 用随机数
  },
  // 重复投注
  rebetTicket: {
    ticketId: '',
    num: 1, // 用随机数
  },
  // sport投注订单id
  ticketId: '',
  lotteryCarStatus: false, // 首页lottery购物车
  lotteryBetData: {}, // lottery快捷投注数据
  contentData: { // lottery页面跳转需要的参数
    content3: '',
    url3: '',
    content13: '',
    url13: '',
    content6: '',
    url6: ''
  },
  platformName: 'H5', // 平台名称
  adKey: '', // 广告弹层的id取随机数，类型字符串
  socketData: [], // 推送时发送的数据
  sportLoad: false, // H5sport列表页loading状态
  webIp: '00-E1-8C-B8-14-4C', // IP地址
}

export default state
