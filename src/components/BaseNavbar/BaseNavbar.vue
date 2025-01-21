<template>
  <view
    class="container-base-navbar"
    :style="{ background: background, backgroundSize: '100% auto', height: navbarHeight + 'px' }"
  >
    <view class="header" :style="{ height: headerHeight + 'px' }">
      <view class="left">
        <slot name="left">
          <view class="button-wrap">
            <up-icon
              v-if="isShowBackBtn && showDefaultBack"
              name="arrow-left"
              :color="theme === 'light' ? '#fff' : '#1A1C1F'"
              :size="22"
              @click="onBackHandle"
            ></up-icon>
          </view>
        </slot>
      </view>
      <view class="title" :class="{ light: theme === 'light', dark: theme === 'dark' }"
        ><slot></slot
      ></view>
    </view>
  </view>
  <!-- 悬浮导航栏占位 -->
  <view
    v-if="placeholder"
    class="navbar-placeholder"
    :style="{ height: navbarHeight + 'px' }"
  ></view>
</template>

<script setup>
import { useAppStore } from '@/stores/modules/app'
import { watch } from 'vue'

const isShowBackBtn = computed(() => getCurrentPages().length > 1) // 当路由栈大于1且外部没传left slot，才显示默认的返回按钮
const appStore = useAppStore()
const { windowInfo, capsuleInfo } = storeToRefs(appStore)

const props = defineProps({
  background: {
    type: String,
    default: '#ffffff'
  },
  theme: {
    type: String,
    default: 'dark'
  },
  showDefaultBack: {
    type: Boolean,
    default: true
  },
  // 导航高度占位
  placeholder: {
    type: Boolean,
    default: true
  }
})
const navbarHeight = computed(
  () =>
    (capsuleInfo.value.top - windowInfo.value.statusBarHeight) * 2 +
    capsuleInfo.value.height +
    windowInfo.value.statusBarHeight
)
const headerHeight = computed(
  () => (capsuleInfo.value.top - windowInfo.value.statusBarHeight) * 2 + capsuleInfo.value.height
)

watch(
  () => props.theme,
  (val) => {
    if (val === 'light') {
      uni.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ffffff'
      })
    } else {
      uni.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff'
      })
    }
  },
  {
    immediate: true
  }
)

const onBackHandle = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.container-base-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;

  .header {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    .left {
      display: flex;
      align-items: center;
      height: 100%;
      padding-left: 10px;
      .button-wrap {
        background: rgba(255, 255, 255, 0.32);
        border-radius: 14rpx 14rpx 14rpx 14rpx;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 50%;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateX(-50%);
      font-size: 17px;
      font-weight: 500;
      &.dark {
        color: #1a1c1f;
      }
      &.light {
        color: #ffffff;
      }
    }
  }
}
</style>
