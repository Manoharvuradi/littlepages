const API_URL = "http://localhost:3001";

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API request failed");
  }
  return res.json();
}