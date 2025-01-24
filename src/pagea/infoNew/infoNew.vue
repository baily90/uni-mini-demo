<template>
  <view class="container-info-new">
    <BaseNavbar background="transparent" theme="light"></BaseNavbar>
    <view class="labels">
      <view class="label-item">根据国家规定，获取报告</view>
      <view class="label-item">需要先填写患者信息</view>
    </view>
    <view class="clinicName">门店：{{ clincName }}</view>
    <view class="wrap">
      <view class="idcard">
        <view class="idcard-label">拍身份证，信息自动填</view>
        <view class="btn-uploadIDCard" bindtap="uploadIDCard">
          <image
            class="icon-plus"
            src="https://common-mzt-public.weicha88.com/mzt-mini/icon_plus.png"
          ></image>
          拍身份证
        </view>
      </view>
      <view class="form-box">
        <view class="form-item up-border-bottom">
          <view class="item-label"><view text-red>*</view>姓名</view>
          <up-input
            class="item-value"
            placeholderClass="placeholder-value"
            v-model.trim="userName"
            placeholder="请输入姓名"
            border="none"
            clearable
            inputAlign="right"
          ></up-input>
        </view>
        <view class="form-item up-border-bottom">
          <view class="item-label"><view text-red>*</view>身份证</view>
          <up-input
            class="item-value"
            placeholderClass="placeholder-value"
            v-model.trim="idNo"
            type="idcard"
            placeholder="请输入身份证号"
            border="none"
            clearable
            inputAlign="right"
            :maxlength="18"
          ></up-input>
        </view>
        <view class="form-item up-border-bottom">
          <view class="item-label"><view text-red>*</view>手机号</view>
          <up-input
            class="item-value"
            placeholderClass="placeholder-value"
            :readonly="!!oldMobile"
            v-model.trim="mobile"
            type="number"
            placeholder="请输入手机号"
            border="none"
            clearable
            inputAlign="right"
            :maxlength="11"
          ></up-input>
        </view>
        <view class="form-item up-border-bottom" v-if="isNeedSmsCode">
          <view class="item-label"><view text-red>*</view>验证码{{ isNeedSmsCode }}</view>
          <up-input
            class="item-value"
            placeholderClass="placeholder-value"
            v-model.trim="smsCode"
            type="number"
            placeholder="请输入验证码"
            border="none"
            inputAlign="right"
            :maxlength="6"
          >
            <template #suffix>
              <view class="btn-send-msg" @click="onSendMsgCodeHandle">{{
                time === 0 ? '获取验证码' : `${time}s后重新获取`
              }}</view>
            </template>
          </up-input>
        </view>
      </view>
      <Protocols v-model:checked="isChecked" :protocols="protocols" />
      <button class="up-reset-button btn-submit" @click="onSubmitHandle">提交信息</button>
      <Support :support="support" />
    </view>
  </view>
</template>

<script setup>
import { getPatientById } from '@/api/my'
import {
  patientRelation,
  verifyNameAndCardNo,
  validateSmsCode,
  checkIdNoAndMobileHistory,
  queryHistoryInfo,
  submitPatientInfoTemp
} from '@/api/infoNew'
import { configList, doctorAgreements, sendSmsCode } from '@/api/common'
import Protocols from './components/Protocols/index.vue'
import Support from './components/Support/index.vue'
import { checkIdCard, checkMobile, throttle } from '@/utils/index.js'
import { watch } from 'vue'

const clinicId = ref(null)
const clincName = ref(null)
const protocols = ref(null)
const support = ref(null)
const isChecked = ref(false)
const userName = ref(null)
const idNo = ref(null)
const mobile = ref(null)
const time = ref(0)
const smsCode = ref(null)
const isNeedSmsCode = ref(false)
const oldMobile = ref(null)

const onSendMsgCodeHandle = throttle(async () => {
  if (time.value > 0) return

  if (!mobile.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入手机号'
    })
    return
  }
  if (!checkMobile(mobile.value)) {
    uni.showToast({
      icon: 'none',
      title: '请输入正确手机号'
    })
    return
  }
  const { code } = await sendSmsCode({
    data: {
      mobile: mobile.value,
      scene: 999
    }
  })
  if (code === 200) {
    uni.showToast({
      icon: 'none',
      title: '验证码已发送'
    })
    time.value = 60
    const timer = setInterval(() => {
      time.value--
      if (time.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  }
}, 1000)

const getHistoryInfo = async () => {
  try {
    const { code, data } = await queryHistoryInfo({ data: { clinicId: clinicId.value } })
    if (code === 200) {
      userName.value = data?.userName
      mobile.value = data?.mobile
      idNo.value = data?.idNo
    }
  } catch (error) {}
}

const getProtocols = async () => {
  try {
    const { code, data } = await doctorAgreements({ platform_id: 5, scene: 'mini_patient_info' })
    if (code === 200) {
      protocols.value = data
    }
  } catch (error) {}
}
const getPubConfig = async () => {
  try {
    const { code, data } = await configList({})
    if (code === 200) {
      const temp = {}
      data?.forEach((config) => {
        if (
          [
            'PLATFORM_CUSTOMER_WECHAT_QR_CODE',
            'PLATFORM_CUSTOMER_TEL',
            'PLATFORM_CUSTOMER_WECHAT_NUMBER'
          ].includes(config.paramKey)
        ) {
          temp[config.paramKey] = config.paramValue
        }
      })
      support.value = { ...temp }
    }
  } catch (error) {}
}

const getClincName = async () => {
  try {
    const { code, data } = await patientRelation({
      data: {
        clinicId: clinicId.value,
        productId: 0
      }
    })
    if (code === 200) {
      clincName.value = data?.clinicName
    }
  } catch (error) {}
}

const getOldMobile = async () => {
  try {
    const { code, data } = await getPatientById({})
    if (code === 200 && data?.mobile) {
      oldMobile.value = data.mobile
      mobile.value = data.mobile
    } else {
      oldMobile.value = undefined
    }
  } catch (error) {}
}

const checkNameAndCardNo = async (data) => {
  try {
    const { code, data: resData, msg } = await verifyNameAndCardNo({ data })
    if (code === 200 && resData) {
      return true
    } else {
      uni.showToast({
        icon: 'none',
        title: msg
      })
      return false
    }
  } catch (error) {
    return false
  }
}

const checkSmsCode = async (data) => {
  try {
    const { code, data: resData, msg } = await validateSmsCode({ data })
    if (code === 200 && resData) {
      return true
    } else {
      uni.showToast({
        icon: 'none',
        title: msg
      })
      return false
    }
  } catch (error) {
    return false
  }
}

const getIdNoAndMobileHistory = async (data) => {
  try {
    const res = await checkIdNoAndMobileHistory({ data })
    if (res.code === 200 && res.data) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

watch([idNo, mobile], async (newVal) => {
  const _idNo = newVal[0]
  const _mobile = newVal[1]
  try {
    if (!oldMobile.value && checkIdCard(_idNo) && checkMobile(_mobile)) {
      const flag = await getIdNoAndMobileHistory({ mobile: _mobile, idNo: _idNo })
      isNeedSmsCode.value = !flag // flag为是否存在，存在不需要发短信验证码，所以这里取反
    }
  } catch (error) {
    isNeedSmsCode.value = false
  }
})

const onSubmitHandle = throttle(async () => {
  if (!userName.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入姓名'
    })
    return
  }
  if (!idNo.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入身份证号'
    })
    return
  }
  if (!checkIdCard(idNo.value)) {
    uni.showToast({
      icon: 'none',
      title: '请输入正确的身份证号'
    })
    return
  }
  if (!mobile.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入手机号'
    })
    return
  }
  if (!checkMobile(mobile.value)) {
    uni.showToast({
      icon: 'none',
      title: '请输入正确手机号'
    })
    return
  }
  if (isNeedSmsCode.value && !smsCode.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入验证码'
    })
    return
  }
  if (!isChecked.value) {
    uni.showToast({
      icon: 'none',
      title: '请阅读并同意相关协议'
    })
    return
  }
  // 校验姓名 身份证一致性
  const checkNameAndCardNoFlag = await checkNameAndCardNo({
    idCardNo: idNo.value,
    realName: userName.value
  })
  if (!checkNameAndCardNoFlag) {
    return
  }

  // 校验短信验证码有效性
  if (isNeedSmsCode.value) {
    const validateSmsCodeFlag = await checkSmsCode({
      code: smsCode.value,
      mobile: mobile.value,
      scene: 999
    })
    if (!validateSmsCodeFlag) {
      return
    }
  }

  try {
    const requestBody = {
      clinicId: clinicId.value,
      userName: userName.value,
      idNo: idNo.value,
      mobile: mobile.value
    }
    console.log('通过校验', requestBody)
    const { code } = await submitPatientInfoTemp({ data: { ...requestBody } })
    if (code === 200) {
      // 跳转填写结果页
      // wx.redirectTo({
      //   url: `/pagea/infoResultNew/infoResultNew?name=${this.data.patientName}&clinicId=${this.data.clinicId}`
      // })
    }
  } catch (error) {}
}, 1000)

onLoad((options) => {
  clinicId.value = options.clinicId
  getHistoryInfo()
  getProtocols()
  getPubConfig()
  getClincName()
  getOldMobile()
})
</script>

<style lang="scss" scoped>
@import './infoNew.scss';
</style>
