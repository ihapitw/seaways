export function formatMethodPayload(payload) {
  const pathParams = payload.pathParams
  delete payload.pathParams
  return { payload, pathParams }
}
