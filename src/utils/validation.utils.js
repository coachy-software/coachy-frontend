import i18n from "@/i18n"

export function getErrorMessage(jsonKey, error) {
  return error.code === 400 ? i18n.t(`validation.${error.message}`) : i18n.t(`${jsonKey}.${error.response.status}`)
}