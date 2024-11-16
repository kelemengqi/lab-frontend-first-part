<!--
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-11-14 08:44:06
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-14 08:45:39
 * @FilePath: /lab-frontend-first-part/src/components/BaseSelect.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import type { Organizer } from '@/types'

const modelValue = defineModel()
interface BaseSelectProps {
 label: string
 options: Organizer[]
}
const props = withDefaults(defineProps<BaseSelectProps>(), {
 label: ''
})
</script>
<template>
 <label v-if="label">
 {{ props.label }}
 </label>
 <select class="mb-6" v-bind="$attrs" v-model="modelValue">
 <option
 v-for="option in props.options"
 :key="option.id"
 :value="option.id"
 :selected="option.id === modelValue"
 >
 {{ option.name }}
 </option>
 </select>
</template>
