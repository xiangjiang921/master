import request from '@/utils/request'

//获取所有药品
export function _getAllGroundingDrugs(data) {
  return request({
    url: '/pharmacyController/seacherOnLinePharmacy',
    method: 'post',
    data
  })
}

//获取所有下架商品
export function _getAllUndercarriageDrugs(data) {
  return request({
    url: '/pharmacyController/seacherSoldOutPharmacy',
    method: 'post',
    data
  })
}

//药房端根据药品名称或者编码模糊查询药品数据(字典表)
export function _seachDrugsFormDist(data) {
  return request({
    url: '/pharmacyController/fuzzySearchPharmacy',
    method: 'post',
    data
  })
}

//药房端新增药品
export function _addPharmacy(data) {
  return request({
    url: '/pharmacyController/addPharmacy',
    method: 'post',
    data
  })
}

//药房端药品下架
export function _pharmacySoldOut(data) {
  return request({
    url: '/pharmacyController/PharmacySoldOut',
    method: 'post',
    data
  })
}

//药房端药品上架
export function _pharmacyPutAway(data) {
  return request({
    url: '/pharmacyController/PharmacyPutAway',
    method: 'post',
    data
  })
}


