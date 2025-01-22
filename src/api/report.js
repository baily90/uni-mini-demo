import { request } from '@/utils/request'

export const patientInspectReportList = (data) =>
  request({
    url: 'patient/inspectReport/patientInspectReportList.do',
    method: 'POST',
    data
  })
export const reportDetail = (data) =>
  request({
    url: 'patient/inspectReport/reportDetail.do',
    method: 'POST',
    data
  })
