<template>
  <nav class="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
    <div class="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
      <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">Finance Dashboard</h1>
      <button 
        @click="$emit('toggleDarkMode')" 
        class="focus:outline-none" 
        :aria-label="darkMode ? 'Light Mode' : 'Dark Mode'">
        <template v-if="darkMode">
          <SunIcon class="w-6 h-6 text-yellow-400" />
        </template>
        <template v-else>
          <MoonIcon class="w-6 h-6 text-gray-700" />
        </template>
      </button>
    </div>

    <ul class="flex flex-col mt-4 space-y-2 px-2">
      <li>
        <RouterLink to="/" class="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" active-class="bg-blue-500 text-white">
          <ChartBarIcon class="w-5 h-5 mr-3" />
          Dashboard
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/expenses" class="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" active-class="bg-blue-500 text-white">
          <CurrencyDollarIcon class="w-5 h-5 mr-3" />
          Pengeluaran
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/investments" class="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" active-class="bg-blue-500 text-white">
          <PresentationChartBarIcon class="w-5 h-5 mr-3" />
          Investasi
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { MoonIcon, SunIcon, ChartBarIcon, CurrencyDollarIcon, PresentationChartBarIcon } from "@heroicons/vue/24/outline";

defineProps({
  darkMode: Boolean
});
</script>