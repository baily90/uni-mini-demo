<script setup lang='ts'>
import { usePaddingTopStyle } from '@/utils/hooks'
import { toRefs } from 'vue';

interface IProps {
  title?: string
}

const paddingTopStyle = usePaddingTopStyle()

const props = withDefaults(defineProps<IProps>(), {
  title: 'uni-mini-demo'
})

const { title } = toRefs(props)


const pages = getCurrentPages()

const goBack = () => {
  uni.navigateBack()
}
</script>

<template>
  <div class='container'>
    <slot name="header">
      <CompHeader :title="title">
        <template #left v-if="pages.length > 1">
          <uni-icons type="left" size="24" @click="goBack"></uni-icons>
        </template>
      </CompHeader>
    </slot>
    <slot></slot>
  </div>
</template>

<style lang='scss' scoped>
.container {
  padding-top: v-bind(paddingTopStyle);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
