# seaways

```javascript
import axios from 'axios'
import seaways from 'seaways'

const axiosClient = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})
const httpClient = seaways.createClient({
  axiosClient
})
httpClient.getPosts = {
  method: 'get',
  path: 'posts'
}
httpClient.getPostsOne = {
  method: 'get',
  path: 'posts/{post_id}'
}
httpClient.getPostsCategory = {
  method: 'get',
  path: 'posts/category/{category_id}'
}

httpClient.createPost = {
  method: 'post',
  path: 'posts'
}

httpClient.getPosts()
httpClient.getPostsOne({ pathParams: { post_id: 555 } })
httpClient.getPostsOne({ pathParams: { post_id: 100 } })
httpClient.getPostsCategory({ pathParams: { category_id: 'cars' } })

httpClient.createPost({
  data: {
    title: 'Post title',
    content: 'Post content'
  }
})
```
