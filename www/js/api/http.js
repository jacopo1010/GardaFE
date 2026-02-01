async function parseBody(resp) {
  const contentType = resp.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return resp.json();
  }
  return resp.text();
}

export async function postJson(url, body, options = {}) {
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include",
    body: JSON.stringify(body),
    ...options
  });

  const data = await parseBody(resp);

  if (!resp.ok) {
    const message = data?.message || data?.error || (typeof data === "string" ? data : "");
    const error = new Error(message || "Request failed");
    error.status = resp.status;
    error.data = data;
    throw error;
  }

  return data;
}
