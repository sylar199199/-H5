import { localCache } from './index'

export const saveUserInfo = (info) => {
  const userInfo = localCache.get('userInfo')
  if (!userInfo ||
    userInfo.playerNick !== info.playerNick ||
    userInfo.firstName !== info.firstName ||
    userInfo.lastName !== info.lastName
  ) {
    localCache.set('userInfo', info)
  }
}
