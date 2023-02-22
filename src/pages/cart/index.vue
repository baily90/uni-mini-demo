<script setup lang='ts'>
import { usePaddingTopStyle } from '@/utils/hooks'

const paddingTopStyle = usePaddingTopStyle()
</script>

<template>
  <view class='container'>
    <CompHeader title="购物车" />
    cart
  </view>
</template>

<style lang='scss' scoped>
.container {
  padding-top: v-bind(paddingTopStyle);
}
</style>
