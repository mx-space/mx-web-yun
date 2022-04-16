<script lang="ts" setup>
import { usePageProps } from '~/composables'

const props = usePageProps()
</script>

<template>
  <div>
    {{ props.a.xxa }}
  </div>
</template>
