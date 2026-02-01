import { initLangToggle } from "../ui/i18n.js";

function initTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");
  const lastTab = localStorage.getItem("dashLastTab");

  if (lastTab) {
    tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.tab === lastTab));
    panels.forEach(panel => panel.classList.toggle("active", panel.dataset.panel === lastTab));
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.toggle("active", t === tab));
      panels.forEach(panel => panel.classList.toggle("active", panel.dataset.panel === target));
      localStorage.setItem("dashLastTab", target);
    });
  });
}

export function initDashboardPage() {
  initLangToggle();
  initTabs();
  const toggle = document.getElementById("sidebarToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-open");
    });
  }
}
