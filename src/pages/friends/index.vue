<script lang="ts" setup>
import { ClientOnly } from '~/components/ClientOnly'
import { useUniversalFetch } from '~/composables/use-prefetch'
import type { GirlType } from '~/types/girls'
import { apiClient } from '~/utils'

const friends = useUniversalFetch(
  () =>
    apiClient.link.getAll().then((res) => {
      return res.data
    }),
  'friends',
)

const girls = computed<GirlType[]>(() => {
  return (
    friends.value?.map((f) => ({
      avatar: f.avatar,
      name: f.name,
      from: f.description,
      url: f.url,
    })) || []
  )
})
</script>

<template>
  <ClientOnly>
    <YunPageHeader title="友链" />
    <div class="text-center" m="2" title="我全都要！">!大家都是我的天使!</div>
    <YunGirls :girls="girls" random />
  </ClientOnly>
</template>
