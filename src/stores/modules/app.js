const initLoginState = {
  userId: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  expiresTime: undefined,
  openid: undefined
}

export const useAppStore = defineStore(
  'app',
  () => {
    const loginInfo = ref({ ...initLoginState }) // 登录信息
    const windowInfo = ref(null) // 窗口信息
    const capsuleInfo = ref(null) // 胶囊信息

    const setLoginInfo = (data) => {
      loginInfo.value = data
    }
    const clearLoginInfo = () => {
      loginInfo.value = { ...initLoginState }
    }

    const setWindowInfo = (data) => {
      windowInfo.value = data
    }

    const setCapsuleInfo = (data) => {
      capsuleInfo.value = data
    }

    const isLogined = computed(() => !!loginInfo.value.accessToken)

    return {
      isLogined,
      loginInfo,
      windowInfo,
      capsuleInfo,
      setLoginInfo,
      clearLoginInfo,
      setWindowInfo,
      setCapsuleInfo
    }
  },
  {
    unistorage: true
  }
)
