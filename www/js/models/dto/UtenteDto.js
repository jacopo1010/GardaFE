export function createUtenteDto({ nome, cognome, email, numero, username, password, role }) {
  return { nome, cognome, email, numero, username, password, role };
}

export function isValidUtenteDto(value) {
  if (!value) return false;
  const username = (value.username || "").trim();
  const password = value.password || "";
  const nome = (value.nome || "").trim();
  const cognome = (value.cognome || "").trim();
  const email = (value.email || "").trim();
  return username.length > 0 && password.length > 0 && nome.length > 0 && cognome.length > 0 && email.length > 0;
}
