import request from '../utils/request'

const get = (id:number, url:string) => request({
  url: `/getStatus/${url}`,
  method: 'POST',
  data: {
    id
  }
})

export const get6h = (id: number) => get(id, '6h')
export const get24h = (id: number) => get(id, '24h')
export const get7d = (id: number) => get(id, '7d')
export const get30d = (id: number) => get(id, '30h')