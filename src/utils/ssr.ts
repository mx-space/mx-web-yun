import type { PageContextBuiltIn } from 'vite-plugin-ssr'

export const generatePropsObject = async <T>(
  pageContext: PageContextBuiltIn,
  data: T,
) => {
  return {
    pageContext: {
      pageProps: data,
    },
  }
}
