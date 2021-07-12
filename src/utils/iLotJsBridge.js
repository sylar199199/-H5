class ILotJsBridge {
    // 尼日H5桥方法文档
    // 说明：桥方法参数、返回值采用纯String来传递，全局桥变量iLotJsBridge调用桥方法, 初始化加载时候会往localStorage中注入isApp变量返回“true”
    // ,h5提供全局的isHome()方法用于判定是否是在首页

    // 存在桥
    hasJsBridge() {
       return window.iLotJsBridge !== 'undefind'
    }

    // 存在桥
    isApp() {
       return window.iLotJsBridge.isApp() === 'true'
    }

    // 获取app版本号 返回String
    getVersionCode() {
        return window.iLotJsBridge.getVersionCode()
    }

    // 获取app版本名 返回String
    getVersionName() {
        return window.iLotJsBridge.getVersionName()
    }

    // 获取渠道名 返回固定的值"2"
    getChannel() {
        return window.iLotJsBridge.getChannel()
    }

    // 用户是否登录 返回固定的值"true" 或者 "false"
    isLogin() {
        return window.iLotJsBridge.isLogin() === 'true'
    }

    // 用户登录 没有返回值 Android端自动存储变量值 为"true" 或 "false"
    login() {
        return window.iLotJsBridge.login()
    }

    // 用户登出 没有返回值 Android端自动存储变量值 "false"
    logOut() {
        window.iLotJsBridge.logOut()
    }


    // 用户登录上一次登录时候的时间戳 返回上一次登陆时候的时间戳，没有登陆过或者登出之后返回"",类型String
    lastLoginTime() {
        return window.iLotJsBridge.lastLoginTime()
    }

    // 获取用户信息 返回string，需要前端自行解析，
    getUserInfo() {
        return window.iLotJsBridge.getUserInfo()
    }

   // 参考：
   //     function getUserInfo() {
   //         var userInfo = iLotJsBridge.getUserInfo();
   //         var user = JSON.parse(userInfo)
   //         document.getElementById("user_name").value = user.userName
   //         document.getElementById("pw").value = user.pw
   //         document.getElementById("user_info").innerHTML = "用户信息，返回的是string，传递的也是string，需要自行解析 : " + userInfo.toString();
   //     }


    // 存储用户信息，参数是String
    saveUserInfo(userInfo) {
        window.iLotJsBridge.saveUserInfo(userInfo)
    }
   // 参考：
   //  var user = new Object()
   //  user.userName = document.getElementById("user_name").value;
   //  user.pw = document.getElementById("pw").value;
   //  iLotJsBridge.saveUserInfo(JSON.stringify(user))


    // 退出app 无返回值
    exitApp() {
        window.iLotJsBridge.exitApp()
    }

    // 获取推荐码 返回string
    getPromotionCode() {
        return window.iLotJsBridge.getPromotionCode()
    }

    // 获取patch版本 返回string
    getPatchVersion() {
        window.iLotJsBridge.getPatchVersion()
    }

    // 更新app
    // 更新逻辑：获取下发信息，判定是增量还是全量，全量的话判定版本是否高于当前版本，高则下载安装升级，增量更新，判定是否有和成过增量包，如果没有合成则合成patch包，安装更新
    updateApp() {
        window.iLotJsBridge.updateApp()
    }

    // 下载最新app 直接下载最新的app
    downloadApp() {
        window.iLotJsBridge.downloadApp()
    }

    // 上报异常到firebase 上报错误信息到firebase
    recordException(info) {
        window.iLotJsBridge.recordException(info)
    }

    // 打开一个新的网页
    jumpToWeb(url) {
        window.iLotJsBridge.jumpToWeb(url)
    }

    // 获取设备mac地址
    getMacAddress() {
        return window.iLotJsBridge.getMacAddress()
    }

    // 获取设备版本
    getAndroidVersion() {
        return window.iLotJsBridge.getAndroidVersion()
    }

    // 获取渠道名称
    getChannelName() {
        return window.iLotJsBridge.getChannelName()
    }

    // 上报到AppsFlyer
    // name 上报事件名
    // data 上报数据 为object对象
    recordEventToAppsFlyer(name, data) {
        return window.iLotJsBridge.recordEventToAppsFlyer(name, data)
    }

    // 登录facebook
    loginToFacebook() {
        window.iLotJsBridge.loginToFacebook()
    }

    // 获取AccessToken
    getFbAccessToken() {
        return window.iLotJsBridge.getFbAccessToken()
    }

    // 获取AccessToken
    getFbExpiresIn() {
        return window.iLotJsBridge.getFbExpiresIn()
    }
}

export const jsBridge = new ILotJsBridge()
