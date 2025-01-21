<template>
  <up-overlay :show="modal.show" @click="onClose" opacity="0.7">
    <view class="modal-wrap">
      <view class="modal-btn-close">
        <image
          src="https://common-mzt-public.weicha88.com/dispatch-diag-mini/icon_modal_close.png"
        />
      </view>
      <view
        class="modal-content"
        :style="{
          minHeight: modal.height,
          background: modal.backgroundUrl
            ? 'url(' + modal.backgroundUrl + ') no-repeat top center'
            : '',
          backgroundSize: '100% auto'
        }"
        @tap.stop
      >
        <view class="title">{{ modal.title }}</view>
        <view class="content">
          {{ modal.content }}
        </view>
        <view class="modal-btn-footer">
          <view v-if="modal.showCancelButton" class="modal-btn cancle" @click="onCancle">{{
            modal.cancelText
          }}</view>
          <view class="modal-btn confirm" @click="onConfirm">{{ modal.confirmText }}</view>
        </view>
      </view>
    </view>
  </up-overlay>
</template>
<script setup>
import useModal from '@/hooks/useModal'

const { modal, close } = useModal()

const onConfirm = () => {
  modal.value.onConfirm ? modal.value.onConfirm() : close()
}

const onCancle = () => {
  modal.value.onCancle ? modal.value.onCancle() : close()
}

const onClose = () => {
  modal.value.onClose ? modal.value.onClose() : close()
}
</script>

<style lang="scss" scoped>
.modal-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .modal-btn-close {
    margin-bottom: 47rpx;
    padding-right: 5rpx;
    text-align: right;
    image {
      width: 56rpx;
      height: 56rpx;
    }
  }
  .modal-content {
    position: relative;
    width: 695rpx;
    padding: 52rpx 42rpx 172rpx;
    border-radius: 42rpx;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(144deg, #c6ffe5 0%, #e6ffe3 47%, #ffffff 68%, #ffffff 100%);
      z-index: -1;
    }

    .title {
      font-weight: 600;
      font-size: 38rpx;
      color: #000000;
      line-height: 45rpx;
    }
    .content {
      margin-top: 28rpx;
      font-weight: 400;
      font-size: 31rpx;
      color: #000000;
      line-height: 45rpx;
      white-space: pre-line;
    }
    .modal-btn-footer {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 54rpx;
      left: 42rpx;
      right: 42rpx;
      z-index: 1;
      gap: 20rpx;
      .modal-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 84rpx;
        border-radius: 51rpx;
        font-weight: 600;
        font-size: 35rpx;
        &.cancle {
          background: #d7f7e9;
          color: #00c16e;
        }
        &.confirm {
          color: #ffffff;
          background: linear-gradient(93deg, #00e17f 0%, #00c1aa 100%);
        }
      }
    }
  }
}
</style>
