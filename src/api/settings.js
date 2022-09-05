import request from '@/utils/request';

export function getSettings () {
  return request({
    url: '/setting',
  })
}

export function saveSettings (data) {
  return request({
    url:'/setting',
    method: 'put',
    data
  })
}