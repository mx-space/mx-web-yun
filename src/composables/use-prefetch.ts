import type { Ref } from 'vue'

import { useGlobalState } from '~/app/state'
import { useServerPrefetchStore } from '~/stores/fetch'

export const useUniversalFetch = <T>(
  fetcher: () => Promise<T>,
  hydrationKey?: string,
): Ref<T | undefined> => {
  const dataRef = ref<T>()
  const prefetchStore = useServerPrefetchStore()
  const globalState = useGlobalState()
  const doFetchOnBeforeMount = () => {
    onBeforeMount(() =>
      fetcher().then((data) => {
        dataRef.value = data
        return data
      }),
    )
  }

  // Server side: SSR
  if (import.meta.env.SSR) {
    onServerPrefetch(() =>
      fetcher()
        .catch((error) => {
          // HACK: 因为 onServerPrefetch 或 async setup 都无法中断 renderToString，所以需要在状态被抛出之前就做一个标记
          globalState.setRenderError(error)
          // TODO
          return Promise.reject(error)
        })
        .then((data) => {
          console.log(data)

          hydrationKey && prefetchStore.setData(hydrationKey, data)
          dataRef.value = data
          return data
        }),
    )
    return dataRef
  }

  // Client side: SSR
  // Navigation: fetch on before mount
  if (globalState.isHydrated.value) {
    doFetchOnBeforeMount()
  } else {
    hydrationKey &&
      (dataRef.value =
        prefetchStore.getData(hydrationKey) || doFetchOnBeforeMount())
  }
  // Hydration: no fetch
  // onServerPreFetch: https://github.com/vuejs/composition-api/pull/198/files
  // isHydrating: https://github.com/vuejs/vue-next/issues/1723
  // isHydrating: https://github.com/vuejs/vue-next/pull/2016

  return dataRef
}
