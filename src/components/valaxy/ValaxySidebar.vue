<script lang="ts" setup>
import { useLayout } from '~/composables/use-layout'
import { useAppStore } from '~/stores/app'

const app = useAppStore()

const isHome = useLayout('home')

const transitionClass = ref(false)

onMounted(() => {
  transitionClass.value = true
})
</script>

<template>
  <ValaxyOverlay :show="app.isSidebarOpen" @click="app.toggleSidebar()" />

  <ValaxyHamburger
    :active="app.isSidebarOpen"
    class="menu-btn sidebar-toggle yun-icon-btn"
    :class="isHome ? '' : '!md:hidden'"
    @click="app.toggleSidebar()"
  />

  <aside
    class="va-card transition"
    :class="[
      'sidebar',
      app.isSidebarOpen && 'open',
      !isHome && 'md:translate-x-0',
      transitionClass && 'transform-transition',
    ]"
  >
    <slot />
  </aside>
</template>

<style>
.menu-btn {
  display: inline-flex;
  position: fixed;
  left: 0.8rem;
  top: 0.6rem;
  line-height: 1;
  z-index: var(--yun-z-menu-btn);
  cursor: pointer;
}
</style>
