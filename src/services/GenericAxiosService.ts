import axios, { type AxiosRequestConfig } from "axios";

/**
 * AXIOS_METHOD as a const object (enum replacement)
 */
export const AXIOS_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
} as const;

export type AxiosMethod = (typeof AXIOS_METHOD)[keyof typeof AXIOS_METHOD];

export interface IGenericAxiosService<TResponse = any, TPayload = any> {
  url: string;
  method: AxiosMethod;
  payload?: TPayload;
  params?: Record<string, any>;
  token?: string;
  config?: AxiosRequestConfig;
}

/**
 * Generic Axios wrapper.
 * Uses VITE_API_BASE_URL if set, otherwise falls back to localhost.
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080",
});

export async function GenericAxiosService<TResponse = any, TPayload = any>({
  url,
  method,
  payload,
  params,
  token,
  config = {},
}: IGenericAxiosService<TResponse, TPayload>): Promise<TResponse> {
  try {
    const headers: Record<string, string> = {
      ...(config.headers as Record<string, string>),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const finalConfig: AxiosRequestConfig = {
      ...config,
      headers,
      params,
    };

    let response;

    switch (method) {
      case AXIOS_METHOD.GET: {
        response = await axiosInstance.get<TResponse>(url, finalConfig);
        break;
      }
      case AXIOS_METHOD.POST: 
      case AXIOS_METHOD.PUT: {
        response = await axiosInstance.put<TResponse>(url, payload, finalConfig);
        break;
      }
      default: {
        throw new Error(`Unsupported method: ${method as string}`);
      }
    }

    return response.data;
  } catch (error) {
    console.info(`Error executing axios:`, error);
    throw error;
  }
}