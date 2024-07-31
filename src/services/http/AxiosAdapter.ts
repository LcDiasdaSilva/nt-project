import type HttpClientInterface from "./HttpClientInterface";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class AxiosAdapter implements HttpClientInterface {
  api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      timeout: 100000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response.data
    );
  }

  get(url = "", data = null) {
    return this.api.get(url, { data });
  }

  post(url = "", data = {}) {
    return this.api.post(url, data);
  }

  put(url = "", data = {}) {
    return this.api.put(url, data);
  }

  delete(url = "") {
    return this.api.delete(url, {});
  }
}
