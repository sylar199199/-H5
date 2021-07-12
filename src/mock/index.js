import Mock from 'mockjs'
// import lottery from './lottery/lottery'

Mock.mock('/login', {
  'name': '@name'
})

// Mock.mock('/\/lottery\/lotteries/', 'post', lottery.lotteries)
// Mock.mock('/\/lottery\/histories/', 'post', lottery.histories)
