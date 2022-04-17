import type { App } from 'vue'

import { onClient } from '~/composables/universal/env'

const INVALID_ERROR = 500

const GlobalStateSymbol = Symbol('globalState')
export type GlobalState = ReturnType<typeof createGlobalState>
type RenderErrorValue = RenderError | null
export interface RenderError {
  code: number
  message: string
}

export const createGlobalState = () => {
  // Render error
  const renderError = ref<RenderErrorValue>(null)
  const defaultError = { code: INVALID_ERROR }
  const setRenderError = (error: any) => {
    onClient(() => {
      console.warn('App error:', error)
    })
    if (!error) {
      // clear error
      renderError.value = null
    } else if (error instanceof Error) {
      // new Error
      renderError.value = {
        code: (error as any).code ?? defaultError.code,
        message: error.message,
      }
    } else if (typeof error === 'string') {
      // error message
      renderError.value = {
        ...defaultError,
        message: error,
      }
    } else {
      // error object -> axios | component
      renderError.value = {
        ...error,
        code: error.status || error.status || defaultError.code,
      }
    }
  }

  // Hydrated
  const isHydrated = ref(false)
  const setHydrate = () => {
    isHydrated.value = true
  }

  const globalState = {
    // Render error state
    renderError: readonly(renderError),
    setRenderError,
    // Hydrate state
    isHydrated: readonly(isHydrated),
    setHydrate,
  }

  return {
    ...globalState,
    install(app: App) {
      app.provide(GlobalStateSymbol, globalState)
    },
  }
}

export const useGlobalState = (): GlobalState => {
  return inject(GlobalStateSymbol) as GlobalState
}
