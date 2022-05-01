<script setup lang="ts">
import type { CommentModel } from '@mx-space/api-client'

import { apiClient } from '~/utils'

const props = defineProps<{
  onSubmit?: (
    data: Pick<CommentModel, 'author' | 'text' | 'url' | 'mail'>,
  ) => Promise<any>

  id: string
}>()

const KEY = 'yun-comment'
const formData = useStorage(KEY, {
  author: '',
  mail: '',
  url: '',
})

const text = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  const { author, mail, url } = formData.value

  if (props.onSubmit) {
    await props.onSubmit({
      author,
      text: text.value,
      mail,
      url,
    })
  } else {
    await apiClient.comment.comment(props.id, {
      author,
      text: text.value,
      mail,
      url,
    })
  }
  text.value = ''
}
</script>

<template>
  <form class="flex flex-col gap-3" @submit="handleSubmit">
    <div class="flex gap-3 flex-grow flex-shrink-0 w-full top-wrapper">
      <input v-model="formData.author" required placeholder="昵称 *" />
      <input v-model="formData.mail" placeholder="邮箱 *" required />
      <input v-model="formData.url" placeholder="网址 https?://" />
    </div>
    <textarea
      v-model="text"
      required
      placeholder="嘿 ︿(￣︶￣)︿, 留个评论好不好嘛~"
    />

    <div class="flex justify-end gap-4">
      <button
        type="submit"
        class="bg-[var(--yun-c-primary)] text-white px-3 py-[4px] rounded-xl inline-flex items-center gap-1 active:opacity-75 transition-opacity"
      >
        <div class="icon" i-ri:send-plane-fill></div>
        提交
      </button>
    </div>
  </form>
</template>

<style scoped lang="postcss">
form {
  @apply my-4;

  width: 100%;
  position: relative;
  font-size: 16px;
}

input,
textarea {
  border: 1px solid #ccc;
  display: block;
  width: 100%;
  border-radius: 4px;
  padding: 0.1rem 0.5rem;
}

@media (max-width: 768px) {
  .top-wrapper {
    flex-direction: column;
  }
}
</style>
