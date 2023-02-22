import { useGlobalStore } from "@/stores/global"
import { storeToRefs } from "pinia"
import { computed } from "vue"


export const usePaddingTopStyle = () => {
  const globalStore = useGlobalStore()
  const { statusBarHeight, headerHeight } = storeToRefs(globalStore)
  return computed(() => `${(statusBarHeight.value + headerHeight.value)}px`)
}