<template>
  <view class="container-my">
    <BaseNavbar background="transparent" theme="light">云诊所</BaseNavbar>
    <view class="name">
      <image
        class="icon-logo"
        src="https://common-mzt-public.weicha88.com/mzt-mini/my_logo.png"
        mode="widthFix"
      />
      {{ patient?.userName }}
    </view>
    <view class="content">
      <view class="content-item up-border-bottom">
        <view class="label">身份证</view>
        <view class="value">{{ patient?.idNo }}</view>
      </view>
      <view class="content-item up-border-bottom">
        <view class="label">性别</view>
        <view class="value">{{ patient?.gender === 0 ? '男' : '女' }}</view>
      </view>
      <view class="content-item up-border-bottom">
        <view class="label">年龄</view>
        <view class="value">{{ patient?.patientAge }}岁</view>
      </view>
      <view class="content-item up-border-bottom">
        <view class="label">手机号</view>
        <view class="value">{{ patient?.mobile }}</view>
      </view>

      <button v-if="isLogined" @click="onLogout">退出登录</button>
      <button v-if="!isLogined" @click="onLogin">登录</button>
    </view>
    <BaseTabbar />
  </view>
</template>

<script setup>
import { getPatientById } from '@/api/my'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

const patient = ref(null)
const { clearWxInfo } = appStore
const { isLogined } = storeToRefs(appStore)

const onLogout = () => {
  clearWxInfo()
  uni.showToast({
    title: '退出登录成功'
  })
}

const onLogin = () => {
  uni.navigateTo({
    url: '/pages/login/index'
  })
}

const getPatientInfo = async () => {
  try {
    const { code, data } = await getPatientById({})
    if (code === 200) {
      patient.value = data
    }
  } catch (error) {}
}

onShow(() => {
  getPatientInfo()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
