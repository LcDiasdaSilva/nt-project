import { HotelInterface } from "@/modules/hotel/models/interfaces";
import type HttpClientInterface from "../http/HttpClientInterface";
import { AxiosResponse } from "axios";

export interface HotelApiInterface {
  listAll(): Promise<AxiosResponse<HotelInterface[]>>;
}

export default class HotelsApi implements HotelApiInterface {
  constructor(
    readonly axiosClient: HttpClientInterface,
    readonly baseUrl?: string
  ) {}

  listAll() {
    const url = `${this.baseUrl}/hotel`;
    return this.axiosClient.get(url, {});
  }
}
