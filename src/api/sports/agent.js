import ajax from '@/utils/ajax.js'
// 操作日志
export default {
  // 轮播图接口
  // slideshow: (options = {}) => ajax.post('/user/api/userReig/slideshow', options),
  slideshow: (options = {}) => ajax.post('/user/un/slideshow', options),
  // 申请成为代理人
  applyAgent: (options = {}) => ajax.post('/user/un/applyAgent', options),
  // 获取银行列表  不用token
  bankListnotoken: (options = {}) => ajax.post('/funds/manager/bankList', options),
  // 代理人审核结果
  agentApproval: (options = {}) => ajax.post('/user/api/agentApproval', options),
  // 代理人登录
  agentLogin: (options = {}) => ajax.post('/user/api/agentLogin', options),
  // 查询代理人资金账户
  queryAgentAccountCode: (options = {}) => ajax.post('/user/api/queryAgentAccountCode', options),
  // 代理人佣金结算报告
  reportCommission: (options = {}) => ajax.post('/funds/api/reportCommission', options),
  // 代理人佣金按照区间汇总报表
  channelCommission: (options = {}) => ajax.post('/funds/api/channelCommission', options),
  // 代理人订单佣金结算
  statkeCommission: (options = {}) => ajax.post('/funds/api/statkeCommission', options),
  // 代理人下线产生的最新数据
  selectAgentStakeList: (options = {}) => ajax.post('/funds/api/selectAgentStakeList', options),
  // 代理人转账
  transferAgent: (options = {}) => ajax.post('/funds/api/transferAgent', options),
  // 查询代理人推广玩家数量
  playerCount: (options = {}) => ajax.post('/user/api/playerCount', options),
  // 查询代理人营销工具
  queryMarketingTools: (options = {}) => ajax.post('/user/api/queryMarketingTools', options),
  // 代理人GGR算法加上佣金
  selectAgentGgr: (options = {}) => ajax.post('/funds/api/selectAgentGgr', options)
}
