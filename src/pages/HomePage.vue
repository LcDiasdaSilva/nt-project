<style lang="scss">
  .home {
    &__filters-traveler {
      max-width: 200px;
    }
  }
</style>
<template>
  <div class="home">
    <div class="home__filters">
      <SimpleValidateField
        v-model="filtersData.local"
        id="field-search-city"
        dataTest="field-search-city"
        type="text"
        placeholder="Para onde você vai ?"
        fieldClass="customInputSearch"
        v-debounce:300ms="loadHotels"
      />
      <div>
        <div>
          <DateSelect @submit="getDaily" />
        </div>
        <div class="home__filters-traveler mt-2">
          <TravelersControl @submit="travelersControlUpdate" />
        </div>
      </div>
    </div>

    <HotelList :hotels="state.hotels" class="mt-16">
      <template #item="{ hotel }">
        <HotelListCard
          :name="hotel.name"
          :address="hotel.address.city"
          :description="hotel.description"
          :value="formatCurrency(hotel.price)"
          :reviewNote="3"
          :reviewNumbers="5"
          :travelers="hotel.travelers"
          :bedrooms="hotel.bedrooms"
          :daily="dates.daily"
          :totalValue="useTotalValue(hotel.price, dates.daily).totalCurrency"
        />
      </template>
    </HotelList>
  </div>
</template>

<script setup lang="ts">
  import type { HotelApiInterface } from "@/services/api/HotelService";
  import type { HotelInterface } from "../types/interfaces";
  import SimpleValidateField from "../components/fields/SimpleValidateField.vue";
  import HotelList from "../components/hotel/HotelList.vue";
  import HotelListCard from "../components/hotel/HotelListCard.vue";
  import { inject, reactive } from "vue";
  import { useHotelFilters } from "../composables/useFilters";
  import { useTotalValue } from "../composables/useTotalValue";
  import TravelersControl from "../components/filters/TravelersControl.vue";
  import DateSelect from "../components/filters/DateSelect.vue";
  import {formatCurrency} from "../utils/function"

  const hotelApi = inject("hotelApi") as HotelApiInterface;

  const state = reactive({
    hotels: [] as HotelInterface[],
  });

  const filtersData = reactive({
    local: "",
    bedrooms: 1,
    travelers: 1,
    useTravelersControl: false,
  });

  const dates = reactive({
    start: "",
    end: "",
    daily: 0,
  });

  function getDaily(value: any) {
    dates.start = value.start;
    dates.end = value.end;
    dates.daily = value.daily;
  }

  function travelersControlUpdate(values: any) {
    filtersData.bedrooms = values.bedrooms;
    filtersData.travelers = values.travelers;
    filtersData.useTravelersControl = values.active;
    loadHotels();
  }

  const { filters } = useHotelFilters(filtersData);

  async function loadHotels() {
    try {
      const { data } = await hotelApi.listAll(filters.value);
      state.hotels = data;
    } catch (error) {
      console.error(error);
    }
  }

  loadHotels();
</script>
