<script lang="ts" setup>
import { useUniversalFetch } from '~/composables/use-prefetch'
import { useTimelineStore } from '~/stores/timeline'

const ts = useTimelineStore()
useUniversalFetch(() => ts.fetch())
</script>

<template></template>
