import axios from 'axios'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { apiBase } from '../constant'

export default async (req: FastifyRequest, res: FastifyReply) => {
  const data = await axios
    .create({
      baseURL: apiBase,
      headers: {
        'user-agent': 'mx-web-yun/feed',
      },
    })
    .get('/feed')

  res.type('text/xml').send(data.data)
}
