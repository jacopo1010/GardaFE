export function createCredenzialiDipendente({ username, password }) {
  return { username, password };
}

export function isValidCredenzialiDipendente(value) {
  if (!value) return false;
  const username = (value.username || "").trim();
  const password = value.password || "";
  return username.length > 0 && password.length > 0;
}
