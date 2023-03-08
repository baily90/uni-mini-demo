import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore(
  'globalStore', 
  () => {
    const statusBarHeight = ref<number>(0)
    const headerHeight = ref<number>(40)
   
    return { 
      statusBarHeight, 
      headerHeight
    }
  }, 
  {
    persist: {
      storage: {
        getItem(key: string) {
            return uni.getStorageSync(key)
        },
        setItem(key: string, value: string) {
            uni.setStorageSync(key, value)
        },
      }
    }
  }
)