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

export function updateBlog(info) {
  return request({
    url: `blog/${info.id}`,
    method: 'put',
    data: info.data,
  })
}

export function findOneBlog(id) {
  return request({
    url: `blog/${id}`,
    method: 'get',
  })
}

export function getComment(page = 1, limit = 7, blogid = -1) {
  return request({
    url: '/comment',
    method: 'get',
    params: {
      page,
      limit,
      blogid,
    }
  })
}

export function delComment(id) {
  return request({
    url: `/comment/${id}`,
    method: 'delete'
  })
}

export function addComment(data) {
  return request({
    url: '/comment',
    method: 'post',
    data
  })
}