<template>
  <up-no-network :zIndex="10080"></up-no-network>
  <KuRootView />
  <GlobalModal />
</template>

<script setup>
uni.hideShareMenu()
const env = uni.getAccountInfoSync()
const buildEnv = import.meta.env.VITE_BUILD_ENV
const EnvVersionMap = {
  develop: '开发版',
  trial: '体验版',
  release: '正式版',
  gray: '灰度版'
}
const envVersion = env.miniProgram.envVersion
const envVersionDesc = EnvVersionMap[envVersion]
console.log(`当前环境：${buildEnv} - ${envVersionDesc}`)
</script>
