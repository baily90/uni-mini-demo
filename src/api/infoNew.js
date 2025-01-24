import { request } from '@/utils/request'

export const patientRelation = (data) =>
  request({
    url: 'patient/inspectReport/patientRelation.do',
    method: 'POST',
    data
  })

export const verifyNameAndCardNo = (data) =>
  request({
    url: 'wxapplet/patient/verifyNameAndCardNo.do',
    method: 'POST',
    data
  })
export const validateSmsCode = (data) =>
  request({
    url: 'wxapplet/patient/validate-sms-code.do',
    method: 'POST',
    data
  })
export const checkIdNoAndMobileHistory = (data) =>
  request({
    url: 'patient/infoTemp/checkIdNoAndMobileHistory.do',
    method: 'POST',
    data
  })
export const queryHistoryInfo = (data) =>
  request({
    url: 'patient/infoTemp/queryHistoryInfo.do',
    method: 'POST',
    data
  })
export const submitPatientInfoTemp = (data) =>
  request({
    url: 'patient/infoTemp/submitPatientInfoTemp.do',
    method: 'POST',
    data
  })
