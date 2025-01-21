import dayjs from 'dayjs'
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
