<template>
  <web-view :src="path"></web-view>
</template>

<script setup>
const title = ref(null)
const path = ref(null)

onLoad((option) => {
  path.value = decodeURIComponent(option.path)
  title.value = decodeURIComponent(option.title)
})
onReady(() => {
  uni.setNavigationBarTitle({
    title: title.value
  })
})
</script>

<style lang="scss" scoped></style>
