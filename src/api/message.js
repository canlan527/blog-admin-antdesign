import request from '@/utils/request';

export function getMessage(page = 1, limit = 10) {
  return request({
    url: '/message',
    method: 'get',
    params: {
      page,
      limit,
    }
  })
}

export function delMessage(id) {
  return request({
    url: `/message/${id}`,
    method: 'delete',
  })
}

export function addMessage(data) {
  return request({
    url: 'message',
    method: 'post',
    data
  })
}