<template>
  <div style="text-align: right">
    <button
      :disabled="total < 2"
      class="customHotelCompareButton"
      type="button"
      @click="submit"
    >
      <label>Comparar</label>
      <label v-if="total > 1">
        <b class="mx-2">{{ total }}</b> hotéis</label
      >
    </button>
    <small>* Selecione até 3 hotéis para comparar</small>
  </div>
</template>
<script setup lang="ts">
  import { useHotelsCompareStore } from "../../store/useHotelCompareStore";
  import { computed, defineEmits } from "vue";
  const hotelCompareStore = useHotelsCompareStore();

  const emit = defineEmits(["submit"]);

  const total = computed(() => {
    return hotelCompareStore.getStateHotelsCompare.length;
  });

  function submit() {
    emit("submit");
  }
</script>
