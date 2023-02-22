<script setup lang='ts'>
import { usePaddingTopStyle } from '@/utils/hooks'

const paddingTopStyle = usePaddingTopStyle()
const go2Order = () => {
  uni.navigateTo({
    url: '/pages/order/index'
  })
}
</script>

<template>
  <view class='container'>
    <CompHeader title="我的" />
    <button @click="go2Order">go2Order</button>
  </view>
</template>

<style lang='scss' scoped>
.container {
  padding-top: v-bind(paddingTopStyle);
}
</style>
