import Mock from 'mockjs'

import jsonLottery from './lottery.json'
import jsonHistroies from './histroies.json'
export const lotteries = Mock.mock('/lottery/lotteries', (req, res) => {
  return Mock.mock({
    code: 0,
    msg: 'succeed',
    data: jsonLottery
    // 'data|10': [
    //   {
    //     'gameId': '',
    //     'playID': '',
    //     'issue': '',
    //     'id|+1': 0,
    //     'date': '@date()',
    //     'address': '@county(true)',
    //     'name': '@cname()',
    //     'addDetail': '@cparagraph(1)',
    //     'type': '@natural(1, 4)',
    //   }
    // ]
  })
})

export const histories = Mock.mock('/lottery/histories', (req, res) => {
  return Mock.mock({
    'code': 0,
    'msg': 'succeed',
    'data': jsonHistroies
    // 'data|10': [
    //   {
    //     'id|+1': 0,
    //     'date': '@date()',
    //     'address': '@county(true)',
    //     'name': '@cname()',
    //     'addDetail': '@cparagraph(1)',
    //     'type': '@natural(1, 4)',
    //   }
    // ]
  })
})

export const sharedTopic = Mock.mock('/lottery/sharedTopic', (req, res) => {
  return Mock.mock({
    'code': 0,
    'msg': 'succeed',
    'data': [
      {
        id: '1',
        img: Mock.Random.image('375x50', '#4A7BF7', 'shared Topic1'),
        url: '/home'
      },
      {
        id: '2',
        img: Mock.Random.image('375x50', '#4A7FC7', 'shared Topic2'),
        url: '/home'
      }
    ]
  })
})
