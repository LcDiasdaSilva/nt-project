<template>
  <div>
    <button
      :disabled="total < 2"
      class="customHotelCompareButton"
      type="button"
      @click="submit"
    >
      <label>Comparar</label> <label v-if="total > 1"> <b class="mx-2">{{ total }}</b> hotéis</label>
    </button>
  </div>
</template>
<script setup lang="ts">
  import { useHotelsCompareStore } from "../../store/useHotelCompareStore";
  import { computed } from "vue";
  const hotelCompareStore = useHotelsCompareStore();

  const total = computed(() => {
    return hotelCompareStore.getStateHotelsCompare.length;
  });

  function submit() {
    console.log("Comparar");
  }
</script>
