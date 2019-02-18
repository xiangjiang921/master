import request from '@/utils/request'

//登陆
export function login(data) {
  return request({
    url: '/login/userLogin',
    method: 'post',
    data
  })
}

//获取TOKEN
export function getInfo(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}

//获取验证码
export function _getVerificationCode() {
  return request({
    url: 'utilController/getYzmCodeAndUrl',
    method: 'post'
  })
}

//退出登陆
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
