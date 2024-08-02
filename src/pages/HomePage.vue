<style lang="scss"></style>
<template>
  <div class="home">
    <input
      v-model="state.city"
      type="text"
      style="background: #ccc; width: 100%; padding: 1rem"
      placeholder="Para onde
    você vai ?"
      v-debounce:300ms="buscar"
    />
    <div>
      Numero de quartos:
      <select v-model="state.bedrooms">
        <option v-for="n in 3" :key="n">{{ n }}</option>
      </select>
    </div>

    <div>
      Numero de Viajantes:
      <select v-model="state.travelers">
        <option v-for="n in 5" :key="n">{{ n }}</option>
      </select>
    </div>

    <button @click="buscar">BUSCAR</button>

    <div>
      <select>
        <option>Melhor avaliação</option>
        <option>Pior Avaliação</option>
        <option>Menor Preço</option>
        <option>Maior preço</option>
      </select>
    </div>

    <HotelList :hotels="state.hotels" class="mt-16">
      <template #item="{ hotel }">
        <HotelListCard
          :name="hotel.name"
          :address="hotel.address.city"
          :description="hotel.description"
          :value="'R$ 300,00'"
          :reviewNote="3"
          :reviewNumbers="5"
          :travelers="3"
          :bedrooms="3"
          :totalValue="'R$ 1.200,00'"
        />
      </template>
    </HotelList>
  </div>
</template>

<script setup lang="ts">
  import type { HotelApiInterface } from "@/services/api/HotelService";
  import type {
    HotelFiltersInterface,
    HotelInterface,
  } from "../models/interfaces";
  import HotelList from "../components/hotel/HotelList.vue";
  import HotelListCard from "../components/hotel/HotelListCard.vue";
  import { inject, reactive } from "vue";
  import { computed } from "vue";

  const hotelApi = inject("hotelApi") as HotelApiInterface;

  const filterNormalized = computed(() => {
    let normalized: HotelFiltersInterface = {
      ...state.filters,
    };
    if (state.city) normalized["address.city_like"] = state.city;
    normalized.bedrooms = state.bedrooms;
    normalized["travelers_gte"] = state.travelers;
    return normalized;
  });

  const state = reactive({
    hotels: [] as HotelInterface[],
    city: "",
    bedrooms: 1,
    travelers: 1,
    filters: {
      _page: 1,
      _limit: 30,
    },
  });

  async function loadHotels() {
    try {
      console.log(filterNormalized);
      const { data } = await hotelApi.listAll(filterNormalized.value);
      console.log(data);
      state.hotels = data;
    } catch (error) {
      console.error(error);
    }
  }

  loadHotels();

  function buscar() {
    loadHotels();
  }
</script>
