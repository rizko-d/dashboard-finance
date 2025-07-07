<template>
  <div>
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Investasi</h2>
    <button
      @click="exportPortfolio"
      class="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Export Portofolio CSV
    </button>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Pertumbuhan Nilai Portofolio</h3>
        <AreaChart :data="portfolioValues" :categories="dates" title="Nilai Portofolio"/>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Alokasi Aset</h3>
        <BarChart :data="allocationAmounts" :categories="allocationTypes" title="Alokasi Aset Investasi" />
      </div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Manajemen Anggaran</h3>
      <div v-for="budget in budgets" :key="budget.category" class="mb-4">
        <div class="flex justify-between items-center mb-1">
          <span class="font-semibold text-gray-700 dark:text-gray-300">{{ budget.category }}</span>
          <span class="text-sm text-gray-600 dark:text-gray-400">
            Rp {{ budget.spent }} / Rp {{ budget.budget }}
          </span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded h-4 relative overflow-hidden">
          <div
            class="h-4 rounded"
            :class="progressBarClass(budget)"
            :style="{ width: progressPercent(budget) + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { fetchInvestments, fetchInvestmentAllocation, fetchBudgets } from "../services/api";
import AreaChart from "../components/charts/AreaChart.vue";
import BarChart from "../components/charts/BarChart.vue";
const portfolios = ref([]);
const allocation = ref([]);
const budgets = ref([]);
const dates = ref([]);
const portfolioValues = ref([]);
const allocationTypes = ref([]);
const allocationAmounts = ref([]);
onMounted(async () => {
  portfolios.value = await fetchInvestments();
  allocation.value = await fetchInvestmentAllocation();
  budgets.value = await fetchBudgets();
  dates.value = portfolios.value.map(p => new Date(p.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
  portfolioValues.value = portfolios.value.map(p => p.value);
  allocationTypes.value = allocation.value.map(a => a.type);
  allocationAmounts.value = allocation.value.map(a => a.amount);
});

// Export CSV function
function exportPortfolio() {
  if (!portfolios.value.length) {
    alert("Tidak ada data portofolio untuk diekspor.");
    return;
  }

  const header = "Tanggal,Nilai\n";
  const rows = portfolios.value.map(p =>
    `"${p.date}","${p.value}"`
  );
  const csvContent = header + rows.join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "portofolio.csv";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

function progressPercent(budget) {
  return Math.min(100, (budget.spent / budget.budget) * 100);
}
function progressBarClass(budget) {
  if (budget.spent > budget.budget) return "bg-red-500";
  if (progressPercent(budget) > 80) return "bg-yellow-400";
  return "bg-green-500";
}
</script>