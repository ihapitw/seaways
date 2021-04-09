import { httpMethod } from '../instances/http-method'
import { SeawaysClient } from '../instances/client'
export default function (axiosClient) {
  if (axiosClient && 'post' in axiosClient && 'get' in axiosClient) {
    return new Proxy(new SeawaysClient(axiosClient), {
      get(target, method) {
        if (method in target) {
          const client = target.axiosClient
          const settings = target[method]
          return (payload) => {
            return httpMethod(client, settings, payload)
          }
        } else {
          return undefined
        }
      }
    })
  } else {
    throw new Error('axiosClient is required')
  }
}
