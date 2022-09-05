import request from "@/utils/request";

export function getAbout() {
  return request({
    url: '/about'
  })
}

export function setAbout(data) {
  return request({
    url:'/about',
    method: 'post',
    data,
  })
}