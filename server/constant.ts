export const isProduction = process.env.NODE_ENV === 'production'
export const isDev = !isProduction
export const apiBase = isDev
  ? 'https://api.innei.ren/v2/'
  : 'http://localhost:2333/api/v2/'
