import { AUTH_ADMIN_BASE } from "../config/api.js";
import { postJson } from "./http.js";

export function loginAdmin(credentials) {
  return postJson(`${AUTH_ADMIN_BASE}/login`, credentials);
}

export function registerAdmin(payload) {
  return postJson(`${AUTH_ADMIN_BASE}/register`, payload);
}

export function logoutAdmin() {
  return postJson(`${AUTH_ADMIN_BASE}/logout`, {});
}

