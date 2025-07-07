<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Daftar Transaksi</h3>

    <div class="flex gap-4 flex-wrap mb-4">
      <input v-model="filterDate" type="date" class="p-2 rounded border w-48 dark:bg-gray-700 dark:text-gray-100" placeholder="Filter Tanggal" @input="applyFilter" />
      
      <select v-model="filterCategory" class="p-2 rounded border dark:bg-gray-700 dark:text-gray-100" @change="applyFilter">
        <option value="">Semua Kategori</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>

      <button @click="clearFilters" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Reset</button>
    </div>

    <table class="min-w-full text-left text-gray-900 dark:text-gray-100">
      <thead class="border-b border-gray-200 dark:border-gray-700">
        <tr>
          <th class="py-2 px-4">Tanggal</th>
          <th class="py-2 px-4">Kategori</th>
          <th class="py-2 px-4">Deskripsi</th>
          <th class="py-2 px-4">Jumlah (Rp)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in filteredTransactions" :key="transaction.id" class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
          <td class="py-2 px-4">{{ transaction.date }}</td>
          <td class="py-2 px-4">{{ transaction.category }}</td>
          <td class="py-2 px-4">{{ transaction.description }}</td>
          <td class="py-2 px-4 font-semibold text-red-600 dark:text-red-400">{{ transaction.amount }}</td>
        </tr>
        <tr v-if="filteredTransactions.length === 0">
          <td colspan="4" class="text-center py-4 text-gray-500 dark:text-gray-400">Tidak ada transaksi ditemukan.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  }
});

const filterDate = ref("");
const filterCategory = ref("");

const categories = computed(() => {
  const s = new Set(props.transactions.map(t => t.category));
  return [...s];
});

const filteredTransactions = computed(() => 
  props.transactions.filter(t => {
    if (filterDate.value && t.date !== filterDate.value) return false;
    if (filterCategory.value && t.category !== filterCategory.value) return false;
    return true;
  })
);

function applyFilter() {
  // nothing specific needed, computed will react
}

function clearFilters() {
  filterDate.value = "";
  filterCategory.value = "";
}
</script>