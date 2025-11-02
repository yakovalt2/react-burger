export async function checkResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ошибка сервера ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}