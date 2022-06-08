import request from '@/utils/request'

export default (id:number) => request({
  url: `/getServerDetail/${id}`,
  method: 'POST'
})