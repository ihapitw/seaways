export function formatMethodUrl(url, props) {
  let result = url
  for (let prop in props) {
    result = result.replace(new RegExp(`{${prop}}`, 'gi'), props[prop])
  }
  if (result.match('{') || result.match('}')) {
    throw new Error(
      `in path params\npath: ${url}\nProps: ${JSON.stringify(props, null, 2)}`
    )
  }
  return result
}
