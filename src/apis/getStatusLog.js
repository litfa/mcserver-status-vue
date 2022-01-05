/*
 * @Author: litfa
 * @Date: 2022-01-05 20:37:06
 * @Last Modified by: litfa
 * @Last Modified time: 2022-01-05 20:37:47
 */
import requests from '@/utils/requrst.js'

export default function () {
  return requests.get('/api/getStatusLog')
}
