import { useHead } from '@vueuse/head'

import { loadScript } from '~/utils/load-script'

import { isDark } from '../../composables/use-dark'

/**
 * use prism css cdn
 */
export function usePrism() {
  useHead({
    link: [
      {
        rel: 'stylesheet',
        href: `https://cdn.jsdelivr.net/gh/PrismJS/prism-themes@master/themes/prism-one-${
          !isDark.value ? 'light' : 'dark'
        }.css`,
      },
      {
        rel: 'stylesheet',
        href: 'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/line-numbers/prism-line-numbers.min.css',
      },
    ],
  })

  const load = ref(false)
  onMounted(() => {
    Promise.all([
      loadScript(
        'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/components/prism-core.min.js',
      ),
    ])
      .then(() =>
        Promise.all([
          loadScript(
            'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/autoloader/prism-autoloader.min.js',
          ),
          loadScript(
            'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/line-numbers/prism-line-numbers.min.js',
          ),
        ]),
      )
      .then(() => {
        load.value = true
        highlightAll()
      })
  })

  function highlightAll() {
    if (!load.value) return

    requestAnimationFrame(() => {
      window.Prism?.highlightAll()
      // highlightAll twice
      requestAnimationFrame(() => {
        window.Prism?.highlightAll()
      })
    })
  }

  return {
    highlightAll,
  }
}
