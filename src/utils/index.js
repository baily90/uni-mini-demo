import pagesJson from '@/pages.json'

/**
 * 节流
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
export const throttle = (fn, delay) => {
  let timer = null

  return function (...args) {
    if (!timer) {
      fn.apply(this, args)

      timer = setTimeout(() => {
        timer = null
      }, delay)
    }
  }
}

export const getPages = (key = 'needLogin') => {
  // 这里处理主包
  const pages = [
    ...pagesJson.pages
      .filter((page) => page[key])
      .map((page) => ({
        ...page,
        path: `/${page.path}`
      }))
  ]
  // 这里处理分包
  const subPages = []
  pagesJson.subPackages?.forEach((subPageObj) => {
    const { root } = subPageObj

    subPageObj.pages
      .filter((page) => page[key])
      .forEach((page) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`
        })
      })
  })
  const result = [...pages, ...subPages]
  return result
}

export const needLoginPages = getPages('needLogin').map((page) => page.path)

export const checkIdCard = (idCard) => {
  const idcardReg =
    /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  return idcardReg.test(idCard)
}
export const checkMobile = (mobile) => {
  const mobileReg = /^1[3,4,5,6,7,8,9][0-9]{9}$/
  return mobileReg.test(mobile)
}
