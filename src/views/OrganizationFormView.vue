<!--
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-11-11 10:58:41
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-11 12:39:21
 * @FilePath: /lab-frontend-first-part/src/views/OrganizationFormView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OrganizationService from '@/services/OrganizationService'
import { useMessageStore } from '@/stores/message'

// 定义组织类型接口
interface Organization {
  name: string
  location: string
  description: string
  contact_email: string
}

// 创建组织数据对象，明确类型为 Organization
const organization = ref<Organization>({
  name: '',
  location: '',
  description: '',
  contact_email: ''
})

const router = useRouter()
const messageStore = useMessageStore()

// 提交组织信息
function saveOrganization() {
  OrganizationService.saveOrganization(organization.value)
    .then(response => {
      // 跳转到组织详情页面，并显示成功消息
      router.push({ name: 'organization-detail-view', params: { id: response.data.id } })
      messageStore.updateMessage(`Successfully added organization: ${response.data.name}`)
      setTimeout(() => messageStore.resetMessage(), 3000) // 3秒后清除消息
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Create an Organization</h1>
    <form @submit.prevent="saveOrganization">
      <label>Organization Name</label>
      <input v-model="organization.name" type="text" placeholder="Name" class="field" required />

      <label>Location</label>
      <input v-model="organization.location" type="text" placeholder="Address" class="field" required />

      <label>Description</label>
      <input v-model="organization.description" type="text" placeholder="Description" class="field" required />

      <label>Email</label>
      <input v-model="organization.contact_email" type="email" placeholder="Email" class="field" required />

      <button type="submit" class="button">Submit</button>
    </form>

    <pre>{{ organization }}</pre>
  </div>
</template>

<style scoped>
/* 添加样式 */
.field {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  max-width: 400px;
}
.button {
  padding: 10px 15px;
  color: #fff;
  background-color: #007bff;
  border: none;
  cursor: pointer;
}
.button:hover {
  background-color: #0056b3;
}
</style>
