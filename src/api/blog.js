import request from '@/utils/request'

export function getBlogList(page = 1, limit = 10) {
  return request({
    url: '/blog',
    method: 'get',
    params: {
      page,
      limit,
    },
  })
}

export function deleteOneBlog(id) {
  return request({
    url: `blog/${id}`,
    method: 'delete',
  })
}

export function addBlog(data) {
  return request({
    url: 'blog',
    method: 'post',
    data,
  })
}
