<style lang="scss">
  .hotel-list {
    &__item {
      margin: 1rem 0;
    }
    &__empty{
      border:solid 1px #ccc;
      background: #eee;
      height: 300px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
<template>
  <div class="hotel-list">
    <div v-if="hotels.length > 0">
      <div v-for="hotel in props.hotels" :key="hotel.id">
        <div class="hotel-list__item">
          <slot name="item" :hotel="hotel"></slot>
        </div>
      </div>
    </div>
    <div class="hotel-list__empty" v-else>Nenhum local encontrado</div>
  </div>
</template>
<script setup lang="ts">
  import type { HotelInterface } from "../../types/interfaces";
  import { defineProps } from "Vue";

  const props = defineProps<{
    hotels: HotelInterface[];
  }>();
</script>
