
<style lang="scss">
.hotel-list-card{
    border: solid 1px #ccc;
    background: #fff;
}

</style>
<template>
  <div class="hotel-list-card">
    {{ props.hotel }}
  </div>
</template>
<script setup lang="ts">
  import type { HotelInterface } from "../models/interfaces";
  import { defineProps } from "vue";

  const props = defineProps<{
    hotel: HotelInterface;
  }>();
</script>
