<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import EventService from '@/services/EventService'
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'
import type { Event, Organizer } from '@/types'
import OrganizerSerivce from '@/services/OrganizerService'
import BaseSelect from '@/components/BaseSelect.vue'
const event= ref<Event>({
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
  EventService.saveEvent(event.value)
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
      <BaseInput v-model="event.category" type="text" label="Category" />

     
      <BaseInput v-model="event.title" type="text" label="Title" />


  
      <BaseInput v-model="event.description" type="text" label="Description" />
   
      
      <BaseInput v-model="event.location" type="text" label="Location" />
      
      <h3>Who is your organizer?</h3>
 <label>Select an Organizer</label>
 <BaseSelect v-model="event.organizer.id" :options="organizers" label="Organizer" />
      <button type="submit" class="button">Submit</button>
    </form>

    <!-- Display Event Data (for debugging) -->
    <pre>{{ event }}</pre>
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
