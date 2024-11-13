<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import EventService from '@/services/EventService'
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'
import type { EventItem, Organizer } from '@/types'
import OrganizerSerivce from '@/services/OrganizerService'
const item = ref<EventItem>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: {
 id: 0,
 name: ''
  }
})
const router = useRouter()
const store = useMessageStore()

// 保存事件的函数
function saveEvent() {
  EventService.saveEvent(item.value)
    .then((response) => {
      // 保存成功后跳转到事件详情页面
      router.push({ name: 'event-detail-view', params: { id: response.data.id } })
      // 显示成功消息
      store.updateMessage('Successfully added a new event: ' + response.data.title)
      setTimeout(() => {
        store.resetMessage() // 3秒后清除消息
      }, 3000)
    })
    .catch(() => {
      // 如果失败，跳转到网络错误页面
      router.push({ name: 'network-error-view' })
    })
}
const organizers = ref<Organizer[]>([])
onMounted(() => {
 OrganizerSerivce.getOrganizers()
 .then((response) => {
 organizers.value = response.data
 })
 .catch(() => {
 router.push({ name: 'network-error-view' })
 })
})
</script>

<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="saveEvent">
      <!-- Category Input -->
      <BaseInput v-model="item.category" type="text" label="Category" />

     
      <BaseInput v-model="item.title" type="text" label="Title" />


  
      <BaseInput v-model="item.description" type="text" label="Description" />
   
      
      <BaseInput v-model="item.location" type="text" label="Location" />
      
      <h3>Who is your organizer?</h3>
 <label>Select an Organizer</label>
 <select v-model="item.organizer.id">
 <option
 v-for="option in organizers"
 :value="option.id"
 :key="option.id"
 :selected="option.id === item.organizer.id"
 >
 {{ option.name }}
 </option>
 </select>
      
      

      <!-- Submit Button -->


      <button type="submit" class="button">Submit</button>
    </form>

    <!-- Display Event Data (for debugging) -->
    <pre>{{ item }}</pre>
  </div>
</template>

<style scoped>
/* Basic styling for the form */
.field {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #45a049;
}
</style>
