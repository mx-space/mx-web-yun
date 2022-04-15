/** eslint-disable  */
import compression from 'compression'
import express from 'express'
import { resolve } from 'path'
import type { ViteDevServer } from 'vite'
import { createPageRenderer } from 'vite-plugin-ssr'

const isProduction = process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`

startServer()

async function startServer() {
  const app = express()

  let viteDevServer: ViteDevServer
  if (isProduction) {
    app.use(compression())
    app.use(express.static(`${root}/dist/client`))
  } else {
    const vite = require('vite')
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: 'ssr' },
    })
    app.use(viteDevServer.middlewares)
  }

  const renderPage = createPageRenderer({
    // @ts-expect-error
    viteDevServer,
    isProduction,
    root,
  })
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    const pageContextInit = {
      url,
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  const port = process.env.PORT || 4858
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
