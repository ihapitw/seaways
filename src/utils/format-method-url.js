export function formatMethodUrl(url, props = {}) {
  let result = url
  for (let prop in props) {
    const reg = new RegExp(`{${prop}}`, 'gi')
    if (url.match(reg)) {
      result = result.replace(reg, props[prop])
    }
  }
  if (result.match('{') || result.match('}')) {
    throw new Error(`format url troubles, ${url}, ${JSON.stringify(props)}`)
  }
  return result
}
