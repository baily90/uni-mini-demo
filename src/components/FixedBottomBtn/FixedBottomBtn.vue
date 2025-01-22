<template>
  <view class="container-fixed-bottom-button" :style="{'background': background, backgroundSize: '100% auto'}">
    <view class="bottom-content" :style="{'height': height}">
      <slot></slot>
    </view>
    <view :style="{'height':fixedBottomHeight + 'px'}"></view>
  </view>
  <view>
    <view class="bottom-content-placeholder" :style="{'height': height}"></view>
    <view :style="{'height':fixedBottomHeight + 'px'}"></view>
  </view>
</template>

<script setup>
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()
const { windowInfo } = storeToRefs(appStore)

defineProps({
  height: {
    type: String,
    default: '128rpx'
  },
  background: {
    type: String,
    default: '#ffffff'
  }
})
const fixedBottomHeight = computed(() => windowInfo.value.safeAreaInsets.bottom)
</script>

<style lang="scss" scoped>
.container-fixed-bottom-button {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  .bottom-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}
.bottom-content-placeholder {
  width: 100%;
}
</style>
