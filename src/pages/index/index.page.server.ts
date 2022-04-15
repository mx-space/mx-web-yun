export async function onBeforeRender() {
  return {
    pageContext: {
      documentProps: {
        title: 'aa',
      },
    },
  }
}
