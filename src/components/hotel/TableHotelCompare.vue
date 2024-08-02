<template>
  <div>Tabela de comparação</div>
</template>
<script setup lang="ts">
import type { HotelsInterface} from '../../'
  import { defineProps } from "vue";
  const props = defineProps<{
    hotels: HotelsInterface[];
  }>();
</script>
