<script lang="ts" setup>
import { useUniversalFetch } from '~/composables/use-prefetch'

const data = useUniversalFetch(async () => {
  return {
    a: 1,
    b: { c: 2 },
  }
}, 'a')
</script>

<template>
  {{ data }}
</template>
