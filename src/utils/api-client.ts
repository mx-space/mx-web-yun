import {
  AggregateController,
  CategoryController,
  LinkController,
  NoteController,
  PostController,
  SayController,
  SnippetController,
  createClient,
} from '@mx-space/api-client'
import { axiosAdaptor } from '@mx-space/api-client/lib/adaptors/axios'
import { isClient } from '@vueuse/core'

import { version } from '../../package.json'

const axios = axiosAdaptor.default.defaults
!isClient &&
  (axios.headers.common['User-Agent'] = `Yun v${version}/Mix Space SSR Server`)

export const apiClient = createClient(axiosAdaptor)(
  import.meta.env.SSR
    ? `http://127.0.0.1:${import.meta.env.PORT || 4858}/api`
    : '/api',
  {
    controllers: [
      NoteController,
      LinkController,
      PostController,
      AggregateController,
      SayController,
      CategoryController,
      SnippetController,
    ],
  },
)
