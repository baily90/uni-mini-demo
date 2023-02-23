import request from "@/utils/request";

export const getOrderListService = (data: any) => request({
  url: '/api/order/list',
  method: 'GET',
  data,
  hideLoading: true
})