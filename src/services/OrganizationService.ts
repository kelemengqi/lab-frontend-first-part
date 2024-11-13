/*
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-11-10 22:17:23
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-11 12:32:20
 * @FilePath: /lab-frontend-first-part/src/services/OrganizationService.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
})

export default {
  saveOrganization(organization: { name: string; location: string; description: string; contact_email: string;  }) {
    return apiClient.post('/organizations', organization)
  },
 
   
    getOrganization(id: string) {
      return apiClient.get(`/organizations/${id}`)  // 获取指定id的组织信息
    }
}
