、<template>
  <root-portal>
    <up-overlay :show="isShow" @click="onClose" opacity="0.7">
      <view class="modal-wrap">
        <view class="modal-btn-close">
          <image src="https://common-mzt-public.weicha88.com/dispatch-diag-mini/icon_modal_close.png" />
        </view>
        <view
          class="modal-content"
          @tap.stop>
          <view class="title">{{title}}</view>
          <view class="content">
            <slot></slot>
          </view>
          <view class="modal-btn-footer">
            <view
              v-if="isShowCancle"
              class="modal-btn cancle"
              @click="onCancle">{{cancleText}}</view>
            <view
              class="modal-btn confirm"
              @click="onConfirm">{{confirmText}}</view>
          </view>
        </view>
      </view>
    </up-overlay>
  </root-portal>
</template>
<script setup>

const emit = defineEmits(['update:modelValue', 'cancle', 'confirm'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '温馨提示'
  },
  isShowCancle: {
    type: Boolean,
    default: true
  },
  cancleText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确认'
  }

})

const isShow = ref(false)

watch(() => props.modelValue, (val) => {
  isShow.value = val
})

const onCancle = () => {
  emit('cancle')
}

const onConfirm = () => {
  emit('confirm')
}

const onClose = () => {
  emit('update:modelValue', false)
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
    min-height: 398rpx;
    padding: 52rpx 42rpx 172rpx;
    border-radius: 42rpx;
    overflow: hidden;
    background: url('https://common-mzt-public.weicha88.com/dispatch-diag-mini/icon_dialog_announce.png') no-repeat top center;
    background-size: '100% auto';
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient( 144deg, #C6FFE5 0%, #E6FFE3 47%, #FFFFFF 68%, #FFFFFF 100%);
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
          background: #D7F7E9;
          color: #00C16E;
        }
        &.confirm {
          color: #FFFFFF;
          background: linear-gradient( 93deg, #00E17F 0%, #00C1AA 100%);
        }
      }
    }
  }
}
</style>
