import type { InjectionKey, Ref } from 'vue'

import type { PostModel } from '@mx-space/api-client'

export const postContextInjectKey: InjectionKey<Ref<PostModel | undefined>> =
  Symbol('postContext')

export const providePostContext = (post: Ref<PostModel | undefined>) => {
  provide(postContextInjectKey, post)
}

export const usePostContext = () => {
  return inject(postContextInjectKey)
}
