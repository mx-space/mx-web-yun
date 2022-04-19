<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import type { PostModel } from '@mx-space/api-client'

import { useUIStore } from '~/stores/ui'
import { wrapTable } from '~/utils'

const props = defineProps<{
  frontmatter: PostModel
  md: string
  excerpt?: string
}>()

const content = ref<HTMLDivElement>()
function updateDom() {
  wrapTable(content.value)
}

onMounted(() => {
  updateDom()
})

const uiStore = useUIStore()
onMounted(() => {
  nextTick(() => {
    if (!content.value) return

    const $ = content.value
    const headers = [] as any[]

    $.querySelectorAll('h1,h2,h3,h4,h5,h6,h7,h8').forEach((el) => {
      const level = parseInt(el.tagName.toLowerCase().slice(1))
      const id = el.id
      headers.push({
        level,
        title: el.textContent?.replace(/#$/, '').trim(),
        slug: id,
      })
    })

    uiStore.setToc(headers)
  })
})

onBeforeUnmount(() => uiStore.setToc([]))

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
