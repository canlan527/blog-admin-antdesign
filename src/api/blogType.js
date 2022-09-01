import request from "@/utils/request";

// 获取文章分类
export function getBlogType() {
  return request({
    url: '/blogtype',
  })
}

// 添加分类
export function addBlogType(data) {
  return request({
    url: '/blogtype',
    method: 'post',
    data
  })
}

// 修改分类
export function updateBlogType(blog) {
  return request({
    url: `/blogtype/${blog.id}`,
    method: 'put',
    data:blog.data,
  })
}

// 查询某个分类
export function findOneBlogType(id) {
  return request({
    url: `/blogtype/${id}`,
  })
}

// 删除
export function deleteBlogType(id) {
  return request({
    url: `/blogtype/${id}`,
    method: 'delete',
  })
}