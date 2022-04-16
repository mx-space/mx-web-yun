import MarkdownIt from 'markdown-it'
import rmd from 'remove-markdown'

import { setupMarkdownPlugins } from '~/markdown/plugins'

const markdownIt = new MarkdownIt()

const render = setupMarkdownPlugins(markdownIt, {})

export const excerpt_separator = '<!-- more -->'
export const excerptMarkdownAndRenderToHtml = (markdown: string) => {
  const hasSeparator = markdown.search(excerpt_separator)
  if (hasSeparator === -1) {
    const rmded = rmd(markdown)
    return rmded.length > 200 ? `${rmded.substr(0, 200)}...` : rmded
  }

  const excerpt = markdown.split(excerpt_separator)[0]
  return render.render(excerpt)
}
export const markdownRender = (markdown: string) => render.render(markdown)
