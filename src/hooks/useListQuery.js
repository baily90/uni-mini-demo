/**
 *
 * @param {*} fetchAPI
 * @param {*} params
 * @param {*} immediate 是否立即执行，有些情况不需要立即执行
 * @returns
 */
export default function useListQuery(fetchAPI, params = {}, immediate = true) {
  const status = ref('loadmore')
  const triggered = ref(false)

  const searchParams = ref({
    page: 1,
    size: 10,
    ...params
  })

  const dataSource = ref({
    total: 0,
    page: 1,
    size: 10,
    list: []
  })

  const isEmptyBoxShow = computed(() => {
    return (
      dataSource.value.page === 1 &&
      dataSource.value.list?.length === 0 &&
      status.value !== 'loading'
    )
  })

  const isLoadingBarShow = computed(() => {
    return dataSource.value.list?.length > 0
  })

  const fetchData = async () => {
    try {
      status.value = 'loading'
      const { code, data } = await fetchAPI({ data: { ...searchParams.value } })
      if (code === 200) {
        dataSource.value.total = data.total || 0
        dataSource.value.page = searchParams.value.page
        dataSource.value.size = searchParams.value.size
        if (searchParams.value.page === 1) {
          dataSource.value.list = data.list || []
        } else {
          dataSource.value.list = [...dataSource.value.list, ...data.list]
        }
        if (data.total > dataSource.value.list?.length) {
          status.value = 'loadmore'
        } else {
          status.value = 'nomore'
        }
      }
    } catch (error) {
      dataSource.value.total = 0
      dataSource.value.list = []
      dataSource.value.page = 1
      dataSource.value.size = 10
      status.value = 'nomore'
    } finally {
      triggered.value = false
    }
  }

  const onRefresh = () => {
    if (['loading'].includes(status.value)) return
    triggered.value = true
    searchParams.value.page = 1
    fetchData()
  }

  const scrollLower = () => {
    if (['loading', 'nomore'].includes(status.value)) return
    searchParams.value.page++
    fetchData()
  }

  if (immediate) {
    fetchData()
  }

  return {
    status,
    triggered,
    searchParams,
    dataSource,
    isEmptyBoxShow,
    isLoadingBarShow,
    fetchData,
    onRefresh,
    scrollLower
  }
}
