import request from '../utils/request'

export const get6h = () => request({
  url: '/getStatus/6h',
  method: 'POST'
})

export const get24h = () => request({
  url: '/getStatus/24h',
  method: 'POST'
})

export const get7d = () => request({
  url: '/getStatus/7d',
  method: 'POST'
})

export const get30d = () => request({
  url: '/getStatus/30d',
  method: 'POST'
})