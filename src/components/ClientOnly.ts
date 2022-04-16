import { defineComponent, onMounted, ref } from 'vue'

export const ClientOnly = defineComponent({
  setup(_, { slots }) {
    console.log(import.meta.env.SSR)

    if (import.meta.env.SSR) return () => null

    const show = ref(false)
    onMounted(() => {
      show.value = true
    })
    return () => (show.value && slots.default ? slots.default() : null)
  },
})
