<script lang="ts" setup>
useHead({
  title: ' 1s',
})
async function onBeforeRender() {
  return {
    pageContext: {
      documentProps: {
        title: 'aa',
      },
    },
  }
}

const pageContext = {
  documentProps: {
    title: 'aa',
  },
}
</script>

<template>
  <h1>Welcome</h1>
  This page is:
  <ul>
    <li>Rendered to HTML.</li>
  </ul>
</template>
