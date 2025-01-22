import { useAppStore } from '@/stores/modules/app'

export const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode !== 200) {
          uni.showToast({
            icon: 'none',
            title: res.message || '接口异常'
          })
          return reject(res.message || '接口异常')
        } else if (res.data && res.data.code === 600) {
          const userStore = useAppStore()
          userStore.clearWxInfo()
          uni.navigateTo({ url: '/pages/login/index' })
          return reject(res.data.msg || '登录失效')
        } else if (res.data && res.data.code !== 200) {
          uni.showToast({
            icon: 'none',
            title: res.data.msg || '接口异常'
          })
          return reject(res.data.msg || '接口异常')
        } else if (res.data && res.data.code === 200) {
          return resolve(res.data)
        }
      },
      fail: (err) => {
        uni.showToast({
          icon: 'none',
          title: err.errMsg
        })
        return reject(err)
      }
    })
  })
}

export const uploadFile = (imageUrl, options) => {
  const { url, configKey, loading = true } = options

  if (loading) {
    uni.showLoading({
      title: '上传中...',
      mask: true
    })
  }
  return new Promise((resolve, reject) => {
    if (imageUrl) {
      // 微信存储的临时路径
      const tempFilePath = imageUrl
      // 创建文件的路径地址 使用时间戳命名
      const filePath = `dispatch-diag-mini-public-${Date.now()}${Math.floor(
        Math.random() * 10000
      )}.${tempFilePath.split('.').pop()}`
      uni.uploadFile({
        url,
        filePath: tempFilePath,
        name: 'file', // 必须填file。
        formData: {
          path: filePath,
          configKey
        },
        success: (res) => {
          if (!res || !res.statusCode || res.statusCode !== 200 || !res.data) {
            uni.showToast({
              icon: 'none',
              title: res.message || '接口异常'
            })
            return reject(res.message || '接口异常')
          }

          const data = JSON.parse(res.data)
          // 处理消息码
          if (data.code !== 0) {
            uni.showToast({
              icon: 'none',
              title: data.msg
            })
            if (data.code === 401 || data.code === 1404001000) {
              // 登录失效，跳转登录页
              uni.navigateTo({
                url: '/pages/login/index'
              })
            }
            return reject(data.msg)
          }

          // 返回消息
          return resolve(data.data)
        },
        fail: (err) => {
          uni.showToast({
            icon: 'none',
            title: err.errMsg
          })
          return reject(err)
        },
        // eslint-disable-next-line space-before-function-paren
        complete() {
          if (loading) {
            uni.hideLoading()
          }
        }
      })
    }
  })
}
