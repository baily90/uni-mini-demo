<template>
  <view class="container-welcome">
    <view class="patient">Hi~亲爱的{{ patient?.userName }}</view>
    <view class="tips">欢迎查看您的云诊报告</view>
  </view>
</template>

<script setup>
defineProps({
  patient: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped>
.container-welcome {
  position: relative;
  width: 100%;
  padding: 102rpx 64rpx 88rpx;
  .patient {
    font-weight: 600;
    font-size: 46rpx;
    color: #ffffff;
    line-height: 62rpx;
  }
  .tips {
    margin-top: 12rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: #ffffff;
    line-height: 33rpx;
  }
}
</style>
