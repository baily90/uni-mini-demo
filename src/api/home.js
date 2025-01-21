import { request } from '@/utils/request'

export const setAddress = (data) => request({
  url: '/app-api/xdiag/account/setAddress',
  method: 'POST',
  data
})

export const homeOverview = (data) => request({
  url: '/app-api/xdiag/account/homeOverview',
  method: 'POST',
  data
})

export const newOrderPage = (data) => request({
  url: '/app-api/xdiag/order/newOrderPage',
  method: 'POST',
  data
})

export const pendingOrderPage = (data) => request({
  url: '/app-api/xdiag/order/pendingOrderPage',
  method: 'POST',
  data
})

export const finishOrderPage = (data) => request({
  url: '/app-api/xdiag/order/finishOrderPage',
  method: 'POST',
  data
})

export const orderTake = (data) => request({
  url: '/app-api/xdiag/order/orderTake',
  method: 'POST',
  data
})

export const orderCancel = (data) => request({
  url: '/app-api/xdiag/order/orderCancel',
  method: 'POST',
  data
})

export const orderTransfer = (data) => request({
  url: '/app-api/xdiag/order/orderTransfer',
  method: 'POST',
  data
})
