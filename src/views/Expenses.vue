<template>
  <div>
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Pengeluaran</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Tren Pengeluaran Harian (Mei 2024)</h3>
        <LineChart :data="dailyExpenses" :categories="days" title="Pengeluaran Harian" />
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Pengeluaran Per Kategori</h3>
        <PieChart :series="categoryExpenses" :labels="categories" />
      </div>
    </div>

    <TransactionList :transactions="transactions" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { fetchTransactions } from "../services/api";
import LineChart from "../components/charts/LineChart.vue";
import PieChart from "../components/charts/PieChart.vue";
import TransactionList from "../components/TransactionList.vue";
import ImportTransactions from "../components/ImportTransactions.vue";


const transactions = ref([]);

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const dailyExpenses = ref(new Array(31).fill(0));
const categoryExpenses = ref([]);
const categories = ref([]);
const handleTransactionsImported = (importedTransactions) => {
  transactions.value.push(...importedTransactions);
};

function calculateDailyExpenses() {
  const temp = new Array(31).fill(0);
  for (const t of transactions.value) {
    const d = new Date(t.date);
    if (d.getMonth() === 4) // May = 4
      temp[d.getDate() - 1] += t.amount;
  }
  dailyExpenses.value = temp;
}

function calculateCategoryExpenses() {
  const map = {};
  for (const t of transactions.value) {
    map[t.category] = (map[t.category] || 0) + t.amount;
  }
  categories.value = Object.keys(map);
  categoryExpenses.value = Object.values(map);
}

onMounted(async () => {
  transactions.value = await fetchTransactions();
  calculateDailyExpenses();
  calculateCategoryExpenses();
});
</script>