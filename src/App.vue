<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useGlobalStore } from './stores/global'
import { storeToRefs } from 'pinia'
onLaunch(async () => {
  console.log('App Launch')
  const globalStore = useGlobalStore()
  const { statusBarHeight, headerHeight } = storeToRefs(globalStore)
  try {
    const sysInfo = await uni.getSystemInfoAsync()
    statusBarHeight.value = sysInfo.statusBarHeight
  } catch (error) {
    console.log(error)
  }

  const { height } = uni.getMenuButtonBoundingClientRect()
  headerHeight.value = height + 12
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
