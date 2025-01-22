import { request } from '@/utils/request'

export const configList = (data) =>
  request({
    url: 'pub/config/list.do',
    method: 'POST',
    data
  })
