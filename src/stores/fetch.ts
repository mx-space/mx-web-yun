export const useServerPrefetchStore = defineStore('server-fetch', () => {
  const dataMap = ref({} as any)

  return {
    dataMap,
    setData(key: string, value: any) {
      dataMap.value[key] = JSON.stringify(value)
    },
    getData(key: string) {
      try {
        return JSON.parse(dataMap.value[key])
      } catch {
        return null
      }
    },
  }
})
