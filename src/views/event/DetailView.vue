<!--
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-11-08 13:56:24
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-10 22:58:43
 * @FilePath: /lab-frontend-first-part/src/views/event/DetailView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: String
}>()
const { event } = toRefs(props)
</script>
<template>
  <p>{{ event.title }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>
