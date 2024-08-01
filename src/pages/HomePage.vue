
<style lang="scss">
 
</style>
<template>
  <div class="home">
   
    <HotelList :hotels="state.hotels" class="mt-3">
      <template #item="{ hotel }">
        <HotelListCard :hotel="hotel" />
      </template>
    </HotelList>
  </div>
</template>

<script setup lang="ts">
  import type { HotelApiInterface } from "@/services/api/HotelService";
  import type { HotelInterface } from "@/modules/hotel/models/interfaces";
  import HotelList from "../modules/hotel/components/HotelList.vue";
  import HotelListCard from "../modules/hotel/components/HotelListCard.vue";
  import { inject, reactive } from "@vue/runtime-dom";

  const hotelApi = inject("hotelApi") as HotelApiInterface;

  const state = reactive({
    hotels: [] as HotelInterface[],
  });

  async function loadHotels() {
    try {
      const { data } = await hotelApi.listAll();
      state.hotels = data;
    } catch (error) {
      console.error(error);
    }
  }

  loadHotels();
</script>
