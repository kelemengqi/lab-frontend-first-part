<!--
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-11-13 17:37:26
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-13 17:38:53
 * @FilePath: /lab-frontend-first-part/src/components/BaseInput.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
const modelValue = defineModel()
interface BaseInputProps {
 label: string
}
const props = withDefaults(defineProps<BaseInputProps>(), {
 label: ''
})
</script>
<template>
 <label v-if="label">
 {{ props.label }}
 </label>
 <input class="mb-6" v-bind="$attrs" v-model="modelValue" :placeholder="label" />
</template>