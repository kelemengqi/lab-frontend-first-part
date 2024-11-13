<!-- src/views/OrganizationDetailView.vue -->
<template>
    <div>
      <h1>Organization Details</h1>

        <p>Loading...</p>
      </div>
    
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import OrganizationService from '@/services/OrganizationService'
  
  const organization = ref(null)
  const route = useRoute()
  
  onMounted(() => {
    const id = route.params.id
    OrganizationService.getOrganization(id)
      .then(response => {
        organization.value = response.data
      })
      .catch(() => {
        organization.value = null
      })
  })
  </script>
  