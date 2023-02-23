<script setup lang='ts'>
import { computed, toRefs } from 'vue';

interface ITab {
  label: string;
  value: number
}

interface IProps {
  current: number;
  tabs: ITab[],
  topStyle: string
}

const props = withDefaults(defineProps<IProps>(), {
  current: 0,
  topStyle: ''
})

const emit = defineEmits<{
  (e: 'change', index: number): void
}>()

const { tabs, current } = toRefs(props)

const onChangeHandle = (index: number) => {
  if(current.value === index) return
  emit('change', index)
}

const tabActLeftStyle = computed(() => {
  const { screenWidth } = uni.getWindowInfo()
  return `${((current.value + 0.5)) * screenWidth / tabs.value.length}px`
})
</script>

<template>
  <div class='container'>
    <view
      class="tabItem"
      :class="{'act': index === current}"
      v-for="(tab, index) in tabs"
      :key="tab.label"
      @click="() => onChangeHandle(index)">
      {{ tab.label }}
    </view>
  </div>
</template>

<style lang='scss' scoped>
.container {
  position: fixed;
  top: v-bind(topStyle);
  left: 0;
  display: flex;
  width: 100%;
  height: 96rpx;
  background-color: $uni-white;
  z-index: 1;

  .tabItem {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: 32rpx;
    color: $uni-secondary-color;
    &.act {
      font-size: 34rpx;
      color: $uni-main-color;
      font-weight: 500;
    }
  }
  &::after {
    content: '';
    position: absolute;
    left: v-bind(tabActLeftStyle);
    bottom: 0;
    margin-left: -23rpx;
    width: 46rpx;
    height: 6rpx;
    background: $uni-gradient;
    border-radius: 6rpx;
    transition: all ease-out .2s;
  }
}
</style>
