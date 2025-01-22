const initWxInfo = {
  avatarUrl: undefined,
  bizUserId: undefined,
  mobile: undefined,
  nick: undefined,
  openId: undefined,
  sid: undefined,
  type: undefined,
  uid: undefined,
  unionId: undefined,
  userName: undefined
}

export const useAppStore = defineStore(
  'app',
  () => {
    const windowInfo = ref(null) // 窗口信息
    const capsuleInfo = ref(null) // 胶囊信息
    const wxInfo = ref({ ...initWxInfo }) // 微信登录信息

    const setWxInfo = (data) => {
      wxInfo.value = data
    }

    const clearWxInfo = () => {
      wxInfo.value = { ...initWxInfo }
    }

    const setWindowInfo = (data) => {
      windowInfo.value = data
    }

    const setCapsuleInfo = (data) => {
      capsuleInfo.value = data
    }

    const sid = computed(() => wxInfo.value?.sid)

    const isLogined = computed(() => !!wxInfo.value?.sid)

    return {
      isLogined,
      sid,
      wxInfo,
      windowInfo,
      capsuleInfo,
      setWxInfo,
      clearWxInfo,
      setWindowInfo,
      setCapsuleInfo
    }
  },
  {
    unistorage: true
  }
)
