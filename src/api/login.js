import { request } from '@/utils/request'

export const loginByWeixin = (data) =>
  request({
    url: '/wxapplet/user/authorize/info.do',
    method: 'POST',
    data
  })
