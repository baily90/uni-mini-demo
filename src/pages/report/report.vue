<template>
  <view class="container-report-list">
    <ReportBg />
    <BaseNavbar background="transparent" theme="light">云诊所</BaseNavbar>
    <view class="scroll-wrap">
      <scroll-view class="scroll" scroll-y="true">
        <view h-200rpx>1</view>
        <view h-200rpx>2</view>
        <view h-200rpx>3</view>
      </scroll-view>
    </view>
    <BaseTabbar />
  </view>
</template>

<script setup>
import ReportBg from './components/ReportBg/index.vue'
</script>

<style lang="scss" scoped>
@import './report.scss';
</style>
