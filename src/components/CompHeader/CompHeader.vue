<script setup lang='ts'>
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
import { computed, toRefs } from 'vue'

interface IProps {
  title?: string
}
const props = withDefaults(defineProps<IProps>(), {
  title: 'uni-mini-demo'
})

const globalStore = useGlobalStore()
const { statusBarHeight, headerHeight } = storeToRefs(globalStore)

const statusBarHeightStyle = computed(() => `${statusBarHeight.value}px`)
const headerHeightStyle = computed(() => `${headerHeight.value}px`)

const { title } = toRefs(props)
</script>

<template>
  <view class='container'>
    <view class="statusBar"></view>
    <view class="headerWrap">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="title">
        {{title}}
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $uni-white;
  border-bottom: 1px solid $uni-border-1;
  z-index: 1;
  .statusBar {
    height: v-bind(statusBarHeightStyle);
  }
  .headerWrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: v-bind(headerHeightStyle);
    padding-left: 20rpx;
    .title {
      position: absolute;
      top: 0;
      left: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: -150rpx;
      width: 300rpx;
      height: 100%;
      color: $uni-main-color;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 32rpx;
      font-weight: bold;
    }
  }
}
</style>
