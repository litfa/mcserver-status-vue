/*
 * @Author: litfa
 * @Date: 2022-01-Sa 02:00:11
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-Sa 02:00:11
 */
import requests from '@/utils/requrst.js'

export default function () {
  return requests.get('/api/getStatus')
}
