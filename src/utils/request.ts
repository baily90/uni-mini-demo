interface IRequest extends UniNamespace.RequestOptions {
  hideLoading?: boolean;
}
interface IResponse {
  code: number,
  data: any,
  msg: string
}
export default ({ url, method, data = {}, header = {}, hideLoading = false}: IRequest) => {
  const requestUrl = `${import.meta.env.VITE_API_URL}${url}`

  if (!hideLoading) {
    uni.showLoading({
        title: '加载中...'
    });
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: requestUrl,
      data,
      method,
      header,
      success: ({ statusCode, data }: UniApp.RequestSuccessCallbackResult) => {
        if (statusCode && statusCode != 200) {
          uni.showToast({
              title: (data as IResponse).msg || '接口异常',
              icon: 'none'
          });
          return;
        }else if((data as IResponse).code !== 0) {
          uni.showToast({
            title: (data as IResponse).msg || '数据异常',
            icon: 'none'
        });
          return;
        }
        resolve(data as IResponse)
      },
      //请求失败
      fail: (result: UniApp.GeneralCallbackResult) => {
        uni.showToast({
            title: result.errMsg || "网络异常",
            icon: 'none'
        });
        reject(result.errMsg)
      },
      complete() {
        if (!hideLoading) {
            uni.hideLoading();
        }
      }
    })
  })

}