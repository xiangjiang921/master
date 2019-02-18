import request from '@/utils/request'

//获取订单
export function _getAllOrders(data) {
  return request({
    url: '/orderManagerController/onLineOrders',
    method: 'post',
    data
  })
}

//根据orderId获取订单详细信息
export function _getOrderDetailsByOrderId(data) {
  return request({
    url: 'orderManagerController/inLineDetails',
    method: 'post',
    data
  })
}
