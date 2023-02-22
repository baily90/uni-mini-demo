<script setup lang="ts">
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const globalStore = useGlobalStore()
const { statusBarHeight, headerHeight } = storeToRefs(globalStore)
const statusBarHeightStyle = computed(() => `${statusBarHeight.value}px`)
const headerHeightStyle = computed(() => `${headerHeight.value}px`)

const go2Order = () => {
  uni.navigateTo({
    url: '/pages/order/index'
  })
}

</script>

<template>
  <view class="content">
    <view class="statusBar"></view>
    <view class="header" @click="go2Order">我的</view>
    my
  </view>
</template>

<style lang="scss" scoped>
  .content {
    .statusBar {
      height: v-bind(statusBarHeightStyle);
      background-color: blueviolet;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: v-bind(headerHeightStyle);
      font-size: 32rpx;
      font-weight: bold;
      background-color: antiquewhite;
    }
  }
</style>
