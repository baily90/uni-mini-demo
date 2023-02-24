<script setup lang='ts'>

const go2Order = () => {
  uni.navigateTo({
    url: '/pages/order/index'
  })
}
</script>

<template>
  <CompPage title="我的">
    this is my page
    <button @click="go2Order">go2Order</button>
  </CompPage>
</template>

<style lang='scss' scoped>

</style>
