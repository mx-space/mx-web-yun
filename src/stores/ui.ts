export const useUIStore = defineStore('ui', () => {
  const toc = ref([] as { slug: string; level: number; title: string }[])

  return {
    toc,
    setToc(newToc: typeof toc.value) {
      toc.value = newToc.concat()
    },
  }
})
