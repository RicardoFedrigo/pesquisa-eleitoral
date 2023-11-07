import axios, { AxiosResponse, AxiosRequestConfig, Axios } from "axios";
import { ApiRestInterface } from "../interfaces/api-rest.interface";

export abstract class ApiRestAbstract implements ApiRestInterface {
  private apiInstance: Axios;

  constructor(config: AxiosRequestConfig) {
    this.apiInstance = axios.create({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...config,
    });
  }

  get<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.apiInstance.get(url, config);
  }

  delete<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.apiInstance.delete(url, config);
  }

  post<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.apiInstance.post(url, data, config);
  }

  put<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.apiInstance.put(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.apiInstance.patch(url, data, config);
  }
}
