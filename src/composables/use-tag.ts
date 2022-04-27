import { TinyColor } from '@ctrl/tinycolor'
import type { TagModel } from '@mx-space/api-client'

import { apiClient } from '~/utils'

export function useTags(
  options: {
    /**
     * Primary Color
     */
    primary: string
  } = {
    primary: '#0078E7',
  },
) {
  const tags = ref(new Map<string, TagModel>())

  onBeforeMount(async () => {
    const data = await apiClient.category.getAllTags()
    const map = new Map<string, TagModel>()
    data.data.forEach((tag) => {
      map.set(tag.name, tag)
    })
    tags.value = map
  })

  const gray = new TinyColor('#999999')
  const primaryColor = new TinyColor(options.primary)

  const getTagStyle = (count: number) => {
    const counts = Array.from(tags.value).map(([_, value]) => value.count)
    const max = Math.max(...counts)
    const min = Math.min(...counts)
    const range = max - min
    const percent = (count - min) / range
    return {
      '--yun-tag-color': gray.mix(primaryColor, percent * 100).toString(),
      'fontSize': `${percent * 36 + 12}px`,
    }
  }

  return {
    tags,
    getTagStyle,
  }
}
