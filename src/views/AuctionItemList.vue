<!--
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-11-20 15:05:59
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-20 15:06:06
 * @FilePath: /lab-frontend-first-part/src/components/AuctionItemList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
      <h1>Auction Items</h1>
      <div v-for="item in auctionItems" :key="item.id" class="auction-item">
        <h3>{{ item.description }} ({{ item.type }})</h3>
        <p>Successful Bid: {{ item.successfulBid ? item.successfulBid.amount : 'None' }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        auctionItems: []
      };
    },
    mounted() {
      this.fetchAuctionItems();
    },
    methods: {
      async fetchAuctionItems() {
        const response = await fetch('/auction-items');
        this.auctionItems = await response.json();
      }
    }
  };
  </script>
  
  <style>
  .auction-item {
    margin-bottom: 20px;
  }
  </style>
  