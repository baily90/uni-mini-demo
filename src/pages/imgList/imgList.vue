<template>
  <view class="container-img-list">
    <BaseNavbar theme="light" background="transparent">检查影像</BaseNavbar>
    <swiper
      class="swiper"
      :indicator-dots="true"
      indicator-color="rgba(255, 255, 255, 0.3)"
      indicator-active-color="#fff"
    >
      <swiper-item class="swiper-item" v-for="source in report?.sources" :key="source.sourceUrl">
        <image class="swiper-image" :src="source.sourceUrl" mode="aspectFit"></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import { reportDetail } from '@/api/report'

const id = ref(null)
const report = ref(null)

const getReportDetail = async () => {
  try {
    const { code, data } = await reportDetail({ data: id.value })
    if (code === 200) {
      report.value = data
    }
  } catch (error) {}
}

onLoad((options) => {
  id.value = options.id
  getReportDetail()
})
</script>

<style lang="scss" scoped>
@import './imgList.scss';
</style>
