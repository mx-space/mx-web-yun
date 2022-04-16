<script lang="ts" setup>
import { usePageProps } from '~/composables'

const props = usePageProps()
</script>

<template>
  <pre>
    {{ props.data.map((i) => i.category.slug) }}

  </pre>
</template>
