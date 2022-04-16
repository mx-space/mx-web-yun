<script lang="ts" setup>
import { capitalize, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAggregateData, useThemeConfig } from '~/composables'

import pkg from '../../../package.json'

const { t } = useI18n()

const rootData = useAggregateData()
const user = rootData!.user
const themeConfig = useThemeConfig()

const year = new Date().getFullYear()

const isThisYear = computed(() => {
  return year === themeConfig.footer.since
})

const poweredHtml = computed(() =>
  t('footer.powered', [
    `<a href="${pkg.repository.url}" target="_blank" rel="noopener">Yun & Mix Space</a> v${pkg.version}`,
  ]),
)
</script>

<template>
  <footer
    class="va-footer p-4"
    text="center sm"
    style="color: var(--yun-c-text-light)"
  >
    <div
      v-if="themeConfig.footer.beian.enable && themeConfig.footer.beian.icp"
      class="beian"
      m="y-2"
    >
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">
        {{ themeConfig.footer.beian.icp }}
      </a>
    </div>

    <div class="copyright flex justify-center items-center" p="1">
      <span>
        &copy;
        <template v-if="!isThisYear">
          {{ themeConfig.footer.since }} -
        </template>
        {{ year }}
      </span>

      <a
        m="x-2"
        class="inline-flex animate-pulse"
        :href="themeConfig.footer.icon.url"
        target="_blank"
        :title="themeConfig.footer.icon.title"
      >
        <div :class="themeConfig.footer.icon.name" />
      </a>

      <span>{{ user.name }}</span>
    </div>

    <div v-if="themeConfig.footer.powered" class="powered" m="2">
      <span v-html="poweredHtml" />
    </div>

    <slot />
  </footer>
</template>
