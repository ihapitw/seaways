import { formatMethodPayload } from '../utils/format-method-payload'
import { formatMethodUrl } from '../utils/format-method-url'

export function httpMethod(client, settings, methodParams = {}) {
  const { payload, pathParams } = formatMethodPayload(methodParams)
  const formatedUrl = formatMethodUrl(settings.path, pathParams || {})
  return client({
    method: settings.method,
    url: formatedUrl,
    ...payload
  })
}
