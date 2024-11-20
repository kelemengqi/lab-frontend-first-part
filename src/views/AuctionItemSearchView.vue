<!--
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-11-20 15:29:41
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-20 15:29:54
 * @FilePath: /lab-frontend-first-part/src/views/AuctionItemSearchView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
      <h1>Search Auction Items</h1>
      <form @submit.prevent="searchItems">
        <input v-model="description" placeholder="Enter description" />
        <input v-model="type" placeholder="Enter type" />
        <button type="submit">Search</button>
      </form>
      <ul>
        <li v-for="item in searchResults" :key="item.id">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <p>Type: {{ item.type }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const description = ref('');
  const type = ref('');
  const searchResults = ref([]);
  
  function searchItems() {
    let query = '/auction-items/filter?';
    if (description.value) {
      query += `title=${description.value}&`;
    }
    if (type.value) {
      query += `type=${type.value}`;
    }
    axios.get(query).then((response) => {
      searchResults.value = response.data;
    });
  }
  </script>
  