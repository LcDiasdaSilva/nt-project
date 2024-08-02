
import { defineStore } from "pinia";

export const useHotelsCompareStore = defineStore("counter", {
  state: () => ({
    hotelsCompare: [{hotel:"hotel teste"}],
  }),
  getters: {
    getStateHotelsCompare: (state) => state.hotelsCompare,
  },
  actions: {
    setStateHotelsCompare(hotels: any) {
      this.hotelsCompare = hotels;
    },
  },
});
