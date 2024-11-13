/*
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-11-08 13:56:24
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-13 22:30:24
 * @FilePath: /lab-frontend-first-part/src/services/EventService.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { EventItem } from '@/types';
import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'http://localhost:8080',
   baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

export default {
  getEvent(id: number) {
    return apiClient.get(`/events/${id}`);
  },
  getEvents(perPage: number,page:number) {
    return apiClient.get(`/events?_limit=`+perPage+'&_page='+page);
  },
  saveEvent(event: EventItem) {
    return apiClient.post('/events', event);
  },
};
