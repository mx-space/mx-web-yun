import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

function generateLocales(roots: string[]) {
  const imports: string[] = ['const messages = { "cn": {}, en: {} }']
  const languages = ['cn', 'en']

  roots.forEach((root, i) => {
    languages.forEach((lang) => {
      const langYml = `${root}/locales/${lang}.yml`
      if (fs.existsSync(langYml) && fs.readFileSync(langYml, 'utf-8')) {
        const varName = lang.replace('-', '') + i
        imports.push(`import ${varName} from "${toAtFS(langYml)}"`)
        imports.push(`Object.assign(messages['${lang}'], ${varName})`)
      }
    })
  })

  imports.push('export default messages')
  return imports.join('\n')
}

function toAtFS(path: string) {
  return `/@fs${ensurePrefix('/', slash(path))}`
}

function slash(str: string) {
  return str.replace(/\\/g, '/')
}

function ensurePrefix(prefix: string, str: string) {
  if (!str.startsWith(prefix)) return prefix + str
  return str
}

export function createI18nPlugin(): Plugin {
  return {
    name: 'i18n',

    resolveId(id) {
      if (id.startsWith('/@locales')) return id
      return null
    },

    load(id) {
      if (id === '/@locales/messages')
        return generateLocales([path.resolve(__dirname, '../src')])
    },
  }
}
