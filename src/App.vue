<template>
  <OverlayLoader v-if="layoutStore.getStateLoading" />
  <router-view />
</template>
<script setup lang="ts">
  import OverlayLoader from "./components/loader/OverlayLoader.vue";
  import { useLayoutStore } from "./store/useLayoutStore";
  const layoutStore = useLayoutStore();
</script>
