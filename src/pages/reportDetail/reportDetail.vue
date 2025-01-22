<template>
  <view class="container-report-detail">
    <view class="report-detail-bg"></view>
    <BaseNavbar :background="navBackgroundColor" theme="light">报告详情</BaseNavbar>
    <view class="report-content" v-if="isPermission">
      <button class="up-reset-button btn-pdf" @click="openPdf"></button>
      <view class="patient">
        <view class="name">{{ report?.patientName }}</view>
        <view class="gender">{{ report?.gender }}</view>
        <view class="age">{{ report?.age }}{{ UNIT_MAP[report?.ageUnit] }}</view>
      </view>
      <view class="report-info-wrap">
        <view class="report-left">
          <view class="report-hospital">{{
            report?.hospitalName ? report?.hospitalName : ''
          }}</view>
          <view class="report-date">{{ report?.createTime }}</view>
          <view class="report-result">
            <view class="result-icon">
              <image style="width: 100%; height: 100%" :src="report?.productIcon" />
            </view>
            <view class="result-desc">{{ report?.productName }}</view>
          </view>
        </view>
        <view class="report-img" @click="go2ImgList">
          <image style="width: 100%; height: 100%; border-radius: 8rpx" :src="report?.coverImg" />
          <view class="report-button">查看图片</view>
        </view>
      </view>
      <view class="report-detail">
        <image mode="widthFix" :src="report?.reportUrl" />
      </view>
      <view class="report-checkcode">
        <view class="checkcode">报告单号：{{ report?.checkCode }}</view>
        <button class="up-reset-button btn-copy" @click="onCopyHandle">复制</button>
      </view>
    </view>
    <view v-if="!isPermission" style="position: relative; z-index: 1">
      <up-empty
        width="523rpx"
        height="523rpx"
        text="无权查看报告，只有检查本人才能查看哦"
        icon="https://common-mzt-public.weicha88.com/mzt-mini/icon_empty.png"
      ></up-empty>
    </view>

    <FixedBottomBtn v-if="professionalQrcode && isPermission">
      <button class="up-reset-button btn-professional" @click="toggleProfessionalQrcodeShow"
        >专家报告解读</button
      >
    </FixedBottomBtn>
  </view>

  <!-- 专家报告解读 -->
  <up-overlay :show="isProfessionalQrcodeShow" @click="toggleProfessionalQrcodeShow">
    <view class="professionalDialog" @tap.stop>
      <view class="dialog-label">长按识别下面二维码</view>
      <view class="dialog-label">邀请专家解读报告</view>
      <image
        class="qrcode"
        mode="aspectFit"
        :show-menu-by-longpress="true"
        :src="professionalQrcode"
      ></image>
      <image
        class="slogan"
        mode="widthFix"
        src="https://common-mzt-public.weicha88.com/mzt-mini/icon_slogan.png"
      ></image>
    </view>
  </up-overlay>
</template>

<script setup>
import { configList } from '@/api/common'
import { getPatientById } from '@/api/my'
import { reportDetail } from '@/api/report'
import { throttle } from '@/utils/index'

const id = ref(null)
const isPermission = ref(true)
const report = ref(null)
const navBackgroundColor = ref('transparent')
const professionalQrcode = ref(null)
const isProfessionalQrcodeShow = ref(false)

const UNIT_MAP = {
  0: '岁',
  1: '月',
  2: '日'
}

onPageScroll((e) => {
  const scrollTop = e.scrollTop
  const opacity = Math.min(scrollTop / 50, 1)
  navBackgroundColor.value = `rgba(60, 156, 255, ${opacity})`
})

const go2ImgList = throttle(() => {
  uni.navigateTo({
    url: `/pages/imgList/imgList?id=${id.value}`
  })
}, 1000)

const toggleProfessionalQrcodeShow = () => {
  isProfessionalQrcodeShow.value = !isProfessionalQrcodeShow.value
}

const onCopyHandle = throttle(() => {
  uni.setClipboardData({
    data: report.value?.checkCode,
    success: function () {
      uni.showToast({
        icon: 'none',
        title: '复制成功'
      })
    }
  })
}, 1000)
/**
 * 打开pdf文件
 */
const openPdf = throttle(() => {
  if (!report.value?.pdfUrl) {
    uni.showToast({
      icon: 'none',
      title: 'PDF生成中，请稍后再试'
    })
    return
  }
  uni.downloadFile({
    url: report.value?.pdfUrl,
    success: function (res) {
      const filePath = res.tempFilePath
      wx.openDocument({
        filePath,
        showMenu: true,
        success: function () {
          console.log('打开文档成功')
        },
        fail: function () {
          console.log('打开失败')
        }
      })
    }
  })
}, 1000)

const getPubConfig = async () => {
  try {
    const { code, data } = await configList({})
    if (code === 200) {
      professionalQrcode.value = data?.find(
        (config) => config.paramKey === 'PATIENT_MINI_PROGRAM_REPORT_CS_QRCODE'
      )?.paramValue
    }
  } catch (error) {}
}

const getReportDetail = async () => {
  try {
    const { code: code1, data: data1 } = await getPatientById({})
    if (code1 === 200) {
      if (data1.mobile) {
        const { code: code2, data: data2 } = await reportDetail({ data: id.value })
        if (code2 === 200) {
          report.value = data2
          isPermission.value = true
        } else if (code2 === -99) {
          isPermission.value = false
        }
      } else {
        uni.showToast({
          icon: 'none',
          title: '手机号缺失'
        })
      }
    }
  } catch (error) {}
}

onShow(() => {
  getReportDetail()
})

onLoad((options) => {
  id.value = options.id
  getPubConfig()
})
</script>

<style lang="scss" scoped>
@import './reportDetail.scss';
</style>
