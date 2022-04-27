export function useRandomData<T>(source: string | T[], random = false) {
  const data = ref<T[]>()

  watch(
    () => source,
    async () => {
      let rawData: T[]
      if (typeof source === 'string') {
        if (import.meta.env.SSR) return
        rawData = (await fetch(source).then((res) => res.json())) as T[]
      } else {
        rawData = source
      }

      data.value = random
        ? Array.from(rawData).sort(() => Math.random() - 0.5)
        : rawData
    },
    { immediate: true },
  )

  return {
    data,
  }
}
