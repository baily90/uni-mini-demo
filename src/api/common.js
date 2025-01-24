import { request } from '@/utils/request'

export const configList = (data) =>
  request({
    url: 'pub/config/list.do',
    method: 'POST',
    data
  })

export const doctorAgreements = (data) =>
  request({
    url: 'mzt-clinic-api/agreement/doctor_agreements',
    method: 'POST',
    data
  })

export const sendSmsCode = (data) =>
  request({
    url: 'wxapplet/patient/send-sms-code.do',
    method: 'POST',
    data
  })
