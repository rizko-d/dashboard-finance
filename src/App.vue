<template>
  <div :class="darkMode ? 'dark' : ''">
    <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar @toggleDarkMode="toggleDarkMode" :darkMode="darkMode"/>
      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "./components/Sidebar.vue";

const darkMode = ref(false);
function toggleDarkMode() {
  darkMode.value = !darkMode.value;
}
</script>

<style>
/* scroll bar styling optional */
</style>