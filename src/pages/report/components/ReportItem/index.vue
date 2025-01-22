<template>
  <view class="container-report-item" @click="go2Detail">
    <view class="btn-detail">查看详情</view>
    <view class="title">
      <image class="icon-position" :src="report.regionImg" mode="widthFix" />
      {{ report?.bodyRegionName }}检查报告
    </view>
    <view class="wrap">
      <view class="detail">
        <view class="detail-item">
          <view class="detail-item-label">就诊机构：</view>
          <view class="detail-item-value">{{ report?.orgName }}</view>
        </view>
        <view class="detail-item">
          <view class="detail-item-label">出具时间：</view>
          <view class="detail-item-value">{{ report?.reportTime }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { throttle } from '@/utils/index'

const props = defineProps({
  report: {
    type: Object,
    default: () => {}
  }
})

const go2Detail = throttle(() => {
  uni.navigateTo({
    url: `/pages/reportDetail/reportDetail?id=${props.report.id}`
  })
}, 1000)
</script>

<style lang="scss" scoped>
.container-report-item {
  position: relative;
  margin: 24rpx auto 0;
  width: 686rpx;
  padding-top: 60rpx;
  background: url('https://common-mzt-public.weicha88.com/mzt-mini/report_item_card_bg.png')
    no-repeat top center;
  background-size: 100% auto;
  box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.02);
  border-radius: 32rpx;
  overflow: hidden;

  .btn-detail {
    position: absolute;
    top: 20rpx;
    right: 50rpx;
    font-size: 26rpx;
    color: #666666;
    line-height: 30rpx;
    letter-spacing: 2px;
  }
  .title {
    display: flex;
    align-items: center;
    padding: 0 40rpx;
    font-weight: 500;
    font-size: 32rpx;
    color: #2d3034;
    line-height: 38rpx;

    .icon-position {
      margin-right: 12rpx;
      width: 32rpx;
      height: 32rpx;
    }
  }
  .wrap {
    width: 100%;
    padding: 40rpx;
    background-color: #fff;
    .detail {
      width: 100%;
      padding: 32rpx 22rpx;
      background: linear-gradient(90deg, #f7faff 0%, #ebf8ff 100%);
      border-radius: 16rpx;
      .detail-item {
        display: flex;
        align-items: flex-start;
        .detail-item-label,
        .detail-item-value {
          font-size: 28rpx;
          color: #666666;
          line-height: 48rpx;
        }
        .detail-item-label {
          flex-shrink: 0;
        }
        .detail-item-value {
          font-weight: 500;
          color: #2d3034;
        }
        &:last-child {
          margin-top: 10rpx;
        }
      }
    }
  }
}
</style>
