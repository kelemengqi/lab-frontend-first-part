/*
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-11-13 19:50:44
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-13 19:51:09
 * @FilePath: /lab-frontend-first-part/src/services/OrganizerService.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getOrganizers() {
    return apiClient.get('/organizers');
  }
};
