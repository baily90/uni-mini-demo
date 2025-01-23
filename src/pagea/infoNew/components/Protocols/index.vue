<template>
  <view class="container-protocals" @click="toggleChecked">
    <view class="radio" :class="{ checked: checked }"></view>
    <view>我已阅读并同意</view>
    <view class="protocol-item" v-for="(protocol, index) in protocols" :key="protocol.agreementId">
      <button class="up-reset-button protocol-name" @click.stop="go2Protocol(protocol)">{{
        protocol.agreementName
      }}</button>
      <view v-if="index !== protocols.length - 1">、</view>
    </view>
  </view>
</template>

<script setup>
import { throttle } from '@/utils/index'

const emits = defineEmits(['update:checked'])

const props = defineProps({
  checked: {
    type: Boolean,
    default: false
  },
  protocols: {
    type: Array,
    default: () => []
  }
})

const toggleChecked = () => {
  emits('update:checked', !props.checked)
}

const go2Protocol = throttle((protocol) => {
  const title = encodeURIComponent(protocol.agreementName)
  const path = encodeURIComponent(protocol.agreementLink)
  uni.navigateTo({
    url: `/pages/webview/index?title=${title}&path=${path}`
  })
}, 1000)
</script>

<style lang="scss" scoped>
.container-protocals {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  margin-top: 24rpx;
  width: 100%;
  font-size: 26rpx;
  color: #323233;
  line-height: 40rpx;
  .radio {
    margin-right: 8rpx;
    width: 32rpx;
    height: 32rpx;
    background: url('https://common-mzt-public.weicha88.com/mzt-mini/icon_radio_unselected.png')
      no-repeat center center;
    background-size: cover;
    transition: all 0.2s ease;
    &.checked {
      background: url('https://common-mzt-public.weicha88.com/mzt-mini/icon_radio_selected.png')
        no-repeat center center;
      background-size: cover;
    }
  }
  .protocol-item {
    display: flex;
    align-items: center;
  }
  .protocol-name {
    color: #3c9cff;
  }
}
</style>
