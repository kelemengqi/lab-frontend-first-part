<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EventService from '@/services/EventService'
import { useMessageStore } from '@/stores/message'

const event = ref({
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
</script>

<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="saveEvent">
      <!-- Category Input -->
      <label>Category</label>
      <input
        v-model="event.category"
        type="text"
        placeholder="Category"
        class="field"
      />

      <h3>Name & Describe Your Event</h3>
      <!-- Title Input -->
      <label>Title</label>
      <input
        v-model="event.title"
        type="text"
        placeholder="Title"
        class="field"
      />

      <!-- Description Input -->
      <label>Description</label>
      <input
        v-model="event.description"
        type="text"
        placeholder="Description"
        class="field"
      />

      <h3>Where is your event?</h3>
      <!-- Location Input -->
      <label>Location</label>
      <input
        v-model="event.location"
        type="text"
        placeholder="Location"
        class="field"
      />

      
      <label>date</label>
      <input v-model="event.date" type="text" placeholder="date" class="field" required />

      <!-- Submit Button -->
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
