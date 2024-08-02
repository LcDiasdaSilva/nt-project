import {
  HotelFiltersInterface,
  HotelInterface,
} from "../../types/interfaces";
import type HttpClientInterface from "../http/HttpClientInterface";
import { AxiosResponse } from "axios";

export interface HotelApiInterface {
  listAll(
    params?: HotelFiltersInterface
  ): Promise<AxiosResponse<HotelInterface[]>>;
}

export default class HotelsApi implements HotelApiInterface {
  constructor(
    readonly axiosClient: HttpClientInterface,
    readonly baseUrl?: string
  ) {}

  listAll(params?: HotelFiltersInterface) {
    const url = `${this.baseUrl}/hotels`;
    return this.axiosClient.get(url, params);
  }
}
