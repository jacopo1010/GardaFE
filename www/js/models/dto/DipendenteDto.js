export function createDipendenteDto({ nome, cognome, email, numero, matricola, username, password, role }) {
  return { nome, cognome, email, numero, matricola, username, password, role };
}

export function isValidDipendenteDto(value) {
  if (!value) return false;
  const username = (value.username || "").trim();
  const password = value.password || "";
  const nome = (value.nome || "").trim();
  const cognome = (value.cognome || "").trim();
  const email = (value.email || "").trim();
  const matricola = (value.matricola || "").trim();
  const role = (value.role || "").trim();
  return (
    username.length > 0 &&
    password.length > 0 &&
    nome.length > 0 &&
    cognome.length > 0 &&
    email.length > 0 &&
    matricola.length > 0 &&
    role.length > 0
  );
}
