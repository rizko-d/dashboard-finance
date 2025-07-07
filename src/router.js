import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import Expenses from "./views/Expenses.vue";
import Investments from "./views/Investments.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/expenses", name: "Expenses", component: Expenses },
  { path: "/investments", name: "Investments", component: Investments },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;