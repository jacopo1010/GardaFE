const I18N = {
  it: {
    title: "Area Demo",
    subtitle: "Accedi per continuare",
    emailLabel: "Username",
    passwordLabel: "Password",
    showPwd: "Mostra",
    hidePwd: "Nascondi",
    remember: "Ricordami",
    forgot: "Password dimenticata?",
    loginBtn: "Entra",
    backBtn: "Torna al sito",
    register: "Registrati",
    recover: "Recupera password",
    privacy: "Privacy",
    terms: "Termini",
    credits: "Credits",
    errEmpty: "Inserisci username e password.",
    errUser: "Username non valido. Usa 4-32 caratteri: lettere, numeri, . _ -",
    errPwd: "Password non valida. Min 8 caratteri, almeno una lettera e un numero.",
    errInvalid: "Credenziali non valide.",
    errNet: "Errore di rete. Riprova.",
    logging: "Accesso..."
  },
  en: {
    title: "Demo Area",
    subtitle: "Sign in to continue",
    emailLabel: "Username",
    passwordLabel: "Password",
    showPwd: "Show",
    hidePwd: "Hide",
    remember: "Remember me",
    forgot: "Forgot password?",
    loginBtn: "Sign in",
    backBtn: "Back to website",
    register: "Register",
    recover: "Recover password",
    privacy: "Privacy",
    terms: "Terms",
    credits: "Credits",
    errEmpty: "Enter username and password.",
    errUser: "Invalid username. Use 4-32 chars: letters, numbers, . _ -",
    errPwd: "Invalid password. Min 8 chars, at least one letter and one number.",
    errInvalid: "Invalid credentials.",
    errNet: "Network error. Please try again.",
    logging: "Signing in..."
  }
};

let currentLang = localStorage.getItem("lang") || "it";

export function getCurrentLang() {
  return currentLang;
}

export function t(key) {
  return I18N[currentLang]?.[key] || key;
}

export function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (I18N[lang]?.[key]) el.textContent = I18N[lang][key];
  });

  document.querySelectorAll(".langBtn").forEach(b => {
    b.classList.toggle("isActive", b.dataset.lang === lang);
  });

  const passwordInput = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePwd");
  if (toggleBtn && passwordInput) {
    const label = passwordInput.type === "password" ? I18N[lang].showPwd : I18N[lang].hidePwd;
    toggleBtn.setAttribute("aria-label", label);
  }
}

export function initLangToggle() {
  document.querySelectorAll(".langBtn").forEach(b => {
    b.addEventListener("click", () => applyLang(b.dataset.lang));
  });
  applyLang(currentLang);
}
