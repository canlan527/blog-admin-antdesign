import request from "@/utils/request";
 
export function getProjectList() {
  return request({
    url: '/project',
  })
}

export function addProject(data) {
  return request({
    url: '/project',
    method: 'post',
    data
  })
}

export function updateProject(id, data) {
  return request({
    url: `/project/${id}`,
    method: 'put',
    data,
  })
}

export function deleteProject(id) {
  return request({
    url: `/project/${id}`,
    method: 'delete'
  })
}