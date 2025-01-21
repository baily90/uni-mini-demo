import { request } from '@/utils/request'

/**
 * 消息列表分页查询
 * @param {*} data
 * @returns
 */
export const getDiagVerifyListByPage = (data) => {
  return request({
    url: '/app-api/xdiag/notice/getDiagVerifyListByPage',
    method: 'POST',
    data
  })
}

/**
 * 消息确认
 * @param {*} data
 * @returns
 */
export const doctorNoticeConfirm = (data) => {
  return request({
    url: '/app-api/xdiag/notice/doctorNoticeConfirm',
    method: 'POST',
    data
  })
}
