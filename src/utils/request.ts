import { API_URL } from "./constants";

type RequestOptions = Omit<RequestInit, "body"> & { body?: any };

export async function request<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    body: options?.body ? JSON.stringify(options.body) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ошибка сервера ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}