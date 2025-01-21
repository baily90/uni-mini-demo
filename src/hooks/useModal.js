const defaultOptions = {
  show: false, // 是否显示
  backgroundUrl:
    'https://common-mzt-public.weicha88.com/dispatch-diag-mini/icon_dialog_announce.png', // 背景图片
  title: '温馨提示', // 标题
  content: '', // 内容
  height: '398rpx', // 弹窗最小高度
  confirmText: '确定', // 确认按钮文字
  cancelText: '取消', // 取消按钮文字
  showCancelButton: false // 是否显示取消按钮
}

const modal = ref(defaultOptions)

export default function useModal() {
  const open = (options) => {
    modal.value = { ...defaultOptions, ...options, show: true }
    uni.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ffffff'
    })
  }
  const close = () => {
    modal.value.show = false
    setTimeout(() => {
      modal.value = { ...defaultOptions }
    }, 300)
    uni.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    })
  }
  return {
    modal,
    open,
    close
  }
}
