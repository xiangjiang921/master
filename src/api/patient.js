import request from '@/utils/request'

//药房端获取行政区域信息
export function _getZones(data) {
  return request({
    url: '/manage/pharmacy/zone',
    method: 'post',
    data
  })
}

//获取街道信息
export function _getTowns(data) {
  return request({
    url: '/manage/pharmacy/town',
    method: 'post',
    data
  })
}

//药房端患者登记-患者登记列表查询
export function _queryRegisterListForPatient(data) {
  return request({
    url: '/pharmacyController/queryRegisterListForPatient',
    method: 'post',
    data
  })
}



