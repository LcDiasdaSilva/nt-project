import { HotelInterface } from "@/types/interfaces";
import { defineStore } from "pinia";

export const useHotelsCompareStore = defineStore("counter", {
  state: () => ({
    hotelsCompare: [] as HotelInterface[],
  }),
  getters: {
    getStateHotelsCompare: (state) => state.hotelsCompare,
  },
  actions: {
    setStateHotelsCompare(hotels: HotelInterface[]) {
      this.hotelsCompare = hotels;
    },
  },
});
