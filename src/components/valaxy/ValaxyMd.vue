<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { PostModel } from '@mx-space/api-client'

import { useAplayer, useCodePen, useKatex } from '~/composables'
import { wrapTable } from '~/utils'

const props = defineProps<{
  frontmatter: PostModel
  md: string
  excerpt?: string
}>()

const content = ref()
function updateDom() {
  wrapTable(content.value)
}

onMounted(() => {
  updateDom()
})

// features
// if (props.frontmatter.katex) useKatex()

// // widgets
// if (props.frontmatter.aplayer) useAplayer()

// if (props.frontmatter.codepen) useCodePen()
</script>

<template>
  <article v-if="md" class="markdown-body">
    <h1 class="sr-only">{{ frontmatter.title }}</h1>

    <div ref="content" @vnode-updated="updateDom" v-html="md" />

    <div m="y-4" class="end flex justify-center items-center">
      <hr class="line inline-flex" w="full" m="!y-2" />
      <span p="x-4" font="serif bold" class="whitespace-nowrap">
        {{ 'Q.E.D.' }}
      </span>
      <hr class="line inline-flex" w="full" m="!y-2" />
    </div>
  </article>
</template>

<style lang="scss">
.end {
  .line {
    height: 1px;
  }
}
</style>
