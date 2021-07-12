// 表单验证规则 for ElementUI
import store from '../store'
export default {
  // 动态规则-手机号码
  limitaccount: (rule, value, callback) => {
    const _value = value
    if (!store.state.regObj.mobilLimit) {
      callback()
    }
    // 提示语 mobile 或者 email
    let strArr = []
    // 手机号码的校验
    let testFlag = false
    if (store.state.regObj.registLimit.indexOf('mobile') !== -1) {
      strArr.push('mobile')
      if (store.state.regObj.mobilLimit !== '' && store.state.regObj.mobilLimit !== '[]') {
        let arrObj = JSON.parse(store.state.regObj.mobilLimit)
        // let arrObj = store.state.regObj.mobilLimit
        if (!arrObj) return
        arrObj.forEach((val) => {
          let reg = eval('/' + val.value + '/')
          if (reg.test(_value)) {
            testFlag = true
          }
        })
      } else {
        testFlag = true
      }
    }
    // email的校验
    let testFlagEmail = false
    if (store.state.regObj.registLimit.indexOf('email') !== -1) {
      strArr.push('email')
      const _value = value && String(value).trim()
      testFlagEmail = !!/^[a-zA-Z\d]+([-_.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/.test(_value)
    }
    if (!_value) {
      callback()
      // return callback(new Error(`${rule.name}不能为空`));
    }
    // 手机 跟 email 同时判断
    if (strArr.indexOf('mobile') !== -1 && strArr.indexOf('email') !== -1) {
      if (_value && !testFlag && !testFlagEmail) {
        callback(new Error('Please enter the right ' + strArr.join('/')))
      }
    }
    // 手机 跟 email 其中一个需要判断
    if (strArr.length === 1) {
      if ((_value && !testFlag) || (_value && !testFlagEmail)) {
        callback(new Error('Please enter the right ' + strArr.join('/')))
      }
    }
    // alert('成功')
    callback()
  },
  limitaccountNew: (value) => {
    const _value = value
    if (!store.state.regObj.mobilLimit) {
      return false
    }
    // 提示语 mobile 或者 email
    let strArr = []
    // 手机号码的校验
    let testFlag = false
    if (store.state.regObj.registLimit.indexOf('mobile') !== -1) {
      strArr.push('mobile')
      if (store.state.regObj.mobilLimit !== '' && store.state.regObj.mobilLimit !== '[]') {
        let arrObj = JSON.parse(store.state.regObj.mobilLimit)
        // let arrObj = store.state.regObj.mobilLimit
        if (!arrObj) return false
        arrObj.forEach((val) => {
          let reg = eval('/' + val.value + '/')
          if (reg.test(_value)) {
            testFlag = true
          }
        })
      } else {
        testFlag = true
      }
    }
    // email的校验
    let testFlagEmail = false
    if (store.state.regObj.registLimit.indexOf('email') !== -1) {
      strArr.push('email')
      const _value = value && String(value).trim()
      testFlagEmail = !!/^[a-zA-Z\d]+([-_.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/.test(_value)
    }
    if (!_value) {
      return false
      // return callback(new Error(`${rule.name}不能为空`));
    }
    // 手机 跟 email 同时判断
    if (strArr.indexOf('mobile') !== -1 && strArr.indexOf('email') !== -1) {
      if (_value && !testFlag && !testFlagEmail) {
        return 'Please enter the right ' + strArr.join('/')
      }
    }
    // 手机 跟 email 其中一个需要判断
    if (strArr.length === 1) {
      if ((_value && !testFlag) || (_value && !testFlagEmail)) {
        return 'Please enter the right ' + strArr.join('/')
      }
    }
    // alert('成功')
    return true
  },
  // 动态手机号
  limitmobileNew: (value) => {
    const _value = value
    if (!store.state.regObj.mobilLimit) {
      if (!value) {
        return 'Please enter the right phone!'
      } else {
        return true
      }
    }
    // 手机号码的校验
    let testFlag = false
    if (store.state.regObj.registLimit.indexOf('mobile') !== -1) {
      if (store.state.regObj.mobilLimit !== '' && store.state.regObj.mobilLimit !== '[]') {
        let arrObj = JSON.parse(store.state.regObj.mobilLimit)
        // let arrObj = store.state.regObj.mobilLimit
        if (!arrObj) return false
        arrObj.forEach((val) => {
          let reg = eval('/' + val.value + '/')
          if (reg.test(_value)) {
            testFlag = true
          }
        })
      } else {
        testFlag = true
      }
    }
    if (!_value) {
      return false
      // return callback(new Error(`${rule.name}不能为空`));
    }
    if (!testFlag) {
      return 'Please enter the right phone!'
    }
    return true
  },
  // 邮箱账号验证
  limitemail: (value) => {
    let testFlagEmail = false
    const _value = value && String(value).trim()
    testFlagEmail = !!/^[a-zA-Z\d]+([-_.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/.test(_value)
    if (!_value) {
      return false
      // return callback(new Error(`${rule.name}不能为空`));
    }
    if (!testFlagEmail) {
      return 'Please enter the right Email'
    }
    return true
  },
  // 动态规则-手机号码
  limitmobile: (rule, value, callback) => {
    const _value = value
    if (!store.state.regObj.mobilLimit) {
      callback()
    }
    // 手机号码的校验
    let testFlag = false
    if (store.state.regObj.registLimit.indexOf('mobile') !== -1) {
      if (store.state.regObj.mobilLimit !== '' && store.state.regObj.mobilLimit !== '[]') {
        let arrObj = JSON.parse(store.state.regObj.mobilLimit)
        // let arrObj = store.state.regObj.mobilLimit
        if (!arrObj) return
        arrObj.forEach((val) => {
          let reg = eval('/' + val.value + '/')
          if (reg.test(_value)) {
            testFlag = true
          }
        })
      } else {
        testFlag = true
      }
    }
    // 手机判断
    if (_value && !testFlag) {
      callback(new Error('Please enter the right mobile'))
    }
    // alert('成功')
    callback()
  },
  // 动态规则-用户密码
  limitpassword: (value) => {
    const _value = value
    if (!store.state.regObj.passwordConfig) {
      return false
    }
    let reg = eval('/' + store.state.regObj.passwordConfig + '/')
    const test = reg.test(_value)
    if (_value && !test) {
      // return 'Password Non Compliance'
      return 'Password must contain 6-20 characters'
    }
    return true
  },
  // 动态规则-用户密码
  limitwithdrawpassword: (rule, value, callback) => {
    const _value = value
    if (!store.state.regObj.withDrwaPwdConfig) {
      callback()
    }
    let reg = eval('/' + store.state.regObj.withDrwaPwdConfig + '/')
    const test = reg.test(_value)
    if (!_value) {
      callback()
      // return callback(new Error(`${rule.name}不能为空`));
    }
    if (_value && !test) {
      callback(new Error('password must be 6-16 characters long,  digit or  letter'))
    }
    callback()
  },
  // 动态规则-验证码
  limitverificationCode: (rule, value, callback) => {
    const _value = value
    if (!store.state.regObj.valifyConfig) {
      callback()
    }
    let reg = eval('/' + store.state.regObj.valifyConfig + '/')
    // let reg = /^\d+$/
    const test = reg.test(_value)
    if (!_value) {
      callback()
      // return callback(new Error(`${rule.name}不能为空`));
    }
    if (_value && !test) {
      callback(new Error('Please enter the right verificationCode'))
    }
    callback()
  },
  numberVal3: (value) => {
    const _value = value
    const test = !!(/(^[0-9]\d*$)/.test(_value))
    if (_value && !Number(test)) {
      return window.vm.$t('rules.NUMBER-MSG')
    }
    return true
  },
  // 不能特殊字符
  special: (val) => {
    if (!Array.isArray(val) && new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]", 'gim').test(val)) {
      return true
    };
    return false
  },
  /**
   * 简单必填字段验证规则
   * @param {string} str
   * @param {string} trigger
   * @param {boolean} required
   */
  str (str, required = false, trigger = 'blur') {
    return [{ required: required, message: str, trigger: trigger }]
  }
}
