import { AxiosResponse } from "axios";
import type HttpClientInterface from "../http/HttpClientInterface";

export interface HotelApiInterface {
  listAll(): Promise<AxiosResponse>;
}

export default class HotelsApi implements HotelApiInterface {
  constructor(
    readonly axiosClient: HttpClientInterface,
    readonly baseUrl?: string
  ) {}

  listAll() {
    console.log("testando")
    const url = `${this.baseUrl}/hotel`;
    return this.axiosClient.get(url, {});
  }
}
