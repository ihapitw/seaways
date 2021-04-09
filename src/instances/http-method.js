import { formatMethodPayload } from '../utils/format-method-payload'
import { formatMethodUrl } from '../utils/format-method-url'

export function httpMethod(client, settings, methodParams = {}) {
  const { payload, pathParams } = formatMethodPayload(methodParams)
  return client({
    method: settings.method,
    url: formatMethodUrl(settings.path, pathParams || {}),
    ...payload
  })
}
