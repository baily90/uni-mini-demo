import { useAppStore } from '@/stores/modules/app'
import useModal from '@/hooks/useModal'

const { open, close } = useModal()
export const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      header: {
        'Content-Type': 'application/json'
      },
      // eslint-disable-next-line space-before-function-paren
      success(res) {
        if (res.statusCode !== 200) {
          uni.showToast({
            icon: 'none',
            title: res.message || '接口异常'
          })
          reject(res.message || '接口异常')
        } else if (res.data && res.data.code === 401) {
          const userStore = useAppStore()
          userStore.clearLoginInfo()
          uni.navigateTo({ url: '/pages/login/index' })
        } else if (res.data && res.data.code !== 0) {
          if (res.data.code === 401411) {
            // 当前账号类型已切换
            const userStore = useAppStore()
            userStore.clearLoginInfo()
            open({
              title: '账号检测',
              content: res.data.msg || '当前账号类型已切换',
              backgroundUrl: 'https://common-mzt-public.weicha88.com/dispatch-diag-mini/icon_dialog_fulltime.png',
              confirmText: '我知道了',
              onConfirm () {
                uni.navigateTo({ url: '/pages/login/index' })
                close()
              }
            })
            // uni.navigateTo({
            //   url: '/pages/login/index',
            //   animationDuration: 0,
            //   success () {
            //     setTimeout(() => {
            //       open({
            //         title: '账号检测',
            //         content: res.data.msg || '当前账号类型已切换',
            //         backgroundUrl: 'https://common-mzt-public.weicha88.com/dispatch-diag-mini/icon_dialog_fulltime.png',
            //         confirmText: '我知道了',
            //         onConfirm () {
            //           close()
            //         }
            //       })
            //     }, 500)
            //   }
            // })
          } else if (res.data.code === 401410) {
            // 当前账号已被冻结
            const userStore = useAppStore()
            userStore.clearLoginInfo()

            open({
              title: '账号异常',
              content: res.data.msg || '您的账号已被冻结',
              backgroundUrl: 'https://common-mzt-public.weicha88.com/dispatch-diag-mini/icon_dialog_warning.png',
              confirmText: '我知道了',
              onConfirm () {
                uni.navigateTo({ url: '/pages/login/index' })
                close()
              }
            })
            // uni.navigateTo({
            //   url: '/pages/login/index',
            //   animationDuration: 0,
            //   success () {
            //     debugger
            //     console.log(11111)

            //     setTimeout(() => {
            //       open({
            //         title: '账号异常',
            //         content: res.data.msg || '您的账号已被冻结',
            //         backgroundUrl: 'https://common-mzt-public.weicha88.com/dispatch-diag-mini/icon_dialog_warning.png',
            //         confirmText: '我知道了',
            //         onConfirm () {
            //           close()
            //         }
            //       })
            //     }, 500)
            //   }
            // })
          } else if (res.data.code === 604005002) {
            // 一周只能改一次，7天后再来哦
            open({
              title: '温馨提示',
              content: res.data.msg || '一周只能改一次，7天后再来哦',
              confirmText: '我知道了',
              onConfirm () {
                close()
              }
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: res.data.msg
            })
          }
          reject(res.data.msg)
        }
        // 返回消息
        resolve(res.data)
      },
      // eslint-disable-next-line space-before-function-paren
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: err.errMsg
        })
        reject(err)
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
