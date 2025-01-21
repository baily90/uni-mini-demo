<template>
  <BaseNavbar>我的</BaseNavbar>
  <view class="container-my">
    是否登录：{{ isLogined }}
    <button v-if="isLogined" @click="onLogout">退出登录</button>
    <button v-if="!isLogined" @click="onLogin">登录</button>
  </view>

  <BaseTabbar />
</template>

<script setup>
import { useAppStore } from '@/stores/modules/app'
const appStore = useAppStore()

const { clearLoginInfo } = appStore
const { isLogined } = storeToRefs(appStore)

const onLogout = () => {
  clearLoginInfo()
  uni.showToast({
    title: '退出登录成功'
  })
}

const onLogin = () => {
  uni.navigateTo({
    url: '/pages/login/index'
  })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
