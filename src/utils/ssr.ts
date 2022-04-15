export const generatePropsObject = <T>(data: T) => {
  return {
    pageContext: {
      documentProps: data,
    },
  }
}
