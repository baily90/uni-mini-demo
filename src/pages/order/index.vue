<script setup lang='ts'>
import { usePaddingTopStyle } from '@/utils/hooks'
import { ref } from 'vue';
import CompTabs from './components/CompTabs/CompTabs.vue'
import CompOrderList from './components/CompOrderList/CompOrderList.vue';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { getOrderListService } from '@/apis/order';

const Tabs = [
  { label: '全部', value: 0 },
  { label: '待支付', value: 1 },
  { label: '待收货', value: 2 },
  { label: '已完成', value: 3 },
]

const page = ref<number>(1)
const size = 10
const currentTabIndex = ref(0)
const orderList = ref<[]>([])
const isLoading = ref<boolean>(false)

const paddingTopStyle = usePaddingTopStyle()

const onTabsChange = (tabIndex: number) => {
  uni.pageScrollTo({
    scrollTop: 0
  })
  currentTabIndex.value = tabIndex
  page.value = 1
  getOrderList()
}

const getOrderList = async () => {
  try {
    isLoading.value = true
    const params = {
      page: page.value,
      size,
      type: Tabs[currentTabIndex.value].value
    }
    const { code, data } = await getOrderListService(params)
    
    if(page.value === 1) {
      orderList.value = [1,1,1,1,1,1,1,1,1,1]
    }else {
      orderList.value = orderList.value.concat([1,1,1,1,1,1,1,1,1,1])
    }
  } catch (error) {
    console.log(error);
  }finally {
    isLoading.value = false
    uni.stopPullDownRefresh()
  }
}

getOrderList()

onPullDownRefresh(() => {
  console.log('refresh');
  if(isLoading.value) return
  page.value = 1
  getOrderList()
})

onReachBottom(() => {
  console.log('bottom');
  if(isLoading.value) return
  page.value ++
  getOrderList()
})



</script>
<template>
  <view class="container">
    <CompPage title="我的订单">
      this is content
    </CompPage>
    <CompTabs :topStyle="paddingTopStyle" :tabs="Tabs" :current="currentTabIndex" @change="onTabsChange" />
    <CompOrderList :list="orderList" />
  </view>
</template>

<style lang='scss' scoped>
.container {
  padding-top: 96rpx;
}
</style>
