import request from '@/utils/request'

export default (type: 'je'| 'be'| 'all') => request({
  url: `/getServers/${type}`,
  method: 'POST'
})