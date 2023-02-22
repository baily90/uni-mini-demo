<script setup lang='ts'>
import { getHomeInfo } from '@/apis/home'

getHomeInfo().then(res => {
  console.log(res)
})
</script>

<template>
  <view class='container'>
    home
  </view>
</template>

<style lang='scss' scoped>
.container {

}
</style>
