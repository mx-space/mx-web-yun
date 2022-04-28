import path from 'path'
import {
  presetAttributify,
  presetTypography,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import type { UserConfig } from 'vite'
import ssr from 'vite-plugin-ssr/plugin'

import vueI18n from '@intlify/vite-plugin-vue-i18n'
import presetIcons from '@unocss/preset-icons'
import vue from '@vitejs/plugin-vue'

import { createI18nPlugin } from './plugins/i18n'

const isDev = process.env.NODE_ENV === 'development'

const config: UserConfig = {
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    ssr(),
    Unocss({
      safelist: [
        ...'animate-fade-in m-auto text-left'.split(' '),
        'rotate-y-180',
        'i-ri-archive-line',
        'i-ri-folder-2-line',
        'i-ri-price-tag-3-line',
        'i-ri-cloud-line',
        'i-ri-clipboard-line',

        'i-ri-genderless-line',
        'i-ri-women-line',

        'i-ri-external-link-line',
        'i-ri-bilibili-line',
        'i-ri-douban-line',
        'i-ri-github-line',
        'i-ri-netease-cloud-music-line',
        'i-simple-icons-notion',
        'i-ri-twitter-line',
        'i-ri-wechat-2-line',
        'i-ri-weibo-line',
        'i-ant-design-yuque-outlined',
        'i-ri-zhihu-line',
        'i-ri-cloud-line',
        'i-ri-file-list-2-line',
        'i-ri-rss-line',
        'i-ri-qq-line',
        'i-ri-github-line',
        'i-ri-weibo-line',
        'i-ri-douban-line',
        'i-ri-netease-cloud-music-line',
        'i-ri-zhihu-line',
        'i-ri-bilibili-line',
        'i-ri-wechat-2-line',
        'i-ri-twitter-line',
        'i-ri-telegram-line',
        'i-ri-mail-line',
        'i-ri-train-line',
        'i-ri-alipay-line',
        'i-ri-qq-line',
        'i-ri-wechat-pay-line',
      ],
      shortcuts: [
        ['yun-main', 'lt-md:pl-0'],
        ['yun-card', 'transition yun-transition shadow hover:shadow-lg'],
        [
          'btn',
          'px-4 py-1 rounded inline-block bg-sky-600 text-white cursor-pointer hover:bg-sky-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
        ],
        [
          'icon-btn',
          'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-sky-600',
        ],
        ['va-card', 'shadow hover:shadow-lg'],
      ],

      presets: [
        presetAttributify({}),
        presetWind(),
        presetIcons({
          /* options */
        }),
        presetIcons({
          scale: 1.2,
          // warn: true,
        }),
        presetTypography(),
        presetWebFonts({
          fonts: {
            serif: [
              {
                name: 'Noto Serif SC',
                weights: [900],
              },
            ],
            // sans: 'DM Sans',
            // mono: 'DM Mono',
          },
        }),
      ],
      rules: [
        // more see '~/styles/global/helper.scss'
        [
          'yun-transition',
          {
            'transition-duration': 'var(--yun-transition-duration)',
          },
        ],
        [
          'yun-text-light',
          {
            color: 'var(--yun-c-text-light)',
          },
        ],
        [
          'font-serif',
          {
            'font-family': 'var(--yun-font-serif)',
          },
        ],
        [
          'font-sans',
          {
            'font-family': 'var(--yun-font-sans)',
          },
        ],
        [
          'font-mono',
          {
            'font-family': 'var(--yun-font-mono)',
          },
        ],
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()],
    }),
    Icons({}),
    AutoImport({
      dts: './src/import.d.ts',
      imports: ['vue', 'pinia', '@vueuse/core', '@vueuse/head'],
    }),
    Components({
      dirs: ['./src/components'],
      extensions: ['vue'],
      deep: true,
      dts: './src/components.d.ts',
      resolvers: [IconsResolver()],
    }),
    vueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'src/locales/**')],
    }),

    createI18nPlugin(),
  ],
  publicDir: path.resolve(__dirname, './public'),
  define: {
    __VUE_OPTIONS_API__: false,
  },
  server: {
    // proxy: {
    //   '/api': {
    //     target: isDev
    //       ? 'http://api.innei.ren/v2'
    //       : 'http://localhost:2333/api/v2',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    //   '/socket.io': {
    //     target: 'http://localhost:2333/socket.io',
    //     ws: true,
    //     ignorePath: true,
    //     rewrite: (path) => path.replace(/^\/socket\.io/, ''),
    //   },
    // },
  },
}

export default config
