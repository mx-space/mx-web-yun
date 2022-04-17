import { useGlobalState } from '~/app/state'

export const useUniversalFetch = (fetcher: () => Promise<any>) => {
  const globalState = useGlobalState()
  const doFetchOnBeforeMount = () => {
    onBeforeMount(() => fetcher())
  }

  // Server side: SSR
  if (import.meta.env.SSR) {
    onServerPrefetch(() =>
      fetcher().catch((error) => {
        // HACK: 因为 onServerPrefetch 或 async setup 都无法中断 renderToString，所以需要在状态被抛出之前就做一个标记
        globalState.setRenderError(error)
        // TODO
        return Promise.reject(error)
      }),
    )
    return
  }

  // Client side: SSR
  // Navigation: fetch on before mount
  if (globalState.isHydrated.value) {
    doFetchOnBeforeMount()
  } else {
    // Hydration: no fetch
    // onServerPreFetch: https://github.com/vuejs/composition-api/pull/198/files
    // isHydrating: https://github.com/vuejs/vue-next/issues/1723
    // isHydrating: https://github.com/vuejs/vue-next/pull/2016
  }
}
