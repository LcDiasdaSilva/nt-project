<style lang="scss">
  .hotel-list{
    &__item{
      margin: 1rem 0;
    }
  }
</style>
<template>
  <div class="hotel-list">
    <div v-for="hotel in props.hotels" :key="hotel.id">
      <div class="hotel-list__item">
        <slot name="item" :hotel="hotel"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { HotelInterface } from "../../models/interfaces";
  import { defineProps } from "Vue";

  const props = defineProps<{
    hotels: HotelInterface[];
  }>();
</script>
