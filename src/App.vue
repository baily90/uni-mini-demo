<script setup>
import { useAppStore } from '@/stores/modules/app'
const { setWindowInfo, setCapsuleInfo } = useAppStore()

onLaunch(() => {
  uni.hideTabBar()
  // 检查小程序是否有新版本
  onCheckForUpdate()
  // 初始化一些公共参数
  initGlobalOptions()
})

/**
 * 检查小程序是否有新版本
 */
const onCheckForUpdate = () => {
  if (uni.canIUse('getUpdateManager')) {
    const updateManager = uni.getUpdateManager()
    // 检查是否有新版本发布
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        // 小程序有新版本，则静默下载新版本，做好更新准备
        updateManager.onUpdateReady(() => {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              } else if (res.cancel) {
                // 如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                uni.showModal({
                  title: '温馨提示',
                  content: '我们已经做了新的优化，请及时更新哦~',
                  showCancel: false, // 隐藏取消按钮，也可显示，取消会走res.cancel，然后从新开始提示
                  success(res) {
                    // 第二次提示后，强制更新
                    if (res.confirm) {
                      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                      updateManager.applyUpdate()
                    } else if (res.cancel) {
                      // 重新回到版本更新提示
                      onCheckForUpdate()
                    }
                  }
                })
              }
            }
          })
        })
        // 新的版本下载失败
        updateManager.onUpdateFailed(() => {
          uni.showModal({
            title: '温馨提示',
            content: '新版本已经上线，请您删除当前小程序，重新搜索打开'
          })
        })
      }
    })
  } else {
    // 提示用户在最新版本的客户端上体验
    uni.showModal({
      title: '温馨提示',
      content: '当前微信版本过低，可能无法使用该功能，请升级到最新版本后重试。'
    })
  }
}

/**
 * 初始化系统参数
 * xxx
 */
const initGlobalOptions = () => {
  setWindowInfo(uni.getWindowInfo())
  setCapsuleInfo(uni.getMenuButtonBoundingClientRect())
}
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-plus/index.scss';

.safe-bottom {
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
}

view {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

image {
  display: inline-flex;
}

.input-placeholder,
.textarea-placeholder {
  font-weight: 400;
  color: #999999;
}
</style>
