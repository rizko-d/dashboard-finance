<template>
  <div>
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Dashboard</h2>

    <!-- Metrik Ringkasan -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
        <h3 class="text-gray-500 dark:text-gray-400 mb-2">Total Saldo</h3>
        <p class="text-3xl font-semibold text-gray-900 dark:text-gray-100">Rp 20.000.000</p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
        <h3 class="text-gray-500 dark:text-gray-400 mb-2">Pengeluaran Bulan Ini</h3>
        <p class="text-3xl font-semibold text-red-500">Rp {{ totalExpenses }}</p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
        <h3 class="text-gray-500 dark:text-gray-400 mb-2">Nilai Investasi</h3>
        <p class="text-3xl font-semibold text-green-500">Rp {{ latestInvestmentValue }}</p>
      </div>
    </div>

    <!-- Grafik Tren Pengeluaran -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Tren Pengeluaran Bulanan</h3>
      <LineChart :data="monthlyExpensesData" :categories="months" title="Pengeluaran" />
    </div>

    <!-- Grafik Alokasi Aset Investasi (Pie/Donut Chart) -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Alokasi Aset Investasi</h3>
      <PieChart :series="investmentAllocationSeries" :labels="investmentAllocationLabels" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { fetchTransactions, fetchInvestmentAllocation, fetchInvestments } from "../services/api";

import LineChart from "../components/charts/LineChart.vue";
import PieChart from "../components/charts/PieChart.vue";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const transactions = ref([]);
const investments = ref([]);
const investmentAllocation = ref([]);

const monthlyExpensesData = ref(Array(12).fill(0));

const totalExpenses = ref(0);
const latestInvestmentValue = ref(0);

const investmentAllocationSeries = ref([]);
const investmentAllocationLabels = ref([]);

function calculateMonthlyExpenses() {
  // Hitung pengeluaran per bulan (contoh: May 2024)
  const monthly = Array(12).fill(0);
  for (const t of transactions.value) {
    const month = new Date(t.date).getMonth(); // 0 based
    monthly[month] += t.amount;
  }
  monthlyExpensesData.value = monthly;
  const currentMonth = new Date().getMonth();
  totalExpenses.value = monthly[currentMonth];
}

onMounted(async () => {
  transactions.value = await fetchTransactions();
  investments.value = await fetchInvestments();
  investmentAllocation.value = await fetchInvestmentAllocation();

  calculateMonthlyExpenses();

  if(investments.value.length > 0)
    latestInvestmentValue.value = investments.value[investments.value.length - 1].value;

  investmentAllocationSeries.value = investmentAllocation.value.map(i => i.amount);
  investmentAllocationLabels.value = investmentAllocation.value.map(i => i.type);
});
</script>