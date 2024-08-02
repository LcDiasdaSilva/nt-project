import { reactive, computed } from "vue";
import { HotelFiltersInterface } from "@/types/interfaces";

interface StateInterface {
  local: string;
  bedrooms: number;
  travelers: number;
  useTravelersControl:boolean
}

export function useHotelFilters(state: StateInterface) {
  const pagination = reactive({
    _page: 1,
    _limit: 30,
  });

  const filters = computed<HotelFiltersInterface>(() => {
    const normalized: HotelFiltersInterface = {
      ...pagination,
    };
    if (state.local) normalized["address.city_like"] = state.local;
    if(state.useTravelersControl) normalized.bedrooms = state.bedrooms;
    if(state.useTravelersControl) normalized["travelers_gte"] = state.travelers;
    return normalized;
  });

  return {
    filters,
  };
}
