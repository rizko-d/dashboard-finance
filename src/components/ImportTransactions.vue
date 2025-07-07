<!-- src/components/ImportTransactions.vue -->
<template>
  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Impor Transaksi</h3>
    <input type="file" @change="handleFileUpload" accept=".csv, .xlsx, .xls" />
    <button @click="importData" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Impor
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Papa from "papaparse";
import * as XLSX from 'xlsx';

const file = ref(null);
const transactions = ref([]);

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const importData = () => {
  if (!file.value) {
    alert("Silakan pilih file untuk diimpor.");
    return;
  }

  const fileType = file.value.name.split('.').pop();

  const reader = new FileReader();
  reader.onload = (event) => {
    const data = event.target.result;

    if (fileType === "csv") {
      // Parse CSV
      Papa.parse(data, {
        complete: (results) => {
          addTransactions(results.data);
        },
        header: true, // Use header for key-value mapping
      });
    } else if (fileType === "xlsx" || fileType === "xls") {
      // Parse Excel
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      addTransactions(jsonData);
    } else {
      alert("Format file tidak didukung. Mohon pilih file CSV atau Excel.");
    }
  };

  if (fileType === "csv") {
    reader.readAsText(file.value);
  } else {
    reader.readAsBinaryString(file.value);
  }
};

const addTransactions = (data) => {
  // Filter and map the data accordingly to your transaction structure
  const importedTransactions = data.map(item => ({
    id: Date.now(), // Generate unique ID
    date: item.date,
    category: item.category, // Sesuaikan nama kolom sesuai data Anda
    amount: parseFloat(item.amount),
    description: item.description
  }));

  // Emit event ke parent component
  emit("transactionsImported", importedTransactions);
  alert(`${importedTransactions.length} transaksi berhasil diimpor.`);
};

</script>