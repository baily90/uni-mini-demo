<template>
  <view class="container-support" @click="toggleVisble" v-if="support">
    <image
      class="icon-kefu"
      src="https://common-mzt-public.weicha88.com/mzt-mini/icon_kefu.png"
      mode="scaleToFill"
    />
    <view class="label">联系客服</view>
  </view>
  <root-portal>
    <up-overlay :show="visible" :opacity="0.6" @click="toggleVisble">
      <view class="wrap">
        <view class="dialog" @click.stop>
          <image
            class="btn-close"
            src="https://common-mzt-public.weicha88.com/mzt-mini/icon_close.png"
            mode="scaleToFill"
          />
          <view class="qrcode-wrap">
            <image
              class="icon-qrcode"
              :src="support?.PLATFORM_CUSTOMER_WECHAT_QR_CODE"
              mode="scaleToFill"
            />
            <view class="bg-support">可长按识别加客服</view>
          </view>
          <view class="wx-wrap">
            <view class="wx">微信号 {{ support?.PLATFORM_CUSTOMER_WECHAT_NUMBER }}</view>
            <view class="btn-copy" @click="onCopyHandle">复制</view>
          </view>
          <button class="up-reset-button btn-makephone" @click="onMakdPhoneHandle">
            <image
              class="icon-phone"
              src="https://common-mzt-public.weicha88.com/mzt-mini/icon_phone.png"
              mode="scaleToFill"
            />
            电话咨询
          </button>
        </view>
      </view>
    </up-overlay>
  </root-portal>
</template>

<script setup>
import { throttle } from '@/utils/index'

const visible = ref(false)

const props = defineProps({
  support: {
    type: Object,
    default: () => {}
  }
})

const onCopyHandle = () => {
  uni.setClipboardData({
    data: props.support?.PLATFORM_CUSTOMER_WECHAT_NUMBER,
    success: function () {
      uni.showToast({
        icon: 'none',
        title: '复制成功'
      })
      toggleVisble()
    }
  })
}
const onMakdPhoneHandle = () => {
  uni.makePhoneCall({
    phoneNumber: props.support?.PLATFORM_CUSTOMER_TEL
  })
}

const toggleVisble = throttle(() => {
  visible.value = !visible.value
}, 1000)
</script>

<style lang="scss" scoped>
.container-support {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 46rpx;
  width: 100%;
  .icon-kefu {
    margin-right: 16rpx;
    width: 40rpx;
    height: 40rpx;
  }
  .label {
    font-size: 30rpx;
    color: #642c17;
    line-height: 35rpx;
    text-decoration: underline;
  }
}
.wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .dialog {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 630rpx;
    padding: 65rpx 48rpx 48rpx;
    background: #ffffff;
    border-radius: 16rpx;
    .btn-close {
      position: absolute;
      top: 22rpx;
      right: 30rpx;
      width: 48rpx;
      height: 48rpx;
    }
    .qrcode-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 298rpx;
      height: 298rpx;
      border-radius: 20rpx;
      border: 2rpx solid #fff0df;
      .icon-qrcode {
        width: 250rpx;
        height: 250rpx;
      }
      .bg-support {
        position: absolute;
        bottom: -30rpx;
        left: 35rpx;
        width: 225rpx;
        height: 59rpx;
        padding-top: 19rpx;
        font-size: 24rpx;
        color: #ff9d61;
        background: url('https://common-mzt-public.weicha88.com/mzt-mini/icon_bg_support.png')
          no-repeat center center;
        background-size: cover;
        text-align: center;
      }
    }
    .wx-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 68rpx;
      width: 534rpx;
      padding: 25rpx 32rpx;
      background: #fffbf6;
      border-radius: 16rpx;
      .wx {
        font-size: 28rpx;
        color: #ff9d61;
        line-height: 32rpx;
      }
      .btn-copy {
        font-size: 28rpx;
        color: #3b8ef7;
      }
    }
    .btn-makephone {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 86rpx;
      width: 454rpx;
      height: 88rpx;
      background: linear-gradient(270deg, #3288f6 0%, #73b1ff 100%);
      border-radius: 45rpx;
      font-weight: 500;
      font-size: 32rpx;
      color: #ffffff;
      .icon-phone {
        margin-right: 7rpx;
        width: 44rpx;
        height: 44rpx;
      }
    }
  }
}
</style>
