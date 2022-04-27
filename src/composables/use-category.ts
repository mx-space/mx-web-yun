import type { CategoryModel } from '@mx-space/api-client'

import { apiClient } from '~/utils'

export const useCategory = () => {
  const categories = ref([] as CategoryModel[])

  onBeforeMount(() => {
    return apiClient.category.getAllCategories().then((c) => {
      categories.value = c.data
    })
  })

  return categories
}
