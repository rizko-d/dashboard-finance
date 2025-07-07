<!-- src/components/charts/LineChart.vue -->
<template>
  <apexchart type="donut" :options="chartOptions" :series="series" height="300" />
</template>

<script setup>
import ApexChart from "vue3-apexcharts";
import { watch, ref } from "vue";

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ""
  }
});

const series = ref([{ name: props.title, data: props.data }]);
const chartOptions = ref({
  chart: {
    id: "line-chart",
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  xaxis: {
    categories: props.categories,
  },
  stroke: { curve: 'smooth' },
  dataLabels: { enabled: false },
  tooltip: { enabled: true },
  colors: ['#3B82F6'],
  grid: { borderColor: '#e0e0e0' },
  theme: { mode: 'light' },
});

watch(() => props.data, (val) => {
  series.value = [{ name: props.title, data: val }];
});

watch(() => props.categories, (val) => {
  chartOptions.value.xaxis.categories = val;
});
</script>