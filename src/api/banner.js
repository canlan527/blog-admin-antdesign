import request from '@/utils/request'

export function getBannerList() {
  return request({
    url: '/banner',
    method: 'get',
  })
}

export function uploadBanner(){
  return request({
    url: 'upload',
    method: 'post',
  })
}

export function setBannerList(data) {
  return request({
    url: '/banner',
    method: 'post',
    data,
  })
}