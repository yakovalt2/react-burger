import { API_URL } from "./constants";
interface ApiResponse {
  success?: boolean;
  [key: string]: any;
}

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json() as Promise<T>;
  }
  const text = await res.text();
  throw new Error(`Ошибка ${res.status}: ${text}`);
};

const checkSuccess = <T extends ApiResponse>(data: T): T => {
  if ("success" in data && !data.success) {
    throw new Error(`Ответ не success: ${JSON.stringify(data)}`);
  }
  return data;
};

export const request = async <T extends ApiResponse>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${API_URL}${endpoint}`, options);
  const data = await checkResponse<T>(res);
  return checkSuccess(data);
};