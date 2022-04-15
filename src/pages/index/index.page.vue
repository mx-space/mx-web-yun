<script lang="ts" setup>
import { usePageProps } from '~/composables'

const props = usePageProps()
</script>

<template>
  <h1>Welcome</h1>
  <pre>
    {{ props }}
  </pre>
  This page is:
  <ul>
    <li>Rendered to HTML.</li>
  </ul>
</template>
