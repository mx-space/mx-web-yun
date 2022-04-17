import { isClient } from '@vueuse/core'

// env only
export const onClient = (callback: any) => {
  isClient && callback()
}

export const onServer = (callback: any) => {
  !isClient && callback()
}
