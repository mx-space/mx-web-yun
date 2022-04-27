<script lang="ts" setup>
import { useRouter } from 'vue-router'

const props = defineProps<{
  is404?: boolean
  onErrorHandled: Function
  error: Error
}>()
const router = useRouter()
const returnHome = () => {
  props.onErrorHandled()
  location.href = '/'
}
</script>

<template>
  <div
    class="text-center inline-flex justify-center flex-col items-center m-auto absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-2/4"
  >
    <div v-if="is404">
      <h1>404 Page Not Found</h1>
      <p>This page could not be found.</p>
    </div>
    <div v-else>
      <h1>500 Internal Server Error</h1>
      <p>Something went wrong.</p>
      <p>
        {{ error.message }}
      </p>
    </div>

    <div>
      <button @click="returnHome">Return back home</button>
    </div>
  </div>
</template>
