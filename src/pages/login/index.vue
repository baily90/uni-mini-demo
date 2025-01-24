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
    <button class="btn-login up-reset-button" @click="bindGetUserInfo">授权登录</button>
  </view>
</template>

<script setup>
import { throttle } from '@/utils/index'
import { useAppStore } from '@/stores/modules/app'
import { loginByWeixin } from '@/api/login'

const appStore = useAppStore()
const { setWxInfo } = appStore

const code = ref(null)

const onHomeHandle = throttle(() => {
  uni.switchTab({
    url: '/pages/report/report'
  })
}, 1000)

onLoad(() => {
  uni.login({
    success: (res) => {
      if (res.code) {
        code.value = res.code
      }
    }
  })
})

const bindGetUserInfo = throttle(async () => {
  wx.getUserProfile({
    desc: '用于完善资料',
    success: async (res) => {
      await onLoginHandle(res.userInfo)
    }
  })
}, 1000)

const onLoginHandle = async (userInfo) => {
  if (userInfo) {
    uni.login({
      success: async (res) => {
        if (res.code) {
          const { code, data } = await loginByWeixin({
            data: {
              code: res.code,
              wxAppletUserInfo: { userInfo },
              appId: import.meta.env.VITE_APP_ID
            }
          })
          if (code === 200) {
            setWxInfo(data)
            uni.navigateBack()
          }
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
