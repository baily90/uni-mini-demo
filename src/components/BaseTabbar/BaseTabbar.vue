<template>
  <view class="container-tabbar" :style="{ paddingBottom: safeAreaBottom + 'px' }">
    <view class="tabbar-wrap">
      <view
        class="tabbar-item"
        :class="{ act: tab.pagePath.indexOf(currentPath) >= 0 }"
        v-for="tab in tabbarData"
        :key="tab.text"
        @click="onTabbarChange(tab.pagePath)"
      >
        <image
          class="icon-tabbar"
          mode="aspectFill"
          :src="tab.pagePath.indexOf(currentPath) >= 0 ? tab.selectedIconPath : tab.iconPath"
        ></image>
        <view class="label">{{ tab.text }}</view>
      </view>
    </view>
  </view>
  <view class="placeholder-tabbar"></view>
  <view :style="{ height: safeAreaBottom + 'px' }"></view>
</template>

<script setup>
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()
const { windowInfo } = storeToRefs(appStore)

const safeAreaBottom = computed(() => windowInfo.value.safeAreaInsets.bottom)

const tabbarData = [
  {
    pagePath: '/pages/report/report',
    iconPath: '/static/images/icon_tab_home_unselected.png',
    selectedIconPath: '/static/images/icon_tab_home_selected.png',
    text: '报告'
  },
  // {
  //   pagePath: '/pages/message/index',
  //   iconPath: '/static/images/icon_tab_message_unselected.png',
  //   selectedIconPath: '/static/images/icon_tab_message_selected.png',
  //   text: '消息'
  // },
  {
    pagePath: '/pages/my/index',
    iconPath: '/static/images/icon_tab_user_unselected.png',
    selectedIconPath: '/static/images/icon_tab_user_selected.png',
    text: '我的'
  }
]

const currentPath = computed(() => getCurrentPages()[0].route)

const onTabbarChange = (path) => {
  uni.switchTab({
    url: path?.startsWith('/') ? path : `/${path}`
  })
}
</script>

<style lang="scss" scoped>
.container-tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
  background-color: #fff;
  .tabbar-wrap {
    display: flex;
    width: 100%;
    height: 108rpx;
    .tabbar-item {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;

      .icon-tabbar {
        margin-bottom: 5rpx;
        width: 48rpx;
        height: 48rpx;
      }
      .label {
        font-weight: 500;
        font-size: 20rpx;
        color: #61666b;
        line-height: 22rpx;
      }
      &.act {
        .label {
          color: #3f93ff;
        }
      }
    }
  }
}
.placeholder-tabbar {
  width: 100%;
  height: 108rpx;
}
</style>
