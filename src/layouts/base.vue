<script lang="ts" setup>
import { useAppStore } from '~/stores/app'
import { usePostStore } from '~/stores/post'

const postStore = usePostStore()
const frontmatter = computed(() => postStore.currentPostData)

const title = computed(() => frontmatter.value?.title || '')
const appStore = useAppStore()
appStore.toggleSidebar(true)
</script>

<template>
  <ValaxySidebar>
    <slot name="sidebar">
      <YunSidebar v-if="$slots['sidebar-child']">
        <slot name="sidebar-child" />
      </YunSidebar>
      <YunSidebar v-else />
    </slot>
  </ValaxySidebar>

  <main class="yun-main flex lt-md:ml-0">
    <div flex="~ 1 col" w="full" p="l-4 lt-md:0" class="content">
      <YunCard
        m="0"
        p="4"
        class="relative sm:p-6 lg:px-12 xl:px-16 max-w-full overflow-hidden w-full"
      >
        <slot name="header">
          <YunPageHeader :title="title" />
        </slot>
        <template #content>
          <slot name="content">
            <router-view />
          </slot>
        </template>
      </YunCard>

      <slot :frontmatter="frontmatter" />

      <slot name="nav"> </slot>

      <ValaxyFooter>
        <slot name="footer" />
      </ValaxyFooter>
    </div>

    <slot name="right-sidebar">
      <ValaxyRightSidebar :frontmatter="frontmatter">
        <template #custom>
          <slot name="right-custom" />
        </template>
      </ValaxyRightSidebar>
    </slot>
  </main>

  <YunBackToTop />
</template>

<style lang="scss">
@use '~/styles/mixins' as *;

@include xl {
  .content {
    // 8px scrollbar width
    max-width: calc(100vw - 2 * var(--yun-sidebar-width-mobile) - 1rem - 8px);
  }
}
</style>
