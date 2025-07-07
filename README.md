# Personal Finance Dashboard

A modern, responsive, single-page application for personal financial management and visualization. Built with **Vue 3 (Composition API)**, **Tailwind CSS**, **ApexCharts**, and **Heroicons**.

## Features

- **Dashboard Screen**: See your overall financial health at a glance (total balance, this month’s expenses, investment value).
- **Expense Visualization**: View spend trends by date and category with interactive charts and filterable transaction lists.
- **Investment Overview**: Track portfolio growth and check asset allocation breakdowns.
- **Budget Management**: Set budgets by category and visually monitor your spending progress.
- **Responsive Design**: Looks great on desktop and mobile.
- **Light & Dark Mode**: Toggle between themes for comfort.
- **Data Import/Export**: Import transactions from CSV/Excel and export your data for backup.
- **Clean UX**: Fast, minimal interface using Tailwind CSS utilities.

## Screenshots

<img scr="https://github.com/rizko-d/dashboard-finance/blob/main/img/result.png">

---

## Tech Stack

- [Vue 3 (Composition API)](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ApexCharts](https://apexcharts.com/) via [`vue3-apexcharts`](https://github.com/apexcharts/vue3-apexcharts)
- [Heroicons](https://heroicons.com/) (SVG icon set)
- Mock data with local JSON (easy integration with APIs later)

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```
   
4. Open [http://localhost:5173](http://localhost:5173) (or as specified by Vite) in your browser.

---

## Folder Structure

```
src/
  components/
  views/
  services/
  assets/
  App.vue
  main.js
  router.js
db.json or src/data.js
tailwind.config.js
```

---

## Mock Data

All data is stored in the `/src/services/api.js` file as asynchronous simulated-fetch functions. You can easily adapt it to use a real backend or API later.

---

## Customization

- To swap chart libraries (e.g., to Chart.js or ECharts), replace the chart components.
- To connect with your backend or change auth, adjust the services and API calls.
- Modify styling in `tailwind.config.js`.

---

## Credits

- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ApexCharts](https://apexcharts.com/)
- [Heroicons](https://heroicons.com/)
- [PapaParse](https://www.papaparse.com/) and [xlsx.js](https://github.com/SheetJS/sheetjs) for data import/export (if enabled)


---

Feel free to modify as needed. If you want a shorter/longer version or specific extra sections (like contribution guidelines, roadmap, etc.), just ask!

- By Crax.Chat
