import { httpMethod } from '../instances/http-method'
import { SeawaysClient } from '../instances/client'
export default function (options) {
  return new Proxy(new SeawaysClient(options), {
    get(target, method) {
      if (method in target) {
        const client = target._options.axiosClient
        const settings = target[method]
        return (payload) => {
          return httpMethod(client, settings, payload)
        }
      } else {
        return undefined
      }
    }
  })
}
