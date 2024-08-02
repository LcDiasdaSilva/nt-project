<style lang="scss">
  @import "../assets/style/media-queries";
  .home {
    &__filters-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      @include mq-value("768px") {
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
      }
      &__filters-traveler {
        width: 100%;
      }
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
        <div class="home__filters-row">
          <div class="home__filter-traveler mt-2">
            <TravelersControl @submit="travelersControlUpdate" />
          </div>
          <div class="mt-8">
            <HotelButtonCompare @submit="openModalHotelCompare" />
          </div>
        </div>
      </div>
    </div>
    <HotelList :hotels="state.hotels" class="mt-8">
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
          :image="hotel.image"
        >
          <template #checkCompare>
            <div class="mt-2 text-right">
              <label>
                <input
                  :value="hotel"
                  :disabled="
                    isMaxHotelCompareSelected &&
                    !state.selectedHotelsCompare.includes(hotel)
                  "
                  v-model="state.selectedHotelsCompare"
                  type="checkbox"
                />
                Comparar
              </label>
            </div>
          </template>
          <template #reserve>
            <button
              @click="openModalHotelReserve(hotel)"
              type="button"
              class="customPrimaryButton mt-2"
            >
              Reservar
            </button>
          </template>
        </HotelListCard>
      </template>
    </HotelList>
    <ModalBase
      ref="ModalHotelCompar"
      customMaxWidth="1000px"
      :show="state.showModalHotelCompare"
      :outClickHide="true"
      :iconClose="true"
      @close="closeModal"
    >
      <template #body>
        <TableHotelCompare :hotels="state.selectedHotelsCompare" />
      </template>
    </ModalBase>
    <ModalBase
      ref="ModalHotelReserve"
      customMaxWidth="600px"
      :show="state.showModalHotelReserve"
      :outClickHide="true"
      :iconClose="true"
      @close="closeModal"
    >
      <template #body
        ><FormReserve
          :hotel="state.selectedHotelReserve"
          :dates="dates"
          @submitReserve="submitReserve"
        /> </template
    ></ModalBase>
  </div>
</template>

<script setup lang="ts">
  import type { HotelApiInterface } from "@/services/api/HotelService";
  import type {
    DailyInterface,
    HotelInterface,
    TravelUpdateInterface,
  } from "../types/interfaces";
  import SimpleValidateField from "../components/fields/SimpleValidateField.vue";
  import HotelList from "../components/hotel/HotelList.vue";
  import HotelListCard from "../components/hotel/HotelListCard.vue";
  import { inject, reactive, computed, watch } from "vue";
  import { useHotelFilters } from "../composables/useFilters";
  import { useTotalValue } from "../composables/useTotalValue";
  import TravelersControl from "../components/filters/TravelersControl.vue";
  import DateSelect from "../components/filters/DateSelect.vue";
  import { formatCurrency } from "../utils/function";
  import HotelButtonCompare from "@/components/hotel/HotelButtonCompare.vue";
  import { useHotelsCompareStore } from "../store/useHotelCompareStore";
  import { useLayoutStore } from "../store/useLayoutStore";
  import ModalBase from "../components/modal/ModalBase.vue";
  import TableHotelCompare from "@/components/hotel/HotelTableCompare.vue";
  import FormReserve from "../components/forms/FormReserve.vue";

  const hotelCompareStore = useHotelsCompareStore();
  const layoutStore = useLayoutStore();

  const hotelApi = inject("hotelApi") as HotelApiInterface;

  const isMaxHotelCompareSelected = computed(
    () => state.selectedHotelsCompare.length >= 3
  );

  const state = reactive({
    hotels: [] as HotelInterface[],
    selectedHotelsCompare: [] as HotelInterface[],
    selectedHotelReserve: {} as HotelInterface,
    showModalHotelCompare: false,
    showModalHotelReserve: false,
  });

  watch(
    state,
    (newState) => {
      hotelCompareStore.setStateHotelsCompare(newState.selectedHotelsCompare);
    },
    { deep: true }
  );

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

  function getDaily(value: DailyInterface) {
    dates.start = value.start;
    dates.end = value.end;
    dates.daily = value.daily;
  }

  function travelersControlUpdate(values: TravelUpdateInterface) {
    filtersData.bedrooms = values.bedrooms;
    filtersData.travelers = values.travelers;
    filtersData.useTravelersControl = values.active;
    loadHotels();
  }

  const { filters } = useHotelFilters(filtersData);

  async function loadHotels() {
    try {
      layoutStore.changeStateLoading(true);
      const { data } = await hotelApi.listAll(filters.value);
      state.hotels = data;
      layoutStore.changeStateLoading(false);
    } catch (error) {
      console.error(error);
      layoutStore.changeStateLoading(false);
    }
  }

  loadHotels();

  function closeModal() {
    (state.showModalHotelCompare = false),
      (state.showModalHotelReserve = false);
  }

  function openModalHotelCompare() {
    console.log("abrir");
    state.showModalHotelCompare = true;
  }

  function openModalHotelReserve(hotel: HotelInterface) {
    state.selectedHotelReserve = hotel;
    state.showModalHotelReserve = true;
  }

  function submitReserve(values: { name: string; email: string }) {
    console.log("Criar reserva", values);
  }
</script>
