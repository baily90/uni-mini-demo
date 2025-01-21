<template>
  <view class="container-login safe-bottom">
    <BaseNavbar>
      <template #left>
        <image
          class="btn-home"
          src="https://common-mzt-public.weicha88.com/mzt-mini/login/icon_home.png"
          mode="scaleToFill"
          @click="onHomeHandle"
        />
      </template>
      登录
    </BaseNavbar>
    <view class="content-login">
      <image
        class="icon-logo"
        src="https://common-mzt-public.weicha88.com/mzt-mini/login/icon_logo.png"
        mode="scaleToFill"
      />
      <view class="welcome">我的云诊所欢迎您！</view>
      <up-line length="630rpx" color="rgba(0,0,0,0.1)"></up-line>
      <view class="label">我的云诊所申请获得以下权限</view>
      <view class="info">• 获得你的公开信息（昵称、头像等）</view>
    </view>
    <button class="btn-login up-reset-button" @click="onLoginHandle">授权登录</button>
  </view>
</template>

<script setup>
import { useAppStore } from '@/stores/modules/app'

const { setLoginInfo } = useAppStore()
const onLoginHandle = () => {
  setLoginInfo({
    userId: 1,
    accessToken: '123',
    refreshToken: '123',
    expiresTime: '123',
    openid: '123'
  })
  uni.navigateBack()
}

const onHomeHandle = () => {
  uni.switchTab({
    url: '/pages/report/report'
  })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
