import { request } from '@/utils/request'

export const getPatientById = (data) =>
  request({
    url: 'wxapplet/patient/getPatientById.do',
    method: 'POST',
    data
  })
