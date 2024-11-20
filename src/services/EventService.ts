/*
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-11-08 13:56:24
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-20 11:05:59
 * @FilePath: /lab-frontend-first-part/src/services/EventService.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { EventItem } from '@/types';
import axios, { type AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // 使用环境变量设置后端 URL
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

export default {
  getEvent(id: number) {
    return apiClient.get(`/events/${id}`);
  },
  getEvents(perPage: number, page: number) {
    return apiClient.get(`/events?_limit=` + perPage + '&_page=' + page);
  },
  saveEvent(event: EventItem) {
    return apiClient.post('/events', event);
  },
  // 新增方法：通过关键字查询事件
  getEventsByKeyword(keyword: string, perPage: number, page: number): 
Promise<AxiosResponse<EventItem[]>> {
 return apiClient.get<EventItem[]>('/events?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
    ;
  },
};
