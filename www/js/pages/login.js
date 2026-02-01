import { applyLang, getCurrentLang, initLangToggle, t } from "../ui/i18n.js";
import { loginAdmin } from "../api/authAdmin.js";
import {
  createCredenzialiDipendente,
  isValidCredenzialiDipendente
} from "../models/requests/CredenzialiDipendente.js";

const DEFAULT_REDIRECT = "dashboard.html";

function showAlert(alertBox, message) {
  if (!alertBox) return;
  alertBox.textContent = message;
  alertBox.classList.remove("d-none");
}

function hideAlert(alertBox) {
  if (!alertBox) return;
  alertBox.textContent = "";
  alertBox.classList.add("d-none");
}

function getRedirectUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("redirect") || sessionStorage.getItem("postLoginRedirect") || DEFAULT_REDIRECT;
}

function setLoading(submitBtn, isLoading) {
  if (!submitBtn) return;
  submitBtn.disabled = isLoading;
  submitBtn.textContent = isLoading ? t("logging") : t("loginBtn");
}

function isValidUsername(username) {
  return /^[A-Za-z0-9._-]{4,32}$/.test(username);
}

function isValidPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
}

function initRememberedUsername(usernameInput, rememberInput) {
  const savedUsername = localStorage.getItem("rememberedUsername");
  if (savedUsername && usernameInput) {
    usernameInput.value = savedUsername;
    if (rememberInput) rememberInput.checked = true;
  }
}

function initPasswordToggle(togglePwdBtn, passwordInput) {
  if (!togglePwdBtn || !passwordInput) return;
  togglePwdBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    applyLang(getCurrentLang());
  });
}

function initBackButton(backBtn) {
  if (!backBtn || !backBtn.dataset.backUrl) return;
  backBtn.addEventListener("click", () => {
    window.location.href = backBtn.dataset.backUrl;
  });
}

async function handleLogin(evt, refs) {
  evt.preventDefault();
  const { usernameInput, passwordInput, rememberInput, alertBox, submitBtn } = refs;

  hideAlert(alertBox);

  const username = (usernameInput?.value || "").trim();
  const password = passwordInput?.value || "";
  const credentials = createCredenzialiDipendente({ username, password });

  if (!isValidCredenzialiDipendente(credentials)) {
    showAlert(alertBox, t("errEmpty"));
    return;
  }

  if (!isValidUsername(username)) {
    showAlert(alertBox, t("errUser"));
    return;
  }

  if (!isValidPassword(password)) {
    showAlert(alertBox, t("errPwd"));
    return;
  }

  setLoading(submitBtn, true);
  try {
    await loginAdmin(credentials);

    if (rememberInput?.checked) {
      localStorage.setItem("rememberedUsername", username);
    } else {
      localStorage.removeItem("rememberedUsername");
    }

    window.location.href = getRedirectUrl();
  } catch (err) {
    const status = err?.status;
    const msg = err?.message || (status === 401 ? t("errInvalid") : t("errNet"));
    showAlert(alertBox, msg);
  } finally {
    setLoading(submitBtn, false);
  }
}

export function initLoginPage() {
  initLangToggle();

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const rememberInput = document.getElementById("remember");
  const alertBox = document.getElementById("alert");
  const submitBtn = document.getElementById("submitBtn");
  const backBtn = document.getElementById("backBtn");
  const togglePwdBtn = document.getElementById("togglePwd");

  initRememberedUsername(usernameInput, rememberInput);
  initPasswordToggle(togglePwdBtn, passwordInput);
  initBackButton(backBtn);

  if (loginForm) {
    loginForm.addEventListener("submit", evt =>
      handleLogin(evt, { usernameInput, passwordInput, rememberInput, alertBox, submitBtn })
    );
  }
}
