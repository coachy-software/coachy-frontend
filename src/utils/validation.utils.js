import i18n from "@/i18n"

export function getErrorMessage(jsonKey, error) {
  let statusCode = error.response.status || error.response.data.code;
  return i18n.t(`${jsonKey}.${statusCode}`)
}
