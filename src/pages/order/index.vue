<script setup lang='ts'>
import { usePaddingTopStyle } from '@/utils/hooks'

const paddingTopStyle = usePaddingTopStyle()
const goBack = () => {
  uni.navigateBack()
}
</script>

<template>
  <view class='container'>
    <CompHeader title="我的订单">
      <template #left>
        <uni-icons type="left" size="24" @click="goBack"></uni-icons>
      </template>
    </CompHeader>
    order
  </view>
</template>

<style lang='scss' scoped>
.container {
  padding-top: v-bind(paddingTopStyle);
}
</style>
