<script lang="ts" setup>
import { useThemeConfig } from '~/composables'

const config = useThemeConfig()
</script>

<template>
  <YunBase>
    <template #header>
      <div></div>
    </template>
    <template #content>
      <main text="left" m="auto" p="t-0 b-2">
        <router-view v-slot="{ Component }">
          <Transition appear>
            <component :is="Component" />
          </Transition>
        </router-view>
        <YunSponsor v-if="config.sponsor.enable" />
      </main>
    </template>
  </YunBase>
</template>
