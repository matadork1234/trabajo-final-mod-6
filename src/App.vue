<script setup>
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue';

</script>

<template>
  <NavigationBar />
  <main class="w-full px-5 mt-5">
    <RouterView />
  </main>
</template>

