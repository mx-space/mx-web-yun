<script lang="ts" setup>
import Base from '../../layouts/base.vue'
</script>
<template>
  <Base>
    <template #sidebar>
      <slot name="sidebar" />
    </template>
    <template v-if="$slots['sidebar-child']" #sidebar-child>
      <slot name="sidebar-child" />
    </template>
    <template #header>
      <slot name="header" />
    </template>
    <template #content>
      <slot name="content" />
    </template>

    <slot />

    <template #nav>
      <slot name="nav" />
    </template>
    <template #comment>
      <slot name="comment" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
    <template #right-sidebar>
      <slot name="right-sidebar" />
    </template>
    <template #right-custom>
      <hr opacity="10" m="10" />
      <p font="serif black">
        🌟 广告位招租 🌟
        <br />
        <del>云游君在线征婚</del><br />
        <del>Innei 在线找女友</del>
      </p>
    </template>
  </Base>
</template>
