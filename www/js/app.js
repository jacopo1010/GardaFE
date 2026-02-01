import { initLoginPage } from "./pages/login.js";
import { initDashboardPage } from "./pages/dashboard.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body?.dataset?.page;
  if (page === "login") {
    initLoginPage();
  }
  if (page === "dashboard") {
    initDashboardPage();
  }
});
