export function getErrorMessage(jsonKey, error) {
  return error.code === 400 ? this.$t(`validation.${error.message}`) : this.$t(`${jsonKey}.${error.response.status}`)
}