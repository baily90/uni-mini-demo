<template>
  <view class="container-info-new">
    <BaseNavbar background="transparent" theme="light"></BaseNavbar>
    <view class="labels">
      <view class="label-item">根据国家规定，获取报告</view>
      <view class="label-item">需要先填写患者信息</view>
    </view>
    <view class="clinicName">门店：上海浦东新区东榆路门诊</view>
    <scroll-view scroll-y="true" class="scroll-view safe-bottom">
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
          <view class="item-label">姓名</view>
          <up-input
            class="item-value"
            placeholderClass="placeholder-value"
            placeholder="请输入姓名"
            border="none"
            clearable
            inputAlign="right"
          ></up-input>
        </view>
        <view class="form-item up-border-bottom">
          <view class="item-label">身份证</view>
          <up-input
            class="item-value"
            placeholderClass="placeholder-value"
            type="idcard"
            placeholder="请输入身份证号"
            border="none"
            clearable
            inputAlign="right"
            :maxlength="18"
          ></up-input>
        </view>
        <view class="form-item up-border-bottom">
          <view class="item-label">手机号</view>
          <up-input
            class="item-value"
            placeholderClass="placeholder-value"
            type="number"
            placeholder="请输入手机号"
            border="none"
            clearable
            inputAlign="right"
            :maxlength="11"
          ></up-input>
        </view>
        <view class="form-item up-border-bottom">
          <view class="item-label">验证码</view>
          <up-input
            class="item-value"
            placeholderClass="placeholder-value"
            type="number"
            placeholder="请输入验证码"
            border="none"
            clearable
            inputAlign="right"
            :maxlength="6"
          >
            <template #suffix>
              <button class="up-reset-button">获取验证码</button>
            </template>
          </up-input>
        </view>
      </view>
      <Protocols v-model:checked="isChecked" :protocols="protocols" />
      <button class="up-reset-button">确定</button>
    </scroll-view>
  </view>
</template>

<script setup>
import { doctorAgreements } from '@/api/common'
import Protocols from './components/Protocols/index.vue'

const clinicId = ref(null)
const protocols = ref(null)
const isChecked = ref(false)
const getProtocols = async () => {
  try {
    const { code, data } = await doctorAgreements({ platform_id: 5, scene: 'mini_patient_info' })
    if (code === 200) {
      protocols.value = data
    }
  } catch (error) {}
}

onLoad((options) => {
  clinicId.value = options.clinicId
  getProtocols()
})
</script>

<style lang="scss" scoped>
@import './infoNew.scss';
</style>
