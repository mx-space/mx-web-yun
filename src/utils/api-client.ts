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
import { axiosAdaptor } from '@mx-space/api-client/adaptors/axios'

export const apiClient = createClient(axiosAdaptor)('/api', {
  controllers: [
    NoteController,
    LinkController,
    PostController,
    AggregateController,
    SayController,
    CategoryController,
    SnippetController,
  ],
})
