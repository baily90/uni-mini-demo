import { request } from '@/utils/request'

export const getInspectReportList = (data) =>
  request({
    url: '/patient/inspectReport/patientInspectReportList.do',
    method: 'POST',
    data
  })
