import { request } from '@/utils/request'

/**
 * 获取短信验证码
 * @param {*} data
 * @returns
 */
export const getSmsCode = (data) =>
  request({
    url: '/app-api/xdiag/auth/send-sms-code',
    method: 'POST',
    data
  })

/**
 * 微信登录
 * @param {*} data
 * @returns
 */
export const wxlogin = (data) =>
  request({
    url: '/app-api/xdiag/auth/weixin-mini-app-login',
    method: 'POST',
    data
  })

/**
 * 手机号+短信验证码登录
 * @param {*} data
 * @returns
 */
export const smslogin = (data) =>
  request({
    url: '/app-api/xdiag/auth/sms-login',
    method: 'POST',
    data
  })

/**
 * 获取图像验证码
 * @param {*} data
 * @returns
 */
export const getCaptcha = (data) =>
  request({
    url: '/app-api/xdiag/auth/captcha-get',
    method: 'POST',
    data
  })

/**
 * 校验图形验证码
 * @param {*} data
 * @returns
 */
export const captchaValidate = (data) =>
  request({
    url: '/app-api/xdiag/auth/captcha-validate',
    method: 'POST',
    data
  })

/**
 * 登出
 * @param {*} data
 * @returns
 */
export const logout = (data) =>
  request({
    url: '/app-api/xdiag/auth/logout',
    method: 'POST',
    data
  })

/**
 * 获取用户信息
 * @param {*} data
 * @returns
 */
export const getAccountInfo = (data) =>
  request({
    url: '/app-api/xdiag/user/get',
    method: 'GET',
    data
  })

/**
 * 拉新绑定医生关系
 * @param {*} data
 * @returns
 */
export const doctorReferenceBindRelation = (data) =>
  request({
    url: '/app-api/xdiag/referenceBind/doctorReferenceBindRelation',
    method: 'POST',
    data
  })
