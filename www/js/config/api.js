const DEFAULT_API_BASE = "http://localhost:8080";

function getApiBase() {
  const fromWindow = window?.APP_CONFIG?.apiBase;
  if (fromWindow && typeof fromWindow === "string") return fromWindow;

  const fromStorage = localStorage.getItem("apiBase");
  if (fromStorage && typeof fromStorage === "string") return fromStorage;

  return DEFAULT_API_BASE;
}

const API_ROOT = `${getApiBase()}/api`;

export const AUTH_ADMIN_BASE = `${API_ROOT}/auth/admin`;
export const AUTH_CLIENT_BASE = `${API_ROOT}/auth/client`;
