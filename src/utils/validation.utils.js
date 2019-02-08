import i18n from "@/i18n"

export function getErrorMessage(jsonKey, error) {
  let statusCode = error.response.data.code || error.response.status;
  return statusCode === 400 ? i18n.t(`validation.${error.response.data.message}`) : i18n.t(`${jsonKey}.${statusCode}`)
}