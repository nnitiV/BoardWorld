import {
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
} from "axios";

export interface AxiosResponse<T, D> {
  data: T; 
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders; // 4. Structured Dictionary
  config: InternalAxiosRequestConfig<D>;
}
