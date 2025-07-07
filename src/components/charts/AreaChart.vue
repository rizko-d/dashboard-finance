<template>
  <apexchart type="area" :options="chartOptions" :series="series" height="300" />
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
    id: "area-chart",
    toolbar: { show: false },
  },
  xaxis: { categories: props.categories },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth" },
  colors: ['#10B981'],
  grid: { borderColor: '#e0e0e0' },
  tooltip: { enabled: true },
  theme: { mode: 'light' },
});

watch(() => props.data, (val) => {
  series.value = [{ name: props.title, data: val }];
});

watch(() => props.categories, (val) => {
  chartOptions.value.xaxis.categories = val;
});
</script>