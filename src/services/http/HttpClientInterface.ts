import { AxiosResponse } from "axios";
export default interface HttpClient {
  get(url: string, params: unknown): Promise<AxiosResponse>;
  post(url: string, data: unknown): Promise<AxiosResponse>;
  put(url: string, data: unknown): Promise<AxiosResponse>;
  delete(url: string): Promise<AxiosResponse>;
}
