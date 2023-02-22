import request from "@/utils/request";

export const getHomeInfo = () => request({
  url: '/api/home/info',
  method: 'GET'
})