<script setup lang='ts'>
import { toRefs } from 'vue';

interface IProps {
  list: [];
}

const props = withDefaults(defineProps<IProps>(), {
  
})

const { list } = toRefs(props)
</script>

<template>
  <view class='container'>
    <view class="orderItem" v-for="item in list" :key="item.id">
      <view class="orderHeader">
        <view class="orderDate">2020-12-03 13:23</view>
        <view class="orderStatus grey">待支付</view>
      </view>
      <scroll-view class="orderGoodsList" scroll-x="true">
        <image class="orderGoodsItem" src="//gw.alicdn.com/bao/uploaded/i1/2750302092/O1CN01auT0RP1RKBNCny5aX_!!2750302092.jpg_300x300q90.jpg_.webp" mode="aspectFill"></image>
        <image class="orderGoodsItem" src="//gw.alicdn.com/bao/uploaded/i1/2750302092/O1CN01auT0RP1RKBNCny5aX_!!2750302092.jpg_300x300q90.jpg_.webp" mode="aspectFill"></image>
        <image class="orderGoodsItem" src="//gw.alicdn.com/bao/uploaded/i1/2750302092/O1CN01auT0RP1RKBNCny5aX_!!2750302092.jpg_300x300q90.jpg_.webp" mode="aspectFill"></image>
      </scroll-view>
      <view class="orderFooter">
        <view class="orderCount">共3件</view>
        <view class="orderPrice">
          实付:
          <view class="orderPriceUnit">&yen;</view>
          <view class="orderPriceAmount">22.39</view>
        </view>
        <view class="btnWrap">
          <view class="btn btnSecondary">取货码</view>
          <view class="btn btnMain">去付款</view>
        </view>
      </view>
    </view>
    <uni-load-more status="loading" />
    <!-- loading/noMore -->
  </view>
</template>

<style lang='scss' scoped>
.container {
  padding: 0 $uni-spacing-base;
  .orderItem {
    margin-top: $uni-spacing-base;
    width: 100%;
    padding: 0 $uni-spacing-base 48rpx $uni-spacing-base;
    background-color: $uni-white;
    border-radius: $uni-radius-base;
    .orderHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 95rpx;
      padding: 0 $uni-spacing-sm;
      border-bottom: 1rpx solid $uni-border-1;
      .orderDate {
        font-size: 26rpx;
        color: $uni-secondary-color;
      }
      .orderStatus {
        font-size: 30rpx;
        color: $uni-primary;
        &.grey {
          color: $uni-secondary-color;
        }
      }
    }
    .orderGoodsList {
      width: 100%;
      padding: $uni-spacing-lg 0;
      white-space: nowrap;
      .orderGoodsItem {
        margin: 0 $uni-spacing-sm;
        width: 128rpx;
        height: 128rpx;
        border-radius: $uni-radius-sm;
      }
    }
    .orderFooter {
      position: relative;
      display: flex;
      align-items: baseline;
      width: 100%;
      height: 48rpx;
      .orderCount {
        font-size: 28rpx;
        color: $uni-secondary-color;
      }
      .orderPrice {
        display: flex;
        align-items: baseline;
        font-size: 26rpx;
        margin-left: $uni-spacing-sm;
        color: $uni-main-color;
        .orderPriceUnit {
          margin: 0 6rpx 0 8rpx;
          font-size: 22rpx;
          font-weight: bold;
        }
        .orderPriceAmount {
          font-size: 34rpx;
          font-weight: bold;
        }
      }
      .btnWrap {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -32rpx;
        display: flex;
        gap: $uni-spacing-base;
        .btn {
          display: flex;
          align-items: center;
          height: 64rpx;
          padding: 0 38rpx;
          border-radius: 32rpx;
          border: 2rpx solid $uni-primary;
          font-size: 28rpx;
          font-weight: bold;
          &.btnMain {
            background: $uni-gradient;
            color: $uni-white;

          }
          &.btnSecondary {
            color: $uni-primary;
          }
        }
      }
    }
  }
}
</style>
