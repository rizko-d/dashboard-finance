// src/services/api.js
// Mock data and async API simulation

const transactions = [
  { id: 1, date: "2024-05-01", category: "Makanan", amount: 50, description: "Makan siang" },
  { id: 2, date: "2024-05-02", category: "Transportasi", amount: 20, description: "Ojek online" },
  { id: 3, date: "2024-05-05", category: "Hiburan", amount: 100, description: "Nonton bioskop" },
  { id: 4, date: "2024-05-10", category: "Makanan", amount: 30, description: "Cemilan snack" },
  { id: 5, date: "2024-05-15", category: "Transportasi", amount: 15, description: "Bus kota" },
  { id: 6, date: "2024-05-20", category: "Hiburan", amount: 200, description: "Konser musik" },
  // lebih banyak data...
];

const investments = [
  { date: "2024-01-01", value: 10000 },
  { date: "2024-02-01", value: 11000 },
  { date: "2024-03-01", value: 11500 },
  { date: "2024-04-01", value: 12000 },
  { date: "2024-05-01", value: 12500 },
];

const investmentAllocation = [
  { type: "Saham", amount: 7000 },
  { type: "Reksadana", amount: 4000 },
  { type: "Kripto", amount: 2500 },
];

const budgets = [
  { category: "Makanan", budget: 500, spent: 450 },
  { category: "Transportasi", budget: 200, spent: 150 },
  { category: "Hiburan", budget: 300, spent: 310 }, // over budget
];

export function fetchTransactions() {
  return new Promise(resolve => {
    setTimeout(() => resolve(transactions), 300);
  });
}

export function fetchInvestments() {
  return new Promise(resolve => {
    setTimeout(() => resolve(investments), 300);
  });
}

export function fetchInvestmentAllocation() {
  return new Promise(resolve => {
    setTimeout(() => resolve(investmentAllocation), 300);
  });
}

export function fetchBudgets() {
  return new Promise(resolve => {
    setTimeout(() => resolve(budgets), 300);
  });
}