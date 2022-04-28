/* eslint-disable @typescript-eslint/no-var-requires */
import fastify from 'fastify'
import proxy from 'fastify-http-proxy'
import { resolve } from 'path'
import type { ViteDevServer } from 'vite'
import { createPageRenderer } from 'vite-plugin-ssr'

import express from '@fastify/express'

const isProduction = process.env.NODE_ENV === 'production'
const isDev = !isProduction
const root = resolve(__dirname, '../')

startServer()

async function startServer() {
  const app = fastify()

  let viteDevServer: ViteDevServer
  if (isProduction) {
    app.register(require('fastify-compress'), { global: false })
    app.register(require('fastify-static'), {
      root: `${root}/dist/client`,
      wildcard: false,
    })
  } else {
    const vite = require('vite')
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: 'ssr' },
    })

    await app.register(express)
    app.use(viteDevServer.middlewares)
  }

  const renderPage = createPageRenderer({
    // @ts-expect-error
    viteDevServer,
    isProduction,
    root,
  })

  app.register(proxy, {
    prefix: '/api',
    upstream: isDev
      ? 'https://api.innei.ren/v2/'
      : 'http://localhost:2333/api/v2/',
  })

  app.register(proxy, {
    prefix: '/socket.io',
    upstream: 'http://localhost:2333/socket.io',
    websocket: true,
  })

  app.get('*', async (req, res) => {
    const url = req.raw.url as string

    const pageContextInit = {
      url,
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse, errorWhileRendering } = pageContext
    if (!httpResponse) {
      res.send({
        url,
        error: errorWhileRendering,
      })
      return
    }
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  const port = process.env.PORT || 4858
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
