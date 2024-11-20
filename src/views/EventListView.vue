<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'


const keyword = ref('')
const typeFilter = ref('') // 新增类型筛选
const router = useRouter()
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

const page = computed(() => props.page)

// 更新关键字和类型，并查询事件
function updateKeyword(value: string = keyword.value) {
  keyword.value = value;

  let queryFunction;

  if (!keyword.value || keyword.value.trim() === '') {
    queryFunction = EventService.getEvents(1, page.value); // 将每页数量更新为 1
    console.log(`Calling API: /events?_limit=1&_page=${page.value}`);
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value.trim(), 1, page.value);
    console.log(`Calling API: /events?title=${keyword.value.trim()}&_limit=1&_page=${page.value}`);
  }

  queryFunction
    .then((response) => {
      events.value = response.data;
      totalEvents.value = response.headers['x-total-count'];
      console.log('Events:', events.value);
      console.log('Total Events:', totalEvents.value);
    })
    .catch(() => {
      router.push({ name: 'NetworkError' });
    });
}



onMounted(() => {
  watchEffect(() => {
    updateKeyword()
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <main class="flex flex-col items-center">
    <!-- 搜索框 -->
    <div class="search-filters">
      <BaseInput
        v-model="typeFilter"
        type="text"
        label="Search by Type..."
        @input="updateKeyword( $event.target.value)"
      />
    </div>

    <!-- 事件卡片 -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <!-- 分页按钮 -->
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        &#60; Prev Page
      </RouterLink>

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.search-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
