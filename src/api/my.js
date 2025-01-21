import { request } from '@/utils/request'

// 获取银行列表
export const getBankList = (data) => {
  return request({
    url: '/app-api/xdiag/config/getBankList',
    method: 'POST',
    data
  })
}
// 验证银行卡三要素（姓名，身份证号，银行卡号）（提交银行卡信息前调用）
export const verifyBank = (data) => {
  return request({
    url: '/app-api/xdiag/account/verifyBank3',
    method: 'POST',
    data
  })
}

// 获取人脸识别flowId(请先调用验证姓名身份证号接口，验证姓名身份证号码)
export const getFaceVerifyFlowId = (data) => {
  return request({
    url: '/app-api/xdiag/account/getFaceVerifyFlowId',
    method: 'POST',
    data
  })
}
// 账户认证信息
export const getAccountAuthInfo = (data) => {
  return request({
    url: '/app-api/xdiag/account/accountAuthInfo',
    method: 'POST',
    data
  })
}
// 打款账户设置
export const bankAccount = (data) => {
  return request({
    url: '/app-api/xdiag/account/bankAccount',
    method: 'POST',
    data
  })
}

// 资格证上传更新
export const uploadPracticeCert = (data) => {
  return request({
    url: '/app-api/xdiag/account/uploadPracticeCert',
    method: 'POST',
    data
  })
}
// 结算方式设置
export const settlementTypeSet = (data) => {
  return request({
    url: '/app-api/xdiag/account/settlementType',
    method: 'POST',
    data
  })
}

// 个人中心-修改性别
export const updateSex = (data) => {
  return request({
    url: '/app-api/xdiag/account/updateSex',
    method: 'POST',
    data
  })
}

// 个人中心数据概览
export const myOverview = (data) => {
  return request({
    url: '/app-api/xdiag/account/myOverview',
    method: 'POST',
    data
  })
}
