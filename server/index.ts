/* eslint-disable @typescript-eslint/no-var-requires */
import fastify from 'fastify'
import { join } from 'path'

import compress from '@fastify/compress'
import proxy from '@fastify/http-proxy'

const isProduction = process.env.NODE_ENV === 'production'
const isDev = !isProduction

const dist = '../dist'

/** @type {import('../dist/client/ssr-manifest.json')} */
const manifest = require(`${dist}/client/ssr-manifest.json`)

// This is the server renderer we just built
/** @type { import('../dist/server/main')} */
const { default: renderPage } = require(`${dist}/server`)

startServer()

async function startServer() {
  const app = fastify()

  app.register(compress, { global: true })
  const staticPlugin = require('@fastify/static')
  app.register(staticPlugin, {
    prefix: '/',
    root: join(__dirname, `${dist}/client`),
    wildcard: false,
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
    const url = `${req.protocol}://${req.hostname}${req.raw.url}`
    try {
      const { html } = await renderPage(url, {
        manifest,
        preload: true,
        req,
        res,
      })

      res.type('text/html').compress(html)
    } catch (e) {
      res.send('500')
    }
  })

  const port = process.env.PORT || 4859
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
