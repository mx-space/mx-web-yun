<script lang="ts" setup>
import ValaxyMd from '~/components/valaxy/ValaxyMd.vue'
import { usePostContext } from '~/composables/page-context/use-post'
import { markdownRender } from '~/utils'

const data = usePostContext()
</script>

<template>
  <div v-if="data">
    <ValaxyMd :frontmatter="data" :md="markdownRender(data.text)"> </ValaxyMd>
  </div>
</template>
