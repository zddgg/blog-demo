<script setup>
import MyHeader from "./components/MyHeader.vue";
import PostCard from "./components/PostCard.vue";
import Profile from "./components/Profile.vue";
import PostDetail from "./components/PostDetail.vue";
</script>

<template>
  <div>
    <div style="display: flex; justify-content: center">
      <my-header/>
    </div>
    <div style="display: flex; justify-content: center; padding: 20px">
      <div style="width: 864px">
<!--        <div v-for="i in 10" :key="i" :style="i !== 1 ? { 'margin-top': '20px'} : null">-->
<!--          <post-card/>-->
<!--        </div>-->
<!--        <div style="display: flex; justify-content: center; margin-top: 20px">-->
<!--          <a-pagination :total="50"/>-->
<!--        </div>-->
        <post-detail/>
      </div>
      <div style="width: 288px; margin-left: 20px">
        <profile/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
