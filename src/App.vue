<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useGlobalStore } from './stores/global'
import { storeToRefs } from 'pinia'
onLaunch(async () => {
  console.log('App Launch')
  const globalStore = useGlobalStore()
  const { statusBarHeight, headerHeight } = storeToRefs(globalStore)
  const { top, height } = uni.getMenuButtonBoundingClientRect()
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight
  headerHeight.value = (top - systemInfo.statusBarHeight) * 2 + height
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color;
}
view {
  box-sizing: border-box;
  font-size: 32rpx;
  color: $uni-secondary-color;
}
</style>
