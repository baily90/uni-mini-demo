<template>
  <view class="container-report-list">
    <ReportBg />
    <BaseNavbar background="transparent" theme="light">云诊所</BaseNavbar>
    <Welcome :patient="patient" />
    <view class="scroll-wrap">
      <scroll-view
        class="scroll"
        scroll-y="true"
        refresher-enabled="true"
        :enable-flex="true"
        :refresher-triggered="triggered"
        @refresherrefresh="onRefresh"
        @scrolltolower="scrollLower"
      >
        <ReportItem v-for="item in dataSource?.list" :key="item.id" />
        <view v-if="isEmptyBoxShow">
          <up-empty
            width="523rpx"
            height="523rpx"
            text="  "
            icon="https://common-mzt-public.weicha88.com/mzt-mini/icon_empty.png"
          ></up-empty>
        </view>
        <view v-if="isLoadingBarShow">
          <up-loadmore :status="status" />
        </view>
      </scroll-view>
    </view>
    <BaseTabbar />
  </view>
</template>

<script setup>
import useListQuery from '@/hooks/useListQuery'
import { getInspectReportList } from '@/api/report'
import { getPatientById } from '@/api/my'
import ReportBg from './components/ReportBg/index.vue'
import Welcome from './components/Welcome/index.vue'
import ReportItem from './components/ReportItem/index.vue'

const patient = ref(null)
const {
  status,
  triggered,
  dataSource,
  searchParams,
  isEmptyBoxShow,
  isLoadingBarShow,
  onRefresh,
  scrollLower,
  fetchData
} = useListQuery(getInspectReportList, {}, false)

onShow(() => {
  searchParams.value.page = 1
  getReportList()
})

onLoad(() => {
  getPatientInfo()
})

const getPatientInfo = async () => {
  try {
    const { code, data } = await getPatientById({})
    if (code === 200) {
      patient.value = data
    }
  } catch (error) {}
}
const getReportList = () => {
  fetchData()
}
</script>

<style lang="scss" scoped>
@import './report.scss';
</style>
