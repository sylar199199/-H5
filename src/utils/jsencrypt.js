import JSEncrypt from 'jsencrypt/bin/jsencrypt'


// const publicKey = ''

const privateKey = 'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAMalKkaZTEXdJ4xgkHvS1bGUTfrkZWY5tsQ/+EyvnepJtHE5eSccUVVq0yxa64KSSP4d74CinbNLngRRazvff729+gShicazNj+otPGN3x5UgQflKHItt/elB1A8HNIviksx9tcF8zqEb/ahjq4n7NDYikUISkiOL+NW4Gw7rrzTAgMBAAECgYEAoFwxVrDme/fet1o1CWDYlfStRv8eRHoO6zrhDbcv+jTp8AV/om0f057bPxFe0heZyVsNP4EHYfiHZeD8emcgzPXELsjbpTHRW8zZBim1hZGP8LCbMdoSSfyjcgj1ZUJvzk27vYcf07ms1R7X42hKN6ecR7kNY90OMs/zWeW/6/ECQQDpUSm6Xa9DyjqpMP3qUjVMMr9ijinXqC+722PDTphYh9TQloBWQQgNMxz9WIX/w7IAXHmiZl1Xb4c7/CnH3RoXAkEA2fUVGUVSFW//tBgoit1TEGOQHJUkPhR74SvGedWKhbkJC7XkQ7oUiRmIcFNLczO8rSIszkHYNvbJc2vGYYn0pQJAWL39MBx4EEG4BChVO63fBcd7keHeul8HIN22WU/olCu930SPNb9wb4zUZuwns3tcldSWkxV6RUpvVnp37cQEKwJBAIgtk5AleqLARmBMk9AndoWP33OsT2emPrwyMKDgpdrlAFzbuZIDSl9an5+mu0ZwNdtqtdns092LldRSqzE4E60CQQCNo5QA3ybJgwPwJoud/ayYHSXfnU2c9x6KnHrLVTRWCl4M1tBWhA/yeTCXQYd84OQI8fUndjDypwNIyJ3yyVTC'

// 加密
export function encrypt(data) {
  // 新建JSEncrypt对象
  let encryptor = new JSEncrypt()
  // 设置公钥
  encryptor.setPublicKey(privateKey)
  // 加密数据
  return encryptor.encrypt(data)
}

// 解密
export function decrypt(privateKey, data) {
  // 新建JSEncrypt对象
  let decrypt = new JSEncrypt()
  // 设置私钥
  decrypt.setPrivateKey(privateKey)
  // 解密数据
  decrypt.decrypt(data)
}
